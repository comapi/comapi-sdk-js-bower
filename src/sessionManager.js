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
var utils_1 = require("./utils");
var interfaceSymbols_1 = require("./interfaceSymbols");
var SessionManager = (function () {
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
        this._getSession();
    }
    Object.defineProperty(SessionManager.prototype, "sessionInfo", {
        get: function () {
            return this._sessionInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionManager.prototype, "expiry", {
        get: function () {
            return this._sessionInfo.session.expiresOn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionManager.prototype, "isActive", {
        get: function () {
            var result = false;
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
    SessionManager.prototype.getValidToken = function () {
        return this.isActive
            ? Promise.resolve(this._sessionInfo.token)
            : this.startSession()
                .then(function (sessionInfo) {
                return Promise.resolve(sessionInfo.token);
            });
    };
    SessionManager.prototype.startSession = function () {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            if (_this.isActive) {
                self._logger.log("startSession() found an existing session: ");
                resolve(_this._getSession());
            }
            else {
                _this._startAuth().then(function (sessionStartResponse) {
                    var authChallengeOptions = {
                        nonce: sessionStartResponse.nonce
                    };
                    self._comapiConfig.authChallenge(authChallengeOptions, function (jwt) {
                        if (jwt) {
                            self._createAuthenticatedSession(jwt, sessionStartResponse.authenticationId, {})
                                .then(function (sessionInfo) {
                                self._setSession(sessionInfo);
                                resolve(sessionInfo);
                            }).catch(function (error) {
                                reject(error);
                            });
                        }
                        else {
                            reject({ message: "Failed to get a JWT from authChallenge", statusCode: 401 });
                        }
                    });
                }).catch(function (error) { return reject(error); });
            }
        });
    };
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
    SessionManager.prototype._createAuthenticatedSession = function (jwt, authenticationId, deviceInfo) {
        var browserInfo = utils_1.Utils.getBrowserInfo();
        var data = {
            authenticationId: authenticationId,
            authenticationToken: jwt,
            deviceId: this._deviceId,
            platform: "javascript",
            platformVersion: browserInfo.version,
            sdkType: "native",
            sdkVersion: "1.0.2.142"
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
    SessionManager.prototype._getSession = function () {
        var sessionInfo = this._localStorageData.getObject("session");
        if (sessionInfo) {
            this._sessionInfo = sessionInfo;
        }
        return sessionInfo;
    };
    SessionManager.prototype._setSession = function (sessionInfo) {
        var expiry = new Date(sessionInfo.session.expiresOn);
        var now = new Date();
        if (expiry < now) {
            this._logger.error("Was given an expired token ;-(");
        }
        this._sessionInfo = sessionInfo;
        this._localStorageData.setObject("session", sessionInfo);
    };
    SessionManager.prototype._removeSession = function () {
        this._localStorageData.remove("session");
        this._sessionInfo = undefined;
    };
    SessionManager.prototype.getAuthHeader = function () {
        return "Bearer " + this.sessionInfo.token;
    };
    return SessionManager;
}());
SessionManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SessionManager);
exports.SessionManager = SessionManager;
//# sourceMappingURL=sessionManager.js.map