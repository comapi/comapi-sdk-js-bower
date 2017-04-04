var SessionAndSocketResolver = (function () {
    /**
     * SessionAndSocketResolver class constructor.
     * @class SessionAndSocketResolver
     * @ignore
     * @classdesc Class that implements Session And Socket Resolution.
     * @parameter {ISessionManager} _sessionManager
     * @parameter {IWebSocketManager} _webSocketManager
     */
    function SessionAndSocketResolver(_sessionManager, _webSocketManager) {
        this._sessionManager = _sessionManager;
        this._webSocketManager = _webSocketManager;
    }
    /**
     * Ensure we have an active session and the websocket has been started
     * Socket may have disconected and be reconnecting. We just want to know that it was started
     * @method SessionAndSocketResolver#ensureSessionAndSocket
     * @returns {Promise} - returns a Promise
     */
    SessionAndSocketResolver.prototype.ensureSessionAndSocket = function () {
        var _this = this;
        return this.ensureSession()
            .then(function (sessionInfo) {
            return _this.ensureSocket();
        })
            .then(function (connected) {
            return _this.ensureSocket();
        })
            .then(function (connected) {
            return _this._sessionManager.sessionInfo;
        });
    };
    /**
     * Create a session if we don't have one already ...
     * @method SessionAndSocketResolver#ensureSession
     * @returns {Promise} - returns a Promise
     */
    SessionAndSocketResolver.prototype.ensureSession = function () {
        return this._sessionManager.sessionInfo ? Promise.resolve(this._sessionManager.sessionInfo) : this._sessionManager.startSession();
    };
    /**
     * Ensure the web socket has been started
     * @method SessionAndSocketResolver#ensureSocket
     * @returns {Promise} - returns a Promise
     */
    SessionAndSocketResolver.prototype.ensureSocket = function () {
        return this._webSocketManager.hasSocket() ? Promise.resolve(true) : this._webSocketManager.connect();
    };
    return SessionAndSocketResolver;
})();
exports.SessionAndSocketResolver = SessionAndSocketResolver;
//# sourceMappingURL=resolver.js.map