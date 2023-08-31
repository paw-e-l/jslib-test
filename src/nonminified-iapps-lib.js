(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ApplicationEvents"] = factory();
	else
		root["ApplicationEvents"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

;// CONCATENATED MODULE: ./src/dispatcher.js
/**
 * Passes incoming communication to attached callbacks
 */
/* harmony default export */ const dispatcher = (class {
    constructor() {
        this.callbacks = [];
    }

    addTarget(callback) {
        this.callbacks.push(callback);
    }

    dispatch(event) {
        this.callbacks.forEach(callback => {
            callback(event);
        });
    }
});

;// CONCATENATED MODULE: ./src/event.js
/* harmony default export */ const src_event = (class {
    constructor(name, data) {
        this.name = name;
        this.data = data;
    }

    serialize() {
        return JSON.stringify({
            name: this.name,
            data: this.data
        });
    }
});

;// CONCATENATED MODULE: ./src/communication.js


class Communication {
    constructor(options) {
        this.options = options;
        this.dispatcher.addTarget(this.handleEvent.bind(this));
    }

    handleEvent(event) {
        if (!event || !event.name) {
            throw new TypeError("Incorrent event object");
        }

        const callback = this.getEventCallback();
        if (callback) {
            callback(event.name, event.data);
        }
    }

    getEventCallback() {
        if (!this.options.onIncomingEvent) {
            // no incoming events handler
            return false;
        }

        if (typeof this.options.onIncomingEvent !== "function") {
            throw new TypeError("onIncomingEvent is not a function");
        }

        return this.options.onIncomingEvent;
    }

    _sendEventObject(event) {
        if (!(event instanceof src_event)) {
            throw new TypeError("Incorrect event parameter");
        }
        
        let appInterface;
        if (window.webkit && window.webkit.messageHandlers) {
            const messageHandlers = window.webkit.messageHandlers;
            if (messageHandlers.appInterafce) { // handling typo in interface name
                appInterface = messageHandlers.appInterafce;
                console.warn('[deprecation] App passes interface with a typo: appInterafce. Please change to appInterface.');
            } else {
                appInterface = messageHandlers.appInterface;
            }
        } else {
            appInterface = window.appInterface
        }
        
        if (!appInterface || !appInterface.postMessage) {
            throw new ReferenceError("Communication interface is missing. Unable to send event to the application.");
        }

        return appInterface.postMessage(event.serialize());
    }

    sendEvent(name, data) {
        return this._sendEventObject(new src_event(name, data));
    }
}

/* harmony default export */ const communication = (Communication);

;// CONCATENATED MODULE: ./src/index.js



window.webInterface = communication.prototype.dispatcher = new dispatcher();
communication.VERSION = '0.0.7_2023-08-31T10:44:27+0000';

/* harmony default export */ const src = (communication);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});