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
     *
     * @param root true if is the first component
     */
    function VirtualDom(root) {
        if (root === void 0) { root = false; }
        //components dependencies
        this.components = [];
        this.root = root;
    }
    /**
     * function to render element into especific html locale
     * @param locale element where the template will be injected
     */
    VirtualDom.prototype.render = function (template) {
        if (template === void 0) { template = null; }
        try {
            if (template) {
                //find the caller element like <component-name>
                var callerElement = template.querySelector(this.name);
                //replace the caller element with component template
                callerElement.parentElement.replaceChild(this.template, callerElement);
                //resolve the component dependencies
                this.resolveDependencies();
            }
            else {
                /*this option occur on root component the resolve dependencies is called
                before the render child nodes, so when the render is called
                all dependencies are rendered on vDom (template)s*/
                //resolve the component dependencies
                this.resolveDependencies();
                //render the component into the selected place
                this.renderChildNodes(document.querySelector(this.name));
            }
            return template;
        }
        catch (error) {
            console.error('virtualDom.render', error);
        }
    };
    /**
   * Function to render all child nodes of template into the html place
   * @param htmlPLace place where the template should be render
   */
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
    /**
     * function to set the current element to process
     * @param html html snippet to manipulate
     */
    VirtualDom.prototype.setTemplate = function (html) {
        try {
            //create temp div
            var templateTemp = document.createElement('div');
            //insert the html text into the temp div
            templateTemp.innerHTML = html;
            //getting all attributes of temp template
            var tempAttributes = templateTemp.firstElementChild.attributes;
            //create the current template
            this.template = document.createElement(templateTemp.firstElementChild.tagName);
            //setting the attributes of temp to vDom template
            var attributesI = tempAttributes.length;
            var attr = void 0;
            //clone all attributes from temp to vDom
            while (attributesI--) {
                attr = document.createAttribute(tempAttributes[attributesI].nodeName);
                attr.value = tempAttributes[attributesI].nodeValue;
                this.template.attributes.setNamedItem(attr);
            }
            //put all childs from temp to vDom
            var childrenElements = void 0;
            //if is the root element the html should be insert into the div caller
            if (this.root) {
                childrenElements = templateTemp.children;
                var i = templateTemp.children.length;
                while (i--) {
                    this.template.appendChild(childrenElements[i]);
                }
            }
            else {
                this.template.innerHTML = templateTemp.firstElementChild.innerHTML;
            }
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
module.exports = __webpack_require__(5);


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
var calling_1 = __webpack_require__(4);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = 
        //passing root as true
        _super.call(this, true) || this;
        //setting the root place
        _this.name = '#chat';
        //register components
        _this.registerComponent({ name: 'message', component: message_1["default"] });
        _this.registerComponent({ name: 'calling', component: calling_1["default"] });
        //settings the html
        _this.setTemplate("\n      <div class=\"chat__content box\">\n        <div class=\"chat__content__messages\" id=\"messages\">\n          <message from=\"sent\" author=\"Bruno Casotto\" message=\"message\"></message>\n          <calling from=\"sent\"></calling>\n          <message author=\"Renata\" message=\"Mensagem maior que a ultima\"></message>\n          <calling></calling>          \n          <message author=\"Maria jose\" message=\"mensagem ainda maior que a ultima que era grande\"></message>\n        </div>\n        <div class=\"chat__content__form\">\n            <input class=\"input is-primary\" type=\"text\" placeholder=\"Type your message\">\n            <button class=\"button is-primary chat__content__form__button\">\n              Send\n            </button>\n        </div>\n      </div>\n    ");
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
var miniUser_1 = __webpack_require__(6);
/**
 * Class to create message element
 */
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    //constructor with components props
    function Message(props) {
        var _this = _super.call(this) || this;
        //define the component name  
        _this.name = 'message';
        //register component dependencie
        _this.registerComponent({ name: 'mini-user', component: miniUser_1["default"] });
        var classList = '';
        if (props['from'] && props['from'].value === 'sent') {
            classList = 'message--alignt-right is-primary';
        }
        //setting the template
        _this.setTemplate("\n      <article class=\"message " + classList + "\">\n        <mini-user></mini-user>\n        <div class=\"message-body\">\n          <p>From: <strong>" + props['author'].value + "</strong></p>\n          " + props['message'].value + "\n        </div>\n      </article>");
        return _this;
    }
    return Message;
}(virtualDom_1["default"]));
exports["default"] = Message;


/***/ }),
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
var virtualDom_1 = __webpack_require__(0);
/**
 * Class to create message element
 */
var Calling = /** @class */ (function (_super) {
    __extends(Calling, _super);
    //constructor with components props
    function Calling(props) {
        var _this = _super.call(this) || this;
        //setting the component call name
        _this.name = 'calling';
        //verify if props exist and manipulate the template
        var classList = '';
        if (props['from'] && props['from'].value === 'sent') {
            classList = 'message--alignt-right is-warning';
        }
        //setting the template
        _this.setTemplate("\n      <article class=\"message " + classList + "\">\n        <div class=\"message-body\">\n          Call all friends\n        </div>\n      </article>");
        return _this;
    }
    return Calling;
}(virtualDom_1["default"]));
exports["default"] = Calling;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
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
var MiniUser = /** @class */ (function (_super) {
    __extends(MiniUser, _super);
    //constructor with components props
    function MiniUser(props) {
        var _this = _super.call(this) || this;
        //define the component name
        _this.name = 'mini-user';
        //setting the template
        _this.setTemplate("\n      <p>mini-user</p>  \n    ");
        return _this;
    }
    return MiniUser;
}(virtualDom_1["default"]));
exports["default"] = MiniUser;


/***/ })
/******/ ]);