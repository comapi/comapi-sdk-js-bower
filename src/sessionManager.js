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
    }
    SessionManager.prototype.initialise = function () {
        var _this = this;
        return this._localStorageData.getObject("session")
            .then(function (sessionInfo) {
            if (sessionInfo) {
                if (_this.isSessionValid(sessionInfo)) {
                    _this._sessionInfo = sessionInfo;
                    return true;
                }
                else {
                    return _this._localStorageData.remove("session")
                        .then(function () {
                        return false;
                    });
                }
            }
            else {
                return false;
            }
        });
    };
    Object.defineProperty(SessionManager.prototype, "sessionInfo", {
        get: function () {
            return this._sessionInfo;
        },
        enumerable: true,
        configurable: true
    });
    SessionManager.prototype.getValidToken = function () {
        return this.startSession()
            .then(function (sessionInfo) {
            return Promise.resolve(sessionInfo.token);
        });
    };
    SessionManager.prototype.startSession = function () {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            if (_this._sessionInfo && _this.isSessionValid(_this._sessionInfo)) {
                resolve(_this._sessionInfo);
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
                                return Promise.all([sessionInfo, self._setSession(sessionInfo)]);
                            })
                                .then(function (_a) {
                                var sessionInfo = _a[0], result = _a[1];
                                if (!result) {
                                    console.error("_setSession() failed");
                                }
                                resolve(sessionInfo);
                            })
                                .catch(function (error) {
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
                    resolve(false);
                });
            }
            else {
                reject({ message: "No active session is present, create one before ending one" });
            }
        });
    };
    SessionManager.prototype._createAuthenticatedSession = function (jwt, authenticationId, deviceInfo) {
        var _this = this;
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.sessions, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this.getDeviceId()
            .then(function () {
            var browserInfo = utils_1.Utils.getBrowserInfo();
            var data = {
                authenticationId: authenticationId,
                authenticationToken: jwt,
                deviceId: _this._deviceId,
                platform: "javascript",
                platformVersion: browserInfo.version,
                sdkType: "native",
                sdkVersion: "1.0.3.237"
            };
            return _this._restClient.post(url, {}, data);
        })
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
            sessionId: this.sessionInfo.session.id,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.delete(url, headers)
            .then(function (result) {
            return Promise.resolve(true);
        });
    };
    SessionManager.prototype._setSession = function (sessionInfo) {
        if (this.hasExpired(sessionInfo.session.expiresOn)) {
            this._logger.error("Was given an expired token ;-(");
        }
        this._sessionInfo = sessionInfo;
        return this._localStorageData.setObject("session", sessionInfo);
    };
    SessionManager.prototype._removeSession = function () {
        var _this = this;
        return this._localStorageData.remove("session")
            .then(function (result) {
            _this._sessionInfo = undefined;
            return result;
        });
    };
    SessionManager.prototype.getAuthHeader = function () {
        return "Bearer " + this.sessionInfo.token;
    };
    SessionManager.prototype.getDeviceId = function () {
        var _this = this;
        if (this._deviceId) {
            return Promise.resolve(this._deviceId);
        }
        else {
            return this._localStorageData.getString("deviceId")
                .then(function (value) {
                if (value === null) {
                    _this._deviceId = utils_1.Utils.uuid();
                    return _this._localStorageData.setString("deviceId", _this._deviceId)
                        .then(function (result) {
                        return Promise.resolve(_this._deviceId);
                    });
                }
                else {
                    _this._deviceId = value;
                    return Promise.resolve(_this._deviceId);
                }
            });
        }
    };
    SessionManager.prototype.hasExpired = function (expiresOn) {
        var now = new Date();
        var expiry = new Date(expiresOn);
        return now > expiry;
    };
    SessionManager.prototype.isSessionValid = function (sessionInfo) {
        var valid = false;
        if (!this.hasExpired(sessionInfo.session.expiresOn)) {
            if (sessionInfo.token) {
                var bits = sessionInfo.token.split(".");
                if (bits.length === 3) {
                    var payload = JSON.parse(atob(bits[1]));
                    if (payload.apiSpaceId === this._comapiConfig.apiSpaceId) {
                        valid = true;
                    }
                }
            }
        }
        return valid;
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