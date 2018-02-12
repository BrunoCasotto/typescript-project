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
 * class to manipulation of DOM
 */
var VirtualDom = /** @class */ (function () {
    function VirtualDom() {
        //components dependencies
        this.components = [];
    }
    /**
     * function to render element into especific html locale
     * @param locale element where the template will be injected
     */
    VirtualDom.prototype.render = function () {
        try {
            var places = void 0;
            places = document.querySelectorAll(this.name);
            var i = places.length;
            while (i--) {
                //render the child nodes on the selected place
                this.renderChildNodes(places[i]);
            }
            //initialize the components dependencies
            this.initDependencies();
        }
        catch (error) {
            console.error('virtualDom.render', error);
        }
    };
    VirtualDom.prototype.renderChildNodes = function (htmlPLace) {
        try {
            //creating the html basead on name component
            this.htmlPlace = htmlPLace;
            //getting all child nodes
            var index = this.template.childNodes.length;
            var childNode = void 0;
            while (index--) {
                childNode = this.template.childNodes[index];
                if (typeof childNode === 'object') {
                    this.htmlPlace.appendChild(childNode);
                }
            }
        }
        catch (error) {
            console.error('virtualDom.render', error);
        }
    };
    /**
     * function to initialize components
     */
    VirtualDom.prototype.initDependencies = function () {
        try {
            var componentInstance_1;
            this.components.forEach(function (component) {
                componentInstance_1 = new component();
                componentInstance_1.render();
            });
        }
        catch (error) {
            console.error('virtualDom.initDependencies', error);
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
     * get the current html template
     */
    VirtualDom.prototype.getTemplate = function () {
        try {
            return this.template;
        }
        catch (error) {
            console.error('virtualDom.getTemplate', error);
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
var message_1 = __webpack_require__(5);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        //setting the root place
        _this.name = '#chat';
        //register components
        _this.registerComponent(message_1["default"]);
        //settings the html
        _this.setTemplate("\n    <div class=\"chat__content box\">\n      <div class=\"chat__content__messages\" id=\"messages\">\n        <article class=\"message\">\n          <div class=\"message-body\">\n            <p>From: <strong>Bruno Casotto</strong></p>\n            Lorem ipsum dolor sit amet\n          </div>\n        </article>\n\n        <article class=\"message message--alignt-right is-primary\">\n          <div class=\"message-body\">\n            <p>From: <strong>Bruno Casotto</strong></p>\n            Lorem ipsum dolor sit amet\n          </div>\n        </article>\n\n        <message author=\"Bruno Casotto\" message=\"message\"></message>\n      </div>\n      <div class=\"chat__content__form\">\n          <input class=\"input is-primary\" type=\"text\" placeholder=\"Type your message\">\n          <button class=\"button is-primary chat__content__form__button\">\n            Send\n          </button>\n      </div>\n    </div>\n    ");
        //initial render
        _super.prototype.render.call(_this);
        return _this;
    }
    return App;
}(virtualDom_1["default"]));
exports["default"] = new App();


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
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
        _this.setTemplate("\n      <article class=\"message\">\n        <div class=\"message-body\">\n          <p>From: <strong>" + props['author'] + "</strong></p>\n          " + props['message'] + "\n        </div>\n      </article>");
        return _this;
    }
    return Message;
}(virtualDom_1["default"]));
exports["default"] = Message;


/***/ })
/******/ ]);