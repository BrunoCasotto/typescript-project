/**
 * class to manipulation of the DOM
 */
class VirtualDom {
  //content of component
  private template: Element;
  //prop to know if the component is the root component
  private root: Boolean;
  //prop that represent virtual dom
  private vdom: Element;
  //name of component call
  protected name:string;
  //components dependencies
  private components: Array<any> = [];

  /**
   * constructor of virtualDom
   * @param template param that define template or not
   */
  constructor(template: Element = null) {
    if(template) {
      this.vdom = template
    }
  }

  /**
   * function to render element into especific html locale
   * @param locale element where the template will be injected
   */
  public render(template: Element = null):Element {
    try {
      if(template) {
        template.querySelector(this.name).parentNode;
        this.renderChildNodes(template.querySelector(this.name).parentElement);
        template.querySelector(this.name).remove();
      } else {
        this.resolveDependencies();
        this.renderChildNodes(document.querySelector(this.name))
      }

      return template;
    } catch (error) {
      console.error('virtualDom.render', error);
    }
  }

  private resolveDependencies():Element {
    let componentInstance;
    let props: Object = {};
    let componentLocales:NodeListOf<Element>;
    let i: number = 0;

    this.components.forEach((dependency) => {
      //getting all component callers into template
      componentLocales = this.template.querySelectorAll(dependency.name);
      //looping the compnent locales
      i = componentLocales.length;
      while(i--) {
        props = componentLocales[i].attributes;
        componentInstance = new dependency.component(props);
        componentInstance.render(this.template);
      }
    });

    return this.template;
  }

  private renderChildNodes(htmlPLace:Element) {
    try {
      //getting all child nodes
      let index = this.template.childNodes.length;
      let childNode;
      //insert all child nodes on parent node of component
      while(index--) {
        childNode = this.template.childNodes[index];
        if(typeof childNode === 'object') {
          htmlPLace.appendChild(childNode);
        }
      }
    } catch (error) {
      console.error('virtualDom.render', error);
    }
  }

  /**
   * function to set the current element to process
   * @param html html snippet to manipulate
   */
  public setTemplate( html:string ): void {
    try {
      this.template = document.createElement('div');
      this.template.innerHTML = html;
    } catch (error) {
      console.error('virtualDom.setTemplate', error);
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