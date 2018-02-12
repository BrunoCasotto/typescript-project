import VirtualDom from './resources/js/virtualDom/virtualDom';
import Message from './resources/js/components/message/message';

class App extends VirtualDom{

  constructor() {
    //passing root as true
    super();

    //setting the root place
    this.name = '#chat';

    //register components
    this.registerComponent({
      name: 'message',
      component: Message
    })

    //settings the html
    this.setTemplate(`
      <div class="chat__content box">
        <div class="chat__content__messages" id="messages">
          <article class="message">
            <div class="message-body">
              <p>From: <strong>Bruno Casotto</strong></p>
              Lorem ipsum dolor sit amet
            </div>
          </article>

          <article class="message message--alignt-right is-primary">
            <div class="message-body">
              <p>From: <strong>Bruno Casotto</strong></p>
              Lorem ipsum dolor sit amet
            </div>
          </article>

          <message author="Bruno Casotto" message="message"></message>
          <message author="Renata" message="Mensagem maior que a ultima"></message>
          <message author="Maria jose" message="mensagem ainda maior que a ultima que era grande"></message>
        </div>
        <div class="chat__content__form">
            <input class="input is-primary" type="text" placeholder="Type your message">
            <button class="button is-primary chat__content__form__button">
              Send
            </button>
        </div>
      </div>
    `);

    //initial render
    super.render();
  }
}

export default new App();
