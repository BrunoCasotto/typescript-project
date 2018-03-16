declare function require(name:string);
require('browser-env')();
import { expect } from 'chai';
import 'mocha';
import VirtualDom from './virtualDom';

document.body.innerHTML = `<div id="root"></div>`;

/**
 * test sub class
 */
class TestSubComponent extends VirtualDom {
  constructor(props: Object) {
    super();
    this.name =  'sub-component';
    this.setTemplate(`
      <div>
        <h1 id="change-title-btn"class="sub-component__title">sub component</h1>
        <button id="change-title-btn" vd-click="changeMessage"> change message </div>
      </div>
    `);
  }


  /**
   * function to change the message
   */
  public changeMessage() {
    document.querySelector('.sub-component__title').innerHTML = 'new text!'
  }
}

/**
 * test class
 */
class TestComponent extends VirtualDom {
  constructor(props: Object) {
    super(true, props);
    this.name ='#root';
    this.registerComponent({name: 'sub-component', component: TestSubComponent });
    this.setTemplate(`
      <p class="message">old text!</p>

      <p class="message-hide hide">old text!</p>

      <p class="message-input"></p>

      <input v-change="inputText" id="input-text"></input>

      <button id="change-text-btn" vd-click="changeMessage">change message </button>

      <button id="change-text-btn-mousedown" vd-mousedown="changeMessage">change message </button>

      <div id="hide-text-hover" vd-hover="hideText"> hide text </div>

      <div id="hide-text-mouseout" vd-mouseout="showText"> show text </div>

      <sub-component></sub-component>
      <sub-component></sub-component>
      <sub-component></sub-component>
    `);
  }
  /**
   * function that get the text input and write on p element
   */
  public inputText() {
    document.querySelector('.message-input').innerHTML = 'changed'
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

    /**
   * function to show the message text
   */
  public showText() {
    document.querySelector('.message-hide').classList.remove('hide');
  }
}

let _component:TestComponent = null;
let _componentsInstances:Array<object> = [];
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

describe('MouseEvents.VirtualDom basic object', () => {
  it('should be a component test instance', () => {
    expect(_component instanceof TestComponent).to.equal(true);
  });

  it('the component changeMessage should be a function', () => {
    expect(typeof _component.changeMessage).to.be.equal('function');
  });
});

describe('MouseEvents.VirtualDom events test', () => {
  it('should have a component title as a declarated', () => {
    expect(document.querySelector('.message').innerHTML).to.be.equal('old text!');
  });

  it('When the click occur should be changed the text message', () => {
    let event:MouseEvent = new MouseEvent('click', {});
    let btn:Element = document.querySelector('#change-text-btn');
    btn.dispatchEvent(event);

    expect(document.querySelector('.message').innerHTML).to.be.equal('new text!');
  });

  it('When the mousedown occur should be changed the text message', () => {
    let event:MouseEvent = new MouseEvent('mousedown', {});
    let btn:Element = document.querySelector('#change-text-btn-mousedown');
    btn.dispatchEvent(event);

    expect(document.querySelector('.message').innerHTML).to.be.equal('new text!');
  });

  it('When the hover occur should be added a hide class in text element', () => {
    expect(document.querySelector('.message').classList.length).to.be.equal(1);

    let event:MouseEvent = new MouseEvent('hover', {});

    let elementHover:Element = document.querySelector('#hide-text-hover');
    elementHover.dispatchEvent(event);
    expect(document.querySelector('.message').classList.length).to.be.equal(2);
    expect(document.querySelector('.message').classList.item(1)).to.be.equal('hide');
  });

  it('When the mouseout occur should added a hide clas in text element', () => {
    expect(document.querySelector('.message-hide').classList.length).to.be.equal(2);

    let event:MouseEvent = new MouseEvent('mouseout', {});

    let elementMouseout:Element = document.querySelector('#hide-text-mouseout');
    elementMouseout.dispatchEvent(event);

    expect(document.querySelector('.message-hide').classList.length).to.be.equal(1);
    expect(document.querySelector('.message-hide').classList.item(0)).to.be.equal('message-hide');
  });
});

describe('MouseEvents.VirtualDom events on sub component', () => {
    it('should have three components instances', () => {
      expect(_component.getInstanceList('sub-component').length).to.be.equal(3);
    });

    it('the instances should be sub components instances', () => {
      let instances:Array<object> = _component.getInstanceList('sub-component');
      let i:number = _component.getInstanceList('sub-component').length;
      while(i--) {
        expect(instances[i]['instance'] instanceof TestSubComponent).to.be.equal(true);
      }
    });

    it('should be renderized the sub components content', () => {
      let componentsElements:NodeListOf<Element> = document.querySelectorAll('.sub-component__title');

      expect(componentsElements.length).to.be.equal(3);

      let i:number = componentsElements.length;
      while(i--) {
        expect(componentsElements[i].innerHTML).to.be.equal('sub component');
      }
    });

    // it('When the click occur should be changed the title message', () => {
    //   let event:MouseEvent = new MouseEvent('click', {});
    //   let btn:Element = document.querySelector('#change-title-btn');
    //   btn.dispatchEvent(event);

    //   expect(document.querySelector('.sub-component__title').innerHTML).to.be.equal('new text!');
    // });
})
