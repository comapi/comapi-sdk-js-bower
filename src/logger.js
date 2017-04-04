var interfaces_1 = require("./interfaces");
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