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
exports.SessionManager = void 0;
var inversify_1 = require("inversify");
var interfaces_1 = require("./interfaces");
var utils_1 = require("./utils");
var interfaceSymbols_1 = require("./interfaceSymbols");
var SessionManager = /** @class */ (function () {
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
    }
    /**
     * Retrieve a cached session if there is one
     */
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
        /**
         * Getter to get the current sessionInfo
         * @method SessionManager#sessionInfo
         * @returns {ISessionInfo}
         */
        get: function () {
            return this._sessionInfo;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Function to get auth token
     * @method SessionManager#token
     * @returns {Promise} - returns the auth token via a promise
     */
    SessionManager.prototype.getValidToken = function () {
        return this.startSession()
            .then(function (sessionInfo) {
            return Promise.resolve(sessionInfo.token);
        });
    };
    /**
     * Function to start a new session or return an existing session
     * @method SessionManager#startSession
     * @param {any} userDefined -  Additional client-specific information
     * @returns {Promise} - Returns a promise
     */
    SessionManager.prototype.startSession = function () {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            if (_this._sessionInfo && _this.isSessionValid(_this._sessionInfo)) {
                resolve(_this._sessionInfo);
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
                                return Promise.all([sessionInfo, self._setSession(sessionInfo)]);
                            })
                                .then(function (_a) {
                                var sessionInfo = _a[0], result = _a[1];
                                if (!result) {
                                    console.error("_setSession() failed");
                                }
                                // pass back to client
                                resolve(sessionInfo);
                            })
                                .catch(function (error) {
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
                    _this.removeSession();
                    resolve(true);
                }).catch(function (error) {
                    _this.removeSession();
                    resolve(false);
                });
            }
            else {
                reject({ message: "No active session is present, create one before ending one" });
            }
        });
    };
    /**
     * Retrieves details about a session
     * @method SessionManager#requestSession
     * @returns {Promise} - Returns a promise
     */
    SessionManager.prototype.requestSession = function () {
        var headers = {
            "Content-Type": "application/json",
            "authorization": this.getAuthHeader(),
        };
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.session, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            sessionId: this.sessionInfo.session.id,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.get(url, headers);
    };
    /**
     * Internal function to remove an existing cached session
     * @returns {Promise} - returns boolean result
     */
    SessionManager.prototype.removeSession = function () {
        var _this = this;
        return this._localStorageData.remove("session")
            .then(function (result) {
            _this._sessionInfo = undefined;
            return result;
        });
    };
    SessionManager.prototype._buildPushPayload = function (config) {
        if (config && config.apns) {
            return {
                "apns": {
                    "bundleId": config.apns.bundleId,
                    // need to stringify the numeric enum value 
                    "environment": interfaces_1.Environment[config.apns.environment],
                    "token": config.apns.token
                }
            };
        }
        else {
            return config;
        }
    };
    /**
     * Internal function to create an authenticated session
     * @param (String) jwt - the jwt retrieved from the integrator
     * @param (String) authenticationId - the authenticationId given by comapi back end
     * @param (Object) deviceInfo - the deviceInfo
     * @returns {Promise} - Returns a promise
     */
    SessionManager.prototype._createAuthenticatedSession = function (jwt, authenticationId, deviceInfo) {
        var _this = this;
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.sessions, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this.getDeviceId()
            .then(function () {
            var platformVersion = "Unknown";
            if (typeof navigator !== "undefined") {
                platformVersion = (navigator.product !== "undefined" ? navigator.product : "Unknown") + (navigator.userAgent !== "undefined" ? " : " + navigator.userAgent : "");
            }
            var data = {
                authenticationId: authenticationId,
                authenticationToken: jwt,
                deviceId: _this._deviceId,
                platform: /*browserInfo.name*/ "javascript",
                platformVersion: platformVersion,
                push: _this._buildPushPayload(_this._comapiConfig.pushConfig),
                sdkType: /*"javascript"*/ "native",
                sdkVersion: "1.3.0.46",
            };
            if (window && window.cordova && window.cordova.plugins && window.cordova.plugins.dotdigitalPlugin) {
                var pluginVersion = window.cordova.plugins.dotdigitalPlugin.version();
                data.sdkVersion += " - " + pluginVersion;
            }
            return _this._restClient.post(url, {}, data);
        })
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
            sessionId: this.sessionInfo.session.id,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.delete(url, headers)
            .then(function (result) {
            return Promise.resolve(true);
        });
    };
    /**
     * Internal function to load in an existing session if available
     * @returns {boolean} - returns boolean reault
     */
    SessionManager.prototype._setSession = function (sessionInfo) {
        var payload = this.extractTokenPayload(sessionInfo.token);
        if (payload && this.hasExpired(payload.exp)) {
            this._logger.error("Was given an expired token ;-(");
        }
        this._sessionInfo = sessionInfo;
        return this._localStorageData.setObject("session", sessionInfo);
    };
    /**
     *
     */
    SessionManager.prototype.getAuthHeader = function () {
        return "Bearer " + this.sessionInfo.token;
    };
    /**
     * Create one if not available ...
     */
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
    /**
     * Check a token exp property not in the past ...
     * @param token
     */
    SessionManager.prototype.hasExpired = function (exp) {
        var now = new Date();
        var expiry = new Date(exp * 1000);
        return now > expiry;
    };
    /**
     * Extract payload from a jwt
     * @param token
     * @returns payload object
     */
    SessionManager.prototype.extractTokenPayload = function (token) {
        if (token) {
            var bits = token.split(".");
            if (bits.length === 3) {
                return JSON.parse(atob(bits[1]));
            }
        }
        return null;
    };
    /**
     * Checks validity of session based on expiry and matching apiSpace
     * @param sessionInfo
     */
    SessionManager.prototype.isSessionValid = function (sessionInfo) {
        var valid = false;
        var payload = this.extractTokenPayload(sessionInfo.token);
        if (payload) {
            if (!this.hasExpired(payload.exp)) {
                // check that the token matches 
                if (payload.apiSpaceId === this._comapiConfig.apiSpaceId) {
                    valid = true;
                }
            }
        }
        return valid;
    };
    SessionManager = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
        __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient)),
        __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
        __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], SessionManager);
    return SessionManager;
}());
exports.SessionManager = SessionManager;
//# sourceMappingURL=sessionManager.js.map