import VirtualDom from './../../virtualDom/virtualDom';
/**
 * Class to create message element
 */
class Message extends VirtualDom {

  //setting the component call name
  name:string = 'message';

  //constructor with components props
  constructor(props: Object) {
    super();
    //setting the template
    this.setTemplate(`
      <article class="message">
        <div class="message-body">
          <p>From: <strong>${props['author']}</strong></p>
          ${props['message']}
        </div>
      </article>`
    );
  }
}

export default Message;