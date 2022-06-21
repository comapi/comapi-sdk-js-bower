"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComapiConfig = void 0;
var interfaces_1 = require("./interfaces");
var urlConfig_1 = require("./urlConfig");
var ComapiConfig = /** @class */ (function () {
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
        this.isTypingTimeout = 10;
        this.isTypingOffTimeout = 10;
        this.foundationRestUrls = new urlConfig_1.FoundationRestUrls();
        this.orphanedEventPersistence = interfaces_1.OrphanedEventPersistences.IndexedDbIfSupported;
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
    /**
     * Function to override foundationRestUrls
     * @method ComapiConfig#withFoundationRestUrls
     * @param {IFoundationRestUrls} foundationRestUrls - the foundationRestUrls
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withFoundationRestUrls = function (foundationRestUrls) {
        this.foundationRestUrls = foundationRestUrls;
        return this;
    };
    /**
     * Function to override eventMapping
     * @method ComapiConfig#withEventMapping
     * @param {IEventMapping} eventMapping - the eventMapping
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withEventMapping = function (eventMapping) {
        this.eventMapping = eventMapping;
        return this;
    };
    /**
     * Function to override localStoragePrefix
     * @method ComapiConfig#withLocalStoragePrefix
     * @param {string} localStoragePrefix - the localStoragePrefix
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withLocalStoragePrefix = function (localStoragePrefix) {
        this.localStoragePrefix = localStoragePrefix;
        return this;
    };
    /**
     * Function to override orphanedEventPersistence
     * @method ComapiConfig#withOrphanedEventPersistence
     * @param {string} orphanedEventPersistence - the orphanedEventPersistence
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withOrphanedEventPersistence = function (orphanedEventPersistence) {
        this.orphanedEventPersistence = orphanedEventPersistence;
        return this;
    };
    /**
     * Function to override enableWebsocketForNonChatUsage
     * @method ComapiConfig#withEnabledNonChatSocket
     * @param {string} enabled - enabled
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withEnabledNonChatSocket = function (enabled) {
        this.enableWebsocketForNonChatUsage = enabled;
        return this;
    };
    /**
     * Function to specify push configuration
     * @method ComapiConfig#withPushConfiguration
     * @param {IPushConfig} config - config
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    ComapiConfig.prototype.withPushConfiguration = function (config) {
        this.pushConfig = config;
        return this;
    };
    return ComapiConfig;
}());
exports.ComapiConfig = ComapiConfig;
//# sourceMappingURL=comapiConfig.js.map