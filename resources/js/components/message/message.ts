import VirtualDom from './../../virtualDom/virtualDom';
import Reply from './reply';
const $ = this;

/**
 * Class to create message element
 */
class Message extends VirtualDom {

  //constructor with components props
  constructor(props: Object) {
    super();
    this.name = 'message';
    this.registerComponent({name: 'reply', component: Reply });

    let classList: string = '';
    if(props['from'] && props['value'] === 'sent') {
      classList = 'message--alignt-right is-primary'
    }

    this.setTemplate(`
      <article vd-click="callModal" class="message ${classList}">
        <mini-user></mini-user>
        <div class="message-body">
          <p>From: <strong>${props['author']}</strong></p>
          ${props['message']}
          <div class="message-body__reply is-invisible">
            <reply></reply>
          </div>
          <button vd-click="toggleReply" class="button is-primary chat__content__form__button">
            reply
          </button>
        </div>
      </article>`
    );

    super.getComponentsInstances = super.getComponentsInstances.bind(this);
  }

  public toggleReply() {
    console.log(super.getComponentsInstances())
    document.querySelector('.message-body__reply').classList.toggle('is-invisible')
  }
}

export default Message;