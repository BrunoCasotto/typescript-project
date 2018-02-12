/**
 * class to manipulation of DOM
 */
class VirtualDom {
  //content of component
  private template: Element;
  //template nodes
  private nodes: Array<Element>;  
  //component place
  private htmlPlace: Element;
  //name of component call
  protected name:string;
  //components dependencies
  private components: Array<any> = [];

  /**
   * function to render element into especific html locale
   * @param locale element where the template will be injected
   */
  public render():void {
    try {
      let places:NodeListOf<Element>;
      places = document.querySelectorAll(this.name);

      let i = places.length;
      while(i--) {
        //render the child nodes on the selected place
        this.renderChildNodes(places[i]);
      }

      //initialize the components dependencies
      this.initDependencies();
    } catch (error) {
      console.error('virtualDom.render', error);
    }
  }

  private renderChildNodes(htmlPLace:Element) {
    try {
      //creating the html basead on name component
      this.htmlPlace = htmlPLace;

      //getting all child nodes
      let index = this.template.childNodes.length;
      let childNode;

      while(index--) {
        childNode = this.template.childNodes[index];
        if(typeof childNode === 'object') {
          this.htmlPlace.appendChild(childNode);
        }
      }
    } catch (error) {
      console.error('virtualDom.render', error);
    }
  }

  /**
   * function to initialize components
   */
  initDependencies():void {
    try {
      let componentInstance;

      this.components.forEach((component) => {
        componentInstance = new component();
        componentInstance.render();
      });

    } catch (error) {
      console.error('virtualDom.initDependencies', error);
    }
  }

  /**
   * function to set the current element to process
   * @param html html snippet to manipulate
   */
  public setTemplate( html:string ): void {
    try {
      this.template = document.createElement('div');
      this.template.innerHTML = html

    } catch (error) {
      console.error('virtualDom.setTemplate', error);
    }
  }

  /**
   * get the current html template
   */
  public getTemplate(): Element {
    try {
      return this.template;
    } catch (error) {
      console.error('virtualDom.getTemplate', error);
    }
  }

  /**
   * function to register component dependencies
   */
  public registerComponent(component:Object): void {
    try {
      this.components.push(component);
    } catch (error) {
      console.error('virtualDom.getTemplate', error);
    }
  }
}

export default VirtualDom;