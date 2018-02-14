import VirtualDom from './../../virtualDom/virtualDom';
/**
 * Class to create message element
 */
class MiniUser extends VirtualDom {

  //constructor with components props
  constructor(props: Object) {
    super();

    //define the component name
    this.name =  'mini-user';

    //setting the template
    this.setTemplate(`
      <p>mini-user</p>  
    `);
  }
}

export default MiniUser;