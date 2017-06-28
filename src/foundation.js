"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
var indexedDBLogger_1 = require("./indexedDBLogger");
var conversationBuilder_1 = require("./conversationBuilder");
exports.ConversationBuilder = conversationBuilder_1.ConversationBuilder;
var messageBuilder_1 = require("./messageBuilder");
exports.MessageBuilder = messageBuilder_1.MessageBuilder;
var messageStatusBuilder_1 = require("./messageStatusBuilder");
exports.MessageStatusBuilder = messageStatusBuilder_1.MessageStatusBuilder;
var comapiConfig_1 = require("./comapiConfig");
exports.ComapiConfig = comapiConfig_1.ComapiConfig;
var urlConfig_1 = require("./urlConfig");
var interfaceManager_1 = require("./interfaceManager");
exports.InterfaceManager = interfaceManager_1.InterfaceManager;
var interfaceSymbols_1 = require("./interfaceSymbols");
var inversify_config_1 = require("./inversify.config");
var Foundation = (function () {
    function Foundation(_eventManager, _logger, _networkManager, services, device, channels) {
        this._eventManager = _eventManager;
        this._logger = _logger;
        this._networkManager = _networkManager;
        this._services = services;
        this._device = device;
        this._channels = channels;
    }
    Foundation.initialiseShared = function (comapiConfig) {
        return Foundation._initialise(comapiConfig, true);
    };
    Foundation.initialise = function (comapiConfig) {
        return Foundation._initialise(comapiConfig, false);
    };
    Object.defineProperty(Foundation, "version", {
        get: function () {
            return "1.0.2.121";
        },
        enumerable: true,
        configurable: true
    });
    Foundation._initialise = function (comapiConfig, doSingleton) {
        if (inversify_config_1.container.isBound(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)) {
            inversify_config_1.container.unbind(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig);
        }
        inversify_config_1.container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig).toDynamicValue(function (context) {
            return comapiConfig;
        });
        if (doSingleton && Foundation._foundation) {
            return Promise.resolve(Foundation._foundation);
        }
        if (comapiConfig.foundationRestUrls === undefined) {
            comapiConfig.foundationRestUrls = new urlConfig_1.FoundationRestUrls();
        }
        if (comapiConfig.logPersistence &&
            comapiConfig.logPersistence === interfaces_1.LogPersistences.IndexedDB) {
            var indexedDBLogger_2 = new indexedDBLogger_1.IndexedDBLogger();
            return indexedDBLogger_2.openDatabase()
                .then(function () {
                var retentionHours = comapiConfig.logRetentionHours === undefined ? 24 : comapiConfig.logRetentionHours;
                var purgeDate = new Date((new Date()).valueOf() - 1000 * 60 * 60 * retentionHours);
                return indexedDBLogger_2.purge(purgeDate);
            })
                .then(function () {
                var foundation = foundationFactory(comapiConfig, indexedDBLogger_2);
                if (doSingleton) {
                    Foundation._foundation = foundation;
                }
                return Promise.resolve(foundation);
            });
        }
        else {
            var foundation = foundationFactory(comapiConfig);
            if (doSingleton) {
                Foundation._foundation = foundation;
            }
            return Promise.resolve(foundation);
        }
        function foundationFactory(config, indexedDBLogger) {
            if (indexedDBLogger) {
                inversify_config_1.container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger).toDynamicValue(function (context) {
                    return indexedDBLogger;
                });
            }
            var eventManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager);
            var logger = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger);
            if (config.logLevel) {
                logger.logLevel = config.logLevel;
            }
            var networkManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager);
            var services = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.Services);
            var device = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.Device);
            var channels = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.Channels);
            var foundation = new Foundation(eventManager, logger, networkManager, services, device, channels);
            return foundation;
        }
    };
    Foundation.prototype.startSession = function () {
        return this._networkManager.startSession()
            .then(function (sessionInfo) {
            return sessionInfo.session;
        });
    };
    Foundation.prototype.endSession = function () {
        return this._networkManager.endSession();
    };
    Object.defineProperty(Foundation.prototype, "services", {
        get: function () {
            return this._services;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "device", {
        get: function () {
            return this._device;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "channels", {
        get: function () {
            return this._channels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "session", {
        get: function () {
            return this._networkManager.session;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "logger", {
        get: function () {
            return this._logger;
        },
        enumerable: true,
        configurable: true
    });
    Foundation.prototype.on = function (eventType, handler) {
        this._eventManager.subscribeToLocalEvent(eventType, handler);
    };
    Foundation.prototype.off = function (eventType, handler) {
        this._eventManager.unsubscribeFromLocalEvent(eventType, handler);
    };
    Foundation.prototype.getLogs = function () {
        return this._logger.getLog();
    };
    return Foundation;
}());
exports.Foundation = Foundation;
//# sourceMappingURL=foundation.js.map