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
var WebSocketManager = (function () {
    function WebSocketManager(_logger, _localStorageData, _comapiConfig, _sessionManager, _eventManager, _eventMapper) {
        this._logger = _logger;
        this._localStorageData = _localStorageData;
        this._comapiConfig = _comapiConfig;
        this._sessionManager = _sessionManager;
        this._eventManager = _eventManager;
        this._eventMapper = _eventMapper;
        this.readystates = [
            "Connecting",
            "Open",
            "Closing",
            "Closed"
        ];
        this.manuallyClosed = false;
        this.connected = false;
        this.didConnect = false;
        this.attempts = 1;
        this.echoIntervalTimeout = 1000 * 60 * 3;
    }
    WebSocketManager.prototype.connect = function () {
        var _this = this;
        this._logger.log("WebSocketManager.connect();");
        return new Promise(function (resolve, reject) {
            if (!_this.webSocket) {
                _this._logger.log("WebSocketManager.connect()");
                _this._sessionManager.getValidToken()
                    .then(function (token) {
                    _this._logger.log("WebSocketManager.connect() - got auth token", token);
                    _this.manuallyClosed = false;
                    var url = _this._comapiConfig.webSocketBase + "/apispaces/" + _this._comapiConfig.apiSpaceId + "/socket";
                    var queryString = "?token=" + token;
                    var fullUrl = url + queryString;
                    _this._logger.log("connecting ...", fullUrl);
                    _this.webSocket = new WebSocket(fullUrl);
                    _this.echoIntervalId = setInterval(function () { return _this.echo(); }, _this.echoIntervalTimeout);
                    _this.webSocket.onopen = function () {
                        _this._logger.log("websocket onopen");
                        _this.connected = true;
                        if (_this.didConnect === false) {
                            _this.didConnect = true;
                            _this._logger.log("resolving connect() promise");
                            resolve(true);
                        }
                    };
                    _this.webSocket.onerror = function (event) {
                        _this._logger.log("websocket onerror - readystate: " + _this.readystates[_this.webSocket.readyState], event);
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
                    _this.webSocket.onclose = function (event) {
                        _this.connected = false;
                        _this.webSocket = undefined;
                        _this._logger.log("WebSocket Connection closed.");
                        if (_this.didConnect === false) {
                            reject({
                                code: event.code,
                                message: "Failed to connect webSocket",
                            });
                        }
                        if (!_this.manuallyClosed && _this.didConnect) {
                            _this._logger.log("socket not manually closed, reconnecting ...");
                            var time = _this.generateInterval(_this.attempts);
                            setTimeout(function () {
                                _this.attempts++;
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
                    reject({ message: "Failed to connect webSocket" });
                }
            }
        });
    };
    WebSocketManager.prototype.send = function (data) {
        if (this.webSocket) {
            this.webSocket.send(JSON.stringify(data));
        }
    };
    WebSocketManager.prototype.isConnected = function () {
        return this.didConnect;
    };
    WebSocketManager.prototype.hasSocket = function () {
        return this.webSocket ? true : false;
    };
    WebSocketManager.prototype.disconnect = function () {
        var _this = this;
        this._logger.log("WebSocketManager.disconnect();");
        return new Promise(function (resolve, reject) {
            if (_this.webSocket) {
                _this.webSocket.onclose = function () {
                    _this.connected = false;
                    _this.didConnect = false;
                    _this._logger.log("socket closed.");
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
    WebSocketManager.prototype.generateInterval = function (k) {
        var maxInterval = (Math.pow(2, k) - 1) * 1000;
        if (maxInterval > 30 * 1000) {
            maxInterval = 30 * 1000;
        }
        var interval = Math.random() * maxInterval;
        this._logger.log("generateInterval() => " + interval);
        return interval;
    };
    WebSocketManager.prototype.echo = function () {
        if (this.connected) {
            this.send({
                name: "echo",
                payload: {},
                publishedOn: new Date().toISOString(),
            });
        }
    };
    WebSocketManager.prototype.mapEventName = function (name) {
        if (this._comapiConfig.eventMapping) {
            if (name) {
                var split = name.split(".");
                var category = split[0];
                var type = split[1];
                for (var eventCategory in this._comapiConfig.eventMapping) {
                    if (this._comapiConfig.eventMapping.hasOwnProperty(eventCategory)) {
                        var aliases = this._comapiConfig.eventMapping[eventCategory];
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