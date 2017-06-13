var interfaces_1 = require("./interfaces");
var eventManager_1 = require("./eventManager");
var logger_1 = require("./logger");
var restClient_1 = require("./restClient");
var authenticatedRestClient_1 = require("./authenticatedRestClient");
var indexedDBLogger_1 = require("./indexedDBLogger");
var localStorageData_1 = require("./localStorageData");
var sessionManager_1 = require("./sessionManager");
var deviceManager_1 = require("./deviceManager");
var facebookManager_1 = require("./facebookManager");
var profileManager_1 = require("./profileManager");
var messageManager_1 = require("./messageManager");
var messagePager_1 = require("./messagePager");
var conversationManager_1 = require("./conversationManager");
var webSocketManager_1 = require("./webSocketManager");
var conversationBuilder_1 = require("./conversationBuilder");
exports.ConversationBuilder = conversationBuilder_1.ConversationBuilder;
var messageBuilder_1 = require("./messageBuilder");
exports.MessageBuilder = messageBuilder_1.MessageBuilder;
var messageStatusBuilder_1 = require("./messageStatusBuilder");
exports.MessageStatusBuilder = messageStatusBuilder_1.MessageStatusBuilder;
var indexedDBOrphanedEventManager_1 = require("./indexedDBOrphanedEventManager");
var localStorageOrphanedEventManager_1 = require("./localStorageOrphanedEventManager");
var comapiConfig_1 = require("./comapiConfig");
exports.ComapiConfig = comapiConfig_1.ComapiConfig;
var appMessaging_1 = require("./appMessaging");
var profile_1 = require("./profile");
var services_1 = require("./services");
var device_1 = require("./device");
var channels_1 = require("./channels");
var networkManager_1 = require("./networkManager");
/*
 * Exports to be added to COMAPI namespace
 */
