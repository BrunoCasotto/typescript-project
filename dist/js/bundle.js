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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var message_1 = __webpack_require__(4);
(function () {
    var messageVIrtual = new message_1["default"]('Bruno Casotto', 'Lorem ipsum dolor sit amet');
    var messagesDom = document.getElementById('messages');
    messageVIrtual.render(messagesDom);
})();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */,
/* 4 */
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
var virtualDom_1 = __webpack_require__(5);
/**
 * Class to create message element
 */
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message(author, message) {
        var _this = _super.call(this) || this;
        _super.prototype.setTemplate.call(_this, "\n      <article class=\"message\">\n        <div class=\"message-body\">\n          <p>From: <strong>" + author + "</strong></p>\n          " + message + "\n        </div>\n      </article>");
        return _this;
    }
    return Message;
}(virtualDom_1["default"]));
exports["default"] = Message;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * class to manipulation of DOM
 */
var VirtualDom = /** @class */ (function () {
    /**
     * function to create a virtual div
     */
    function VirtualDom() {
        this.template = document.createElement('div');
    }
    /**
     * function to render element into especific html locale
     * @param locale element where the template will be injected
     */
    VirtualDom.prototype.render = function (locale) {
        locale.appendChild(this.template);
    };
    /**
     * function to set the current element to process
     * @param html html snippet to manipulate
     */
    VirtualDom.prototype.setTemplate = function (html) {
        this.template.innerHTML = html;
    };
    /**
     * get the current html template
     */
    VirtualDom.prototype.getTemplate = function () {
        return this.template;
    };
    return VirtualDom;
}());
exports["default"] = VirtualDom;


/***/ })
/******/ ]);