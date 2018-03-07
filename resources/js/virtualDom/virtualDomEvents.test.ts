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
      <p class="message">old text!</p>
      <button id="change-text-btn" vd-click="changeMessage">change message </button>
    `);
  }

  public changeMessage() {
    document.querySelector('.message').innerHTML = 'new text!'
  }
}

let _component:TestComponent = null;

/**
 * Instance the test component
 */
before(() => {
  _component = new TestComponent({});
  _component.render()
});


describe('Events.VirtualDom basic object', () => {
  it('should be a component test instance', () => {
    expect(_component instanceof TestComponent).to.equal(true);
  });

  it('the component changeMessage should be a function', () => {
    expect(typeof _component.changeMessage).to.be.equal('function');
  });
});

describe('Events.VirtualDom events test', () => {
  it('should have a component title as a declarated', () => {
    expect(document.querySelector('.message').innerHTML).to.be.equal('old text!');
  });

  it('When the click occur should be changed the text message', () => {
    let event:MouseEvent = new MouseEvent('click', {});
    let btn:Element = document.querySelector('#change-text-btn');
    btn.dispatchEvent(event);

    expect(document.querySelector('.message').innerHTML).to.be.equal('new text!');
  });
});
