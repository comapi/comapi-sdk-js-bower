"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_js_foundation_1 = require("@comapi/sdk-js-foundation");
exports.InterfaceContainer = sdk_js_foundation_1.InterfaceContainer;
exports.INTERFACE_SYMBOLS = sdk_js_foundation_1.INTERFACE_SYMBOLS;
exports.Utils = sdk_js_foundation_1.Utils;
exports.MessageBuilder = sdk_js_foundation_1.MessageBuilder;
var sessionService_1 = require("./sessionService");
var messagingService_1 = require("./messagingService");
var chatConfig_1 = require("./chatConfig");
exports.ComapiChatConfig = chatConfig_1.ComapiChatConfig;
var memoryStore_1 = require("./memoryStore");
exports.MemoryConversationStore = memoryStore_1.MemoryConversationStore;
var dbStore_1 = require("./dbStore");
exports.IndexedDBConversationStore = dbStore_1.IndexedDBConversationStore;
var ComapiChatClient = (function () {
    function ComapiChatClient() {
        console.log("Constructing a ComapiChatClient");
    }
    Object.defineProperty(ComapiChatClient.prototype, "session", {
        get: function () {
            if (this._foundation) {
                return this._sessionService;
            }
            else {
                throw new Error("Not initialised");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComapiChatClient.prototype, "profile", {
        get: function () {
            if (this._foundation) {
                return this._foundation.services.profile;
            }
            else {
                throw new Error("Not initialised");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComapiChatClient.prototype, "messaging", {
        get: function () {
            if (this._foundation) {
                return this._messagingService;
            }
            else {
                throw new Error("Not initialised");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComapiChatClient.prototype, "device", {
        get: function () {
            if (this._foundation) {
                return this._foundation.device;
            }
            else {
                throw new Error("Not initialised");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComapiChatClient.prototype, "channels", {
        get: function () {
            if (this._foundation) {
                return this._foundation.channels;
            }
            else {
                throw new Error("Not initialised");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComapiChatClient.prototype, "foundation", {
        get: function () {
            if (this._foundation) {
                return this._foundation;
            }
            else {
                throw new Error("Not initialised");
            }
        },
        enumerable: true,
        configurable: true
    });
    ComapiChatClient.prototype.initialise = function (comapiChatConfig) {
        var _this = this;
        return sdk_js_foundation_1.Foundation.initialise(comapiChatConfig)
            .then(function (foundation) {
            return _this._initialise(foundation, comapiChatConfig);
        });
    };
    ComapiChatClient.prototype.initialiseWithFoundation = function (foundation, comapiChatConfig) {
        return this._initialise(foundation, comapiChatConfig);
    };
    ComapiChatClient.prototype.uninitialise = function () {
        var _this = this;
        return this._messagingService.uninitialise()
            .then(function () {
            return _this._sessionService.endSession();
        })
            .then(function () {
            _this._comapiChatConfig = undefined;
            _this._foundation = undefined;
            _this._sessionService = undefined;
            _this._messagingService = undefined;
            return Promise.resolve(true);
        });
    };
    ComapiChatClient.prototype._initialise = function (foundation, comapiChatConfig) {
        this._comapiChatConfig = comapiChatConfig;
        this._foundation = foundation;
        this._sessionService = new sessionService_1.SessionService(foundation, comapiChatConfig);
        this._messagingService = new messagingService_1.MessagingService(foundation, comapiChatConfig);
        return this._messagingService.initialise(comapiChatConfig);
    };
    Object.defineProperty(ComapiChatClient, "version", {
        get: function () {
            return "1.0.0.93";
        },
        enumerable: true,
        configurable: true
    });
    return ComapiChatClient;
}());
exports.ComapiChatClient = ComapiChatClient;
//# sourceMappingURL=comapiChatClient.js.map