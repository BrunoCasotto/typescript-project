import VirtualDom from './../../virtualDom/virtualDom';
/**
 * Class to create message element
 */
class Message extends VirtualDom {

  constructor(author:string, message:string) {
    super();
    super.setTemplate(`
      <article class="message">
        <div class="message-body">
          <p>From: <strong>${author}</strong></p>
          ${message}
        </div>
      </article>`
    );
  }
}

export default Message;