declare function require(name:string);
require('browser-env')();
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

      <div id="hide-text-hover" vd-hover="hideText">
        hide text
      </div>
    `);
  }

  /**
   * function to change the message
   */
  public changeMessage() {
    document.querySelector('.message').innerHTML = 'new text!'
  }

  /**
   * function to hide the message text
   */
  public hideText() {
    document.querySelector('.message').classList.add('hide');
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

  it('When the hover occur should be changed added a hide clas in text element', () => {
    expect(document.querySelector('.message').classList.length).to.be.equal(1);

    let event:MouseEvent = new MouseEvent('hover', {});

    let elementHover:Element = document.querySelector('#hide-text-hover');
    elementHover.dispatchEvent(event);
    expect(document.querySelector('.message').classList.length).to.be.equal(2);
    expect(document.querySelector('.message').classList.item(1)).to.be.equal('hide');
  });
});