var Foundation = (function () {
    /**
     * Foundation class constructor.
     * @class Foundation
     * @classdesc Class that implements Comapi foundation functionality.
     */
    function Foundation(_eventManager, _logger, 
        /*private*/ _localStorageData, _networkManager, 
        /*private*/ _deviceManager, 
        /*private*/ _facebookManager, 
        /*private*/ _conversationManager, 
        /*private*/ _profileManager, 
        /*private*/ _messageManager, 
        /*private*/ _comapiConfig) {
        this._eventManager = _eventManager;
        this._logger = _logger;
        this._networkManager = _networkManager;
        var dbSupported = "indexedDB" in window;
        var orphanedEventManager;
        if (dbSupported) {
            orphanedEventManager = new indexedDBOrphanedEventManager_1.IndexedDBOrphanedEventManager();
        }
        else {
            orphanedEventManager = new localStorageOrphanedEventManager_1.LocalStorageOrphanedEventManager(_localStorageData);
        }
        var messagePager = new messagePager_1.MessagePager(_logger, _localStorageData, _messageManager, orphanedEventManager);
        var appMessaging = new appMessaging_1.AppMessaging(this._networkManager, _conversationManager, _messageManager, messagePager);
        var profile = new profile_1.Profile(this._networkManager, _localStorageData, _profileManager);
        this._services = new services_1.Services(appMessaging, profile);
        this._device = new device_1.Device(this._networkManager, _deviceManager);
        this._channels = new channels_1.Channels(this._networkManager, _facebookManager);
    }
    /**
     * Factory method to create a singleton instance of Foundation
     * @method Foundation#initialise
     * @param {IComapiConfig} comapiConfig - the app config (use `ComapiConfig` to create)
     * @returns {Promise} - returns promise
     */
    Foundation.initialiseShared = function (comapiConfig) {
        return Foundation._initialise(comapiConfig, true);
    };
    /**
     * Factory method to create an instance of Foundation
     * @method Foundation#initialise
     * @param {IComapiConfig} comapiConfig - the app config (use `ComapiConfig` to create)
     * @returns {Promise} - returns promise
     */
    Foundation.initialise = function (comapiConfig) {
        return Foundation._initialise(comapiConfig, false);
    };
    Object.defineProperty(Foundation, "version", {
        /**
         * Property to get the SDK version
         * @method Foundation#version
         */
        get: function () {
            return "1.0.2.27";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Private initialisation method
     * @param comapiConfig
     * @param indexedDBLogger
     */
    Foundation._initialise = function (comapiConfig, doSingleton) {
        if (doSingleton && Foundation._foundation) {
            return Promise.resolve(Foundation._foundation);
        }
        if (comapiConfig.logPersistence &&
            comapiConfig.logPersistence === interfaces_1.LogPersistences.IndexedDB) {
            var indexedDBLogger = new indexedDBLogger_1.IndexedDBLogger();
            return indexedDBLogger.openDatabase()
                .then(function () {
                var retentionHours = comapiConfig.logRetentionHours === undefined ? 24 : comapiConfig.logRetentionHours;
                var purgeDate = new Date((new Date()).valueOf() - 1000 * 60 * 60 * retentionHours);
                return indexedDBLogger.purge(purgeDate);
            })
                .then(function () {
                var foundation = foundationFactory(comapiConfig, indexedDBLogger);
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
            var eventManager = new eventManager_1.EventManager();
            var localStorageData = new localStorageData_1.LocalStorageData();
            var logger = new logger_1.Logger(eventManager, config.logPersistence === interfaces_1.LogPersistences.LocalStorage ? localStorageData : undefined, indexedDBLogger);
            if (config.logLevel) {
                logger.logLevel = config.logLevel;
            }
            var restClient = new restClient_1.RestClient(logger);
            var sessionManager = new sessionManager_1.SessionManager(logger, restClient, localStorageData, config);
            var webSocketManager = new webSocketManager_1.WebSocketManager(logger, localStorageData, config, sessionManager, eventManager);
            var networkManager = new networkManager_1.NetworkManager(sessionManager, webSocketManager);
            var authenticatedRestClient = new authenticatedRestClient_1.AuthenticatedRestClient(logger, networkManager);
            var deviceManager = new deviceManager_1.DeviceManager(logger, authenticatedRestClient, localStorageData, config);
            var facebookManager = new facebookManager_1.FacebookManager(authenticatedRestClient, config);
            var conversationManager = new conversationManager_1.ConversationManager(logger, authenticatedRestClient, localStorageData, config, sessionManager);
            var profileManager = new profileManager_1.ProfileManager(logger, authenticatedRestClient, localStorageData, config, sessionManager);
            var messageManager = new messageManager_1.MessageManager(logger, authenticatedRestClient, localStorageData, config, sessionManager, conversationManager);
            var foundation = new Foundation(eventManager, logger, localStorageData, networkManager, deviceManager, facebookManager, conversationManager, profileManager, messageManager, config);
            return foundation;
        }
    };
    /**
     * Method to start a new authenticated session
     * @method Foundation#startSession
     * @returns {Promise} - Returns a promise
     */
    Foundation.prototype.startSession = function () {
        return this._networkManager.startSession()
            .then(function (sessionInfo) {
            return sessionInfo.session;
        });
    };
    /**
     * Method to end an existing authenticated session
     * @method Foundation#endSession
     * @returns {Promise} - Returns a promise
     */
    Foundation.prototype.endSession = function () {
        return this._networkManager.endSession();
    };
    Object.defineProperty(Foundation.prototype, "services", {
        /**
         * Method to get Services interface
         * @method Foundation#services
         * @returns {Services} - Returns Services
         */
        get: function () {
            return this._services;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "device", {
        /**
         * Method to get Device interface
         * @method Foundation#device
         * @returns {Device} - Returns Device
         */
        get: function () {
            return this._device;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "channels", {
        /**
         * Method to get Channels interface
         * @method Foundation#channels
         * @returns {Channels} - Returns Channels
         */
        get: function () {
            return this._channels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "session", {
        /**
         * Method to get current session
         * @method Foundation#session
         * @returns {ISession} - Returns an ISession interface
         */
        get: function () {
            return this._networkManager.session;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "logger", {
        /**
         * Method to get the logger
         * @method Foundation#logger
         * @returns {ILogger} - Returns an ILogger interface
         */
        get: function () {
            return this._logger;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Subscribes the caller to a comapi event.
     * @method Foundation#on
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} handler - The callback
     */
    Foundation.prototype.on = function (eventType, handler) {
        this._eventManager.subscribeToLocalEvent(eventType, handler);
    };
    /**
     * Unsubscribes the caller to a comapi event.
     * @method Foundation#off
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} [handler] - The callback (optional - if not specified, all associated callbacks will be unregistered)
     */
    Foundation.prototype.off = function (eventType, handler) {
        this._eventManager.unsubscribeFromLocalEvent(eventType, handler);
    };
    /**
     * Method to retrieve the current debug log as a string
     * @method Foundation#getLogs
     * @returns {Promise} - Returns a promise
     */
    Foundation.prototype.getLogs = function () {
        return this._logger.getLog();
    };
    return Foundation;
})();
exports.Foundation = Foundation;
//# sourceMappingURL=foundation.js.map