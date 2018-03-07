declare function require(name:string);
const browserEnv:any = require('browser-env')();
import { expect } from 'chai';
import 'mocha';

import VirtualDom from './virtualDom';

//mock a dom
document.body.innerHTML = `<div id="root"></div>`;

//create a component to test
class TestComponent extends VirtualDom {
  constructor(props: Object) {
    super(true, props);
    this.name ='#root';
    this.setTemplate(`
      <h1 class="title">this is a test component!</h1>
    `);
  }
}

//instance of component
let _component = new TestComponent({});
let _template:Element = _component.render();

describe('Component basic object', () => {
  it('should be a component test instance', () => {
    expect(_component instanceof TestComponent).to.equal(true);
  });

  it('should be a component name declarated', () => {
    expect(_component.name).to.be.a('string');
  })

  it('should be a component test name', () => {
    expect(_component.getComponentsInstances().length).to.equal(0);
  });
});