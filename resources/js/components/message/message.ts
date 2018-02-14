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
    let classList: string = '';
    if(props['from'] && props['from'].value === 'sent') {
      classList = 'message--alignt-right is-primary'
    } 
    //setting the template
    this.setTemplate(`
      <article class="message ${classList}">
        <div class="message-body">
          <p>From: <strong>${props['author'].value}</strong></p>
          ${props['message'].value}
        </div>
      </article>`
    );
  }
}

export default Message;