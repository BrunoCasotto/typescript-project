
/**
 * class to manipulation of the DOM
 */
class VirtualDom {
  //content of component
  private template: Element;
  //prop to know if the component is the root component
  public root: Boolean;
  //prop that represent virtual dom
  private vdom: Element;
  //name of component call
  public name:string;
  //components dependencies
  private components: Array<any> = [];
  //components dependencies
  protected componentsInstances: Array<Object> = [];
  //state of component
  protected data: Object = {};
  //state of component
  protected props: Object = {};

  /**
   * @param root true if is the first component
   */
  constructor(root = false, props: Object = {}) {
    this.root = root;
    this.props = props;
  }

  /**
   * function to render element into especific html locale
   * @param locale element where the template will be injected
   */
  public render(template: Element = null): Element {
    try {
      if(template) {
        //find the caller element like <component-name>
        let callerElement: Element = template.querySelector(this.name);
        //resolve the listeners into the template like <component ng-click="functionName">
        callerElement.parentElement.replaceChild(this.template, callerElement);
        this.resolveListeners();
        this.resolveDependencies();
      } else {
        /*this option occur on root component the resolve dependencies is called
        before the render child nodes, so when the render is called
        all dependencies are rendered on vDom (template)s*/
        this.resolveListeners();
        this.resolveDependencies();
        this.renderChildNodes(document.querySelector(this.name))
      }

      return this.template;
    } catch (error) {
      console.error('virtualDom.render', error);
    }
  }

    /**
   * Function to render all child nodes of template into the html place
   * @param htmlPLace place where the template should be render
   */
  private renderChildNodes(htmlPLace:Element = null): void {
    try {
      if(!htmlPLace) {
        return;
      }

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
   * Function to render the component dependencies into the html
   */
  private resolveDependencies():Element {
    let componentInstance;
    let props: Object = {};
    let componentLocales: NodeListOf<Element>;
    let i: number = 0;

    this.components.forEach((dependency) => {
      //getting all component callers into template
      componentLocales = this.template.querySelectorAll(dependency.name);
      //looping the compnent locales
      i = componentLocales.length;
      while(i--) {
        props = this.resolveProps(componentLocales[i]);
        componentInstance = new dependency.component(props);
        componentInstance.render(this.template);
        //register the component instance
        this.componentsInstances.push({ name:dependency.name, instance: componentInstance});
      }
    });

    return this.template;
  }

  /**
   * This function convert the namedNodeMap to Object
   * @param component - the component with props
   */
  private resolveProps(component: Element) {
    try {
      let i:number = 0;
      let props:Object = {}
      let attributes:any = component.attributes
      i = attributes.length;
      while(i--) {
        props[attributes[i].name] = attributes[i].value
      }

      return props;
    } catch (error) {
      console.error('virtualDom.resolveProps', error);
    }
  }

  /**
   * function to set the current element to process
   * @param html html snippet to manipulate
   */
  protected setTemplate( html:string ): void {
    try {
      //create temp div
      let templateTemp: Element = document.createElement('div');
      //insert the html text into the temp div
      templateTemp.innerHTML = html;
      //getting all attributes of temp template
      let tempAttributes = templateTemp.firstElementChild.attributes;
      //create the current template
      this.template = document.createElement(templateTemp.firstElementChild.tagName);
      //setting the attributes of temp to vDom template
      let attributesI = tempAttributes.length;
      let attr;
      //clone all attributes from temp to vDom
      while(attributesI--) {
        attr = document.createAttribute(tempAttributes[attributesI].nodeName)
        attr.value = tempAttributes[attributesI].nodeValue;
        this.template.attributes.setNamedItem(attr);
      }
      //put all childs from temp to vDom
      let childrenElements: NodeListOf<Element>;

      //if is the root element the html should be insert into the div caller
      if(this.root) {
        childrenElements = templateTemp.children;

        let i: number = templateTemp.children.length;
        while(i--) {
          this.template.appendChild(childrenElements[i]);
        }
      } else {
        this.template.innerHTML = templateTemp.firstElementChild.innerHTML;
      }

    } catch (error) {
      console.error('virtualDom.setTemplate', error);
    }
  }

  /**
   * function to register component dependencies
   */
  protected registerComponent(component:Object): void {
    try {
      this.components.push(component);
    } catch (error) {
      console.error('virtualDom.getTemplate', error);
    }
  }

  /**
   * this function returns a instance list of a determinated component
   * @param component Name of component to search
   */
  protected getInstanceList(component: string = '') : Array<Object> {
    return this.componentsInstances.filter((instance)=>{
      if(instance['name'] === component) {
        return instance;
      }
    });
  }

  /**
   * method to return all componentes instances of component
   */
  public getComponentsInstances() : Array<Object> {
    try {
      return this.componentsInstances
    } catch (error) {
      console.error('virtualDom.getComponentsInstances', error);
    }
  }

  /**
   * this function resolve the listeners on the template like vd-click or vd-change
   */
  private resolveListeners(): void {
    try {
      let i: number = 0;
      //type of events
      let eventTypes : Array<string> = ['click', 'change', 'hover', 'mousedown', 'mouseout'];
      i = eventTypes.length;
      while(i--) {
        this.searchListenersCallers(eventTypes[i]);
      }
    } catch (error) {
      console.error('virtualDom.resolveListeners', error);
    }
  }

  /**
   * method to search all listeners callers into the template
   * @param listener type of listener to search
   */
  protected searchListenersCallers(listener: string) {
    let i: number = 0;
    //get all elements that contains the especific caller
    let elements: NodeListOf<Element> = this.template.querySelectorAll(`[vd-${listener}]`);
    i = elements.length;
    while(i--) {
      this.resolveListener(elements[i], listener)
    }
  }

  /**
   * function to define a listener to an element
   * @param listenerType type of listener to check and add
   * @param element element where the listerner will be insert
   */
  private resolveListener(element: Element, listenerType: string) {
    let functionListener: string;
    //getting function to listener name
    functionListener = element.getAttribute(`vd-${listenerType}`);
    //add event listener on element
    element.addEventListener(listenerType, this[functionListener]);
  }
}

export default VirtualDom;
