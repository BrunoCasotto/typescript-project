import VirtualDom from './../../virtualDom/virtualDom';
/**
 * Class to create message element
 */
class Calling extends VirtualDom {
  //setting the component call name
  name:string = 'calling';

  //constructor with components props
  constructor(props: Object) {
    super();

    //verify if props exist and manipulate the template
    let classList: string = '';
    if(props['from'] && props['from'].value === 'sent') {
      classList = 'message--alignt-right is-warning'
    }

    //setting the template
    this.setTemplate(`
      <article class="message ${classList}">
        <div class="message-body">
          Call all friends
        </div>
      </article>`
    );
  }
}

export default Calling;