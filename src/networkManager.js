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
var mutex_1 = require("./mutex");
var NetworkManager = (function () {
    function NetworkManager(_sessionManager, _webSocketManager) {
        this._sessionManager = _sessionManager;
        this._webSocketManager = _webSocketManager;
        this._mutex = new mutex_1.Mutex();
    }
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
    NetworkManager.prototype.ensureSessionAndSocket = function () {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this.ensureSession()
                .then(function (sessionInfo) {
                return Promise.all([sessionInfo, _this.ensureSocket()]);
            })
                .then(function (_a) {
                var sessionInfo = _a[0], connected = _a[1];
                if (!connected) {
                    console.error("Failed to connect web socket");
                }
                return sessionInfo;
            });
        });
    };
    NetworkManager.prototype.ensureSession = function () {
        return this._sessionManager.startSession();
    };
    NetworkManager.prototype.ensureSocket = function () {
        return this._webSocketManager.hasSocket() ? Promise.resolve(true) : this._webSocketManager.connect();
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