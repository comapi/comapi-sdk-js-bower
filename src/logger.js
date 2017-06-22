"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var interfaces_1 = require("./interfaces");
var indexedDBLogger_1 = require("./indexedDBLogger");
var Logger = (function () {
    function Logger(_eventManager, _localStorageData, _indexedDB) {
        this._eventManager = _eventManager;
        this._localStorageData = _localStorageData;
        this._indexedDB = _indexedDB;
        this._logLevel = interfaces_1.LogLevels.Debug;
        this._uid = ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
        this._maxLocalStorageLogSize = 1024;
        this._localStorageKey = "rollingLogfile";
    }
    Object.defineProperty(Logger.prototype, "logLevel", {
        get: function () {
            return this._logLevel;
        },
        set: function (theLogLevel) {
            this._logLevel = theLogLevel;
        },
        enumerable: true,
        configurable: true
    });
    Logger.prototype.log = function (message, data) {
        return this._log(interfaces_1.LogLevels.Debug, message, data);
    };
    Logger.prototype.warn = function (message, data) {
        return this._log(interfaces_1.LogLevels.Warn, message, data);
    };
    Logger.prototype.error = function (message, data) {
        return this._log(interfaces_1.LogLevels.Error, message, data);
    };
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
}());
Logger = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("EventManager")),
    __param(1, inversify_1.inject("LocalStorageData")),
    __param(2, inversify_1.inject("IndexedDBLogger")), __param(2, inversify_1.optional()),
    __metadata("design:paramtypes", [Object, Object, indexedDBLogger_1.IndexedDBLogger])
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map