var interfaces_1 = require("./interfaces");
var ComapiConfig = (function () {
    /**
     * ComapiConfig class constructor.
     * @class ComapiConfig
     * @classdesc Class that implements IComapiConfig
     */
    function ComapiConfig() {
        this.logRetentionHours = 24;
        this.urlBase = "https://api.comapi.com";
        this.webSocketBase = "wss://api.comapi.com";
        this.logLevel = interfaces_1.LogLevels.Error;
        this.logPersistence = interfaces_1.LogPersistences.LocalStorage;
        this.apiSpaceId = undefined;
    }
    /**
     * Function to set apiSpaceId
     * @method ComapiConfig#withApiSpace
     * @param {string} id - the api space id
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withApiSpace = function (id) {
        this.apiSpaceId = id;
        return this;
    };
    /**
     * Function to set Logfile Retention Time in hours (Defaouts to `24`)
     * @method ComapiConfig#withLogRetentionTime
     * @param {number} hours - the log retention time in hours
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withLogRetentionTime = function (hours) {
        this.logRetentionHours = hours;
        return this;
    };
    /**
     * Function to set the authentication Challenge
     * @method ComapiConfig#withAuthChallenge
     * @param {IAuthChallenge} authChallenge - the authentication challenge
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withAuthChallenge = function (authChallenge) {
        this.authChallenge = authChallenge;
        return this;
    };
    /**
     * Function to set urlBase (Defaults to production)
     * @method ComapiConfig#withUrlBase
     * @param {string} urlBase - the url base
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withUrlBase = function (urlBase) {
        this.urlBase = urlBase;
        return this;
    };
    /**
     * Function to set webSocketBase (Defaults to production)
     * @method ComapiConfig#withWebSocketBase
     * @param {string} webSocketBase - the web socket base
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withWebSocketBase = function (webSocketBase) {
        this.webSocketBase = webSocketBase;
        return this;
    };
    /**
     * Function to set logLevel  (Defaults to errors only)
     * @method ComapiConfig#withLogLevel
     * @param {LogLevels} withLogLevel - the logLevel
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withLogLevel = function (logLevel) {
        this.logLevel = logLevel;
        return this;
    };
    /**
     * Function to set logPersistence
     * @method ComapiConfig#withLogPersistence
     * @param {LogPersistences} logPersistence - the logPersistence
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withLogPersistence = function (logPersistence) {
        this.logPersistence = logPersistence;
        return this;
    };
    return ComapiConfig;
})();
exports.ComapiConfig = ComapiConfig;
//# sourceMappingURL=comapiConfig.js.map