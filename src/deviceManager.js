var interfaces_1 = require("./interfaces");
// import { Utils } from "./utils";
var DeviceManager = (function () {
    // private _deviceId: string;
    /**
     * DeviceManager class constructor.
     * @class DeviceManager
     * @ignore
     * @classdesc Class that implements all the DeviceManager functionality.
     * @parameter {ILogger} logger
     * @parameter {IRestClient} restClient
     * @parameter {ILocalStorageData} localStorageData
     * @parameter {IComapiConfig} ComapiConfig
     */
    function DeviceManager(_logger, _restClient, _localStorageData, _comapiConfig) {
        // this._deviceId = _localStorageData.getString("deviceId");
        this._logger = _logger;
        this._restClient = _restClient;
        this._localStorageData = _localStorageData;
        this._comapiConfig = _comapiConfig;
        // if (!this._deviceId) {
        //     this._deviceId = Utils.uuid();
        //     _localStorageData.setString("deviceId", this._deviceId);
        // }
    }
    /**
     * Function to set FCM push details for the current session
     * @method DeviceManager#setFCMPushDetails
     * @param {string} sessionId
     * @param {string} packageName
     * @param {string} registrationId
     * @returns {Promise} - Returns a promise
     */
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
    /**
     * Function to set APNS push details for the current session
     * @method DeviceManager#setAPNSPushDetails
     * @param {string} sessionId
     * @param {string} bundleId
     * @param {Environment} environment
     * @param {string} token
     * @returns {Promise} - Returns a promise
     */
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
    /**
     * Function to remove push details for the current session
     * @method DeviceManager#removePushDetails
     * @param {string} sessionId
     * @returns {Promise} - Returns a promise
     */
    DeviceManager.prototype.removePushDetails = function (sessionId) {
        return this._restClient.delete(this.getPushUrl(sessionId), {})
            .then(function (result) {
            return Promise.resolve(true);
        });
    };
    /**
     * Getter to get the current push Url
     * @method DeviceManager#pushUrl
     * @returns {string}
     */
    DeviceManager.prototype.getPushUrl = function (sessionId) {
        return this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/sessions/" + sessionId + "/push";
    };
    return DeviceManager;
})();
exports.DeviceManager = DeviceManager;
//# sourceMappingURL=deviceManager.js.map