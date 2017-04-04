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