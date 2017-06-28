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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var interfaceSymbols_1 = require("./interfaceSymbols");
;
var LocalStorageOrphanedEventManager = (function () {
    function LocalStorageOrphanedEventManager(_localStorage) {
        this._localStorage = _localStorage;
        this._orphanedEevnts = {};
        this._orphanedEevnts = this._localStorage.getObject("orphanedEevnts") || {};
    }
    LocalStorageOrphanedEventManager.prototype.clearAll = function () {
        this._orphanedEevnts = {};
        this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
        return Promise.resolve(true);
    };
    LocalStorageOrphanedEventManager.prototype.clear = function (conversationId) {
        this._orphanedEevnts[conversationId] = {
            orphanedEvents: []
        };
        this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
        return Promise.resolve(true);
    };
    LocalStorageOrphanedEventManager.prototype.getContinuationToken = function (conversationId) {
        var container = this._orphanedEevnts[conversationId];
        return Promise.resolve(container ? container.continuationToken : null);
    };
    LocalStorageOrphanedEventManager.prototype.setContinuationToken = function (conversationId, continuationToken) {
        var _info = this._orphanedEevnts[conversationId];
        if (_info) {
            _info.continuationToken = continuationToken;
        }
        else {
            this._orphanedEevnts[conversationId] = {
                continuationToken: continuationToken,
                orphanedEvents: []
            };
        }
        return Promise.resolve(true);
    };
    LocalStorageOrphanedEventManager.prototype.addOrphanedEvent = function (event) {
        var info = this._orphanedEevnts[event.conversationId];
        if (info) {
            var found = info.orphanedEvents.filter(function (e) { return e.eventId === event.eventId; });
            if (found.length === 0) {
                info.orphanedEvents.unshift(event);
                info.orphanedEvents = info.orphanedEvents.sort(function (e1, e2) {
                    if (e1.conversationEventId > e2.conversationEventId) {
                        return 1;
                    }
                    else if (e1.conversationEventId < e2.conversationEventId) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                });
                this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
            }
        }
        else {
            return Promise.reject({ message: "No container for conversation " + event.conversationId });
        }
    };
    LocalStorageOrphanedEventManager.prototype.removeOrphanedEvent = function (event) {
        var info = this._orphanedEevnts[event.conversationId];
        if (info) {
            for (var i = info.orphanedEvents.length - 1; i >= 0; i--) {
                var e = info.orphanedEvents[i];
                if (e.eventId === event.eventId) {
                    info.orphanedEvents.splice(i, 1);
                    break;
                }
            }
            this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
            return Promise.resolve(true);
        }
        else {
            return Promise.reject({ message: "No container for conversation " + event.conversationId });
        }
    };
    LocalStorageOrphanedEventManager.prototype.getOrphanedEvents = function (conversationId) {
        var info = this._orphanedEevnts[conversationId];
        return Promise.resolve(info ? info.orphanedEvents : []);
    };
    return LocalStorageOrphanedEventManager;
}());
LocalStorageOrphanedEventManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
    __metadata("design:paramtypes", [Object])
], LocalStorageOrphanedEventManager);
exports.LocalStorageOrphanedEventManager = LocalStorageOrphanedEventManager;
//# sourceMappingURL=localStorageOrphanedEventManager.js.map