import VirtualDom from './../../virtualDom/virtualDom';
/**
 * Class to create message element
 */
class MessageList extends VirtualDom {

  constructor() {
    super();
    super.setTemplate(`
      <section class="chat">
        <div class="chat__content box">
          <div class="chat__content__messages">
          </div>
        </div>
      </section>`
    );
  }
}

export default MessageList;