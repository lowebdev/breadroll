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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Breadroll\", function() { return Breadroll; });\nvar Breadroll = /** @class */ (function () {\n    function Breadroll(interval) {\n        var _this = this;\n        // private static _instance: Breadroll\n        this.state = {\n            isTicking: false,\n            scrollDirection: 0,\n            lastScrollPos: 0,\n            isRunningScrollListeners: false\n        };\n        this.onScrollListeners = {};\n        this.scrollY = 0;\n        this.triggerOnScrollListeners = this.throttle(function (e) {\n            if (!this.state.isRunningScrollListeners) {\n                this.state.isRunningScrollListeners = true;\n                console.log('running listeners');\n                for (var key in this.onScrollListeners) {\n                    this.onScrollListeners[key](e);\n                }\n                this.state.isRunningScrollListeners = false;\n            }\n        }, this.interval);\n        this.interval = interval !== null && interval !== void 0 ? interval : 50;\n        // From MDN https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event\n        window.addEventListener('scroll', function (ev) {\n            if (!_this.state.isTicking) {\n                window.requestAnimationFrame(function () {\n                    _this.scrollDirection = window.scrollY - scrollY;\n                    _this.scrollY = window.scrollY;\n                    _this.triggerOnScrollListeners();\n                    // executeEnterViewportActions()\n                    _this.state.isTicking = false;\n                });\n                _this.state.isTicking = true;\n            }\n        });\n    }\n    // TODO: put in core utils\n    // Returns a function, that, as long as it continues to be invoked, will not\n    // be triggered. The function will be called after it stops being called for\n    // N milliseconds. If `immediate` is passed, trigger the function on the\n    // leading edge, instead of the trailing.\n    Breadroll.prototype.debounce = function (func, wait, immediate) {\n        if (immediate === void 0) { immediate = false; }\n        var timeout;\n        return function () {\n            var context = this;\n            var args = arguments;\n            var later = function () {\n                timeout = null;\n                if (!immediate) {\n                    func.apply(context, args);\n                }\n            };\n            var callNow = immediate && !timeout;\n            clearTimeout(timeout);\n            timeout = setTimeout(later, wait);\n            if (callNow) {\n                func.apply(context, args);\n            }\n        };\n    };\n    // TODO: put in core utils\n    // Returns a function, that will be invoked at a certain rate at most.\n    // If the function was executed before the timeout limit (in milliseconds),\n    // it will not be invoked.\n    Breadroll.prototype.throttle = function (func, limit) {\n        var wait = false;\n        return function () {\n            var context = this;\n            var args = arguments;\n            if (!wait) {\n                func.apply(context, args);\n                wait = true;\n                setTimeout(function () {\n                    wait = false;\n                }, limit);\n            }\n        };\n    };\n    Breadroll.prototype.addScrollListener = function (identifier, func) {\n        if (typeof func !== 'function' || typeof identifier !== 'string') {\n            return;\n        }\n        this.onScrollListeners[identifier] = func;\n        console.log(this.onScrollListeners);\n    };\n    return Breadroll;\n}());\n\n\n\n//# sourceURL=webpack://Breadroll/./src/index.ts?");

/***/ })

/******/ })["Breadroll"];