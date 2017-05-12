;
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
    function MessagePager(_logger, _localStorage, _messageManager) {
        this._logger = _logger;
        this._localStorage = _localStorage;
        this._messageManager = _messageManager;
        this._orphanedEevnts = {};
        this._orphanedEevnts = this._localStorage.getObject("orphanedEevnts") || {};
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
        var orphanedEventContainer;
        // validate state ...
        if (continuationToken !== undefined) {
            if (continuationToken <= 0) {
                return Promise.reject({ message: "All messages from conversation " + conversationId + " have been loaded" });
            }
            orphanedEventContainer = this._orphanedEevnts[conversationId];
            if (orphanedEventContainer) {
                if (orphanedEventContainer.continuationToken !== continuationToken) {
                    // get rid of our cached events as they are now useless
                    delete this._orphanedEevnts[conversationId];
                    return Promise.reject({ message: "Invalid continuation token: " + continuationToken + " for " + conversationId + ", you nust start from the end" });
                }
            }
            else {
                return Promise.reject({ message: "Invalid continuation token: " + continuationToken + " for " + conversationId + ", you nust start from the end" });
            }
        }
        else {
            this.resetConversation(conversationId);
        }
        // get the messages ...
        return this._messageManager.getConversationMessages(conversationId, pageSize, continuationToken)
            .then(function (result) {
            _this._logger.log("getConversationMessages(" + conversationId + ", " + pageSize + ", " + continuationToken + ") returned", result);
            if (result.messages === undefined) {
                _this._logger.log("No messages in this channel yet");
                return Promise.resolve({ messages: [] });
            }
            else {
                // The next continuatioToken will be (result.earliestEventId - 1) 
                if (!orphanedEventContainer) {
                    orphanedEventContainer = {
                        continuationToken: result.earliestEventId - 1,
                        orphanedEvents: []
                    };
                    _this._orphanedEevnts[conversationId] = orphanedEventContainer;
                }
                else {
                    orphanedEventContainer.continuationToken = result.earliestEventId - 1;
                }
                if (result.orphanedEvents.length) {
                    var mapped = [];
                    for (var _i = 0, _a = result.orphanedEvents; _i < _a.length; _i++) {
                        var event_1 = _a[_i];
                        mapped.push(_this.mapOrphanedEvent(event_1));
                    }
                    // could merge these after playing through our cache ...
                    _this.mergeOrphanedEvents(orphanedEventContainer, mapped);
                }
                _this.applyOrphanedEvents(result.messages, orphanedEventContainer);
                return Promise.resolve({
                    continuationToken: orphanedEventContainer.continuationToken,
                    earliestEventId: result.earliestEventId,
                    latestEventId: result.latestEventId,
                    messages: result.messages,
                });
            }
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
        for (var _i = 0; _i < messages.length; _i++) {
            var message = messages[_i];
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
        this._orphanedEevnts[conversationId] = {};
        this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
    };
    /**
     *
     */
    MessagePager.prototype.mergeOrphanedEvents = function (orphanedEventContainer, orphanedEvets) {
        orphanedEventContainer.orphanedEvents = orphanedEventContainer.orphanedEvents.concat(orphanedEvets);
        orphanedEventContainer.orphanedEvents = orphanedEventContainer.orphanedEvents.sort(function (e1, e2) {
            if (e1.conversationEventId > e2.conversationEventId) {
                return 1;
            }
            else if (e1.conversationEventId < e2.conversationEventId) {
                return -1;
            }
            else {
                return 0;
            }
        });
        // this._paragonSDK.setObject("orphanedEevnts", this._orphanedEevnts);
        this._logger.log("mergedOrphanedEvents: " + JSON.stringify(orphanedEventContainer.orphanedEvents));
    };
    /**
     * Orphaned events must be applied in ascending order, so if we want to loop backwards through these they need to be sorted
     * by id descending
     */
    MessagePager.prototype.applyOrphanedEvents = function (messages, orphanedEventContainer) {
        this._logger.log("==> applyOrphanedEvents: " + JSON.stringify(orphanedEventContainer.orphanedEvents));
        for (var i = orphanedEventContainer.orphanedEvents.length - 1; i >= 0; i--) {
            var event_2 = orphanedEventContainer.orphanedEvents[i];
            if (this.playEvent(event_2, messages)) {
                this._logger.log("succesfuly played event " + event_2.conversationEventId);
                orphanedEventContainer.orphanedEvents.splice(i, 1);
            }
            else {
                this._logger.warn("failed to play event " + event_2.conversationEventId, event_2);
            }
        }
        this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
        this._logger.log("<== applyOrphanedEvents: " + JSON.stringify(orphanedEventContainer.orphanedEvents));
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
})();
exports.MessagePager = MessagePager;
//# sourceMappingURL=messagePager.js.map