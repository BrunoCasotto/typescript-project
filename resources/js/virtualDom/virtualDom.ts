/**
 * class to manipulation of DOM
 */
class VirtualDom {
  private template: Element;

  /**
   * function to create a virtual div
   */
  constructor() {
    this.template = document.createElement('div');
  }

  /**
   * function to render element into especific html locale
   * @param locale element where the template will be injected
   */
  public render(locale:Element):void {
    locale.appendChild(this.template);
  }

  /**
   * function to set the current element to process
   * @param html html snippet to manipulate
   */
  public setTemplate( html:string ): void {
    this.template.innerHTML = html;
  }

  /**
   * get the current html template
   */
  public getTemplate(): Element {
    return this.template;
  }
}

export default VirtualDom;