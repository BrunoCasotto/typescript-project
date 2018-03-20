import VirtualDom from './../../virtualDom/virtualDom';
import Reply from './reply';

/**
 * Class to create message element
 */
class Message extends VirtualDom {

  //constructor with components props
  constructor(props: Object) {
    super();
    this.name = 'message';
    this.registerComponent({name: 'reply', component: Reply });

    let articleMode: string = '';
    let reply: string = '';
    if(props['from'] === 'sent') {
      articleMode = 'message--alignt-right is-primary'
    } else {
      reply = `
        <div class="message-body__reply is-invisible">
          <reply></reply>
        </div>
        <button vd-click="toggleReply" class="button is-primary chat__content__form__button">
          reply
        </button>`
    }

    this.setTemplate(`
      <article vd-click="callModal" class="message ${articleMode}">
        <mini-user></mini-user>
        <div class="message-body">
          <p>From: <strong>${props['author']}</strong></p>
          ${props['message']}
          ${reply}
        </div>
      </article>`
    );
  }

  public toggleReply() {
    document.querySelector('.message-body__reply').classList.toggle('is-invisible')
  }
}

export default Message;