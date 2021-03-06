
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

Como podemos ver o core da aplicação está dentro de virtualDom.ts;
Na pasta de componentes é onde os componentes criados (que extendem *virtualDom.ts*) ficam;
Na pasta de scss é onde estão os arquivos de estilo;
Na pasta vendor estão as chamadas a libs externas;
O arquivo index é o arquivo que chama o componente *root* da aplicação, essa classe faz a chamada das outras classes e monta o template inicial da aplicação para ser inserido no index.html.

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
        <button class="basic-form__button"> Send</button>
      </div>
    `);

    //chamando a função que inicia o processo de renderização
    super.render();
  }
  }

  export default new App();
```

## Chamada de um componente externo
A seguir um exemplo do componente root da aplicação com um template básico chamando um outro componente como dependencia.

Primeiro é necessário criar um novo componente. No exemplo a seguir vamos criar o componente mensagem:
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
      <button class="basic-form__button"> Send</button>
    </div>
  `);
```

Depois disso o core do projeto se encarrega de renderizar os componentes em seus respectivos locais.
<br>
Componentes que não são roots também podem chamar outros componentes!

## Passagem de props para sub components
Cada componente pode receber de seu pai determinados dados, esses dados recebidos são denominados props.
A seguir um exemplo de um componente sendo chamado com props sendo passados para ele.
``` sh
<message from="sent" author="Bruno Casotto" message="message"></message>
```
No exemplo acima temos o exemplo de uma chamada de um componente passando as props from e author.
No codigo a seguir um exemplo de como podemos tratar os dados recebidos por props de outro componente.
``` sh
constructor(props:  Object) {
super();
this.name  =  'message';

let  classList:  string  =  '';
if(props['from'] &&  props['value'] ===  'sent') {
	classList  =  'message--alignt-right is-primary'
}

this.setTemplate(`
	<article vd-click="callModal" class="message ${classList}">
		<div class="message-body">
			<p>From: <strong> ${props['author']} </strong></p>
			${props['message']}
		</div>
	</article>`
);
}
```
Nesse caso, utilizamos a propriedade from e verificamos se ela é uma string com o valor sent, caso seja alteramos outra váriavel que será a classe do meu template. Já a outra prop message inserimos dentro do template como o corpo da mensagem.
## Definir eventos
É possível atribuir eventos de clique, hover, mousedown entre outros aos elementos de forma simple.
Primeiramente devemos criar uma função que o evento irá disparar como no exemplo a seguir:
``` sh
public sendMessage(): void {
  //code here
}
```
Para definir qual evento e qual função esse evento irá chamar é necessário incluir a tag vd-${nomedoevento}.
Por exemplo para o evento de clique como no trecho de código a seguir:
``` sh
 <button vd-click="sendMessage" class="basic-form__button"> Send</button>
```
Lembrando inserir um evento de clique na chamada de um componente não é válido. Cada componente trata de lidar com seus elementos e seus respectivos eventos.
