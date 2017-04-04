var utils_1 = require("./utils");
var SessionManager = (function () {
    /**
     * SessionManager class constructor.
     * @class SessionManager
     * @ignore
     * @classdesc Class that implements all the SessionManager functionality.
     * @parameter {ILogger} logger
     * @parameter {IRestClient} restClient
     * @parameter {ILocalStorageData} localStorageData
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
            sdkVersion: "1.0.0.0"
        };
        return this._restClient.post(this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/sessions", {}, data)
            .then(function (result) {
            return Promise.resolve(result.response);
        });
    };
    /**
     * Internal function to start an authenticated session
     * @returns {Promise} - Returns a promise
     */
    SessionManager.prototype._startAuth = function () {
        return this._restClient.get(this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/sessions/start")
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
        return this._restClient.delete(this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/sessions/" + this._sessionInfo.session.id, headers)
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