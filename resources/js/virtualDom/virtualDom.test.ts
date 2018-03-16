declare function require(name:string);
const browserEnv:any = require('browser-env')();
import { expect } from 'chai';
import 'mocha';

import VirtualDom from './virtualDom';

document.body.innerHTML = `<div id="root"></div>`;
/**
 * test class
 */
class TestComponent extends VirtualDom {
  constructor(props: Object) {
    super(true, props);
    this.name ='#root';
    this.setTemplate(`
      <h1 class="title">this is a test component!</h1>
    `);
  }
}

let _component:TestComponent = null;

/**
 * Instance the test component
 */
before(() => {
  _component = new TestComponent({});
});

/**
 * For each test render the component again
 */
beforeEach(() => {
  _component.render()
});


describe('Basic.VirtualDOm basic object', () => {
  it('should be a component test instance', () => {
    expect(_component instanceof TestComponent).to.equal(true);
  });

  it('the component`s name should be a string', () => {
    expect(_component.name).to.be.a('string');
  })

  it('should be a component name declarated', () => {
    expect(_component.name).to.be.equal('#root');
  })

  it('should be a component test name', () => {
    expect(_component.getComponentInstances().length).to.equal(0);
  });
});


describe('Basic.VirtualDOm render function', () => {
    it('should have a component title renderized as a string', () => {
      expect(document.querySelector('.title').innerHTML).to.be.a('string');
    });

    it('should have a component title as a declarated', () => {
      expect(document.querySelector('.title').innerHTML).to.be.equal('this is a test component!');
    });
});
