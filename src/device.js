"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Device = Device;
//# sourceMappingURL=device.js.map