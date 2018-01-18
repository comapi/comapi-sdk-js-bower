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
    /**
     * MessagePager class constructor.
     * @class MessagePager
     * @ignore
     * @classdesc Class that implements Conversation Message Pagination.
     * @parameter {ILogger} _logger
     * @parameter {ILocalStorageData} _localStorage
     * @parameter {IMessageManager} _messageManager
     */
    function MessagePager(_logger, _localStorage, _messageManager, _orphanedEventManager) {
        this._logger = _logger;
        this._localStorage = _localStorage;
        this._messageManager = _messageManager;
        this._orphanedEventManager = _orphanedEventManager;
    }
    /**
     * Get a page of messages, internally deal with orphaned events etc ...
     * @method MessagePager#getMessages
     * @param {string} id - the conversationId
     * @param {number} pageSize - the page size
     * @param {number} [continuationToken] - the continuation token (optional - if not specified then retrieve from the end)
     * @returns {Promise<any>} - TODO: incorporate continuationToken into respose
     */
    MessagePager.prototype.getMessages = function (conversationId, pageSize, continuationToken) {
        var _this = this;
        if (continuationToken <= 0) {
            return Promise.reject({ message: "All messages from conversation " + conversationId + " have been loaded" });
        }
        var _continuationToken = null;
        var _conversationMessagesResult;
        // 1) get info & Validate
        return this._orphanedEventManager.getContinuationToken(conversationId)
            .then(function (token) {
            _continuationToken = token;
            if (continuationToken !== undefined) {
                // check the continuationToken is correct
                if (_continuationToken !== continuationToken) {
                    // get rid of our cached events as they are now useless
                    // return this._orphanedEventManager.clear(conversationId)
                    // .then(() => {
                    return Promise.reject({ message: "Invalid continuation token: " + continuationToken + " for " + conversationId + ", you nust start from the end" });
                    // });
                }
                else {
                    return Promise.resolve(true);
                }
            }
            else {
                // reset the store as they want to go from the beginning 
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
                // merge any events we got from the call to getConversationMessages with whats in the store
                return _this.getOrphanedEvents(conversationId, _conversationMessagesResult.orphanedEvents)
                    .then(function (orphanedEvents) {
                    return _this.applyOrphanedEvents(_conversationMessagesResult.messages, orphanedEvents);
                })
                    .then(function () {
                    // update continuation token for this conv 
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
    /**
     * Method to append a new batch of orphaned events to the store and then return them all ..
     * @param {string} conversationId
     * @param {any[]} orphanedEvents
     * @returns {Promise<IConversationMessageEvent[]>}
     */
    MessagePager.prototype.getOrphanedEvents = function (conversationId, orphanedEvents) {
        var _this = this;
        var mapped = orphanedEvents.map(function (e) { return _this.mapOrphanedEvent(e); });
        // add them into the store 
        return utils_1.Utils.eachSeries(mapped, function (event) {
            return _this._orphanedEventManager.addOrphanedEvent(event);
        })
            .then(function (done) {
            // get the store 
            return _this._orphanedEventManager.getOrphanedEvents(conversationId);
        });
    };
    /**
     * Function to iterate through a bunch of messages and mark as delivered as appropriate - NOTE: this is automatically called by  AppMessaging.getMessages()
     * @method MessagePager#markMessagesAsDelivered
     * @param {string} id - the conversationId
     * @param {Object[]} messages - the messages to check
     * @param {string} uerId - the userId
     * @returns {Promise}
     */
    MessagePager.prototype.markMessagesAsDelivered = function (id, messages, userId) {
        var messageIds = [];
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            // only look at messages that I haven't sent ...
            if (message.context && message.context.from && message.context.from.id !== userId) {
                var alreadyDelivered = false;
                if (message.statusUpdates && message.statusUpdates[userId]) {
                    // status will be delivered then read i.e. if read, it was delivered
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
            // TODO: status update response id currently "OK" ROFL ...
            return Promise.resolve("OK");
        }
    };
    /**
     * Method to reset any cached info abut a conversation
     */
    MessagePager.prototype.resetConversation = function (conversationId) {
        return this._orphanedEventManager.clear(conversationId);
    };
    /**
     * Orphaned events must be applied in ascending order, so if we want to loop backwards through these they need to be sorted
     * by id descending
     */
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
    /**
     *
     */
    MessagePager.prototype.playEvent = function (event, messages) {
        var played = false;
        // find message in array
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
                        // apply status update - read overwrites delivered
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
                        // apply status update - read overwrites delivered
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
    /*
        An event from the websocket / event api ...
        ============================================
        {
            "eventId": "4ea0489c-5bab-42e2-883c-5545f8444b80",
            "name": "conversationMessage.delivered",
            "conversationId": "7489e390-62b4-4812-a866-ea9499f7e28e",
            "conversationEventId": 3,
            "payload": {
                "messageId": "4a0fbb0f-7693-47a8-9628-18bef4c69f10",
                "conversationId": "7489e390-62b4-4812-a866-ea9499f7e28e",
                "isPublicConversation": false,
                "profileId": "alex",
                "timestamp": "2016-11-08T12:25:24.774Z"
            }
        }


        An orphaned event ...
        ======================
        {
            "id": 54,
            "data": {
                "name": "delivered",
                "payload": {
                    "messageId": "3008c899-c18d-410a-884e-c10a51632d3b",
                    "conversationId": "bc24d5b0-b03c-4594-872b-510c4af81dfe",
                    "isPublicConversation": false,
                    "profileId": "alex",
                    "timestamp": "2016-11-08T12:48:53.088Z"
                },
                "eventId": "8605dbd1-6a10-4405-8966-1eb7dfaefea4",
                "profileId": "alex"
            }
        }
     */
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