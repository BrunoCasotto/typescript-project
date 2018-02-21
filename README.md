### Typescript Virtual Dom
O projeto  *Typescript Virtual Dom*  é um projeto *for fun*. Ele foi inspirado no framework [Vue Js](https://github.com/vuejs/vue), basicamente o projeto contém um core denominado `VirtualDom.ts` que trata componentes criados a partir de classes que extendem a classe *VirtualDom* do *core*.

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

Como podemos ver o core da aplicação está dentro de virtualDom.ts;<br>
Na pasta de componentes é onde os componentes criados (que extendem *virtualDom.ts*) ficam;<br>
Na pasta de scss é onde estão os arquivos de estilo;<br>
Na pasta vendor estão as chamadas a libs externas;<br>
O arquivo index é o arquivo que chama o componente *root* da aplicação, essa classe faz a chamada das outras classes e monta o template inicial da aplicação para ser inserido no index.html.<br>

## Iniciar o componente root
A seguir um exemplo do componente root da aplicação com um template básico:
```sh
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
```

## Chamada de um componente externo
A seguir um exemplo do componente root da aplicação com um template básico chamando um outro componente como dependenci.

Primeiro é necessário criar um novo componente como no exemplo a seguir vamos criar o componente mensagem:
```sh
import VirtualDom from './../../virtualDom/virtualDom';

class Message extends VirtualDom {

  constructor() {
    super();

    this.name = 'message';

    this.setTemplate(`
      <article class="message">
        <div class="message-body">
          Your message here
        </div>
      </article>`
    );
  }
}

export default Message;
```

Feito isso devemos chamar o componente dentro do nosso componente root como no trecho de código a seguir:
```sh
  import Message from './resources/js/components/message/message';
```

Dentro do construtor é necessário colocarmos o nome da dependencia (nome que iremos chamar dentro do template como  < message ></ message >) e sua respectiva dependencia antes chamada.
```sh
  this.registerComponent({name: 'message', component: Message });
```

Dentro da declaração do template do componente root é feita a chamada desse componente declarado acima:
```sh
    this.setTemplate(`
    <div class="basic-form">
      <div class="basic-form__messages">
        <message></message>
      </div>
      <button vd-click="sendMessage" class="basic-form__button"> Send</button>
    </div>
  `);
```

Depois disso o core do projeto se encarrega de renderizar os componentes em seus respectivos locais.
<br><br>
Componentes que não são roots também podem chamar outros componentes!

**Projeto em desenvolvimento (documentação também)!**
