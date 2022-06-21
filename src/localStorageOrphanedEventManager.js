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
exports.LocalStorageOrphanedEventManager = void 0;
var inversify_1 = require("inversify");
var interfaceSymbols_1 = require("./interfaceSymbols");
;
var LocalStorageOrphanedEventManager = /** @class */ (function () {
    /**
     *
     */
    function LocalStorageOrphanedEventManager(_localStorage) {
        this._localStorage = _localStorage;
        this._orphanedEvents = {
        // IOrphanedEventContainer will be keyed off a conversationId property
        };
    }
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.clearAll = function () {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            _this._orphanedEvents = {};
            return _this._localStorage.setObject("orphanedEvents", _this._orphanedEvents);
        });
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.clear = function (conversationId) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            _this._orphanedEvents[conversationId] = {
                orphanedEvents: []
            };
            return _this._localStorage.setObject("orphanedEvents", _this._orphanedEvents);
        });
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.getContinuationToken = function (conversationId) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            var container = _this._orphanedEvents[conversationId];
            return Promise.resolve(container ? container.continuationToken : null);
        });
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.setContinuationToken = function (conversationId, continuationToken) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            var _info = _this._orphanedEvents[conversationId];
            if (_info) {
                _info.continuationToken = continuationToken;
            }
            else {
                _this._orphanedEvents[conversationId] = {
                    continuationToken: continuationToken,
                    orphanedEvents: []
                };
            }
            return Promise.resolve(true);
        });
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.addOrphanedEvent = function (event) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            var info = _this._orphanedEvents[event.conversationId];
            if (info) {
                // check for dupe 
                var found = info.orphanedEvents.filter(function (e) { return e.eventId === event.eventId; });
                if (found.length === 0) {
                    // insert
                    info.orphanedEvents.unshift(event);
                    // sort
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
                    // save
                    return _this._localStorage.setObject("orphanedEvents", _this._orphanedEvents);
                }
                else {
                    return Promise.resolve(false);
                }
            }
            else {
                return Promise.resolve(false);
            }
        });
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.removeOrphanedEvent = function (event) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            var info = _this._orphanedEvents[event.conversationId];
            if (info) {
                for (var i = info.orphanedEvents.length - 1; i >= 0; i--) {
                    var e = info.orphanedEvents[i];
                    if (e.eventId === event.eventId) {
                        info.orphanedEvents.splice(i, 1);
                        break;
                    }
                }
                // save
                return _this._localStorage.setObject("orphanedEvents", _this._orphanedEvents);
            }
            else {
                return Promise.reject({ message: "No container for conversation " + event.conversationId });
            }
        });
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.getOrphanedEvents = function (conversationId) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            var info = _this._orphanedEvents[conversationId];
            return Promise.resolve(info ? info.orphanedEvents : []);
        });
    };
    LocalStorageOrphanedEventManager.prototype.ensureInitialised = function () {
        if (!this._initialised) {
            // this is a promise instance to ensure it's only called once
            this._initialised = this.initialise();
        }
        return this._initialised;
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.initialise = function () {
        var _this = this;
        return this._localStorage.getObject("orphanedEvents")
            .then(function (result) {
            _this._orphanedEvents = result || {};
            return true;
        });
    };
    LocalStorageOrphanedEventManager = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
        __metadata("design:paramtypes", [Object])
    ], LocalStorageOrphanedEventManager);
    return LocalStorageOrphanedEventManager;
}());
exports.LocalStorageOrphanedEventManager = LocalStorageOrphanedEventManager;
//# sourceMappingURL=localStorageOrphanedEventManager.js.map