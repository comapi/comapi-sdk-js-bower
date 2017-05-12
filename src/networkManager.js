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