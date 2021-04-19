"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
var conversationBuilder_1 = require("./conversationBuilder");
exports.ConversationBuilder = conversationBuilder_1.ConversationBuilder;
var messageBuilder_1 = require("./messageBuilder");
exports.MessageBuilder = messageBuilder_1.MessageBuilder;
var messageStatusBuilder_1 = require("./messageStatusBuilder");
exports.MessageStatusBuilder = messageStatusBuilder_1.MessageStatusBuilder;
var comapiConfig_1 = require("./comapiConfig");
exports.ComapiConfig = comapiConfig_1.ComapiConfig;
var urlConfig_1 = require("./urlConfig");
var interfaceSymbols_1 = require("./interfaceSymbols");
var inversify_config_1 = require("./inversify.config");
var contentData_1 = require("./contentData");
exports.ContentData = contentData_1.ContentData;
var mutex_1 = require("./mutex");
exports.Mutex = mutex_1.Mutex;
var utils_1 = require("./utils");
exports.Utils = utils_1.Utils;
var Foundation = (function () {
    /**
     * Foundation class constructor.
     * @class Foundation
     * @classdesc Class that implements Comapi foundation functionality.
     */
    function Foundation(_eventManager, _logger, _networkManager, services, device, channels) {
        this._eventManager = _eventManager;
        this._logger = _logger;
        this._networkManager = _networkManager;
        // initialising like this for sake of JSDoc ...
        this._services = services;
        this._device = device;
        this._channels = channels;
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
            return "1.2.0-beta.1";
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
        if (comapiConfig.foundationRestUrls === undefined) {
            comapiConfig.foundationRestUrls = new urlConfig_1.FoundationRestUrls();
        }
        var container = comapiConfig.interfaceContainer ? comapiConfig.interfaceContainer : new inversify_config_1.InterfaceContainer();
        if (comapiConfig.interfaceContainer) {
            container = comapiConfig.interfaceContainer;
        }
        else {
            container = new inversify_config_1.InterfaceContainer();
            container.initialise(comapiConfig);
            container.bindComapiConfig(comapiConfig);
        }
        if (comapiConfig.logPersistence &&
            comapiConfig.logPersistence === interfaces_1.LogPersistences.IndexedDB) {
            container.bindIndexedDBLogger();
        }
        var eventManager = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager);
        var logger = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger);
        logger.logLevel = comapiConfig.logLevel in interfaces_1.LogLevels ? comapiConfig.logLevel : 0;
        var networkManager = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager);
        var services = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Services);
        var device = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Device);
        var channels = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Channels);
        var foundation = new Foundation(eventManager, logger, networkManager, services, device, channels);
        if (doSingleton) {
            Foundation._foundation = foundation;
        }
        // adopt a cached session if there is one
        var sessionManager = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager);
        return sessionManager.initialise()
            .then(function (_) {
            if (comapiConfig.enableWebsocketForNonChatUsage) {
                return networkManager.setWebsocketEnabled(true);
            }
            else {
                return Promise.resolve(false);
            }
        })
            .then(function (_) {
            return Promise.resolve(foundation);
        });
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
}());
exports.Foundation = Foundation;
//# sourceMappingURL=foundation.js.map