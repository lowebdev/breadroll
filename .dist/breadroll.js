var Breadroll =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Breadroll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Breadroll\", function() { return Breadroll; });\nvar Breadroll = /** @class */ (function () {\n    function Breadroll(interval) {\n        var _this = this;\n        // private static _instance: Breadroll\n        this.state = {\n            isTicking: false,\n            scrollDirection: 0,\n            lastScrollPos: 0,\n            isRunningScrollListeners: false\n        };\n        this.ON_ENTER_VIEWPORT_EVENT_NAME = 'enterviewport';\n        this.onEnterViewportEvent = new CustomEvent(this.ON_ENTER_VIEWPORT_EVENT_NAME);\n        this.onEnterViewportListeners = {};\n        this.onScrollListeners = {};\n        this.scrollY = 0;\n        this.triggerOnScrollListeners = this.throttle(function (e) {\n            if (!this.state.isRunningScrollListeners) {\n                this.state.isRunningScrollListeners = true;\n                console.log('running listeners');\n                for (var key in this.onScrollListeners) {\n                    this.onScrollListeners[key](e);\n                }\n                this.state.isRunningScrollListeners = false;\n            }\n        }, this.interval);\n        // Need to check performances vs class obj\n        this.emitEnterViewportEvent = this.throttle(function () {\n            var nextKey = +Object.keys(this.onEnterViewportListeners).find(function (enterViewportKey) {\n                return (window.innerHeight * 0.75) + window.scrollY - +enterViewportKey > 0;\n            });\n            if (!nextKey) {\n                return;\n            }\n            var nextEnterViewportListeners = this.onEnterViewportListeners[nextKey];\n            for (var i = 0; i < nextEnterViewportListeners.length; i++) {\n                nextEnterViewportListeners[i].dispatchEvent(this.onEnterViewportEvent);\n            }\n            delete this.onEnterViewportListeners[nextKey];\n        }, this.interval);\n        this.interval = interval !== null && interval !== void 0 ? interval : 50;\n        // From MDN https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event\n        window.addEventListener('scroll', function (ev) {\n            if (!_this.state.isTicking) {\n                window.requestAnimationFrame(function () {\n                    _this.scrollDirection = window.scrollY - scrollY;\n                    _this.scrollY = window.scrollY;\n                    _this.triggerOnScrollListeners();\n                    _this.emitEnterViewportEvent();\n                    _this.state.isTicking = false;\n                });\n                _this.state.isTicking = true;\n            }\n        });\n    }\n    // TODO: put in core utils\n    // Returns a function, that, as long as it continues to be invoked, will not\n    // be triggered. The function will be called after it stops being called for\n    // N milliseconds. If `immediate` is passed, trigger the function on the\n    // leading edge, instead of the trailing.\n    Breadroll.prototype.debounce = function (func, wait, immediate) {\n        if (immediate === void 0) { immediate = false; }\n        var timeout;\n        return function () {\n            var context = this;\n            var args = arguments;\n            var later = function () {\n                timeout = null;\n                if (!immediate) {\n                    func.apply(context, args);\n                }\n            };\n            var callNow = immediate && !timeout;\n            clearTimeout(timeout);\n            timeout = setTimeout(later, wait);\n            if (callNow) {\n                func.apply(context, args);\n            }\n        };\n    };\n    // TODO: put in core utils\n    // Returns a function, that will be invoked at a certain rate at most.\n    // If the function was executed before the timeout limit (in milliseconds),\n    // it will not be invoked.\n    Breadroll.prototype.throttle = function (func, limit) {\n        var wait = false;\n        return function () {\n            var context = this;\n            var args = arguments;\n            if (!wait) {\n                func.apply(context, args);\n                wait = true;\n                setTimeout(function () {\n                    wait = false;\n                }, limit);\n            }\n        };\n    };\n    Breadroll.prototype.addScrollListener = function (identifier, func) {\n        if (typeof func !== 'function' || typeof identifier !== 'string') {\n            return;\n        }\n        this.onScrollListeners[identifier] = func;\n        console.log(this.onScrollListeners);\n    };\n    // When the element enters bottom quarter of the viewport, add style\n    Breadroll.prototype.addStyleOnEnterViewport = function (el, styleObj, baseTransitionDelayMS) {\n        var _this = this;\n        if (baseTransitionDelayMS === void 0) { baseTransitionDelayMS = 50; }\n        var enterActionAt = el.getBoundingClientRect().top;\n        var enterViewportAction = function () {\n            for (var propName in styleObj) {\n                el.style.setProperty(propName, styleObj[propName]);\n            }\n            el.removeEventListener(_this.ON_ENTER_VIEWPORT_EVENT_NAME, enterViewportAction);\n        };\n        // Handle with custom event listeners!\n        if (el.getBoundingClientRect().top < window.innerHeight) {\n            enterViewportAction();\n            return;\n        }\n        if (this.onEnterViewportListeners[enterActionAt]) {\n            this.onEnterViewportListeners[enterActionAt].push(el);\n            el.style.transitionDelay = (this.onEnterViewportListeners[enterActionAt].length - 1) * baseTransitionDelayMS + \"ms\";\n        }\n        else {\n            this.onEnterViewportListeners[enterActionAt] = [el];\n        }\n        el.addEventListener(this.ON_ENTER_VIEWPORT_EVENT_NAME, enterViewportAction);\n    };\n    // Need to check performances vs class obj\n    Breadroll.prototype.styleOnImageLoaded = function (styleObj) {\n        var imgs = document.querySelectorAll('img');\n        var onLoad = function (img) {\n            for (var key in styleObj) {\n                img.style.setProperty(key, styleObj[key]);\n            }\n        };\n        var _loop_1 = function (i) {\n            var img = imgs[i];\n            if (img.complete) {\n                onLoad(img);\n            }\n            else {\n                img.addEventListener('load', function () {\n                    onLoad(img);\n                });\n            }\n        };\n        for (var i = 0; i < imgs.length; i++) {\n            _loop_1(i);\n        }\n    };\n    return Breadroll;\n}());\n\n\n\n//# sourceURL=webpack://Breadroll/./src/index.ts?");

/***/ })

/******/ })["Breadroll"];