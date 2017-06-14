var COMAPI =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var interfaces_1 = __webpack_require__(1);
	var eventManager_1 = __webpack_require__(2);
	var logger_1 = __webpack_require__(3);
	var restClient_1 = __webpack_require__(4);
	var authenticatedRestClient_1 = __webpack_require__(5);
	var indexedDBLogger_1 = __webpack_require__(6);
	var localStorageData_1 = __webpack_require__(7);
	var sessionManager_1 = __webpack_require__(8);
	var deviceManager_1 = __webpack_require__(10);
	var facebookManager_1 = __webpack_require__(11);
	var profileManager_1 = __webpack_require__(12);
	var messageManager_1 = __webpack_require__(13);
	var messagePager_1 = __webpack_require__(14);
	var conversationManager_1 = __webpack_require__(15);
	var webSocketManager_1 = __webpack_require__(16);
	var conversationBuilder_1 = __webpack_require__(17);
	exports.ConversationBuilder = conversationBuilder_1.ConversationBuilder;
	var messageBuilder_1 = __webpack_require__(18);
	exports.MessageBuilder = messageBuilder_1.MessageBuilder;
	var messageStatusBuilder_1 = __webpack_require__(19);
	exports.MessageStatusBuilder = messageStatusBuilder_1.MessageStatusBuilder;
	var indexedDBOrphanedEventManager_1 = __webpack_require__(20);
	var localStorageOrphanedEventManager_1 = __webpack_require__(21);
	var comapiConfig_1 = __webpack_require__(22);
	exports.ComapiConfig = comapiConfig_1.ComapiConfig;
	var appMessaging_1 = __webpack_require__(24);
	var profile_1 = __webpack_require__(25);
	var services_1 = __webpack_require__(26);
	var device_1 = __webpack_require__(27);
	var channels_1 = __webpack_require__(28);
	var networkManager_1 = __webpack_require__(29);
	var urlConfig_1 = __webpack_require__(23);
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
	            return "1.0.2.36";
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Log level enum
	 */
	(function (LogLevels) {
	    LogLevels[LogLevels["None"] = 0] = "None";
	    LogLevels[LogLevels["Error"] = 1] = "Error";
	    LogLevels[LogLevels["Warn"] = 2] = "Warn";
	    LogLevels[LogLevels["Debug"] = 3] = "Debug";
	})(exports.LogLevels || (exports.LogLevels = {}));
	var LogLevels = exports.LogLevels;
	;
	/**
	 * Log persistence enum
	 */
	(function (LogPersistences) {
	    LogPersistences[LogPersistences["None"] = 0] = "None";
	    LogPersistences[LogPersistences["IndexedDB"] = 1] = "IndexedDB";
	    LogPersistences[LogPersistences["LocalStorage"] = 2] = "LocalStorage";
	})(exports.LogPersistences || (exports.LogPersistences = {}));
	var LogPersistences = exports.LogPersistences;
	;
	;
	;
	;
	/**
	 * Environment enum
	 */
	(function (Environment) {
	    Environment[Environment["development"] = 0] = "development";
	    Environment[Environment["production"] = 1] = "production";
	})(exports.Environment || (exports.Environment = {}));
	var Environment = exports.Environment;
	;
	;
	;
	/**
	 * Log level enum
	 */
	(function (ConversationScope) {
	    ConversationScope[ConversationScope["public"] = 0] = "public";
	    ConversationScope[ConversationScope["participant"] = 1] = "participant";
	})(exports.ConversationScope || (exports.ConversationScope = {}));
	var ConversationScope = exports.ConversationScope;
	;
	//# sourceMappingURL=interfaces.js.map

/***/ },
/* 2 */
/***/ function(module, exports) {

	var EventManager = (function () {
	    /**
	     * EventManager class constructor.
	     * @class EventManager
	     * @ignore
	     * @classdesc Class that implements all local event management.
	     */
	    function EventManager() {
	        this.eventSubscribers = [];
	    }
	    /**
	     * Subscribes the caller to a local event type.
	     * @method EventManager#subscribeToLocalEvent
	     * @param {string} eventType - The type of event to subscribe to
	     * @param {Function} handler - The callback
	     */
	    EventManager.prototype.subscribeToLocalEvent = function (eventType, handler) {
	        this.eventSubscribers.push({
	            eventType: eventType,
	            handler: handler,
	        });
	    };
	    /**
	     * Checks for an event subscriptionfor a local event type.
	     * @method EventManager#isSubscribedToLocalEvent
	     * @param {string} eventType - The type of event to check
	     */
	    EventManager.prototype.isSubscribedToLocalEvent = function (eventType) {
	        var isSubscribed = false;
	        for (var _i = 0, _a = this.eventSubscribers; _i < _a.length; _i++) {
	            var subscriber = _a[_i];
	            if (subscriber.eventType === eventType) {
	                isSubscribed = true;
	                break;
	            }
	        }
	        return isSubscribed;
	    };
	    /**
	     * Removes a subscription for a local event type.
	     * @method EventManager#unsubscribeFromLocalEvent
	     * @param {string} eventType - The type of event to subscribe to
	     * @param {Function} [handler] - The callback (optional - if not specified, all associated callbacks will be unregistered)
	     */
	    EventManager.prototype.unsubscribeFromLocalEvent = function (eventType, handler) {
	        for (var i = this.eventSubscribers.length - 1; i >= 0; i--) {
	            var subscriber = this.eventSubscribers[i];
	            if (handler && subscriber.handler === handler && subscriber.eventType === eventType) {
	                this.eventSubscribers.splice(i, 1);
	            }
	            else if (subscriber.eventType === eventType) {
	                this.eventSubscribers.splice(i, 1);
	            }
	        }
	    };
	    /**
	     * Publishes a LocalEvent.
	     * @method EventManager#publishLocalEvent
	     * @param {string} eventType - The type of event to publish
	     * @param {Object} data - The data associated with the event
	     */
	    EventManager.prototype.publishLocalEvent = function (eventType, data) {
	        var _this = this;
	        setTimeout(function () {
	            for (var _i = 0, _a = _this.eventSubscribers; _i < _a.length; _i++) {
	                var subscriber = _a[_i];
	                if (subscriber.eventType === eventType) {
	                    // call the handler
	                    // TODO: configurably wrap this ...
	                    // try {
	                    subscriber.handler(data);
	                }
	            }
	        });
	    };
	    return EventManager;
	})();
	exports.EventManager = EventManager;
	//# sourceMappingURL=eventManager.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var interfaces_1 = __webpack_require__(1);
	var Logger = (function () {
	    /**
	     * Logger class constructor.
	     * @class Logger
	     * @ignore
	     * @classdesc Class that implements all the Logger functionality.
	     * @param {IEventManager} [eventManager] - event manager interface - for publishing log events
	     * @param {ILocalStorageData} [localStorageData] - local storage interface  - for publishing log events
	     * @param {IndexedDB} [indexedDB] - indexedDB interface - assumed to be open and ready to go
	     */
	    function Logger(_eventManager, _localStorageData, _indexedDB) {
	        this._eventManager = _eventManager;
	        this._localStorageData = _localStorageData;
	        this._indexedDB = _indexedDB;
	        this._logLevel = interfaces_1.LogLevels.Debug;
	        // used as an id to identify each "session" - it will change on page reload and if 2 windows are open you can identify each log entry for diagnostics
	        this._uid = ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
	        this._maxLocalStorageLogSize = 1024;
	        this._localStorageKey = "rollingLogfile";
	    }
	    Object.defineProperty(Logger.prototype, "logLevel", {
	        /**
	         * Getter to get the log level
	         * @method Logger#logLevel
	         * @returns {LogLevels} - returns the current log level
	         */
	        get: function () {
	            return this._logLevel;
	        },
	        /**
	         * Setter to set the log level
	         * @method Logger#logLevel
	         * @param {LogLevels} theLogLevel - the log level
	         */
	        set: function (theLogLevel) {
	            this._logLevel = theLogLevel;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Write custon content to the diagnostic log of type info.
	     * @method Logger#log
	     * @param  {String} message
	     * @param  {Object} [data]
	     * @returns {Promise} - returns promise
	     */
	    Logger.prototype.log = function (message, data) {
	        return this._log(interfaces_1.LogLevels.Debug, message, data);
	    };
	    /**
	     * Write custon content to the diagnostic log of type warning.
	     * @method Logger#warn
	     * @param  {String} message
	     * @param  {Object} [data]
	     * @returns {Promise} - returns promise
	     */
	    Logger.prototype.warn = function (message, data) {
	        return this._log(interfaces_1.LogLevels.Warn, message, data);
	    };
	    /**
	     * Write custon content to the diagnostic log of type error.
	     * @method Logger#error
	     * @param  {String} message
	     * @param  {Object} [data]
	     * @returns {Promise} - returns promise
	     */
	    Logger.prototype.error = function (message, data) {
	        return this._log(interfaces_1.LogLevels.Error, message, data);
	    };
	    /**
	     * Method to get the current logfile
	     * @method Logger#getLog
	     * @returns {Promise} - returns promise
	     */
	    Logger.prototype.getLog = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._indexedDB) {
	                _this._indexedDB.getData().then(function (data) {
	                    resolve(JSON.stringify(data));
	                }).catch(function (error) {
	                    reject(error);
	                });
	            }
	            else if (_this._localStorageData) {
	                resolve(_this._localStorageData.getString(_this._localStorageKey));
	            }
	            else {
	                reject({ message: "No logfile to get" });
	            }
	        });
	    };
	    /**
	     * Method to clear the current logfile.
	     * @method Logger#clearLog
	     * @returns {Promise} - returns promise
	     */
	    Logger.prototype.clearLog = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._indexedDB) {
	                _this._indexedDB.clearData().then(function () {
	                    resolve(true);
	                })
	                    .catch(function (error) {
	                    reject(error);
	                });
	            }
	            else if (_this._localStorageData) {
	                _this._localStorageData.remove(_this._localStorageKey);
	                resolve(true);
	            }
	            else {
	                reject({ message: "No logfile to clear" });
	            }
	        });
	    };
	    /**
	     * Private method to get a string representation of a log level
	     * @param {LogLevels} level
	     * @returns {String}
	     */
	    Logger.prototype._stringForLogLevel = function (level) {
	        switch (level) {
	            case interfaces_1.LogLevels.Debug:
	                return "Debug";
	            case interfaces_1.LogLevels.Warn:
	                return "Warning";
	            case interfaces_1.LogLevels.Error:
	                return "Error";
	            default:
	                return "?";
	        }
	    };
	    /**
	     * Private method to log a message
	     * @param  {LogLevels} level
	     * @param  {string} message
	     * @param  {Object} [data]
	     * @returns Promise
	     */
	    Logger.prototype._log = function (level, message, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (level <= _this._logLevel) {
	                var formattedMessage = "[" + _this._uid + "] : " + new Date().toJSON() + " ["
	                    + _this._stringForLogLevel(level) + "] : " + message + (data !== undefined ? (" : "
	                    + JSON.stringify(data)) : "") + "\r\n";
	                switch (level) {
	                    case interfaces_1.LogLevels.Error:
	                        console.error(formattedMessage);
	                        break;
	                    case interfaces_1.LogLevels.Warn:
	                        console.warn(formattedMessage);
	                        break;
	                    case interfaces_1.LogLevels.Debug:
	                        console.log(formattedMessage);
	                        break;
	                    default:
	                        break;
	                }
	                var now = new Date();
	                var logEvent = {
	                    created: now.valueOf(),
	                    data: data,
	                    logLevel: level,
	                    message: message,
	                    timestamp: now.toISOString(),
	                };
	                if (_this._indexedDB) {
	                    _this._indexedDB.addRecord(logEvent).then(function (index) {
	                        resolve(true);
	                    });
	                }
	                else if (_this._localStorageData) {
	                    // fall back to using local storage
	                    var log = _this._localStorageData.getString(_this._localStorageKey);
	                    if (log !== null) {
	                        log += formattedMessage;
	                    }
	                    else {
	                        log = formattedMessage;
	                    }
	                    if (log.length > _this._maxLocalStorageLogSize) {
	                        log = log.substring(formattedMessage.length);
	                    }
	                    _this._localStorageData.setString(_this._localStorageKey, log);
	                    resolve(true);
	                }
	                else {
	                    resolve(true);
	                }
	                if (_this._eventManager) {
	                    _this._eventManager.publishLocalEvent("LogMessage", logEvent);
	                }
	            }
	        });
	    };
	    return Logger;
	})();
	exports.Logger = Logger;
	//# sourceMappingURL=logger.js.map

