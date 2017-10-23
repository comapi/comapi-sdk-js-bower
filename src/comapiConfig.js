"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
var urlConfig_1 = require("./urlConfig");
var ComapiConfig = (function () {
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
    ComapiConfig.prototype.withApiSpace = function (id) {
        this.apiSpaceId = id;
        return this;
    };
    ComapiConfig.prototype.withLogRetentionTime = function (hours) {
        this.logRetentionHours = hours;
        return this;
    };
    ComapiConfig.prototype.withAuthChallenge = function (authChallenge) {
        this.authChallenge = authChallenge;
        return this;
    };
    ComapiConfig.prototype.withUrlBase = function (urlBase) {
        this.urlBase = urlBase;
        return this;
    };
    ComapiConfig.prototype.withWebSocketBase = function (webSocketBase) {
        this.webSocketBase = webSocketBase;
        return this;
    };
    ComapiConfig.prototype.withLogLevel = function (logLevel) {
        this.logLevel = logLevel;
        return this;
    };
    ComapiConfig.prototype.withLogPersistence = function (logPersistence) {
        this.logPersistence = logPersistence;
        return this;
    };
    ComapiConfig.prototype.withFoundationRestUrls = function (foundationRestUrls) {
        this.foundationRestUrls = foundationRestUrls;
        return this;
    };
    ComapiConfig.prototype.withEventMapping = function (eventMapping) {
        this.eventMapping = eventMapping;
        return this;
    };
    ComapiConfig.prototype.withLocalStoragePrefix = function (localStoragePrefix) {
        this.localStoragePrefix = localStoragePrefix;
        return this;
    };
    ComapiConfig.prototype.withOrphanedEventPersistence = function (orphanedEventPersistence) {
        this.orphanedEventPersistence = orphanedEventPersistence;
        return this;
    };
    return ComapiConfig;
}());
exports.ComapiConfig = ComapiConfig;
//# sourceMappingURL=comapiConfig.js.map