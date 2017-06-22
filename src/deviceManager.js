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
var interfaces_1 = require("./interfaces");
var utils_1 = require("./utils");
var interfaceSymbols_1 = require("./interfaceSymbols");
var DeviceManager = (function () {
    function DeviceManager(_logger, _restClient, _localStorageData, _comapiConfig) {
        this._logger = _logger;
        this._restClient = _restClient;
        this._localStorageData = _localStorageData;
        this._comapiConfig = _comapiConfig;
    }
    DeviceManager.prototype.setFCMPushDetails = function (sessionId, packageName, registrationId) {
        var data = {
            "fcm": {
                "package": packageName,
                "registrationId": registrationId
            }
        };
        return this._restClient.put(this.getPushUrl(sessionId), {}, data)
            .then(function (result) {
            return Promise.resolve(true);
        });
    };
    DeviceManager.prototype.setAPNSPushDetails = function (sessionId, bundleId, environment, token) {
        var data = {
            "apns": {
                "bundleId": bundleId,
                "environment": interfaces_1.Environment[environment],
                "token": token
            }
        };
        return this._restClient.put(this.getPushUrl(sessionId), {}, data)
            .then(function (result) {
            return Promise.resolve(true);
        });
    };
    DeviceManager.prototype.removePushDetails = function (sessionId) {
        return this._restClient.delete(this.getPushUrl(sessionId), {})
            .then(function (result) {
            return Promise.resolve(true);
        });
    };
    DeviceManager.prototype.getPushUrl = function (sessionId) {
        return utils_1.Utils.format(this._comapiConfig.foundationRestUrls.push, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            sessionId: sessionId,
            urlBase: this._comapiConfig.urlBase,
        });
    };
    return DeviceManager;
}());
DeviceManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], DeviceManager);
exports.DeviceManager = DeviceManager;
//# sourceMappingURL=deviceManager.js.map