/***/ },
/* 4 */
/***/ function(module, exports) {

	var RestClient = (function () {
	    /**
	     * RestClient class constructor.
	     * @class RestClient
	     * @ignore
	     * @classdesc Class that implements a RestClient.
	     * @param {ILogger} [logger] - the logger
	     * @param {INetworkManager} [networkManager] - the network Manager
	     */
	    function RestClient(logger, networkManager) {
	        this.logger = logger;
	        this.networkManager = networkManager;
	        this._readyStates = [
	            "request not initialized",
	            "server connection established",
	            "request received ",
	            "processing request",
	            "request finished and response is ready"
	        ];
	    }
	    /**
	     * Method to make a GET request
	     * @method RestClient#get
	     * @param  {string} url
	     * @param  {any} [headers]
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype.get = function (url, headers) {
	        return this.makeRequest("GET", url, headers);
	    };
	    /**
	     * Method to make a POST request
	     * @method RestClient#post
	     * @param  {string} url
	     * @param  {any} data
	     * @param  {any} headers
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype.post = function (url, headers, data) {
	        return this.makeRequest("POST", url, headers, data);
	    };
	    /**
	     * Method to make a PUT request
	     * @method RestClient#put
	     * @param  {string} url
	     * @param  {any} headers
	     * @param  {any} data
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype.put = function (url, headers, data) {
	        return this.makeRequest("PUT", url, headers, data);
	    };
	    /**
	     * Method to make a PATCH request
	     * @method RestClient#patch
	     * @param  {string} url
	     * @param  {any} headers
	     * @param  {any} data
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype.patch = function (url, headers, data) {
	        return this.makeRequest("PATCH", url, headers, data);
	    };
	    /**
	     * Method to make a DELETE request
	     * @method RestClient#delete
	     * @param  {string} url
	     * @param  {any} headers
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype.delete = function (url, headers) {
	        return this.makeRequest("DELETE", url, headers);
	    };
	    /**
	     * @param  {XMLHttpRequest} request
	     * @param  {any} headers
	     */
	    RestClient.prototype.addHeaders = function (request, headers) {
	        for (var prop in headers) {
	            if (headers.hasOwnProperty(prop)) {
	                request.setRequestHeader(prop, headers[prop]);
	            }
	        }
	    };
	    /**
	     *
	     */
	    RestClient.prototype.getResponseHeaders = function (xhr) {
	        var headers = {};
	        var headerStr = xhr.getAllResponseHeaders();
	        if (headerStr) {
	            var headerPairs = headerStr.split("\u000d\u000a");
	            for (var i = 0; i < headerPairs.length; i++) {
	                var headerPair = headerPairs[i];
	                // Can't use split() here because it does the wrong thing
	                // if the header value has the string ": " in it.
	                var index = headerPair.indexOf("\u003a\u0020");
	                if (index > 0) {
	                    var key = headerPair.substring(0, index);
	                    var val = headerPair.substring(index + 2);
	                    headers[key] = val;
	                }
	            }
	        }
	        return headers;
	    };
	    /**
	     *
	     */
	    RestClient.prototype.createCORSRequest = function (method, url) {
	        var xhr = new XMLHttpRequest();
	        if ("withCredentials" in xhr) {
	            // Check if the XMLHttpRequest object has a "withCredentials" property.
	            // "withCredentials" only exists on XMLHTTPRequest2 objects.
	            xhr.open(method, url, true);
	        } /*else if (typeof XDomainRequest != "undefined") {

	                // Otherwise, check if XDomainRequest.
	                // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
	                xhr = new XDomainRequest();
	                xhr.open(method, url);

	            } else {

	                // Otherwise, CORS is not supported by the browser.
	                xhr = null;

	            }*/
	        return xhr;
	    };
	    /**
	     * @param  {string} method (GET,POST,PUT,DELETE)
	     * @param  {string} url
	     * @param  {any} [headers]
	     * @param  {any} [data]
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype._makeRequest = function (method, url, headers, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this.logger) {
	                _this.logger.log(method + "'ing " + url + "  ...");
	            }
	            var xhr = _this.createCORSRequest(method, url);
	            if (_this.logger) {
	                _this.logger.log("Created XMLHttpRequest ...");
	            }
	            if (headers !== undefined) {
	                _this.addHeaders(xhr, headers);
	            }
	            if (_this.logger) {
	                _this.logger.log("added headers", headers);
	            }
	            xhr.onload = function () {
	                if (_this.logger) {
	                    _this.logger.log("xhr.onload", xhr.responseText);
	                }
	                var succeeded = xhr.status >= 200 && xhr.status < 300;
	                var result = {
	                    headers: _this.getResponseHeaders(xhr),
	                    response: undefined,
	                    statusCode: xhr.status,
	                };
	                if (xhr.responseText) {
	                    try {
	                        result.response = JSON.parse(xhr.responseText);
	                        if (_this.logger) {
	                            _this.logger.log(method + "'ing to " + url + " returned this object: ", result.response);
	                        }
	                    }
	                    catch (e) {
	                        result.response = xhr.responseText;
	                        if (_this.logger) {
	                            _this.logger.log(method + "'ing to " + url + " returned this text: " + xhr.responseText);
	                        }
	                    }
	                }
	                if (succeeded) {
	                    resolve(result);
	                }
	                else {
	                    reject(result);
	                }
	            };
	            xhr.onerror = function () {
	                // There was a connection error of some sort
	                if (_this.logger) {
	                    _this.logger.log("xhr.onerror", xhr.responseText);
	                }
	                if (_this.logger) {
	                    _this.logger.error(method + "'ing to " + url + " failed");
	                }
	                var result = {
	                    headers: _this.getResponseHeaders(xhr),
	                    response: xhr.responseText,
	                    statusCode: xhr.status,
	                };
	                reject(result);
	            };
	            xhr.onreadystatechange = function (evt) {
	                if (_this.logger) {
	                    _this.logger.log("onreadystatechange: " + _this._readyStates[xhr.readyState] + " [status=" + xhr.status + "]");
	                }
	            };
	            xhr.onabort = function (evt) {
	                if (_this.logger) {
	                    _this.logger.log("onabort", evt);
	                }
	            };
	            xhr.send(data ? JSON.stringify(data) : null);
	            if (_this.logger) {
	                _this.logger.log("send data", data);
	            }
	        });
	    };
	    /**
	     * @param  {string} method (GET,POST,PUT,DELETE)
	     * @param  {string} url
	     * @param  {any} [headers]
	     * @param  {any} [data]
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype.makeRequest = function (method, url, headers, data) {
	        var self = this;
	        headers = headers || {};
	        // We want this as a default default ...
	        if (!headers["Content-Type"]) {
	            headers["Content-Type"] = "application/json";
	        }
	        // Edge wants to cache requests by default ...
	        if (!headers["Cache-Control"]) {
	            headers["Cache-Control"] = "no-cache";
	        }
	        function recurse(i) {
	            return self._makeRequest(method, url, headers, data)
	                .catch(function (result) {
	                // TODO: refactor max retry count into some config ...
	                if (i < 3 && result.statusCode === 401 && self.networkManager) {
	                    // the old session is just dead so ending it is not reuired ...
	                    //  - the old websocket will still be connected and needs to be cleanly disconnected 
	                    // TODO: add a restartSession()which encapsuates this logic ?
	                    return self.networkManager.restartSession()
	                        .then(function (sessionInfo) {
	                        headers.authorization = "Bearer " + sessionInfo.token;
	                        return recurse(++i);
	                    });
	                }
	                throw result;
	            });
	        }
	        return recurse(0);
	    };
	    return RestClient;
	})();
	exports.RestClient = RestClient;
	//# sourceMappingURL=restClient.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var restClient_1 = __webpack_require__(4);
	var AuthenticatedRestClient = (function (_super) {
	    __extends(AuthenticatedRestClient, _super);
	    /**
	     * AuthenticatedRestClient class constructor.
	     * @class AuthenticatedRestClient
	     * @ignore
	     * @classdesc Class that implements an Authenticated RestClient.
	     * @param {ILogger} logger - the logger
	     * @param {INetworkManager} networkManager - the Network Manager
	     */
	    function AuthenticatedRestClient(logger, networkManager) {
	        _super.call(this, logger, networkManager);
	    }
	    /**
	     * Method to make a GET request
	     * @method AuthenticatedRestClient#get
	     * @param  {string} url
	     * @param  {any} [headers]
	     * @returns {Promise} - returns a promise
	     */
	    AuthenticatedRestClient.prototype.get = function (url, headers) {
	        var _this = this;
	        headers = headers || {};
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _super.prototype.get.call(_this, url, headers);
	        });
	    };
	    /**
	     * Method to make a POST request
	     * @method AuthenticatedRestClient#post
	     * @param  {string} url
	     * @param  {any} data
	     * @param  {any} headers
	     * @returns {Promise} - returns a promise
	     */
	    AuthenticatedRestClient.prototype.post = function (url, headers, data) {
	        var _this = this;
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _super.prototype.post.call(_this, url, headers, data);
	        });
	    };
	    /**
	     * Method to make a PATCH request
	     * @method AuthenticatedRestClient#patch
	     * @param  {string} url
	     * @param  {any} data
	     * @param  {any} headers
	     * @returns {Promise} - returns a promise
	     */
	    AuthenticatedRestClient.prototype.patch = function (url, headers, data) {
	        var _this = this;
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _super.prototype.patch.call(_this, url, headers, data);
	        });
	    };
	    /**
	     * Method to make a PUT request
	     * @method AuthenticatedRestClient#put
	     * @param  {string} url
	     * @param  {any} headers
	     * @param  {any} data
	     * @returns {Promise} - returns a promise
	     */
	    AuthenticatedRestClient.prototype.put = function (url, headers, data) {
	        var _this = this;
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _super.prototype.put.call(_this, url, headers, data);
	        });
	    };
	    /**
	     * Method to make a DELETE request
	     * @method AuthenticatedRestClient#delete
	     * @param  {string} url
	     * @param  {any} headers
	     * @returns {Promise} - returns a promise
	     */
	    AuthenticatedRestClient.prototype.delete = function (url, headers) {
	        var _this = this;
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _super.prototype.delete.call(_this, url, headers);
	        });
	    };
	    /**
	     * Method to create an auth header from a token
	     * @method AuthenticatedRestClient#constructAUthHeader
	     * @param {string} token
	     * @returns {string} - returns the auth header
	     */
	    AuthenticatedRestClient.prototype.constructAUthHeader = function (token) {
	        return "Bearer " + token;
	    };
	    return AuthenticatedRestClient;
	})(restClient_1.RestClient);
	exports.AuthenticatedRestClient = AuthenticatedRestClient;
	//# sourceMappingURL=authenticatedRestClient.js.map

