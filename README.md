### Typescript Virtual Dom
O projeto  *Typescript Virtual Dom*  é um projeto *for fun*. Ele foi inspirado no framework [Vue Js](https://github.com/vuejs/vue), basicamente o projeto contém um core denominado `VirtualDom.ts` que trata componentes criados a partir de classes que extendem a classe *VirtualDom* do *core*.

### indice
[Iniciar o componente root](#section1)


## Organização do projeto
A hierarquia do projeto basicamente consiste em:

 - resources
	 - ts
		 - components
			 *componentA.ts
			 componentB.ts*
		 - virtualDom
			 *virtualDom.ts*
	- scss
		*main.scss*
	- vendor 
		*externalDependencies.ts*
- index.ts
- index.html

Como podemos ver o core da aplicação está dentro de virtualDom.ts;
Na pasta de componentes é onde os componentes criados (que extendem *virtualDom.ts*) ficam;
Na pasta de scss é onde estão os arquivos de estilo;
Na pasta vendor estão as chamadas a libs externas;
O arquivo index é o arquivo que chama o componente *root* da aplicação, essa classe faz a chamada das outras classes e monta o template inicial da aplicação para ser inserido no index.html.

## <a name=“section1”></a>Iniciar o componente root

A seguir um exemplo do componente root da aplicação com um template básico:

    import VirtualDom from './resources/js/virtualDom/virtualDom';
    const $ = this;

    class App extends VirtualDom{
      constructor() {
	    //chamando o construtor do core com o parâmetro true,
      //indicando que esse é o componente inicial
      super(true);

	    //Definindo o local onde o componente root irá renderizar.
	    //A div com o id chat deverá estar no index.html
      this.name = '#chat';

	    //settando o template html
	    //pertencente ao componente
      this.setTemplate(`
        <div class="basic-form">
          <button vd-click="sendMessage" class="basic-form__button"> Send</button>
        </div>
      `);

      //chamando a função que inicia o processo de renderização
      super.render();
    }

      public sendMessage(): void {
    		//code here
      }
    }

    export default new App();

## Iniciar o componente root
