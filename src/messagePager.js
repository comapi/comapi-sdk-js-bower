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
var MessagePager = (function () {
    function MessagePager(_logger, _localStorage, _messageManager, _orphanedEventManager) {
        this._logger = _logger;
        this._localStorage = _localStorage;
        this._messageManager = _messageManager;
        this._orphanedEventManager = _orphanedEventManager;
    }
    MessagePager.prototype.getMessages = function (conversationId, pageSize, continuationToken) {
        var _this = this;
        if (continuationToken <= 0) {
            return Promise.reject({ message: "All messages from conversation " + conversationId + " have been loaded" });
        }
        var _continuationToken = null;
        var _conversationMessagesResult;
        return this._orphanedEventManager.getContinuationToken(conversationId)
            .then(function (token) {
            _continuationToken = token;
            if (continuationToken !== undefined) {
                if (_continuationToken !== continuationToken) {
                    return Promise.reject({ message: "Invalid continuation token: " + continuationToken + " for " + conversationId + ", you nust start from the end" });
                }
                else {
                    return Promise.resolve(true);
                }
            }
            else {
                return _this._orphanedEventManager.clear(conversationId);
            }
        })
            .then(function () {
            return _this._messageManager.getConversationMessages(conversationId, pageSize, continuationToken);
        })
            .then(function (result) {
            _conversationMessagesResult = result;
            if (result.messages === undefined) {
                _this._logger.log("No messages in this channel yet");
                return Promise.resolve({ messages: [] });
            }
            else {
                return _this.getOrphanedEvents(conversationId, _conversationMessagesResult.orphanedEvents)
                    .then(function (orphanedEvents) {
                    return _this.applyOrphanedEvents(_conversationMessagesResult.messages, orphanedEvents);
                })
                    .then(function () {
                    _continuationToken = _conversationMessagesResult.earliestEventId - 1;
                    return _this._orphanedEventManager.setContinuationToken(conversationId, _continuationToken);
                })
                    .then(function () {
                    return Promise.resolve({
                        continuationToken: _continuationToken,
                        earliestEventId: _conversationMessagesResult.earliestEventId,
                        latestEventId: _conversationMessagesResult.latestEventId,
                        messages: _conversationMessagesResult.messages,
                    });
                });
            }
        });
    };
    MessagePager.prototype.getOrphanedEvents = function (conversationId, orphanedEvents) {
        var _this = this;
        var mapped = orphanedEvents.map(function (e) { return _this.mapOrphanedEvent(e); });
        return utils_1.Utils.eachSeries(mapped, function (event) {
            return _this._orphanedEventManager.addOrphanedEvent(event);
        })
            .then(function (done) {
            return _this._orphanedEventManager.getOrphanedEvents(conversationId);
        });
    };
    MessagePager.prototype.markMessagesAsDelivered = function (id, messages, userId) {
        var messageIds = [];
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            if (message.context && message.context.from && message.context.from.id !== userId) {
                var alreadyDelivered = false;
                if (message.statusUpdates && message.statusUpdates[userId]) {
                    if (message.statusUpdates[userId].status === "delivered" ||
                        message.statusUpdates[userId].status === "read") {
                        alreadyDelivered = true;
                    }
                }
                if (!alreadyDelivered) {
                    messageIds.unshift(message.id);
                }
            }
        }
        if (messageIds.length > 0) {
            var statusUpdate = {
                messageIds: messageIds,
                status: "delivered",
                timestamp: new Date().toISOString()
            };
            return this._messageManager.sendMessageStatusUpdates(id, [statusUpdate]);
        }
        else {
            return Promise.resolve("OK");
        }
    };
    MessagePager.prototype.resetConversation = function (conversationId) {
        return this._orphanedEventManager.clear(conversationId);
    };
    MessagePager.prototype.applyOrphanedEvents = function (messages, orphanedEvents) {
        var _this = this;
        return utils_1.Utils.eachSeries(orphanedEvents, function (event) {
            if (_this.playEvent(event, messages)) {
                _this._logger.log("succesfuly played event " + event.conversationEventId);
                return _this._orphanedEventManager.removeOrphanedEvent(event);
            }
            else {
                _this._logger.warn("failed to play event " + event.conversationEventId, event);
                return Promise.resolve(false);
            }
        });
    };
    MessagePager.prototype.playEvent = function (event, messages) {
        var played = false;
        var found = messages.filter(function (message) { return message.id === event.payload.messageId; });
        var message;
        if (found.length === 1) {
            message = found[0];
            played = true;
        }
        else if (found.length >= 1) {
            this._logger.error("Found more than 1 message with same messageId: " + event.payload.messageId);
        }
        else {
            this._logger.log("Message " + event.payload.messageId + " not found ...");
        }
        switch (event.name) {
            case "conversationMessage.read":
                {
                    if (message) {
                        message.statusUpdates[event.payload.profileId] = {
                            "status": "read",
                            "on": event.payload.timestamp
                        };
                    }
                }
                break;
            case "conversationMessage.delivered":
                {
                    if (message) {
                        var updateForProfileId = message.statusUpdates[event.payload.profileId];
                        if (updateForProfileId && updateForProfileId.status === "read") {
                            this._logger.log("Message already marked as read, not marking as delivered");
                        }
                        else {
                            message.statusUpdates[event.payload.profileId] = {
                                "status": "delivered",
                                "on": event.payload.timestamp
                            };
                        }
                    }
                }
                break;
            default:
                this._logger.error("Unknown eventName " + event.name + " for messageId: " + event.payload.messageId);
                break;
        }
        return played;
    };
    MessagePager.prototype.mapOrphanedEvent = function (event) {
        var mapped = {};
        mapped.conversationEventId = event.id;
        mapped.name = "conversationMessage." + event.data.name;
        mapped.eventId = event.data.eventId;
        mapped.conversationId = event.data.payload.conversationId;
        mapped.payload = event.data.payload;
        return mapped;
    };
    return MessagePager;
}());
MessagePager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager)),
    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], MessagePager);
exports.MessagePager = MessagePager;
//# sourceMappingURL=messagePager.js.map