/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
	 * http://blog.vanamco.com/indexeddb-fundamentals-plus-a-indexeddb-example-tutorial/
	 * http://code.tutsplus.com/tutorials/working-with-indexeddb--net-34673
	 */
	var IndexedDBLogger = (function () {
	    /**
	     * IndexedDBLogger class constructor.
	     * @class IndexedDBLogger
	     * @ignore
	     * @classdesc Class that implements an IndexedDBLogger.
	     * @param {string} name - database name (for overriding in unit tests)
	     */
	    function IndexedDBLogger(name) {
	        this.idbSupported = "indexedDB" in window;
	        this._name = "Comapi";
	        this._version = 1;
	        this._store = "Logs";
	        if (name) {
	            this._name = name;
	        }
	    }
	    /**
	     * Method to open a connection to the database
	     * @method IndexedDBLogger#openDatabase
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.openDatabase = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this.idbSupported) {
	                var self_1 = _this;
	                var openRequest = indexedDB.open(_this._name, _this._version);
	                openRequest.onupgradeneeded = function (e) {
	                    console.log("Upgrading database...");
	                    var thisDB = e.target.result;
	                    if (!thisDB.objectStoreNames.contains(self_1._store)) {
	                        var os = thisDB.createObjectStore(self_1._store, { autoIncrement: true });
	                        os.createIndex("created", "created", { unique: false });
	                    }
	                };
	                openRequest.onsuccess = function (e) {
	                    self_1._database = e.target.result;
	                    resolve(true);
	                };
	                openRequest.onerror = function (e) {
	                    reject({ message: "IndexedDBLogger.open failed : " + e.target.error.name });
	                };
	            }
	            else {
	                reject({ message: "IndexedDBLogger not supported on this platform" });
	            }
	        });
	    };
	    /**
	     * Removes all records older than specified date
	     * @method IndexedDBLogger#purge
	     * @param {Date} date threshold (messages older than this will be deleted)
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.purge = function (when) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._database) {
	                var transaction = _this._database.transaction([_this._store], "readwrite");
	                var objectStore = transaction.objectStore(_this._store);
	                var index = objectStore.index("created");
	                // we want all keys less than this date
	                var keyRangeValue = IDBKeyRange.upperBound(when.valueOf());
	                index.openCursor(keyRangeValue).onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    if (cursor) {
	                        objectStore["delete"](cursor.primaryKey);
	                        cursor["continue"]();
	                    }
	                    else {
	                        // should be all deleted 
	                        resolve(true);
	                    }
	                };
	            }
	            else {
	                reject({ message: "Database not open" });
	            }
	        });
	    };
	    /**
	     * Method to delete a database
	     * @method IndexedDBLogger#deleteDatabase
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.deleteDatabase = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var req = indexedDB.deleteDatabase(_this._name);
	            var self = _this;
	            req.onsuccess = function () {
	                console.log("Deleted database " + self._name + " successfully");
	                resolve(true);
	            };
	            req.onerror = function (e) {
	                reject({ message: "Couldn't delete database " + self._name + " : " + e.target.error.name });
	            };
	            req.onblocked = function () {
	                console.warn("Couldn't delete database " + self._name + " due to the operation being blocked");
	            };
	        });
	    };
	    /**
	     * Method to clear the data in an object store
	     * @method IndexedDBLogger#clearData
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.clearData = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._database) {
	                // open a read/write db transaction, ready for clearing the data
	                var transaction = _this._database.transaction([_this._store], "readwrite");
	                transaction.onerror = function (event) {
	                    console.error("Transaction not opened due to error: " + transaction.error);
	                };
	                // create an object store on the transaction
	                var objectStore = transaction.objectStore(_this._store);
	                // clear all the data out of the object store
	                var objectStoreRequest = objectStore.clear();
	                objectStoreRequest.onsuccess = function (event) {
	                    resolve(true);
	                };
	                objectStoreRequest.onerror = function (e) {
	                    reject({ message: "Failed to clear object store: " + e.target.error.name });
	                };
	            }
	            else {
	                reject({ message: "Database not open" });
	            }
	        });
	    };
	    /**
	     * Method to get all or the first n objects in an object store
	     * @method IndexedDBLogger#getData
	     * @param {number} [count] - number of records to query - retrieves all if not specified
	     * @param {boolean} [getIndexes] - whether to add the key into the returned record - doesn'tadd by default
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.getData = function (count, getIndexes) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._database) {
	                var transaction = _this._database.transaction([_this._store], "readonly");
	                var objectStore = transaction.objectStore(_this._store);
	                var cursorRequest = objectStore.openCursor();
	                var numRetrieved = 0;
	                var data = [];
	                cursorRequest.onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    numRetrieved++;
	                    if (cursor) {
	                        var record = cursor.value;
	                        if (getIndexes === true) {
	                            record.key = cursor.key;
	                        }
	                        data.push(cursor.value);
	                        if (numRetrieved && numRetrieved >= count) {
	                            resolve(data);
	                        }
	                        else {
	                            cursor.continue();
	                        }
	                    }
	                    else {
	                        resolve(data);
	                    }
	                };
	                cursorRequest.onerror = function (e) {
	                    reject({ message: "Failed to openCursor: " + e.target.error.name });
	                };
	            }
	            else {
	                reject({ message: "Database not open" });
	            }
	        });
	    };
	    /**
	     * Method to get the count of objects in the object store
	     * @method IndexedDBLogger#getCount
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.getCount = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._database) {
	                var transaction = _this._database.transaction([_this._store], "readonly");
	                var objectStore = transaction.objectStore(_this._store);
	                var count = objectStore.count();
	                count.onerror = function (e) {
	                    reject({ message: "Failed to get count: " + e.target.error.name });
	                };
	                count.onsuccess = function () {
	                    resolve(count.result);
	                };
	            }
	            else {
	                reject({ message: "Database not open" });
	            }
	        });
	    };
	    /**
	     * Method to close a database connection
	     * @method IndexedDBLogger#closeDatabase
	     */
	    IndexedDBLogger.prototype.closeDatabase = function () {
	        if (this._database) {
	            this._database.close();
	        }
	    };
	    /**
	     * Method to add a record to a previously opened indexed database
	     * @method IndexedDBLogger#addRecord
	     * @param {Object} entity - The entity
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.addRecord = function (entity) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._database) {
	                var transaction = _this._database.transaction([_this._store], "readwrite");
	                var store = transaction.objectStore(_this._store);
	                // Perform the add
	                var request = store.add(entity);
	                request.onerror = function (e) {
	                    console.error("Error", e.target.error.name);
	                    reject({ message: "add failed: " + e.target.error.name });
	                };
	                request.onsuccess = function (e) {
	                    // http://stackoverflow.com/questions/12502830/how-to-return-auto-increment-id-from-objectstore-put-in-an-indexeddb
	                    // returns auto incremented id ...
	                    resolve(e.target.result);
	                };
	            }
	            else {
	                reject({ message: "Database not open" });
	            }
	        });
	    };
	    return IndexedDBLogger;
	})();
	exports.IndexedDBLogger = IndexedDBLogger;
	//# sourceMappingURL=indexedDBLogger.js.map

/***/ },
/* 7 */
/***/ function(module, exports) {

	var LocalStorageData = (function () {
	    /**
	     * LocalStorageData class constructor.
	     * @class LocalStorageData
	     * @ignore
	     * @classdesc Class that implements Local storage access.
	     * @param  {string} [prefix]
	     */
	    function LocalStorageData(prefix) {
	        this._prefix = "comapi.";
	        if (prefix) {
	            this._prefix = prefix;
	        }
	    }
	    /**
	     * Get raw value as string from local storage.
	     * @method LocalStorageData#getString
	     * @param {String} key - the key
	     * @returns (String) - the raw string value
	     */
	    LocalStorageData.prototype.getString = function (key) {
	        return localStorage.getItem(this._prefix + key);
	    };
	    /**
	     * Set raw value as string to local storage.
	     * @method LocalStorageData#setString
	     * @param {String} key - the key
	     * @param {String} value - the value
	     */
	    LocalStorageData.prototype.setString = function (key, value) {
	        localStorage.setItem(this._prefix + key, value);
	    };
	    /**
	     * Get value as object .
	     * @method LocalStorageData#getObject
	     * @param  {string} key
	     * @returns {Object} - the value Object
	     */
	    LocalStorageData.prototype.getObject = function (key) {
	        var obj = null;
	        var raw = this.getString(key);
	        try {
	            obj = JSON.parse(raw);
	        }
	        catch (e) {
	            console.error("caught exception in LocalStorageData.get(" + key + "): " + e);
	        }
	        return obj;
	    };
	    /**
	     * Set value as object.
	     * @method LocalStorageData#setObject
	     * @param  {string} key
	     * @param  {Object} data
	     * @returns {boolean} - returns boolean value representing success
	     */
	    LocalStorageData.prototype.setObject = function (key, data) {
	        var succeeded = true;
	        try {
	            var stringified = JSON.stringify(data);
	            this.setString(key, stringified);
	        }
	        catch (e) {
	            console.log("caught exception in LocalStorageData.set(" + key + "): " + e);
	            succeeded = false;
	        }
	        return succeeded;
	    };
	    /**
	     * Remove a value from local storage.
	     * @method LocalStorageData#remove
	     * @param  {string} key
	     */
	    LocalStorageData.prototype.remove = function (key) {
	        try {
	            localStorage.removeItem(this._prefix + key);
	        }
	        catch (e) {
	            console.error("caught exception in LocalStorageData.remove(" + key + "): " + e);
	        }
	    };
	    return LocalStorageData;
	})();
	exports.LocalStorageData = LocalStorageData;
	//# sourceMappingURL=localStorageData.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var utils_1 = __webpack_require__(9);
	var SessionManager = (function () {
	    /**
	     * SessionManager class constructor.
	     * @class SessionManager
	     * @ignore
	     * @classdesc Class that implements all the SessionManager functionality.
	     * @parameter {ILogger} logger
	     * @parameter {IRestClient} restClient
	     * @parameter {ILocalStorageData} localStorageData
	     * @parameter {IComapiConfig} comapiConfig
	     */
	    function SessionManager(_logger, _restClient, _localStorageData, _comapiConfig) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._deviceId = _localStorageData.getString("deviceId");
	        if (!this._deviceId) {
	            this._deviceId = utils_1.Utils.uuid();
	            _localStorageData.setString("deviceId", this._deviceId);
	        }
	        // Load in cached session on startup
	        this._getSession();
	    }
	    Object.defineProperty(SessionManager.prototype, "sessionInfo", {
	        /**
	         * Getter to get the current sessionInfo
	         * @method SessionManager#sessionInfo
	         * @returns {ISessionInfo}
	         */
	        get: function () {
	            return this._sessionInfo;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SessionManager.prototype, "expiry", {
	        /**
	         * Getter to get the current sessionInfo expiry time
	         * @method SessionManager#expiry
	         * @returns {string}
	         */
	        get: function () {
	            return this._sessionInfo.session.expiresOn;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SessionManager.prototype, "isActive", {
	        /**
	         * @method SessionManager#isActive
	         */
	        get: function () {
	            var result = false;
	            // check we have a token and also that the token hasn't expired ...
	            if (this._sessionInfo) {
	                var now = new Date();
	                var expiry = new Date(this._sessionInfo.session.expiresOn);
	                if (now < expiry) {
	                    result = true;
	                }
	                else {
	                    this._removeSession();
	                }
	            }
	            return result;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Function to get auth token
	     * @method SessionManager#token
	     * @returns {Promise} - returns the auth token via a promise
	     */
	    SessionManager.prototype.getValidToken = function () {
	        return this.isActive
	            ? Promise.resolve(this._sessionInfo.token)
	            : this.startSession()
	                .then(function (sessionInfo) {
	                return Promise.resolve(sessionInfo.token);
	            });
	    };
	    /**
	     * Function to start a new session
	     * @method SessionManager#startSession
	     * @param {any} userDefined -  Additional client-specific information
	     * @returns {Promise} - Returns a promise
	     */
	    SessionManager.prototype.startSession = function () {
	        var _this = this;
	        var self = this;
	        return new Promise(function (resolve, reject) {
	            if (_this.isActive) {
	                self._logger.log("startSession() found an existing session: ");
	                resolve(_this._getSession());
	            }
	            else {
	                // call comapi service startAuth                
	                _this._startAuth().then(function (sessionStartResponse) {
	                    var authChallengeOptions = {
	                        nonce: sessionStartResponse.nonce
	                    };
	                    // call integrators auth challenge method
	                    self._comapiConfig.authChallenge(authChallengeOptions, function (jwt) {
	                        if (jwt) {
	                            self._createAuthenticatedSession(jwt, sessionStartResponse.authenticationId, {})
	                                .then(function (sessionInfo) {
	                                self._setSession(sessionInfo);
	                                // pass back to client
	                                resolve(sessionInfo);
	                            }).catch(function (error) {
	                                reject(error);
	                            });
	                        }
	                        else {
	                            // client failed to fulfil the auth challenge for some reason ...
	                            reject({ message: "Failed to get a JWT from authChallenge", statusCode: 401 });
	                        }
	                    });
	                }).catch(function (error) { return reject(error); });
	            }
	        });
	    };
	    /**
	     * Function to end the current session
	     * @method SessionManager#endSession
	     * @returns {Promise} - Returns a promise
	     */
	    SessionManager.prototype.endSession = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._sessionInfo) {
	                _this._endAuth()
	                    .then(function (result) {
	                    _this._removeSession();
	                    resolve(true);
	                }).catch(function (error) {
	                    _this._removeSession();
	                    reject(error);
	                });
	            }
	            else {
	                reject({ message: "No active session is present, create one before ending one" });
	            }
	        });
	    };
	    /**
	     * Internal function to create an authenticated session
	     * @param (String) jwt - the jwt retrieved from the integrator
	     * @param (String) authenticationId - the authenticationId given by comapi back end
	     * @param (Object) deviceInfo - the deviceInfo
	     * @returns {Promise} - Returns a promise
	     */
	    SessionManager.prototype._createAuthenticatedSession = function (jwt, authenticationId, deviceInfo) {
	        var browserInfo = utils_1.Utils.getBrowserInfo();
	        var data = {
	            authenticationId: authenticationId,
	            authenticationToken: jwt,
	            deviceId: this._deviceId,
	            platform: /*browserInfo.name*/ "javascript",
	            platformVersion: browserInfo.version,
	            sdkType: /*"javascript"*/ "native",
	            sdkVersion: "1.0.2.36"
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.sessions, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, data)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Internal function to start an authenticated session
	     * @returns {Promise} - Returns a promise
	     */
	    SessionManager.prototype._startAuth = function () {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.sessionStart, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Internal function to end an authenticated session
	     * @returns {Promise} - Returns a promise
	     */
	    SessionManager.prototype._endAuth = function () {
	        var headers = {
	            "Content-Type": "application/json",
	            "authorization": this.getAuthHeader(),
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.session, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.delete(url, headers)
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Internal function to load in an existing session if available
	     * @returns {ISessionInfo} - returns session info if available
	     */
	    SessionManager.prototype._getSession = function () {
	        var sessionInfo = this._localStorageData.getObject("session");
	        if (sessionInfo) {
	            this._sessionInfo = sessionInfo;
	        }
	        return sessionInfo;
	    };
	    /**
	     * Internal function to load in an existing session if available
	     * @returns {boolean} - returns boolean reault
	     */
	    SessionManager.prototype._setSession = function (sessionInfo) {
	        var expiry = new Date(sessionInfo.session.expiresOn);
	        var now = new Date();
	        if (expiry < now) {
	            this._logger.error("Was given an expired token ;-(");
	        }
	        this._sessionInfo = sessionInfo;
	        this._localStorageData.setObject("session", sessionInfo);
	    };
	    /**
	     * Internal function to remove an existing session
	     * @returns {boolean} - returns boolean reault
	     */
	    SessionManager.prototype._removeSession = function () {
	        this._localStorageData.remove("session");
	        this._sessionInfo = undefined;
	    };
	    /**
	     *
	     */
	    SessionManager.prototype.getAuthHeader = function () {
	        return "Bearer " + this.sessionInfo.token;
	    };
	    return SessionManager;
	})();
	exports.SessionManager = SessionManager;
	//# sourceMappingURL=sessionManager.js.map

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Utility class
	 */
	var Utils = (function () {
	    /**
	     * @class Utils
	     * @ignore
	     * @classdesc Class that implements a Utils.
	     */
	    function Utils() {
	        throw new Error("Cannot new this class");
	    }
	    /**
	     * Function to clone an object
	     * @method Utils#clone
	     * @param {any} obj - the object to clone
	     * @returns {any} - returns a clone of the object
	     */
	    Utils.clone = function (obj) {
	        return JSON.parse(JSON.stringify(obj));
	    };
	    /**
	     * Method to generate a uuid (simulated)
	     * @method Utils#uuid
	     * @returns {string} - returns a uuid
	     */
	    Utils.uuid = function () {
	        var d = new Date().getTime();
	        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
	            var r = (d + Math.random() * 16) % 16 | 0;
	            d = Math.floor(d / 16);
	            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
	        });
	        return uuid;
	    };
	    /**
	     * Internal method to get current browser info
	     * @method Utils#getBrowserInfo
	     * @param {string} [userAgent] - user agent string (optional - for unit tsting)
	     * @returns {IBrowserInfo} - returns an IBrowserInfo interface
	     */
	    Utils.getBrowserInfo = function (userAgent) {
	        var ua = userAgent !== undefined ? userAgent : navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	        if (/trident/i.test(M[1])) {
	            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
	            return {
	                name: "IE",
	                version: tem[1] || ""
	            };
	        }
	        if (M[1] === "Chrome") {
	            tem = ua.match(/\bOPR\/(\d+)/);
	            if (tem !== null) {
	                return {
	                    name: "Opera",
	                    version: tem[1]
	                };
	            }
	        }
	        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
	        tem = ua.match(/version\/(\d+)/i);
	        if (tem !== null) {
	            M.splice(1, 1, tem[1]);
	        }
	        return {
	            name: M[0],
	            version: M[1]
	        };
	    };
	    /**
	     * Method to call some async function on an array of data and you want them called sequentially
	     * @param {any[]} arr
	     * @param {Function} iteratorFn
	     * @returns {Promise} - returns a Promise
	     */
	    Utils.eachSeries = function (arr, iteratorFn) {
	        return arr.reduce(function (p, item) {
	            return p.then(function () {
	                return iteratorFn(item);
	            });
	        }, Promise.resolve());
	    };
	    /**
	     * Method to encapsulate repeatdly calling an async method until a condition is met (tyoes defined at top)
	     * @param {DoUntilOperationFunction} operation - the operation to perform
	     * @param {DoUntilTestFunction} test - the condition that stops the repeats
	     * @param {any} data - the data
	     */
	    Utils.doUntil = function (operation, test, data) {
	        return operation(data)
	            .then(function (rslt) {
	            return test(rslt) ? Utils.doUntil(operation, test, rslt) : rslt;
	        });
	    };
	    /**
	     * Mustache/handlebars style formatting ...
	     * @param {string} content
	     * @param {Object} tags
	     */
	    Utils.format = function (content, tags) {
	        return content.replace(/{{(.*?)}}/g, function (tag, key) {
	            var replacement = false;
	            if (typeof tags[key] === "string") {
	                replacement = tags[key];
	            }
	            if (typeof replacement === "string") {
	                return replacement;
	            }
	            else {
	                return tag;
	            }
	        });
	    };
	    return Utils;
	})();
	exports.Utils = Utils;
	;
	//# sourceMappingURL=utils.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var interfaces_1 = __webpack_require__(1);
	var utils_1 = __webpack_require__(9);
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
	        return utils_1.Utils.format(this._comapiConfig.foundationRestUrls.push, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            sessionId: sessionId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	    };
	    return DeviceManager;
	})();
	exports.DeviceManager = DeviceManager;
	//# sourceMappingURL=deviceManager.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var utils_1 = __webpack_require__(9);
	var FacebookManager = (function () {
	    /**
	     * FacebookManager class constructor.
	     * @class FacebookManager
	     * @ignore
	     * @classdesc Class that implements all the FacebookManager functionality.
	     * @parameter {IRestClient} restClient
	     * @parameter {IComapiConfig} comapiConfig
	     */
	    function FacebookManager(_restClient, _comapiConfig) {
	        this._restClient = _restClient;
	        this._comapiConfig = _comapiConfig;
	    }
	    /**
	     * @param {any} [data] - the data to post
	     */
	    FacebookManager.prototype.createSendToMessengerState = function (data) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.facebook, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, data || {});
	    };
	    return FacebookManager;
	})();
	exports.FacebookManager = FacebookManager;
	//# sourceMappingURL=facebookManager.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var utils_1 = __webpack_require__(9);
	var ProfileManager = (function () {
	    /**
	     * ProfileManager class constructor.
	     * @class ProfileManager
	     * @ignore
	     * @classdesc Class that implements Profile Management.
	     * @parameter {ILogger} logger
	     * @parameter {IRestClient} restClient
	     * @parameter {ILocalStorageData} localStorageData
	     * @parameter {IComapiConfig} comapiConfig
	     * @parameter {ISessionManager} sessionManager
	     */
	    function ProfileManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._sessionManager = _sessionManager;
	    }
	    /**
	     * Function to retrieve a user's profile
	     * @method ProfileManager#getProfile
	     * @param {string} id
	     * @returns {Promise}
	     */
	    ProfileManager.prototype.getProfile = function (id) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profile, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            profileId: id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url);
	    };
	    /**
	     * Function to query for a list of profiles matching the search criteria
	     * @method ProfileManager#getProfile
	     * @param {string} [query] - See https://www.npmjs.com/package/mongo-querystring for query syntax.
	     * @returns {Promise}
	     */
	    ProfileManager.prototype.queryProfiles = function (query) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profiles, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        if (query) {
	            url += ("?" + query);
	        }
	        return this._restClient.get(url);
	    };
	    /**
	     * Function to update a profile
	     * @method ProfileManager#updateProfile
	     * @param {string} id
	     * @param {Object} profile
	     * @param {string} [eTag]
	     * @returns {Promise}
	     */
	    ProfileManager.prototype.updateProfile = function (id, profile, eTag) {
	        var headers = {};
	        if (eTag) {
	            headers["If-Match"] = eTag;
	        }
	        // take a copy of it prior to messing with it ...
	        var data = utils_1.Utils.clone(profile);
	        if (data.id === undefined) {
	            data.id = id;
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profile, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            profileId: id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.put(url, headers, data);
	    };
	    /**
	     * Function to patch a profile
	     * @method ProfileManager#updateProfile
	     * @param {string} id
	     * @param {Object} profile
	     * @param {string} [eTag]
	     * @returns {Promise}
	     */
	    ProfileManager.prototype.patchProfile = function (id, profile, eTag) {
	        var headers = {};
	        if (eTag) {
	            headers["If-Match"] = eTag;
	        }
	        // take a copy of it prior to messing with it ...
	        var data = utils_1.Utils.clone(profile);
	        if (data.id === undefined) {
	            data.id = id;
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profile, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            profileId: id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.patch(url, headers, data);
	    };
	    return ProfileManager;
	})();
	exports.ProfileManager = ProfileManager;
	//# sourceMappingURL=profileManager.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var utils_1 = __webpack_require__(9);
	var MessageManager = (function () {
	    /**
	     * MessagesManager class constructor.
	     * @class MessagesManager
	     * @ignore
	     * @classdesc Class that implements Messages Management.
	     * @parameter {ILogger} logger
	     * @parameter {IRestClient} restClient
	     * @parameter {ILocalStorageData} localStorageData
	     * @parameter {IComapiConfig} comapiConfig
	     * @parameter {ISessionManager} sessionManager
	     * @parameter {IChannelManager} channelManager
	     */
	    function MessageManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager, _conversationManager) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._sessionManager = _sessionManager;
	        this._conversationManager = _conversationManager;
	    }
	    /**
	     * @method MessagesManager#getConversationEvents
	     * @param {string} conversationId
	     * @param {number} from
	     * @param {number} limit
	     * @returns {Promise}
	     */
	    MessageManager.prototype.getConversationEvents = function (conversationId, from, limit) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.events, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        url += "?from=" + from;
	        url += "&limit=" + limit;
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * @method MessagesManager#getConversationMessages
	     * @param {string} conversationId
	     * @param {number} limit
	     * @param {number} [from]
	     * @returns {Promise}
	     */
	    MessageManager.prototype.getConversationMessages = function (conversationId, limit, from) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.messages, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        url += "?limit=" + limit;
	        if (from !== undefined) {
	            url += "&from=" + from;
	        }
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * @deprecated - use methd that uses IConversationDetails / ConversationBuilder
	     * @method MessagesManager#sendMessageToConversation
	     * @parameter {String} conversationId
	     * @parameter {Object} metadata
	     * @parameter {IMessagePart[]} parts
	     * @parameter {IMessageAlert} alert
	     * @returns {Promise}
	     */
	    MessageManager.prototype._sendMessageToConversation = function (conversationId, metadata, parts, alert) {
	        var request = {
	            alert: alert,
	            metadata: metadata,
	            parts: parts,
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.messages, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, request)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * @method MessagesManager#sendMessageToConversation2
	     * @parameter {string} conversationId
	     * @parameter {IConversationMessage} message
	     */
	    MessageManager.prototype.sendMessageToConversation = function (conversationId, message) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.messages, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, message)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * @method MessagesManager#sendMessageStatusUpdates
	     * @param {string} conversationId
	     * @param {IMessageStatus[]} statuses
	     * @returns {Promise}
	     */
	    MessageManager.prototype.sendMessageStatusUpdates = function (conversationId, statuses) {
	        var headers = {
	            "Content-Type": "application/json",
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.statusUpdates, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, headers, statuses)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    return MessageManager;
	})();
	exports.MessageManager = MessageManager;
	//# sourceMappingURL=messageManager.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// import { IndexedDBOrphanedEventManager } from "./indexedDBOrphanedEventManager";
	// import { LocalStorageOrphanedEventManager } from "./LocalStorageOrphanedEventManager";
	var utils_1 = __webpack_require__(9);
	var MessagePager = (function () {
	    /**
	     * MessagePager class constructor.
	     * @class MessagePager
	     * @ignore
	     * @classdesc Class that implements Conversation Message Pagination.
	     * @parameter {ILogger} _logger
	     * @parameter {ILocalStorageData} _localStorage
	     * @parameter {IMessageManager} _messageManager
	     */
	    function MessagePager(_logger, _localStorage, _messageManager, _orphanedEventManager) {
	        this._logger = _logger;
	        this._localStorage = _localStorage;
	        this._messageManager = _messageManager;
	        this._orphanedEventManager = _orphanedEventManager;
	    }
	    /**
	     * Get a page of messages, internally deal with orphaned events etc ...
	     * @method MessagePager#getMessages
	     * @param {string} id - the conversationId
	     * @param {number} pageSize - the page size
	     * @param {number} [continuationToken] - the continuation token (optional - if not specified then retrieve from the end)
	     * @returns {Promise<any>} - TODO: incorporate continuationToken into respose
	     */
	    MessagePager.prototype.getMessages = function (conversationId, pageSize, continuationToken) {
	        var _this = this;
	        if (continuationToken <= 0) {
	            return Promise.reject({ message: "All messages from conversation " + conversationId + " have been loaded" });
	        }
	        var _continuationToken = null;
	        var _conversationMessagesResult;
	        // 1) get info & Validate
	        return this._orphanedEventManager.getContinuationToken(conversationId)
	            .then(function (token) {
	            _continuationToken = token;
	            if (continuationToken !== undefined) {
	                // check the continuationToken is correct
	                if (_continuationToken !== continuationToken) {
	                    // get rid of our cached events as they are now useless
	                    // return this._orphanedEventManager.clear(conversationId)
	                    // .then(() => {
	                    return Promise.reject({ message: "Invalid continuation token: " + continuationToken + " for " + conversationId + ", you nust start from the end" });
	                }
	                else {
	                    return Promise.resolve(true);
	                }
	            }
	            else {
	                // reset the store as they want to go from the beginning 
	                return _this._orphanedEventManager.clear(conversationId);
	            }
	        })
	            .then(function () {
	            return _this._messageManager.getConversationMessages(conversationId, pageSize, continuationToken);
	        })
	            .then(function (result) {
	            _conversationMessagesResult = result;
	            if (result.messages === undefined) {
	                _this._logger.log("No messages in this channel yet");
	                return Promise.resolve({ messages: [] });
	            }
	            else {
	                // merge any events we got from the call to getConversationMessages with whats in the store
	                return _this.getOrphanedEvents(conversationId, _conversationMessagesResult.orphanedEvents)
	                    .then(function (orphanedEvents) {
	                    return _this.applyOrphanedEvents(_conversationMessagesResult.messages, orphanedEvents);
	                })
	                    .then(function () {
	                    // update continuation token for this conv 
	                    _continuationToken = _conversationMessagesResult.earliestEventId - 1;
	                    return _this._orphanedEventManager.setContinuationToken(conversationId, _continuationToken);
	                })
	                    .then(function () {
	                    return Promise.resolve({
	                        continuationToken: _continuationToken,
	                        earliestEventId: _conversationMessagesResult.earliestEventId,
	                        latestEventId: _conversationMessagesResult.latestEventId,
	                        messages: _conversationMessagesResult.messages,
	                    });
	                });
	            }
	        });
	    };
	    /**
	     * Method to append a new batch of orphaned events to the store and then return them all ..
	     * @param {string} conversationId
	     * @param {any[]} orphanedEvents
	     * @returns {Promise<IConversationMessageEvent[]>}
	     */
	    MessagePager.prototype.getOrphanedEvents = function (conversationId, orphanedEvents) {
	        var _this = this;
	        var mapped = orphanedEvents.map(function (e) { return _this.mapOrphanedEvent(e); });
	        // add them into the store 
	        return utils_1.Utils.eachSeries(mapped, function (event) {
	            return _this._orphanedEventManager.addOrphanedEvent(event);
	        })
	            .then(function (done) {
	            // get the store 
	            return _this._orphanedEventManager.getOrphanedEvents(conversationId);
	        });
	    };
	    /**
	     * Function to iterate through a bunch of messages and mark as delivered as appropriate - NOTE: this is automatically called by  AppMessaging.getMessages()
	     * @method MessagePager#markMessagesAsDelivered
	     * @param {string} id - the conversationId
	     * @param {Object[]} messages - the messages to check
	     * @param {string} uerId - the userId
	     * @returns {Promise}
	     */
	    MessagePager.prototype.markMessagesAsDelivered = function (id, messages, userId) {
	        var messageIds = [];
	        for (var _i = 0; _i < messages.length; _i++) {
	            var message = messages[_i];
	            // only look at messages that I haven't sent ...
	            if (message.context && message.context.from && message.context.from.id !== userId) {
	                var alreadyDelivered = false;
	                if (message.statusUpdates && message.statusUpdates[userId]) {
	                    // status will be delivered then read i.e. if read, it was delivered
	                    if (message.statusUpdates[userId].status === "delivered" ||
	                        message.statusUpdates[userId].status === "read") {
	                        alreadyDelivered = true;
	                    }
	                }
	                if (!alreadyDelivered) {
	                    messageIds.unshift(message.id);
	                }
	            }
	        }
	        if (messageIds.length > 0) {
	            var statusUpdate = {
	                messageIds: messageIds,
	                status: "delivered",
	                timestamp: new Date().toISOString()
	            };
	            return this._messageManager.sendMessageStatusUpdates(id, [statusUpdate]);
	        }
	        else {
	            // TODO: status update response id currently "OK" ROFL ...
	            return Promise.resolve("OK");
	        }
	    };
	    /**
	     * Method to reset any cached info abut a conversation
	     */
	    MessagePager.prototype.resetConversation = function (conversationId) {
	        return this._orphanedEventManager.clear(conversationId);
	    };
	    /**
	     * Orphaned events must be applied in ascending order, so if we want to loop backwards through these they need to be sorted
	     * by id descending
	     */
	    MessagePager.prototype.applyOrphanedEvents = function (messages, orphanedEvents) {
	        var _this = this;
	        return utils_1.Utils.eachSeries(orphanedEvents, function (event) {
	            if (_this.playEvent(event, messages)) {
	                _this._logger.log("succesfuly played event " + event.conversationEventId);
	                return _this._orphanedEventManager.removeOrphanedEvent(event);
	            }
	            else {
	                _this._logger.warn("failed to play event " + event.conversationEventId, event);
	                return Promise.resolve(false);
	            }
	        });
	    };
	    /**
	     *
	     */
	    MessagePager.prototype.playEvent = function (event, messages) {
	        var played = false;
	        // find message in array
	        var found = messages.filter(function (message) { return message.id === event.payload.messageId; });
	        var message;
	        if (found.length === 1) {
	            message = found[0];
	            played = true;
	        }
	        else if (found.length >= 1) {
	            this._logger.error("Found more than 1 message with same messageId: " + event.payload.messageId);
	        }
	        else {
	            this._logger.log("Message " + event.payload.messageId + " not found ...");
	        }
	        switch (event.name) {
	            case "conversationMessage.read":
	                {
	                    if (message) {
	                        // apply status update - read overwrites delivered
	                        message.statusUpdates[event.payload.profileId] = {
	                            "status": "read",
	                            "on": event.payload.timestamp
	                        };
	                    }
	                }
	                break;
	            case "conversationMessage.delivered":
	                {
	                    if (message) {
	                        // apply status update - read overwrites delivered
	                        var updateForProfileId = message.statusUpdates[event.payload.profileId];
	                        if (updateForProfileId && updateForProfileId.status === "read") {
	                            this._logger.log("Message already marked as read, not marking as delivered");
	                        }
	                        else {
	                            message.statusUpdates[event.payload.profileId] = {
	                                "status": "delivered",
	                                "on": event.payload.timestamp
	                            };
	                        }
	                    }
	                }
	                break;
	            default:
	                this._logger.error("Unknown eventName " + event.name + " for messageId: " + event.payload.messageId);
	                break;
	        }
	        return played;
	    };
	    /*
	        An event from the websocket / event api ...
	        ============================================
	        {
	            "eventId": "4ea0489c-5bab-42e2-883c-5545f8444b80",
	            "name": "conversationMessage.delivered",
	            "conversationId": "7489e390-62b4-4812-a866-ea9499f7e28e",
	            "conversationEventId": 3,
	            "payload": {
	                "messageId": "4a0fbb0f-7693-47a8-9628-18bef4c69f10",
	                "conversationId": "7489e390-62b4-4812-a866-ea9499f7e28e",
	                "isPublicConversation": false,
	                "profileId": "alex",
	                "timestamp": "2016-11-08T12:25:24.774Z"
	            }
	        }


	        An orphaned event ...
	        ======================
	        {
	            "id": 54,
	            "data": {
	                "name": "delivered",
	                "payload": {
	                    "messageId": "3008c899-c18d-410a-884e-c10a51632d3b",
	                    "conversationId": "bc24d5b0-b03c-4594-872b-510c4af81dfe",
	                    "isPublicConversation": false,
	                    "profileId": "alex",
	                    "timestamp": "2016-11-08T12:48:53.088Z"
	                },
	                "eventId": "8605dbd1-6a10-4405-8966-1eb7dfaefea4",
	                "profileId": "alex"
	            }
	        }
	     */
	    MessagePager.prototype.mapOrphanedEvent = function (event) {
	        var mapped = {};
	        mapped.conversationEventId = event.id;
	        mapped.name = "conversationMessage." + event.data.name;
	        mapped.eventId = event.data.eventId;
	        mapped.conversationId = event.data.payload.conversationId;
	        mapped.payload = event.data.payload;
	        return mapped;
	    };
	    return MessagePager;
	})();
	exports.MessagePager = MessagePager;
	//# sourceMappingURL=messagePager.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var interfaces_1 = __webpack_require__(1);
	var utils_1 = __webpack_require__(9);
	var ConversationManager = (function () {
	    /**
	     * ConversationManager class constructor.
	     * @class ConversationManager
	     * @ignore
	     * @classdesc Class that implements Conversation Management.
	     * @parameter {ILogger} logger
	     * @parameter {IRestClient} restClient
	     * @parameter {ILocalStorageData} localStorageData
	     * @parameter {IComapiConfig} ComapiConfig
	     * @parameter {ISessionManager} sessionManager
	     */
	    function ConversationManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._sessionManager = _sessionManager;
	        //  This object is an in-memory dictionary of last sent timestamps (conversationId: timestamp) ...
	        //  "FA93AA1B-DEA5-4182-BE67-3DEAF4021040": "2017-02-28T14:48:21.634Z"
	        this.isTypingInfo = {};
	        // same for typing off 
	        this.isTypingOffInfo = {};
	    }
	    /**
	     * Function to create a onversation
	     * @method ConversationManager#createConversation
	     * @param {IConversationDetails} conversationDetails
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.createConversation = function (conversationDetails) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversations, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, conversationDetails)
	            .then(function (result) {
	            result.response._etag = result.headers.ETag;
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Function to update a conversation
	     * @method ConversationManager#updateConversation
	     * @param {IConversationDetails} conversationDetails
	     * @param {string} [eTag] - the eTag
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.updateConversation = function (conversationDetails, eTag) {
	        var headers = {};
	        if (eTag) {
	            headers["if-match"] = eTag;
	        }
	        var args = {
	            description: conversationDetails.description,
	            isPublic: conversationDetails.isPublic,
	            name: conversationDetails.name,
	            roles: conversationDetails.roles,
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversation, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationDetails.id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.put(url, headers, args)
	            .then(function (result) {
	            result.response._etag = result.headers.ETag;
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Function to get a conversation
	     * @method ConversationManager#getConversation
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.getConversation = function (conversationId) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversation, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url)
	            .then(function (result) {
	            result.response._etag = result.headers.ETag;
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Function to delete a conversation
	     * @method ConversationManager#deleteConversation
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.deleteConversation = function (conversationId) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversation, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.delete(url, {})
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Function to add participants to a conversation
	     * @method ConversationManager#addParticipantsToConversation
	     * @param {string} conversationId
	     * @param {IConversationParticipant[]} participants
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.addParticipantsToConversation = function (conversationId, participants) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.participants, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, participants)
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Function to remove participants to a conversation
	     * @method ConversationManager#deleteParticipantsFromConversation
	     * @param {string} conversationId
	     * @param {string[]} participants
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.deleteParticipantsFromConversation = function (conversationId, participants) {
	        var query = "";
	        for (var i = 0; i < participants.length; i++) {
	            query += (i === 0 ? "?id=" + participants[i] : "&id=" + participants[i]);
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.participants, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.delete(url + query, {})
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Function to get participantss in a conversation
	     * @method ConversationManager#getParticipantsInConversation
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.getParticipantsInConversation = function (conversationId) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.participants, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * @method ConversationManager#getConversations
	     * @param {ConversationScope} [scope]
	     * @param {string} [profileId]
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.getConversations = function (scope, profileId) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversations, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        if (scope || profileId) {
	            url += "?";
	            if (scope !== undefined) {
	                url += "scope=" + interfaces_1.ConversationScope[scope] + "&";
	            }
	            if (profileId !== undefined) {
	                url += "profileId=" + profileId;
	            }
	        }
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Function to send an is-typing event
	     * @method ConversationManager#sendIsTyping
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.sendIsTyping = function (conversationId) {
	        var _this = this;
	        // we only want to call this once every n seconds (10?)
	        if (this.isTypingInfo[conversationId]) {
	            var lastSentTime = new Date(this.isTypingInfo[conversationId]);
	            var now = new Date();
	            var diff = (now.getTime() - lastSentTime.getTime()) / 1000;
	            if (diff < (this._comapiConfig.isTypingTimeout || 10)) {
	                return Promise.resolve(false);
	            }
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.typing, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, {})
	            .then(function (result) {
	            _this.isTypingInfo[conversationId] = new Date().toISOString();
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Function to send an is-typing off event
	     * @method ConversationManager#sendIsTyping
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.sendIsTypingOff = function (conversationId) {
	        var _this = this;
	        // we only want to call this once every n seconds (10?)
	        if (this.isTypingOffInfo[conversationId]) {
	            var lastSentTime = new Date(this.isTypingOffInfo[conversationId]);
	            var now = new Date();
	            var diff = (now.getTime() - lastSentTime.getTime()) / 1000;
	            if (diff < (this._comapiConfig.isTypingOffTimeout || 10)) {
	                return Promise.resolve(false);
	            }
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.typing, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.delete(url, {})
	            .then(function (result) {
	            _this.isTypingOffInfo[conversationId] = new Date().toISOString();
	            return Promise.resolve(true);
	        });
	    };
	    return ConversationManager;
	})();
	exports.ConversationManager = ConversationManager;
	//# sourceMappingURL=conversationManager.js.map

/***/ },
/* 16 */
/***/ function(module, exports) {

	// https://gist.github.com/strife25/9310539
	var WebSocketManager = (function () {
	    /**
	     * WebSocketManager class constructor.
	     * @class  WebSocketManager
	     * @ignore
	     * @classdesc Class that implements WebSocketManager
	     * @param {ILogger} _logger
	     * @param {ILocalStorageData} _localStorageData
	     * @param {IComapiConfig} _comapiConfig
	     * @param {ISessionManager} _sessionManager
	     * @param {IEventManager} _eventManager
	     */
	    function WebSocketManager(_logger, _localStorageData, _comapiConfig, _sessionManager, _eventManager) {
	        this._logger = _logger;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._sessionManager = _sessionManager;
	        this._eventManager = _eventManager;
	        // ready state code mapping ...
	        this.readystates = [
	            "Connecting",
	            "Open",
	            "Closing",
	            "Closed" // 3
	        ];
	        this.manuallyClosed = false;
	        // current state of socket connetcion
	        this.connected = false;
	        // whether socket ever connected - set to true on first connect and used to determine whether to reconnect on close if not a manual close
	        this.didConnect = false;
	        this.attempts = 1;
	        // TODO: make configurable ...
	        this.echoIntervalTimeout = 1000 * 60 * 3; // 3 minutes
	    }
	    /**
	     * Function to connect websocket
	     * @method WebSocketManager#connect
	     * @returns {Promise}
	     */
	    WebSocketManager.prototype.connect = function () {
	        var _this = this;
	        this._logger.log("WebSocketManager.connect();");
	        return new Promise(function (resolve, reject) {
	            if (!_this.webSocket) {
	                _this._logger.log("WebSocketManager.connect()");
	                _this._sessionManager.getValidToken()
	                    .then(function (token) {
	                    _this._logger.log("WebSocketManager.connect() - got auth token", token);
	                    // reset this in case someone is opening / closing
	                    _this.manuallyClosed = false;
	                    var url = _this._comapiConfig.webSocketBase + "/apispaces/" + _this._comapiConfig.apiSpaceId + "/socket";
	                    var queryString = "?token=" + token;
	                    var fullUrl = url + queryString;
	                    _this._logger.log("connecting ...", fullUrl);
	                    _this.webSocket = new WebSocket(fullUrl);
	                    _this.echoIntervalId = setInterval(function () { return _this.echo(); }, _this.echoIntervalTimeout);
	                    /**
	                     *
	                     */
	                    _this.webSocket.onopen = function () {
	                        _this._logger.log("websocket onopen");
	                        _this.connected = true;
	                        if (_this.didConnect === false) {
	                            _this.didConnect = true;
	                            _this._logger.log("resolving connect() promise");
	                            resolve(true);
	                        }
	                        // this._eventManager.publishLocalEvent("WebsocketOpened", { timestamp: new Date().toISOString() });
	                    };
	                    _this.webSocket.onerror = function (event) {
	                        _this._logger.log("websocket onerror - readystate: " + _this.readystates[_this.webSocket.readyState]);
	                    };
	                    _this.webSocket.onmessage = function (event) {
	                        var message;
	                        try {
	                            message = JSON.parse(event.data);
	                        }
	                        catch (e) {
	                            _this._logger.error("socket onmessage: (not JSON)", event.data);
	                        }
	                        if (message) {
	                            _this._logger.log("websocket onmessage: ", message);
	                            _this.publishWebsocketEvent(message);
	                        }
	                    };
	                    _this.webSocket.onclose = function () {
	                        _this.connected = false;
	                        _this.webSocket = undefined;
	                        _this._logger.log("WebSocket Connection closed.");
	                        // this._eventManager.publishLocalEvent("WebsocketClosed", { timestamp: new Date().toISOString() });
	                        if (_this.didConnect === false) {
	                            reject();
	                        }
	                        // only retry if we didng manually close it and it actually connected in the first place
	                        if (!_this.manuallyClosed && _this.didConnect) {
	                            _this._logger.log("socket not manually closed, reconnecting ...");
	                            var time = _this.generateInterval(_this.attempts);
	                            setTimeout(function () {
	                                // We've tried to reconnect so increment the attempts by 1
	                                _this.attempts++;
	                                // Connection has closed so try to reconnect every 10 seconds.
	                                _this._logger.log("reconnecting ...");
	                                _this.connect();
	                            }, time);
	                        }
	                    };
	                });
	            }
	            else {
	                if (_this.didConnect) {
	                    resolve(true);
	                }
	                else {
	                    reject();
	                }
	            }
	        });
	    };
	    /**
	     * Function to send some data from the client down the websocket
	     * @method WebSocketManager#send
	     * @param {any} data -  the data to send
	     * @returns {Promise}
	     */
	    WebSocketManager.prototype.send = function (data) {
	        if (this.webSocket) {
	            this.webSocket.send(JSON.stringify(data));
	        }
	    };
	    /**
	     * Function to determine te connection state of the websocket - rturns hether ther socket `did` connect rather than the current status as there is reconnection logic running.
	     * @method WebSocketManager#isConnected
	     * @returns {boolean}
	     */
	    WebSocketManager.prototype.isConnected = function () {
	        return this.didConnect;
	    };
	    /**
	     * Function to determine te whether there is an ative socket or not (connected or disconnected)
	     * @method WebSocketManager#hasSocket
	     * @returns {boolean}
	     */
	    WebSocketManager.prototype.hasSocket = function () {
	        return this.webSocket ? true : false;
	    };
	    /**
	     * Function to disconnect websocket
	     * @method WebSocketManager#disconnect
	     * @returns {Promise}
	     */
	    WebSocketManager.prototype.disconnect = function () {
	        var _this = this;
	        this._logger.log("WebSocketManager.disconnect();");
	        return new Promise(function (resolve, reject) {
	            if (_this.webSocket) {
	                // overwrite the onclose callback so we can use it ... 
	                _this.webSocket.onclose = function () {
	                    _this.connected = false;
	                    _this.didConnect = false;
	                    _this._logger.log("socket closed.");
	                    // TODO: will this crater it ?
	                    _this.webSocket = undefined;
	                    resolve(true);
	                };
	                clearInterval(_this.echoIntervalId);
	                _this.manuallyClosed = true;
	                _this.webSocket.close();
	            }
	            else {
	                resolve(false);
	            }
	        });
	    };
	    /**
	     * Function to generate an interval for reconnecton purposes
	     * @method WebSocketManager#generateInterval
	     * @param {number} k
	     * @returns {Promise}
	     */
	    WebSocketManager.prototype.generateInterval = function (k) {
	        var maxInterval = (Math.pow(2, k) - 1) * 1000;
	        if (maxInterval > 30 * 1000) {
	            maxInterval = 30 * 1000; // If the generated interval is more than 30 seconds, truncate it down to 30 seconds.
	        }
	        // generate the interval to a random number between 0 and the maxInterval determined from above
	        var interval = Math.random() * maxInterval;
	        this._logger.log("generateInterval() => " + interval);
	        return interval;
	    };
	    /**
	     *
	     */
	    WebSocketManager.prototype.echo = function () {
	        if (this.connected) {
	            this.send({
	                name: "echo",
	                payload: {},
	                publishedOn: new Date().toISOString(),
	            });
	        }
	    };
	    /**
	     * Map internal event structure to a defined interface ...
	     */
	    WebSocketManager.prototype.publishWebsocketEvent = function (event) {
	        switch (event.name) {
	            case "conversation.delete":
	                {
	                    var conversationDeletedEventData = {
	                        conversationId: event.conversationId,
	                        createdBy: event.context.createdBy,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("conversationDeleted", conversationDeletedEventData);
	                }
	                break;
	            case "conversation.undelete":
	                {
	                    var conversationUndeletedEventData = {
	                        conversationId: event.conversationId,
	                        createdBy: event.context.createdBy,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("conversationUndeleted", conversationUndeletedEventData);
	                }
	                break;
	            case "conversation.update":
	                {
	                    var conversationUpdatedEventData = {
	                        conversationId: event.conversationId,
	                        // the user who updated the conversation
	                        createdBy: event.context.createdBy,
	                        description: event.payload.description,
	                        eTag: event.etag,
	                        isPublic: event.payload.isPublic,
	                        name: event.payload.name,
	                        roles: event.payload.roles,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("conversationUpdated", conversationUpdatedEventData);
	                }
	                break;
	            case "conversation.participantAdded":
	                {
	                    var participantAddedEventData = {
	                        conversationId: event.conversationId,
	                        createdBy: event.context.createdBy,
	                        profileId: event.payload.profileId,
	                        role: event.payload.role,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("participantAdded", participantAddedEventData);
	                }
	                break;
	            case "conversation.participantRemoved":
	                {
	                    var participantRemovedEventData = {
	                        conversationId: event.conversationId,
	                        createdBy: event.context.createdBy,
	                        profileId: event.payload.profileId,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("participantRemoved", participantRemovedEventData);
	                }
	                break;
	            case "conversation.participantTyping":
	                {
	                    var participantTypingEventData = {
	                        conversationId: event.payload.conversationId,
	                        createdBy: event.context.createdBy,
	                        profileId: event.payload.profileId,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("participantTyping", participantTypingEventData);
	                }
	                break;
	            case "conversation.participantTypingOff":
	                {
	                    var participantTypingOffEventData = {
	                        conversationId: event.payload.conversationId,
	                        createdBy: event.context.createdBy,
	                        profileId: event.payload.profileId,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("participantTypingOff", participantTypingOffEventData);
	                }
	                break;
	            case "conversationMessage.sent":
	                {
	                    var _event = {
	                        conversationEventId: event.conversationEventId,
	                        conversationId: event.payload.context.conversationId,
	                        eventId: event.eventId,
	                        name: "conversationMessage.sent",
	                        payload: {
	                            alert: event.payload.alert,
	                            context: event.payload.context,
	                            messageId: event.payload.messageId,
	                            metadata: event.payload.metadata,
	                            parts: event.payload.parts,
	                        }
	                    };
	                    this._eventManager.publishLocalEvent("conversationMessageEvent", _event);
	                }
	                break;
	            case "conversationMessage.read":
	                {
	                    var _event = {
	                        conversationEventId: event.conversationEventId,
	                        conversationId: event.payload.conversationId,
	                        eventId: event.eventId,
	                        name: "conversationMessage.read",
	                        payload: {
	                            conversationId: event.payload.conversationId,
	                            messageId: event.payload.messageId,
	                            profileId: event.payload.profileId,
	                            timestamp: event.payload.timestamp
	                        }
	                    };
	                    this._eventManager.publishLocalEvent("conversationMessageEvent", _event);
	                }
	                break;
	            case "conversationMessage.delivered":
	                {
	                    var _event = {
	                        conversationEventId: event.conversationEventId,
	                        conversationId: event.payload.conversationId,
	                        eventId: event.eventId,
	                        name: "conversationMessage.delivered",
	                        payload: {
	                            conversationId: event.payload.conversationId,
	                            messageId: event.payload.messageId,
	                            profileId: event.payload.profileId,
	                            timestamp: event.payload.timestamp
	                        }
	                    };
	                    this._eventManager.publishLocalEvent("conversationMessageEvent", _event);
	                }
	                break;
	            case "profile.update":
	                {
	                    var _event = {
	                        eTag: event.eTag,
	                        profile: event.payload
	                    };
	                    if (event.eTag) {
	                        this._localStorageData.setString("MyProfileETag", event.eTag);
	                    }
	                    this._eventManager.publishLocalEvent("profileUpdated", _event);
	                }
	                break;
	            default:
	                this._logger.warn("Unknown Event", event);
	                this._eventManager.publishLocalEvent("webSocketEvent", event);
	                break;
	        }
	    };
	    return WebSocketManager;
	})();
	exports.WebSocketManager = WebSocketManager;
	//# sourceMappingURL=webSocketManager.js.map

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var utils_1 = __webpack_require__(9);
	var ConversationBuilder = (function () {
	    /**
	     * ConversationBuilder class constructor.
	     * initialises the id with a guid
	     * @class ConversationBuilder
	     * @classdesc Class that implements ConversationBuilder
	     */
	    function ConversationBuilder() {
	        /**
	         * The conversation description
	         */
	        this.description = undefined;
	        /**
	         * The conversation roles
	         */
	        this.roles = {
	            "owner": {
	                "canSend": true,
	                "canAddParticipants": true,
	                "canRemoveParticipants": true
	            },
	            "participant": {
	                "canSend": true,
	                "canAddParticipants": true,
	                "canRemoveParticipants": true
	            }
	        };
	        /**
	         * The isPublic field
	         */
	        this.isPublic = false;
	        /**
	         * The participants
	         */
	        this.participants = undefined;
	        this.id = utils_1.Utils.uuid();
	    }
	    /**
	     * Method to specify the conversationId (defaults to a new guid if not used)
	     * @method ConversationBuilder#withId
	     * @param {string} id
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withId = function (id) {
	        this.id = id;
	        return this;
	    };
	    /**
	     * Method to specify the conversation name
	     * @method ConversationBuilder#withName
	     * @param {string} name
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withName = function (name) {
	        this.name = name;
	        return this;
	    };
	    /**
	     * Method to specify the conversation description
	     * @method ConversationBuilder#withDescription
	     * @param {string} description
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withDescription = function (description) {
	        this.description = description;
	        return this;
	    };
	    /**
	     * Method to specify initial participant list (will all be members)
	     * @method ConversationBuilder#withUsers
	     * @param {string[]} users
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withUsers = function (users) {
	        this.participants = [];
	        for (var _i = 0; _i < users.length; _i++) {
	            var user = users[_i];
	            this.participants.push({ id: user });
	        }
	        return this;
	    };
	    /**
	     * Method to specify initial participant (will be a member)
	     * @method ConversationBuilder#withUser
	     * @param {string} user
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withUser = function (user) {
	        this.participants = [{ id: user }];
	        return this;
	    };
	    /**
	     * Method to specify initial participants -  takes an array of IConversationParticipant objects which enables individual
	     * roles to be specified for each user.
	     * @method ConversationBuilder#withParticipants
	     * @param {IConversationParticipant[]} participants
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withParticipants = function (participants) {
	        this.participants = participants;
	        return this;
	    };
	    /**
	     * Method to set owner privelages for the conversation
	     * @method ConversationBuilder#withOwnerPrivelages
	     * @param {IConversationPrivelages} privelages
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withOwnerPrivelages = function (privelages) {
	        this.roles.owner = privelages;
	        return this;
	    };
	    /**
	     * Method to set participant privelages for the conversation
	     * @method ConversationBuilder#withParticipantPrivelages
	     * @param {IConversationPrivelages} privelages
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withParticipantPrivelages = function (privelages) {
	        this.roles.participant = privelages;
	        return this;
	    };
	    return ConversationBuilder;
	})();
	exports.ConversationBuilder = ConversationBuilder;
	//# sourceMappingURL=conversationBuilder.js.map

/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * @class MessageBuilder
	 * @classdesc Class that implements MessageBuilder
	 */
	var MessageBuilder = (function () {
	    function MessageBuilder() {
	        this.id = undefined;
	        this.metadata = {};
	        this.parts = [];
	        this.alert = undefined;
	        this.context = undefined;
	        this.sentEventId = undefined;
	        this.statusUpdates = undefined;
	    }
	    /**
	     * Method to create a simple text based message
	     * @method MessageBuilder#withText
	     * @param {String} text - the text of the message
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withText = function (text) {
	        this.parts.push({
	            data: text,
	            size: text.length,
	            type: "text/plain",
	        });
	        return this;
	    };
	    /**
	     * Method to create a message containing a single data part
	     * @method MessageBuilder#withData
	     * @param {String} type - the type of the data i.e. `image/png`
	     * @param {String} data - the data (if you want to pass binary data, then base64 encode it first)
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withData = function (type, data) {
	        this.parts.push({
	            data: data,
	            size: data.length,
	            type: type,
	        });
	        return this;
	    };
	    /**
	     * Method to add a message part to the message. This can be called multiple times
	     * @method MessageBuilder#withPart
	     * @param {IMessagePart} part - the message part to add
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withPart = function (part) {
	        this.parts.push(part);
	        return this;
	    };
	    /**
	     * Method to set the generic title for a push message. It also allocates placeholders for apns and fcm info
	     * @method MessageBuilder#withPush
	     * @param {String} text - The title of the push message. Note call this method BEFORE `withApnsAlert()` and `withFcmAlert()`
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withPush = function (text) {
	        this.alert = {
	            "text": text,
	            "platforms": {
	                "apns": undefined,
	                "fcm": undefined
	            }
	        };
	        return this;
	    };
	    /**
	     * Method to specify APNS specific push info - Note: must call `withPush()` first.
	     * @method MessageBuilder#withApnsAlert
	     * @param {IApnsAlert} info - the APNS speific push info
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withApnsAlert = function (info) {
	        // TODO: cater for incorrect usage
	        this.alert.platforms.apns = info;
	        return this;
	    };
	    /**
	     * Method to specify FCM specific push info - Note: must call `withPush()` first.
	     * @method MessageBuilder#withFcmAlert
	     * @param {IFcmAlert} info - the FCM speific push info
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withFcmAlert = function (info) {
	        // TODO: cater for incorrect usage        
	        this.alert.platforms.fcm = info;
	        return this;
	    };
	    /**
	     * Method to specify additional metadata to accompany the message
	     * @method MessageBuilder#withMetadata
	     * @param {any} metadata - the metadata.
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withMetadata = function (metadata) {
	        this.metadata = metadata;
	        return this;
	    };
	    return MessageBuilder;
	})();
	exports.MessageBuilder = MessageBuilder;
	//# sourceMappingURL=messageBuilder.js.map

/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * @class MessageStatusBuilder
	 * @classdesc Class that implements MessageStatusBuilder
	 */
	var MessageStatusBuilder = (function () {
	    function MessageStatusBuilder() {
	    }
	    /**
	     * @method MessageStatusBuilder#deliveredStatusUpdate
	     * @param {String} messageId
	     * @returns {IMessageStatus} - Returns Mesage status object
	     */
	    MessageStatusBuilder.prototype.deliveredStatusUpdate = function (messageId) {
	        return {
	            messageIds: [messageId],
	            status: "delivered",
	            timestamp: new Date().toISOString()
	        };
	    };
	    /**
	     * @method MessageStatusBuilder#deliveredStatusUpdates
	     * @param {String[]} messageIds
	     * @returns {IMessageStatus} - Returns Mesage status object
	     */
	    MessageStatusBuilder.prototype.deliveredStatusUpdates = function (messageIds) {
	        return {
	            messageIds: messageIds,
	            status: "delivered",
	            timestamp: new Date().toISOString()
	        };
	    };
	    /**
	     * @method MessageStatusBuilder#readStatusUpdate
	     * @param {String} messageId
	     * @returns {IMessageStatus} - Returns Mesage status object
	     */
	    MessageStatusBuilder.prototype.readStatusUpdate = function (messageId) {
	        return {
	            messageIds: [messageId],
	            status: "read",
	            timestamp: new Date().toISOString()
	        };
	    };
	    /**
	     * @method MessageStatusBuilder#readStatusUpdates
	     * @param {String[]} messageIds
	     * @returns {IMessageStatus} - Returns Mesage status object
	     */
	    MessageStatusBuilder.prototype.readStatusUpdates = function (messageIds) {
	        return {
	            messageIds: messageIds,
	            status: "read",
	            timestamp: new Date().toISOString()
	        };
	    };
	    return MessageStatusBuilder;
	})();
	exports.MessageStatusBuilder = MessageStatusBuilder;
	//# sourceMappingURL=messageStatusBuilder.js.map

/***/ },
/* 20 */
/***/ function(module, exports) {

	;
	var IndexedDBOrphanedEventManager = (function () {
	    function IndexedDBOrphanedEventManager() {
	        this.idbSupported = "indexedDB" in window;
	        this._name = "Comapi.OrphanedEvents";
	        this._version = 1;
	        this._continuationTokenStore = "ContinuationTokens";
	        this._orphanedEventStore = "OrphanedEvents";
	    }
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.clearAll = function () {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return _this.clearObjectStore(_this._continuationTokenStore);
	        })
	            .then(function (cleared) {
	            return _this.clearObjectStore(_this._orphanedEventStore);
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.clear = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return _this.deleteTokenInfo(conversationId);
	        })
	            .then(function (deleted) {
	            return _this.deleteEvents(conversationId);
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.getContinuationToken = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._continuationTokenStore], "readonly");
	                var objectStore = transaction.objectStore(_this._continuationTokenStore);
	                // we want all the messages from this conversation ...
	                // using a keyrange to encapsulate just the specified conversationId and all the dates
	                var keyRange = IDBKeyRange.only(conversationId);
	                var cursorRequest = objectStore.openCursor(keyRange);
	                cursorRequest.onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    // only one record ...
	                    if (cursor) {
	                        var info = cursor.value;
	                        resolve(info.continuationToken);
	                    }
	                    else {
	                        resolve(null);
	                    }
	                };
	                cursorRequest.onerror = function (e) {
	                    reject({ message: "Failed to openCursor: " + e.target.error.name });
	                };
	            });
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.setContinuationToken = function (conversationId, continuationToken) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._continuationTokenStore], "readwrite");
	                var store = transaction.objectStore(_this._continuationTokenStore);
	                var request = store.put({
	                    continuationToken: continuationToken,
	                    conversationId: conversationId
	                });
	                request.onerror = function (event) {
	                    reject({ message: "add failed: " + event.target.error.name });
	                };
	                request.onsuccess = function (event) {
	                    // http://stackoverflow.com/questions/12502830/how-to-return-auto-increment-id-from-objectstore-put-in-an-indexeddb
	                    // returns auto incremented id ...
	                    // resolve((<IDBRequest>event.target).result);
	                    resolve(true);
	                };
	            });
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.addOrphanedEvent = function (event) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._orphanedEventStore], "readwrite");
	                var store = transaction.objectStore(_this._orphanedEventStore);
	                var request = store.put(event);
	                request.onerror = function (e) {
	                    console.error("Error", e.target.error.name);
	                    reject({ message: "add failed: " + e.target.error.name });
	                };
	                request.onsuccess = function (e) {
	                    // http://stackoverflow.com/questions/12502830/how-to-return-auto-increment-id-from-objectstore-put-in-an-indexeddb
	                    // returns auto incremented id ...
	                    // resolve((<IDBRequest>event.target).result);
	                    resolve(true);
	                };
	            });
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.removeOrphanedEvent = function (event) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._orphanedEventStore], "readwrite");
	                var store = transaction.objectStore(_this._orphanedEventStore);
	                var request = store.delete(event.eventId);
	                request.onerror = function (e) {
	                    reject({ message: "delete failed: " + e.target.error.name });
	                };
	                request.onsuccess = function (e) {
	                    console.log("store.delete", e.target.result);
	                    resolve(true);
	                };
	            });
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.getOrphanedEvents = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._orphanedEventStore], "readonly");
	                var objectStore = transaction.objectStore(_this._orphanedEventStore);
	                var index = objectStore.index("conversationId");
	                var keyRange = IDBKeyRange.only(conversationId);
	                var events = [];
	                var cursorRequest = index.openCursor(keyRange, "prev");
	                cursorRequest.onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    if (cursor) {
	                        events.unshift(cursor.value);
	                        cursor.continue();
	                    }
	                    else {
	                        resolve(events.sort(function (e1, e2) {
	                            return e1.conversationEventId - e2.conversationEventId;
	                        }));
	                    }
	                };
	                cursorRequest.onerror = function (event) {
	                    reject({ message: "Failed to openCursor: " + event.target.error.name });
	                };
	            });
	        });
	    };
	    IndexedDBOrphanedEventManager.prototype.ensureInitialised = function () {
	        return this._database ? Promise.resolve(true) : this.initialise();
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.initialise = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this.idbSupported) {
	                var self_1 = _this;
	                var openRequest = indexedDB.open(_this._name, _this._version);
	                openRequest.onupgradeneeded = function (event) {
	                    var thisDB = event.target.result;
	                    /**
	                     * will be an array of IOrphanedEventContainer objects
	                     */
	                    if (!thisDB.objectStoreNames.contains(self_1._continuationTokenStore)) {
	                        thisDB.createObjectStore(self_1._continuationTokenStore, { keyPath: "conversationId" });
	                    }
	                    /**
	                     * Will be an array of IConversationMessageEvent objects
	                     */
	                    if (!thisDB.objectStoreNames.contains(self_1._orphanedEventStore)) {
	                        var os = thisDB.createObjectStore(self_1._orphanedEventStore, { keyPath: "eventId" });
	                        os.createIndex("conversationId", "conversationId", { unique: false });
	                    }
	                };
	                openRequest.onsuccess = function (event) {
	                    _this._database = event.target.result;
	                    resolve(true);
	                };
	                openRequest.onerror = function (event) {
	                    reject({ message: "IndexedDBOrphanedEventManager.initialise failed : " + event.target.error.name });
	                };
	            }
	            else {
	                reject({ message: "IndexedDBOrphanedEventManager not supported on this platform" });
	            }
	        });
	    };
	    /**
	     * Method to clear the data in an object store
	     * @method ConversationStore#clearObjectStore
	     * @param {string} objectStore : the object store to clear
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBOrphanedEventManager.prototype.clearObjectStore = function (objectStoreName) {
	        var _this = this;
	        // can't reference objectStore in the promise without this ...
	        var _objectStoreName = objectStoreName;
	        return new Promise(function (resolve, reject) {
	            // open a read/write db transaction, ready for clearing the data
	            var transaction = _this._database.transaction([_objectStoreName], "readwrite");
	            transaction.onerror = function (event) {
	                console.error("Transaction not opened due to error: " + transaction.error);
	            };
	            var objectStore = transaction.objectStore(_objectStoreName);
	            var objectStoreRequest = objectStore.clear();
	            objectStoreRequest.onsuccess = function (event) {
	                resolve(true);
	            };
	            objectStoreRequest.onerror = function (event) {
	                reject({ message: "Failed to clear object store: " + event.target.error.name });
	            };
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.deleteTokenInfo = function (conversationId) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var transaction = _this._database.transaction([_this._continuationTokenStore], "readwrite");
	            var store = transaction.objectStore(_this._continuationTokenStore);
	            var request = store.delete(conversationId);
	            request.onerror = function (event) {
	                reject({ message: "delete failed: " + event.target.error.name });
	            };
	            request.onsuccess = function (event) {
	                console.log("store.delete", event.target.result);
	                resolve(true);
	            };
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.deleteEvents = function (conversationId) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var transaction = _this._database.transaction([_this._orphanedEventStore], "readwrite");
	            var objectStore = transaction.objectStore(_this._orphanedEventStore);
	            var index = objectStore.index("conversationId");
	            var keyRange = IDBKeyRange.only(conversationId);
	            // we want all the messages from this conversation ...
	            // using a keyrange to encapsulate just the specified conversationId and all the dates
	            var cursorRequest = index.openCursor(keyRange, "next");
	            cursorRequest.onsuccess = function (event) {
	                var cursor = event.target.result;
	                if (cursor) {
	                    objectStore.delete(cursor.primaryKey);
	                    cursor.continue();
	                }
	                else {
	                    resolve(true);
	                }
	            };
	            cursorRequest.onerror = function (e) {
	                reject({ message: "Failed to openCursor: " + e.target.error.name });
	            };
	        });
	    };
	    return IndexedDBOrphanedEventManager;
	})();
	exports.IndexedDBOrphanedEventManager = IndexedDBOrphanedEventManager;
	//# sourceMappingURL=indexedDBOrphanedEventManager.js.map

/***/ },
/* 21 */
/***/ function(module, exports) {

	;
	var LocalStorageOrphanedEventManager = (function () {
	    /**
	     *
	     */
	    function LocalStorageOrphanedEventManager(_localStorage) {
	        this._localStorage = _localStorage;
	        this._orphanedEevnts = {};
	        this._orphanedEevnts = this._localStorage.getObject("orphanedEevnts") || {};
	    }
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.clearAll = function () {
	        this._orphanedEevnts = {};
	        this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
	        return Promise.resolve(true);
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.clear = function (conversationId) {
	        this._orphanedEevnts[conversationId] = {
	            orphanedEvents: []
	        };
	        this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
	        return Promise.resolve(true);
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.getContinuationToken = function (conversationId) {
	        var container = this._orphanedEevnts[conversationId];
	        return Promise.resolve(container ? container.continuationToken : null);
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.setContinuationToken = function (conversationId, continuationToken) {
	        var _info = this._orphanedEevnts[conversationId];
	        if (_info) {
	            _info.continuationToken = continuationToken;
	        }
	        else {
	            this._orphanedEevnts[conversationId] = {
	                continuationToken: continuationToken,
	                orphanedEvents: []
	            };
	        }
	        return Promise.resolve(true);
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.addOrphanedEvent = function (event) {
	        var info = this._orphanedEevnts[event.conversationId];
	        if (info) {
	            // check for dupe 
	            var found = info.orphanedEvents.filter(function (e) { return e.eventId === event.eventId; });
	            if (found.length === 0) {
	                // insert
	                info.orphanedEvents.unshift(event);
	                // sort
	                info.orphanedEvents = info.orphanedEvents.sort(function (e1, e2) {
	                    if (e1.conversationEventId > e2.conversationEventId) {
	                        return 1;
	                    }
	                    else if (e1.conversationEventId < e2.conversationEventId) {
	                        return -1;
	                    }
	                    else {
	                        return 0;
	                    }
	                });
	                // save
	                this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
	            }
	        }
	        else {
	            return Promise.reject({ message: "No container for conversation " + event.conversationId });
	        }
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.removeOrphanedEvent = function (event) {
	        var info = this._orphanedEevnts[event.conversationId];
	        if (info) {
	            for (var i = info.orphanedEvents.length - 1; i >= 0; i--) {
	                var e = info.orphanedEvents[i];
	                if (e.eventId === event.eventId) {
	                    info.orphanedEvents.splice(i, 1);
	                    break;
	                }
	            }
	            // save
	            this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
	            return Promise.resolve(true);
	        }
	        else {
	            return Promise.reject({ message: "No container for conversation " + event.conversationId });
	        }
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.getOrphanedEvents = function (conversationId) {
	        var info = this._orphanedEevnts[conversationId];
	        return Promise.resolve(info ? info.orphanedEvents : []);
	    };
	    return LocalStorageOrphanedEventManager;
	})();
	exports.LocalStorageOrphanedEventManager = LocalStorageOrphanedEventManager;
	//# sourceMappingURL=localStorageOrphanedEventManager.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var interfaces_1 = __webpack_require__(1);
	var urlConfig_1 = __webpack_require__(23);
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
	        this.isTypingTimeout = 10;
	        this.isTypingOffTimeout = 10;
	        this.foundationRestUrls = new urlConfig_1.FoundationRestUrls();
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
	    return ComapiConfig;
	})();
	exports.ComapiConfig = ComapiConfig;
	//# sourceMappingURL=comapiConfig.js.map

/***/ },
/* 23 */
/***/ function(module, exports) {

	var FoundationRestUrls = (function () {
	    function FoundationRestUrls() {
	        // Conversations
	        this.conversations = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations";
	        this.conversation = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}";
	        this.participants = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/participants";
	        this.typing = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/typing";
	        // DEVICES
	        this.push = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions/{{sessionId}}/push";
	        // FACEBOOK
	        this.facebook = "{{urlBase}}/apispaces/{{apiSpaceId}}/channels/facebook/state";
	        // Messages
	        this.events = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/events";
	        this.messages = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/messages";
	        this.statusUpdates = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/messages/statusupdates";
	        // Profile
	        this.profiles = "{{urlBase}}/apispaces/{{apiSpaceId}}/profiles";
	        this.profile = "{{urlBase}}/apispaces/{{apiSpaceId}}/profiles/{{profileId}}";
	        // session
	        this.sessions = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions";
	        this.sessionStart = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions/start";
	        this.session = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions/{{sessionId}}";
	    }
	    return FoundationRestUrls;
	})();
	exports.FoundationRestUrls = FoundationRestUrls;
	//# sourceMappingURL=urlConfig.js.map

/***/ },
/* 24 */
/***/ function(module, exports) {

	var AppMessaging = (function () {
	    /**
	     * AppMessaging class constructor.
	     * @class  AppMessaging
	     * @classdesc Class that implements AppMessaging
	     * @param {INetworkManager} networkManager
	     * @param {IConversationManager} conversationManager
	     * @param {IMessageManager} messageManager
	     */
	    function AppMessaging(_networkManager, _conversationManager, _messageManager, _messagePager) {
	        this._networkManager = _networkManager;
	        this._conversationManager = _conversationManager;
	        this._messageManager = _messageManager;
	        this._messagePager = _messagePager;
	    }
	    /**
	     * Function to create a conversation
	     * @method AppMessaging#createConversation
	     * @param {IConversationDetails} conversationDetails - the conversation details (use `ConversationBuilder` to create this)
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.createConversation = function (conversationDetails) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.createConversation(conversationDetails);
	        });
	    };
	    /**
	     * Function to update a conversation
	     * @method AppMessaging#updateConversation
	     * @param {IConversationDetails} conversationDetails - the conversation details (use `ConversationBuilder` to create this)
	     * @param {string} [eTag] - the eTag
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.updateConversation = function (conversationDetails, eTag) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.updateConversation(conversationDetails, eTag);
	        });
	    };
	    /**
	     * Function to get a conversation
	     * @method AppMessaging#getConversation
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.getConversation = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.getConversation(conversationId);
	        });
	    };
	    /**
	     * Function to delete a conversation
	     * @method AppMessaging#deleteConversation
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.deleteConversation = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.deleteConversation(conversationId);
	        })
	            .then(function (deleted) {
	            return _this._messagePager.resetConversation(conversationId);
	        });
	    };
	    /**
	     * Function to add participants to a conversation
	     * @method AppMessaging#addParticipantsToConversation
	     * @param {string} conversationId
	     * @param {IConversationParticipant[]} participants
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.addParticipantsToConversation = function (conversationId, participants) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.addParticipantsToConversation(conversationId, participants);
	        });
	    };
	    /**
	     * Function to remove participants to a conversation
	     * @method AppMessaging#deleteParticipantsFromConversation
	     * @param {string} conversationId
	     * @param {string[]} participants
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.deleteParticipantsFromConversation = function (conversationId, participants) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.deleteParticipantsFromConversation(conversationId, participants);
	        });
	    };
	    /**
	     * Function to get participantss in a conversation
	     * @method AppMessaging#getParticipantsInConversation
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.getParticipantsInConversation = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.getParticipantsInConversation(conversationId);
	        });
	    };
	    /**
	     * Function to get all conversations  the user is a participant in
	     * @method AppMessaging#getConversations
	     * @param {ConversationScope} [scope] - the conversation scope ["`public`"|"`participant`"]
	     * @param {string} [profileId] - The profileId to search with
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.getConversations = function (scope, profileId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.getConversations(scope, profileId);
	        });
	    };
	    /**
	     * Function to get events from a conversation
	     * @method AppMessaging#getConversationEvents
	     * @param {string} conversationId - the conversation Id
	     * @param {number} from - the event Id to start from
	     * @param {number} limit - the maximum number of events to retrievee
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.getConversationEvents = function (conversationId, from, limit) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._messageManager.getConversationEvents(conversationId, from, limit);
	        });
	    };
	    /**
	     * Function to send a message to a conversation
	     * @method AppMessaging#sendMessageToConversation
	     * @param {string} conversationId  - the conversation Id
	     * @param {IConversationMessage} - the message to send (Use `MessageBuilder` to create a message)
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.sendMessageToConversation = function (conversationId, message) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._messageManager.sendMessageToConversation(conversationId, message);
	        });
	    };
	    /**
	     * Function to sent message status udates for messages in a conversation
	     * @method AppMessaging#sendMessageStatusUpdates
	     * @param {string} conversationId  - the conversation Id
	     * @param {IMessageStatus[]} statuses -  the message statuses (Use `MessageStatusBuilder` to create the status objects)
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.sendMessageStatusUpdates = function (conversationId, statuses) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._messageManager.sendMessageStatusUpdates(conversationId, statuses);
	        });
	    };
	    /**
	     * Get a page of messages, internally deal with orphaned events etc ...
	     * @method AppMessaging#getMessages
	     * @param {string} id - the conversationId
	     * @param {number} pageSize - the page size
	     * @param {number} [continuationToken] - the continuation token (optional - if not specified then retrieve from the end)
	     * @returns {Promise<IGetMessagesResponse>}
	     */
	    AppMessaging.prototype.getMessages = function (conversationId, pageSize, continuationToken) {
	        var _this = this;
	        var profileId;
	        var _getMessagesResponse;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            profileId = sessionInfo.session.profileId;
	            return _this._messagePager.getMessages(conversationId, pageSize, continuationToken);
	        })
	            .then(function (getMessagesResponse) {
	            _getMessagesResponse = getMessagesResponse;
	            return _this._messagePager.markMessagesAsDelivered(conversationId, getMessagesResponse.messages, profileId);
	        })
	            .then(function (markDeliveredresponse) {
	            return Promise.resolve(_getMessagesResponse);
	        });
	    };
	    /**
	     * Function to send typing event to a conversation
	     * @method AppMessaging#sendIsTyping
	     * @param {string} conversationId - the conversation Id
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.sendIsTyping = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.sendIsTyping(conversationId);
	        });
	    };
	    /**
	     * Function to send typing off event to a conversation
	     * @method AppMessaging#sendIsTypingOff
	     * @param {string} conversationId - the conversation Id
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.sendIsTypingOff = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.sendIsTypingOff(conversationId);
	        });
	    };
	    return AppMessaging;
	})();
	exports.AppMessaging = AppMessaging;
	//# sourceMappingURL=appMessaging.js.map

/***/ },
/* 25 */
/***/ function(module, exports) {

	var Profile = (function () {
	    /**
	     * Profile class constructor.
	     * @class Profile
	     * @classdesc Class that implements Profile.
	     * @parameter {INetworkManager} _networkManager
	     * @parameter {ILocalStorageData} localStorageData
	     * @parameter {IProfileManager} profileManager
	     */
	    function Profile(_networkManager, _localStorage, _profileManager) {
	        this._networkManager = _networkManager;
	        this._localStorage = _localStorage;
	        this._profileManager = _profileManager;
	    }
	    /**
	     * Get a profile
	     * @method Profile#getProfile
	     * @param {string} profileId - The id of the profile  to get
	     * @returns {Promise} - returns a Promise
	     */
	    Profile.prototype.getProfile = function (profileId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.getProfile(profileId);
	        });
	    };
	    /**
	     * Function to query for a list of profiles matching the search criteria
	     * @method Profile#queryProfiles
	     * @param {string} [query] - See <a href="https://www.npmjs.com/package/mongo-querystring">mongo-querystring</a> for query syntax.
	     * @returns {Promise}
	     */
	    Profile.prototype.queryProfiles = function (query) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.queryProfiles(query);
	        });
	    };
	    /**
	     * Function to update a profile
	     * @method Profile#updateProfile
	     * @param {string} profileId - the id of the profile to update
	     * @param {any} profile - the profile to update
	     * @param {string} [eTag] - the eTag (returned in headers from getProfile())
	     * @returns {Promise}
	     */
	    Profile.prototype.updateProfile = function (profileId, profile, eTag) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.updateProfile(profileId, profile, eTag);
	        });
	    };
	    /**
	     * Function to patch a profile
	     * @method Profile#updateProfile
	     * @param {string} profileId - the id of the profile to update
	     * @param {any} profile - the profile to patch
	     * @param {string} [eTag] - the eTag (returned in headers from getProfile())
	     * @returns {Promise}
	     */
	    Profile.prototype.patchProfile = function (profileId, profile, eTag) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.patchProfile(profileId, profile, eTag);
	        });
	    };
	    /**
	     * Get current user's profile
	     * @method Profile#getMyProfile
	     * @param {boolean} [useEtag=true] - Whether to use eTags to maintain consistency of profile data (defaults to true)
	     * @returns {Promise} - returns a Promise
	     */
	    Profile.prototype.getMyProfile = function (useEtag) {
	        var _this = this;
	        if (useEtag === void 0) { useEtag = true; }
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.getProfile(sessionInfo.session.profileId);
	        })
	            .then(function (result) {
	            if (useEtag) {
	                _this._localStorage.setString("MyProfileETag", result.headers.ETag);
	            }
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Update current user's profile
	     * @method Profile#updateMyProfile
	     * @param {any} profile - the profile of the logged in user to update
	     * @param {boolean} [useEtag=true] - Whether to use eTags to maintain consistency of profile data (defaults to true)
	     * @returns {Promise} - returns a Promise
	     */
	    Profile.prototype.updateMyProfile = function (profile, useEtag) {
	        var _this = this;
	        if (useEtag === void 0) { useEtag = true; }
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.updateProfile(sessionInfo.session.profileId, profile, useEtag ? _this._localStorage.getString("MyProfileETag") : undefined);
	        })
	            .then(function (result) {
	            if (useEtag) {
	                _this._localStorage.setString("MyProfileETag", result.headers.ETag);
	            }
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Patch current user's profile
	     * @method Profile#patchMyProfile
	     * @param {any} profile - the profile of the logged in user to update
	     * @returns {Promise} - returns a Promise
	     */
	    Profile.prototype.patchMyProfile = function (profile, useEtag) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.patchProfile(sessionInfo.session.profileId, profile, useEtag ? _this._localStorage.getString("MyProfileETag") : undefined);
	        })
	            .then(function (result) {
	            if (useEtag) {
	                _this._localStorage.setString("MyProfileETag", result.headers.ETag);
	            }
	            return Promise.resolve(result.response);
	        });
	    };
	    return Profile;
	})();
	exports.Profile = Profile;
	//# sourceMappingURL=profile.js.map

