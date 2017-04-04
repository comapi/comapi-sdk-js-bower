var Device = (function () {
    /**
     * Device class constructor.
     * @class Device
     * @classdesc Class that implements Device related functionality.
     * @parameter {SessionAndSocketResolver} resolver
     * @parameter {IDeviceManager} deviceManager
     */
    function Device(_sessionAndSocketResolver, _deviceManager) {
        this._sessionAndSocketResolver = _sessionAndSocketResolver;
        this._deviceManager = _deviceManager;
    }
    /**
     * Function to set FCM push details for the current session
     * @method Device#setFCMPushDetails
     * @param {string} packageName - the andriod package name of your cordova app
     * @param {string} registrationId - the push registration id
     * @returns {Promise} - Returns a promise
     */
    Device.prototype.setFCMPushDetails = function (packageName, registrationId) {
        var _this = this;
        return this._sessionAndSocketResolver.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._deviceManager.setFCMPushDetails(sessionInfo.session.id, packageName, registrationId);
        });
    };
    /**
     * Function to set APNS push details for the current session
     * @method Device#setAPNSPushDetails
     * @param {string} bundleId - the iOS bundleId of your cordova app
     * @param {Environment} environment - the environment ["`development`"|"`production`"]
     * @param {string} token
     * @returns {Promise} - Returns a promise
     */
    Device.prototype.setAPNSPushDetails = function (bundleId, environment, token) {
        var _this = this;
        return this._sessionAndSocketResolver.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._deviceManager.setAPNSPushDetails(sessionInfo.session.id, bundleId, environment, token);
        });
    };
    /**
     * Function to remove push details for the current session
     * @method Device#removePushDetails
     * @returns {Promise} - Returns a promise
     */
    Device.prototype.removePushDetails = function () {
        var _this = this;
        return this._sessionAndSocketResolver.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._deviceManager.removePushDetails(sessionInfo.session.id);
        });
    };
    return Device;
})();
exports.Device = Device;
//# sourceMappingURL=device.js.map