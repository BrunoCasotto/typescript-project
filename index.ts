import VirtualDom from './resources/js/virtualDom/virtualDom';
import Message from './resources/js/components/message/message';
class App extends VirtualDom{

  constructor() {
    //passing root as true
    super(true);

    //setting the root place
    this.name = '#chat';

    //register components
    this.registerComponent({name: 'message', component: Message });

    //settings the html
    this.setTemplate(`
      <div class="chat__content box">
        <div class="chat__content__messages" id="messages">
          <message from="sent" author="Bruno Casotto" message="message"></message>
          <message author="Maria jose" message="mensagem ainda maior que a ultima que era grande"></message>
        </div>
        <div vd-hover="sendMessage" class="chat__content__form">
          <input class="input is-primary" type="text" placeholder="Type your message">
          <button vd-click="sendMessage" id="send-button" class="button is-primary chat__content__form__button">
            Send
          </button>
        </div>
      </div>
    `);

    //initial render
    super.render();

    super.getComponentInstances = super.getComponentInstances.bind(this);
  }

  public sendMessage(): void {
    console.log(super.getComponentInstances())
  }
}

export default new App();
