/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * class to manipulation of the DOM
 */
var VirtualDom = /** @class */ (function () {
    /**
     * constructor of virtualDom
     * @param template param that define template or not
     */
    function VirtualDom(template) {
        if (template === void 0) { template = null; }
        //components dependencies
        this.components = [];
        if (template) {
            this.vdom = template;
        }
    }
    /**
     * function to render element into especific html locale
     * @param locale element where the template will be injected
     */
    VirtualDom.prototype.render = function (template) {
        if (template === void 0) { template = null; }
        try {
            if (template) {
                template.querySelector(this.name).parentNode;
                this.renderChildNodes(template.querySelector(this.name).parentElement);
                template.querySelector(this.name).remove();
            }
            else {
                this.resolveDependencies();
                this.renderChildNodes(document.querySelector(this.name));
            }
            return template;
        }
        catch (error) {
            console.error('virtualDom.render', error);
        }
    };
    VirtualDom.prototype.resolveDependencies = function () {
        var _this = this;
        var componentInstance;
        var props = {};
        var componentLocales;
        var i = 0;
        this.components.forEach(function (dependency) {
            //getting all component callers into template
            componentLocales = _this.template.querySelectorAll(dependency.name);
            //looping the compnent locales
            i = componentLocales.length;
            while (i--) {
                props = componentLocales[i].attributes;
                componentInstance = new dependency.component(props);
                componentInstance.render(_this.template);
            }
        });
        return this.template;
    };
    VirtualDom.prototype.renderChildNodes = function (htmlPLace) {
        try {
            //getting all child nodes
            var index = this.template.childNodes.length;
            var childNode = void 0;
            //insert all child nodes on parent node of component
            while (index--) {
                childNode = this.template.childNodes[index];
                if (typeof childNode === 'object') {
                    htmlPLace.appendChild(childNode);
                }
            }
        }
        catch (error) {
            console.error('virtualDom.render', error);
        }
    };
    /**
     * function to set the current element to process
     * @param html html snippet to manipulate
     */
    VirtualDom.prototype.setTemplate = function (html) {
        try {
            this.template = document.createElement('div');
            this.template.innerHTML = html;
        }
        catch (error) {
            console.error('virtualDom.setTemplate', error);
        }
    };
    /**
     * function to register component dependencies
     */
    VirtualDom.prototype.registerComponent = function (component) {
        try {
            this.components.push(component);
        }
        catch (error) {
            console.error('virtualDom.getTemplate', error);
        }
    };
    return VirtualDom;
}());
exports["default"] = VirtualDom;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(4);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var virtualDom_1 = __webpack_require__(0);
var message_1 = __webpack_require__(3);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = 
        //passing root as true
        _super.call(this) || this;
        //setting the root place
        _this.name = '#chat';
        //register components
        _this.registerComponent({
            name: 'message',
            component: message_1["default"]
        });
        //settings the html
        _this.setTemplate("\n      <div class=\"chat__content box\">\n        <div class=\"chat__content__messages\" id=\"messages\">\n          <article class=\"message\">\n            <div class=\"message-body\">\n              <p>From: <strong>Bruno Casotto</strong></p>\n              Lorem ipsum dolor sit amet\n            </div>\n          </article>\n\n          <article class=\"message message--alignt-right is-primary\">\n            <div class=\"message-body\">\n              <p>From: <strong>Bruno Casotto</strong></p>\n              Lorem ipsum dolor sit amet\n            </div>\n          </article>\n\n          <message author=\"Bruno Casotto\" message=\"message\"></message>\n          <message author=\"Renata\" message=\"Mensagem maior que a ultima\"></message>\n          <message author=\"Maria jose\" message=\"mensagem ainda maior que a ultima que era grande\"></message>\n        </div>\n        <div class=\"chat__content__form\">\n            <input class=\"input is-primary\" type=\"text\" placeholder=\"Type your message\">\n            <button class=\"button is-primary chat__content__form__button\">\n              Send\n            </button>\n        </div>\n      </div>\n    ");
        //initial render
        _super.prototype.render.call(_this);
        return _this;
    }
    return App;
}(virtualDom_1["default"]));
exports["default"] = new App();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var virtualDom_1 = __webpack_require__(0);
/**
 * Class to create message element
 */
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    //constructor with components props
    function Message(props) {
        var _this = _super.call(this) || this;
        //setting the component call name
        _this.name = 'message';
        //setting the template
        _this.setTemplate("\n      <article class=\"message\">\n        <div class=\"message-body\">\n          <p>From: <strong>" + props['author'].value + "</strong></p>\n          " + props['message'].value + "\n        </div>\n      </article>");
        return _this;
    }
    return Message;
}(virtualDom_1["default"]));
exports["default"] = Message;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);