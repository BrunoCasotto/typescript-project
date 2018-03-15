import VirtualDom from './../../virtualDom/virtualDom';

/**
 * Class to create Reply element
 */
class Reply extends VirtualDom {

  constructor(props: Object) {
    super();
    this.name = 'reply';
    this.setTemplate(`
      <div>
        <input class="input is-primary" type="text" placeholder="Type your reply">
      </div>`
    );
  }
}

export default Reply;