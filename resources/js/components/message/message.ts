import VirtualDom from './../../virtualDom/virtualDom';
import MiniUser from './../user/miniUser';

/**
 * Class to create message element
 */
class Message extends VirtualDom {

  //constructor with components props
  constructor(props: Object) {
    super();

    //define the component name
    this.name = 'message';

    //register component dependencie
    this.registerComponent({name: 'mini-user', component: MiniUser });

    let classList: string = '';
    if(props['from'] && props['from'].value === 'sent') {
      classList = 'message--alignt-right is-primary'
    }

    //setting the template
    this.setTemplate(`
      <article vd-click="callModal" class="message ${classList}">
        <mini-user></mini-user>
        <div class="message-body">
          <p>From: <strong>${props['author'].value}</strong></p>
          ${props['message'].value}
        </div>
      </article>`
    );
  }

  public callModal(): void {
    alert('calling all users');
  }
}

export default Message;