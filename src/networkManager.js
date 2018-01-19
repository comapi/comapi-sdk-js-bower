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
var NetworkManager = (function () {
    /**
     * NetworkManager class constructor.
     * @class NetworkManager
     * @ignore
     * @classdesc Class that implements Session And Socket Resolution.
     * @parameter {ISessionManager} _sessionManager
     * @parameter {IWebSocketManager} _webSocketManager
     */
    function NetworkManager(_sessionManager, _webSocketManager) {
        this._sessionManager = _sessionManager;
        this._webSocketManager = _webSocketManager;
    }
    /**
     * Method to start a new authenticated session AND connect up the websocket
     * @method Foundation#startSession
     * @returns {Promise} - Returns a promise
     */
    NetworkManager.prototype.startSession = function () {
        var _this = this;
        return this._sessionManager.startSession()
            .then(function (sessionInfo) {
            return Promise.all([sessionInfo, _this._webSocketManager.connect()]);
        })
            .then(function (_a) {
            var sessionInfo = _a[0], connected = _a[1];
            if (!connected) {
                console.error("Failed to connect web socket");
            }
            return sessionInfo;
        });
    };
    /**
     * Method to restart an expired authenticated session
     * @method Foundation#restartSession
     * @returns {Promise} - Returns a promise
     */
    NetworkManager.prototype.restartSession = function () {
        var _this = this;
        return this._webSocketManager.disconnect()
            .then(function (succeeded) {
            return _this._sessionManager.startSession();
        })
            .then(function (sessionInfo) {
            return Promise.all([sessionInfo, _this._webSocketManager.connect()]);
        })
            .then(function (_a) {
            var sessionInfo = _a[0], connected = _a[1];
            if (!connected) {
                console.error("Failed to connect web socket");
            }
            return sessionInfo;
        });
    };
    Object.defineProperty(NetworkManager.prototype, "session", {
        /**
         * Method to get current session
         * @method Foundation#session
         * @returns {ISession} - Returns an ISession interface
         */
        get: function () {
            return this._sessionManager.sessionInfo ? this._sessionManager.sessionInfo.session : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Method to end an existing authenticated session
     * @method Foundation#endSession
     * @returns {Promise} - Returns a promise
     */
    NetworkManager.prototype.endSession = function () {
        var _this = this;
        return this._webSocketManager.disconnect()
            .then(function () {
            return _this._sessionManager.endSession();
        });
    };
    NetworkManager.prototype.getValidToken = function () {
        return this._sessionManager.getValidToken();
    };
    /**
     * Create a session if we don't have one already ...
     * @method NetworkManager#ensureSession
     * @returns {Promise} - returns a Promise
     */
    NetworkManager.prototype.ensureSession = function () {
        return this._sessionManager.startSession();
    };
    return NetworkManager;
}());
NetworkManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.WebSocketManager)),
    __metadata("design:paramtypes", [Object, Object])
], NetworkManager);
exports.NetworkManager = NetworkManager;
//# sourceMappingURL=networkManager.js.map