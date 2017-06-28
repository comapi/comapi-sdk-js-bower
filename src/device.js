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
var Device = (function () {
    function Device(_networkManager, _deviceManager) {
        this._networkManager = _networkManager;
        this._deviceManager = _deviceManager;
    }
    Device.prototype.setFCMPushDetails = function (packageName, registrationId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._deviceManager.setFCMPushDetails(sessionInfo.session.id, packageName, registrationId);
        });
    };
    Device.prototype.setAPNSPushDetails = function (bundleId, environment, token) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._deviceManager.setAPNSPushDetails(sessionInfo.session.id, bundleId, environment, token);
        });
    };
    Device.prototype.removePushDetails = function () {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._deviceManager.removePushDetails(sessionInfo.session.id);
        });
    };
    return Device;
}());
Device = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager)),
    __metadata("design:paramtypes", [Object, Object])
], Device);
exports.Device = Device;
//# sourceMappingURL=device.js.map