/***/ },
/* 26 */
/***/ function(module, exports) {

	var Services = (function () {
	    /**
	     * Services class constructor.
	     * @class Services
	     * @classdesc Class that implements Services interface
	     * @parameter {AppMessaging} _appMessaging
	     * @parameter {Profile} _profile
	     */
	    function Services(_appMessaging, _profile) {
	        this._appMessaging = _appMessaging;
	        this._profile = _profile;
	    }
	    Object.defineProperty(Services.prototype, "appMessaging", {
	        /**
	         * Method to get AppMessaging interface
	         * @method Services#appMessaging
	         * @returns {AppMessaging} - Returns AppMessaging interface
	         */
	        get: function () {
	            return this._appMessaging;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Services.prototype, "profile", {
	        /**
	         * Method to get Profile interface
	         * @method Services#profile
	         * @returns {Profile} - Returns Profile interface
	         */
	        get: function () {
	            return this._profile;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Services;
	})();
	exports.Services = Services;
	//# sourceMappingURL=services.js.map

/***/ },
/* 27 */
/***/ function(module, exports) {

	var Device = (function () {
	    /**
	     * Device class constructor.
	     * @class Device
	     * @classdesc Class that implements Device related functionality.
	     * @parameter {INetworkManager} _networkManager
	     * @parameter {IDeviceManager} deviceManager
	     */
	    function Device(_networkManager, _deviceManager) {
	        this._networkManager = _networkManager;
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
	        return this._networkManager.ensureSessionAndSocket()
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
	        return this._networkManager.ensureSessionAndSocket()
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
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._deviceManager.removePushDetails(sessionInfo.session.id);
	        });
	    };
	    return Device;
	})();
	exports.Device = Device;
	//# sourceMappingURL=device.js.map

/***/ },
/* 28 */
/***/ function(module, exports) {

	var Channels = (function () {
	    /**
	     * Channels class constructor.
	     * @class Channels
	     * @classdesc Class that implements Channels interface
	     * @parameter {NetworkManager} networkManager
	     * @parameter {IFacebookManager} facebookManager
	     */
	    function Channels(_networkManager, _facebookManager) {
	        this._networkManager = _networkManager;
	        this._facebookManager = _facebookManager;
	    }
	    /**
	     * Method to create opt in state for facebook messenger
	     * @method Channels#createFbOptInState
	     * @param {any} [data] - the data to post
	     */
	    Channels.prototype.createFbOptInState = function (data) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._facebookManager.createSendToMessengerState(data);
	        });
	    };
	    return Channels;
	})();
	exports.Channels = Channels;
	//# sourceMappingURL=channels.js.map

/***/ },
/* 29 */
/***/ function(module, exports) {

	var NetworkManager = (function () {
	    /**
	     * NetworkManager class constructor.
	     * @class NetworkManager
	     * @ignore
	     * @classdesc Class that implements Session And Socket Resolution.
	     * @parameter {ISessionManager} _sessionManager
	     * @parameter {IWebSocketManager} _webSocketManager
	     */
	    function NetworkManager(_sessionManager, _webSocketManager) {
	        this._sessionManager = _sessionManager;
	        this._webSocketManager = _webSocketManager;
	    }
	    /**
	     * Method to start a new authenticated session AND connect up the websocket
	     * @method Foundation#startSession
	     * @returns {Promise} - Returns a promise
	     */
	    NetworkManager.prototype.startSession = function () {
	        var _this = this;
	        return this._sessionManager.startSession()
	            .then(function (sessionInfo) {
	            return _this._webSocketManager.connect();
	        })
	            .then(function (connected) {
	            return _this._sessionManager.sessionInfo;
	        });
	    };
	    /**
	     * Method to restart an expired authenticated session
	     * @method Foundation#restartSession
	     * @returns {Promise} - Returns a promise
	     */
	    NetworkManager.prototype.restartSession = function () {
	        var _this = this;
	        return this._webSocketManager.disconnect()
	            .then(function (succeeded) {
	            return _this._sessionManager.startSession();
	        })
	            .then(function (sessionInfo) {
	            return _this._webSocketManager.connect();
	        })
	            .then(function (connected) {
	            return _this._sessionManager.sessionInfo;
	        });
	    };
	    Object.defineProperty(NetworkManager.prototype, "session", {
	        /**
	         * Method to get current session
	         * @method Foundation#session
	         * @returns {ISession} - Returns an ISession interface
	         */
	        get: function () {
	            return this._sessionManager.sessionInfo ? this._sessionManager.sessionInfo.session : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Method to end an existing authenticated session
	     * @method Foundation#endSession
	     * @returns {Promise} - Returns a promise
	     */
	    NetworkManager.prototype.endSession = function () {
	        var _this = this;
	        return this._webSocketManager.disconnect()
	            .then(function () {
	            return _this._sessionManager.endSession();
	        });
	    };
	    NetworkManager.prototype.getValidToken = function () {
	        return this._sessionManager.getValidToken();
	    };
	    /**
	     * Ensure we have an active session and the websocket has been started
	     * Socket may have disconected and be reconnecting. We just want to know that it was started
	     * @method NetworkManager#ensureSessionAndSocket
	     * @returns {Promise} - returns a Promise
	     */
	    NetworkManager.prototype.ensureSessionAndSocket = function () {
	        var _this = this;
	        return this.ensureSession()
	            .then(function (sessionInfo) {
	            return _this.ensureSocket();
	        })
	            .then(function (connected) {
	            return _this._sessionManager.sessionInfo;
	        });
	    };
	    /**
	     * Create a session if we don't have one already ...
	     * @method NetworkManager#ensureSession
	     * @returns {Promise} - returns a Promise
	     */
	    NetworkManager.prototype.ensureSession = function () {
	        return this._sessionManager.sessionInfo ? Promise.resolve(this._sessionManager.sessionInfo) : this._sessionManager.startSession();
	    };
	    /**
	     * Ensure the web socket has been started
	     * @method NetworkManager#ensureSocket
	     * @returns {Promise} - returns a Promise
	     */
	    NetworkManager.prototype.ensureSocket = function () {
	        return this._webSocketManager.hasSocket() ? Promise.resolve(true) : this._webSocketManager.connect();
	    };
	    return NetworkManager;
	})();
	exports.NetworkManager = NetworkManager;
	//# sourceMappingURL=networkManager.js.map

/***/ }
/******/ ]);