"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var EventManager = (function () {
    /**
     * EventManager class constructor.
     * @class EventManager
     * @ignore
     * @classdesc Class that implements all local event management.
     */
    function EventManager() {
        this.eventSubscribers = [];
    }
    /**
     * Subscribes the caller to a local event type.
     * @method EventManager#subscribeToLocalEvent
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} handler - The callback
     */
    EventManager.prototype.subscribeToLocalEvent = function (eventType, handler) {
        this.eventSubscribers.push({
            eventType: eventType,
            handler: handler,
        });
    };
    /**
     * Checks for an event subscriptionfor a local event type.
     * @method EventManager#isSubscribedToLocalEvent
     * @param {string} eventType - The type of event to check
     */
    EventManager.prototype.isSubscribedToLocalEvent = function (eventType) {
        var isSubscribed = false;
        for (var _i = 0, _a = this.eventSubscribers; _i < _a.length; _i++) {
            var subscriber = _a[_i];
            if (subscriber.eventType === eventType) {
                isSubscribed = true;
                break;
            }
        }
        return isSubscribed;
    };
    /**
     * Removes a subscription for a local event type.
     * @method EventManager#unsubscribeFromLocalEvent
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} [handler] - The callback (optional - if not specified, all associated callbacks will be unregistered)
     */
    EventManager.prototype.unsubscribeFromLocalEvent = function (eventType, handler) {
        for (var i = this.eventSubscribers.length - 1; i >= 0; i--) {
            var subscriber = this.eventSubscribers[i];
            if (handler) {
                // looking for a single handler                
                if (subscriber.handler === handler && subscriber.eventType === eventType) {
                    this.eventSubscribers.splice(i, 1);
                    break;
                }
            }
            else {
                // remove ANY subscribing to `eventType`
                if (subscriber.eventType === eventType) {
                    this.eventSubscribers.splice(i, 1);
                }
            }
        }
    };
    /**
     * Publishes a LocalEvent.
     * @method EventManager#publishLocalEvent
     * @param {string} eventType - The type of event to publish
     * @param {Object} data - The data associated with the event
     */
    EventManager.prototype.publishLocalEvent = function (eventType, data) {
        var _this = this;
        setTimeout(function () {
            for (var _i = 0, _a = _this.eventSubscribers; _i < _a.length; _i++) {
                var subscriber = _a[_i];
                if (subscriber.eventType === eventType) {
                    // call the handler
                    // TODO: configurably wrap this ...
                    // try {
                    subscriber.handler(data);
                    // } catch (e) {
                    //    console.error("caught exception publishing event: " + e);
                    // }
                }
            }
        });
    };
    return EventManager;
}());
EventManager = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], EventManager);
exports.EventManager = EventManager;
//# sourceMappingURL=eventManager.js.map