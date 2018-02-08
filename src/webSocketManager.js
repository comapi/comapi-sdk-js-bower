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
var interfaceSymbols_1 = require("./interfaceSymbols");
// https://github.com/vitalets/controlled-promise/blob/master/src/index.js
var MyPromise = (function () {
    function MyPromise() {
        this._promise = null;
        this._resolve = null;
        this._reject = null;
        this._isPending = false;
        this._value = null;
    }
    Object.defineProperty(MyPromise.prototype, "promise", {
        /**
         *
         * @returns {Boolean}
         */
        get: function () {
            return this._promise;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPromise.prototype, "value", {
        /**
         *
         * @returns {Boolean}
         */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param fn
     */
    MyPromise.prototype.call = function (fn) {
        var _this = this;
        if (!this._isPending) {
            this._isPending = true;
            this._promise = new Promise(function (resolve, reject) {
                _this._resolve = resolve;
                _this._reject = reject;
                fn();
            });
        }
        return this._promise;
    };
    Object.defineProperty(MyPromise.prototype, "isPending", {
        /**
         * Returns true if promise is pending.
         *
         * @returns {Boolean}
         */
        get: function () {
            return this._isPending;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param value
     */
    MyPromise.prototype.resolve = function (value) {
        this._isPending = false;
        this._value = value;
        this._resolve(value);
    };
    /**
     *
     * @param value
     */
    MyPromise.prototype.reject = function (value) {
        this._isPending = false;
        this._reject(value);
    };
    return MyPromise;
}());
// https://gist.github.com/strife25/9310539
// https://github.com/vitalets/websocket-as-promised/blob/master/src/index.js
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
    function WebSocketManager(_logger, _localStorageData, _comapiConfig, _sessionManager, _eventManager, _eventMapper) {
        var _this = this;
        this._logger = _logger;
        this._localStorageData = _localStorageData;
        this._comapiConfig = _comapiConfig;
        this._sessionManager = _sessionManager;
        this._eventManager = _eventManager;
        this._eventMapper = _eventMapper;
        // ready state code mapping ...
        this.readystates = [
            "Connecting",
            "Open",
            "Closing",
            "Closed" // 3
        ];
        // TODO: make configurable ...
        this.echoIntervalTimeout = 1000 * 60; // 1 minute
        this.STATE = {
            CLOSED: 3,
            CLOSING: 2,
            CONNECTING: 0,
            OPEN: 1,
        };
        // can use _opening._value for equivalent functionality
        this.manuallyClosed = false;
        // whether socket ever connected - set to true on first connect and used to determine whether to reconnect on close if not a manual close
        this.didConnect = false;
        this.reconnecting = false;
        this.attempts = 0;
        // start this here just once
        this.echoIntervalId = setInterval(function () { return _this.echo(); }, this.echoIntervalTimeout);
    }
    Object.defineProperty(WebSocketManager.prototype, "isOpening", {
        /**
         * Is WebSocket connection in opening state.
         *
         * @returns {Boolean}
         */
        get: function () {
            return Boolean(this.webSocket && this.webSocket.readyState === this.STATE.CONNECTING);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketManager.prototype, "isOpened", {
        /**
         * Is WebSocket connection opened.
         *
         * @returns {Boolean}
         */
        get: function () {
            return Boolean(this.webSocket && this.webSocket.readyState === this.STATE.OPEN);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketManager.prototype, "isClosing", {
        /**
         * Is WebSocket connection in closing state.
         *
         * @returns {Boolean}
         */
        get: function () {
            return Boolean(this.webSocket && this.webSocket.readyState === this.STATE.CLOSING);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketManager.prototype, "isClosed", {
        /**
         * Is WebSocket connection closed.
         *
         * @returns {Boolean}
         */
        get: function () {
            return Boolean(!this.webSocket || this.webSocket.readyState === this.STATE.CLOSED);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function to determine te connection state of the websocket - rturns hether ther socket `did` connect rather than the current status as there is reconnection logic running.
     * @method WebSocketManager#isConnected
     * @returns {boolean}
     */
    WebSocketManager.prototype.isConnected = function () {
        return this.isOpened;
    };
    /**
     * Function to connect websocket
     * @method WebSocketManager#connect
     */
    WebSocketManager.prototype.connect = function () {
        var _this = this;
        if (this.isClosing) {
            return Promise.reject(new Error("Can't open WebSocket while closing."));
        }
        // User calls connect and already connected
        if (this.isOpened) {
            return this._opening.promise;
        }
        // we have started to open, so return this and everyone can wait on it ....
        if (this._opening && this._opening.isPending) {
            return this._opening.promise;
        }
        this._opening = new MyPromise();
        return this._opening.call(function () {
            _this._logger.log("WebSocketManager.connect();");
            if (!_this.webSocket) {
                _this._logger.log("WebSocketManager.connect()");
                var _token_1;
                _this._sessionManager.getValidToken()
                    .then(function (token) {
                    _token_1 = token;
                    _this._logger.log("WebSocketManager.connect() - got auth token", token);
                    // reset this in case someone is opening / closing
                    _this.manuallyClosed = false;
                    var url = _this._comapiConfig.webSocketBase + "/apispaces/" + _this._comapiConfig.apiSpaceId + "/socket";
                    var queryString = "?token=" + token;
                    var fullUrl = url + queryString;
                    _this._logger.log("connecting ...", fullUrl);
                    _this.webSocket = new WebSocket(fullUrl);
                    _this.webSocket.onopen = _this._handleOpen.bind(_this);
                    _this.webSocket.onerror = _this._handleError.bind(_this);
                    _this.webSocket.onclose = _this._handleClose.bind(_this);
                    _this.webSocket.onmessage = _this._handleMessage.bind(_this);
                })
                    .catch(function (error) {
                    _this._opening.reject({
                        code: error.code,
                        message: _token_1 ? "Websocket Error" : "Failed to get Valid Token",
                    });
                });
            }
        });
    };
    /**
     * Function to disconnect websocket
     * @method WebSocketManager#disconnect
     * @returns {Promise}
     */
    WebSocketManager.prototype.disconnect = function () {
        var _this = this;
        if (this.isClosed) {
            return Promise.resolve(true);
        }
        this._logger.log("WebSocketManager.disconnect();");
        this._closing = new MyPromise();
        return this._closing.call(function () {
            _this.manuallyClosed = true;
            _this.webSocket.close();
        });
    };
    /**
     * Function to send some data from the client down the websocket
     * @method WebSocketManager#send
     * @param {any} data -  the data to send
     * @returns {Promise}
     */
    WebSocketManager.prototype.send = function (data) {
        if (this.isOpened) {
            this.webSocket.send(JSON.stringify(data));
        }
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
     * @param event
     */
    WebSocketManager.prototype._handleOpen = function (event) {
        console.log("_handleOpen", event);
        this.didConnect = true;
        this._eventManager.publishLocalEvent("WebsocketOpened", { timestamp: new Date().toISOString() });
        if (this._opening) {
            this._opening.resolve(true);
        }
    };
    /**
     *
     * @param event
     */
    WebSocketManager.prototype._handleMessage = function (event) {
        console.log("_handleMessage", event);
        var message;
        try {
            message = JSON.parse(event.data);
        }
        catch (e) {
            this._logger.error("socket onmessage: (not JSON)", event.data);
        }
        if (message) {
            this._logger.log("websocket onmessage: ", message);
            this.publishWebsocketEvent(message);
        }
    };
    /**
     *
     * @param event
     */
    WebSocketManager.prototype._handleError = function (event) {
        console.log("_handleError", event);
        this._logger.log("websocket onerror - readystate: " + this.readystates[this.webSocket.readyState], event);
    };
    /**
     *
     * @param event
     */
    WebSocketManager.prototype._handleClose = function (event) {
        console.log("_handleClose", event);
        this.webSocket = undefined;
        this._logger.log("WebSocket Connection closed.");
        this._eventManager.publishLocalEvent("WebsocketClosed", { timestamp: new Date().toISOString() });
        // This is the failed to connect flow ...
        if (this._opening.isPending) {
            this._opening.reject({
                code: event.code,
                message: "WebSocket closed with reason: " + event.reason + " (" + event.code + ").",
            });
        }
        // This is the manually closed flow
        if (this._closing && this._closing.isPending) {
            this._closing.resolve(true);
            this.didConnect = false;
        }
        // only retry if we didn't manually close it and it actually connected in the first place
        if (!this.manuallyClosed && this.didConnect && !this.reconnecting) {
            this._logger.log("socket not manually closed, reconnecting ...");
            this.reconnecting = true;
            this.reconnect();
        }
    };
    /**
     *
     */
    WebSocketManager.prototype.echo = function () {
        this.send({
            name: "echo",
            payload: {},
            publishedOn: new Date().toISOString(),
        });
    };
    /**
     *
     */
    WebSocketManager.prototype.reconnect = function () {
        var _this = this;
        var time = this.generateInterval(this.attempts);
        setTimeout(function () {
            _this.attempts++;
            _this._logger.log("reconnecting (" + _this.attempts + ") ...");
            _this.connect()
                .then(function () {
                _this._logger.log("socket reconnected");
                _this.attempts = 0;
                _this.reconnecting = false;
            })
                .catch(function (e) {
                _this._logger.log("socket recycle failed", e);
                _this.reconnect();
            });
        }, time);
    };
    /**
     *
     * @param name
     */
    WebSocketManager.prototype.mapEventName = function (name) {
        // // TODO: make this configurable
        // let eventAliasInfo: IEventMapping = {
        //     conversation: ["conversation", "chat"],
        //     conversationMessage: ["conversationMessage", "chatMessage"],
        //     profile: ["profile"]
        // };
        if (this._comapiConfig.eventMapping) {
            if (name) {
                var split = name.split(".");
                // for conversation.delete, category is conversation, type is delete
                var category = split[0];
                var type = split[1];
                for (var eventCategory in this._comapiConfig.eventMapping) {
                    if (this._comapiConfig.eventMapping.hasOwnProperty(eventCategory)) {
                        // propertyName is what you want
                        // you can get the value like this: myObject[propertyName]
                        var aliases = this._comapiConfig.eventMapping[eventCategory];
                        // go through the
                        for (var _i = 0, aliases_1 = aliases; _i < aliases_1.length; _i++) {
                            var val = aliases_1[_i];
                            if (val === category) {
                                return eventCategory + "." + type;
                            }
                        }
                    }
                }
            }
        }
        return name;
    };
    /**
     * Map internal event structure to a defined interface ...
     */
    WebSocketManager.prototype.publishWebsocketEvent = function (event) {
        var mappedName = this.mapEventName(event.name);
        switch (mappedName) {
            case "conversation.delete":
                {
                    this._eventManager.publishLocalEvent("conversationDeleted", this._eventMapper.conversationDeleted(event));
                }
                break;
            case "conversation.undelete":
                {
                    this._eventManager.publishLocalEvent("conversationUndeleted", this._eventMapper.conversationUndeleted(event));
                }
                break;
            case "conversation.update":
                {
                    this._eventManager.publishLocalEvent("conversationUpdated", this._eventMapper.conversationUpdated(event));
                }
                break;
            case "conversation.participantAdded":
                {
                    this._eventManager.publishLocalEvent("participantAdded", this._eventMapper.participantAdded(event));
                }
                break;
            case "conversation.participantRemoved":
                {
                    this._eventManager.publishLocalEvent("participantRemoved", this._eventMapper.participantRemoved(event));
                }
                break;
            case "conversation.participantTyping":
                {
                    this._eventManager.publishLocalEvent("participantTyping", this._eventMapper.participantTyping(event));
                }
                break;
            case "conversation.participantTypingOff":
                {
                    this._eventManager.publishLocalEvent("participantTypingOff", this._eventMapper.participantTypingOff(event));
                }
                break;
            case "conversationMessage.sent":
                {
                    this._eventManager.publishLocalEvent("conversationMessageEvent", this._eventMapper.conversationMessageSent(event));
                }
                break;
            case "conversationMessage.read":
                {
                    this._eventManager.publishLocalEvent("conversationMessageEvent", this._eventMapper.conversationMessageRead(event));
                }
                break;
            case "conversationMessage.delivered":
                {
                    this._eventManager.publishLocalEvent("conversationMessageEvent", this._eventMapper.conversationMessageDelivered(event));
                }
                break;
            case "profile.update":
                {
                    if (event.eTag) {
                        this._localStorageData.setString("MyProfileETag", event.eTag);
                    }
                    this._eventManager.publishLocalEvent("profileUpdated", this._eventMapper.profileUpdated(event));
                }
                break;
            default:
                this._logger.warn("Unknown Event", event);
                this._eventManager.publishLocalEvent("webSocketEvent", event);
                break;
        }
    };
    return WebSocketManager;
}());
WebSocketManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager)),
    __param(5, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.EventMapper)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], WebSocketManager);
exports.WebSocketManager = WebSocketManager;
//# sourceMappingURL=webSocketManager.js.map