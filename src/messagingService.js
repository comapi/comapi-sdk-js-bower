"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_js_foundation_1 = require("@comapi/sdk-js-foundation");
var utils_1 = require("./utils");
var mutex_1 = require("./mutex");
var MessagingService = (function () {
    function MessagingService(_foundation, _config) {
        this._foundation = _foundation;
        this._config = _config;
        this._mutex = new mutex_1.Mutex();
    }
    MessagingService.prototype.initialise = function (config) {
        var _this = this;
        this._foundation.logger.log("initialise(" + config + ")");
        this._foundation.on("conversationMessageEvent", function (event) { _this.onConversationMessageEvent(event); });
        this._foundation.on("conversationDeleted", function (event) { _this.onConversationDeleted(event); });
        this._foundation.on("conversationUpdated", function (event) { _this.onConversationUpdated(event); });
        this._foundation.on("participantAdded", function (event) { _this.onParticipantAdded(event); });
        this._foundation.on("participantRemoved", function (event) { _this.onParticipantRemoved(event); });
        return this.synchronize();
    };
    MessagingService.prototype.uninitialise = function () {
        this._foundation.logger.log("uninitialise()");
        this._foundation.off("conversationMessageEvent");
        this._foundation.off("conversationDeleted");
        this._foundation.off("conversationUpdated");
        this._foundation.off("participantAdded");
        this._foundation.off("participantRemoved");
        return Promise.resolve(true);
    };
    MessagingService.prototype.synchronize = function (scope) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            var remoteConversations;
            var localConversations;
            var syncInfo;
            return _this._foundation.startSession()
                .then(function (session) {
                return _this._foundation.services.appMessaging.getConversations(scope);
            })
                .then(function (conversations) {
                remoteConversations = conversations;
                return _this._config.conversationStore.getConversations();
            })
                .then(function (conversations) {
                localConversations = conversations.slice();
                syncInfo = _this.getConversationSyncInfo(remoteConversations, localConversations);
                return utils_1.Utils.eachSeries(syncInfo.deleteArray, function (conversationId) {
                    return _this._config.conversationStore.deleteConversation(conversationId)
                        .then(function (deleted) {
                        for (var i = localConversations.length - 1; i >= 0; i--) {
                            if (localConversations[i].id === conversationId) {
                                localConversations.splice(i, 1);
                            }
                        }
                        return deleted;
                    });
                });
            })
                .then(function (result) {
                return utils_1.Utils.eachSeries(syncInfo.addArray, function (conversation) {
                    return _this._config.conversationStore.createConversation(conversation);
                });
            })
                .then(function (result) {
                return utils_1.Utils.eachSeries(syncInfo.updateArray, function (conversation) {
                    return _this._config.conversationStore.updateConversation(conversation);
                });
            })
                .then(function (result) {
                for (var _i = 0, _a = syncInfo.addArray; _i < _a.length; _i++) {
                    var newConv = _a[_i];
                    localConversations.push(newConv);
                }
                localConversations.sort(function (a, b) {
                    var left = Number(new Date(a.lastMessageTimestamp));
                    var right = Number(new Date(b.lastMessageTimestamp));
                    return (true) ? right - left : left - right;
                });
                var syncSet = localConversations.slice(0, _this._config.lazyLoadThreshold);
                return utils_1.Utils.eachSeries(syncSet, function (conversation) {
                    return _this.synchronizeConversation(conversation);
                });
            })
                .then(function () {
                return true;
            });
        });
    };
    MessagingService.prototype.getPreviousMessages = function (conversationId) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this._config.conversationStore.getConversation(conversationId)
                .then(function (conversation) {
                return _this.getMessages(conversation);
            });
        });
    };
    MessagingService.prototype.getConversations = function () {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this._config.conversationStore.getConversations();
        });
    };
    MessagingService.prototype.getConversationInfo = function (conversationId) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            var _conversation;
            var _messages;
            var _participants;
            return _this._config.conversationStore.getConversation(conversationId)
                .then(function (conversation) {
                _conversation = conversation;
                if (_conversation.latestLocalEventId === undefined ||
                    _conversation.latestLocalEventId < _conversation.latestRemoteEventId) {
                    return _this.synchronizeConversation(conversation);
                }
                else {
                    return Promise.resolve(true);
                }
            })
                .then(function () {
                return _this._config.conversationStore.getMessages(conversationId);
            })
                .then(function (messages) {
                _messages = messages;
                return _this._foundation.services.appMessaging.getParticipantsInConversation(conversationId);
            })
                .then(function (participants) {
                _participants = participants;
                return {
                    conversation: _conversation,
                    messages: _messages,
                    participants: _participants
                };
            });
        });
    };
    MessagingService.prototype.sendTextMessage = function (conversationId, text) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            var message = new sdk_js_foundation_1.MessageBuilder().withText(text);
            return _this._foundation.services.appMessaging.sendMessageToConversation(conversationId, message)
                .then(function (result) {
                var m = {
                    conversationId: conversationId,
                    id: result.id,
                    metadata: message.metadata,
                    parts: message.parts,
                    senderId: _this._foundation.session && _this._foundation.session.profileId || undefined,
                    senderName: undefined,
                    sentEventId: result.eventId,
                    sentOn: new Date().toISOString(),
                    statusUpdates: {}
                };
                return _this._config.conversationStore.createMessage(m);
            });
        });
    };
    MessagingService.prototype.sendMessage = function (conversationId, message) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this._foundation.services.appMessaging.sendMessageToConversation(conversationId, message)
                .then(function (result) {
                var m = {
                    conversationId: conversationId,
                    id: result.id,
                    metadata: message.metadata,
                    parts: message.parts,
                    senderId: _this._foundation.session && _this._foundation.session.profileId || undefined,
                    senderName: undefined,
                    sentEventId: result.eventId,
                    sentOn: new Date().toISOString(),
                    statusUpdates: {}
                };
                return _this._config.conversationStore.createMessage(m);
            });
        });
    };
    MessagingService.prototype.markMessagesAsRead = function (conversationId, messageIds) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            var statuses = new sdk_js_foundation_1.MessageStatusBuilder().readStatusUpdates(messageIds);
            return _this._foundation.services.appMessaging.sendMessageStatusUpdates(conversationId, [statuses]);
        });
    };
    MessagingService.prototype.markAllMessagesAsRead = function (conversationId) {
        var _this = this;
        var unreadIds = [];
        return this._config.conversationStore.getMessages(conversationId)
            .then(function (messages) {
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                if (!_this.isMessageRead(message)) {
                    unreadIds.push(message.id);
                }
            }
            return unreadIds.length > 0 ? _this.markMessagesAsRead(conversationId, unreadIds) : Promise.resolve(false);
        });
    };
    MessagingService.prototype.isMessageRead = function (message, profileId) {
        var currentUser = this._foundation.session && this._foundation.session.profileId || undefined;
        var _profileId = profileId ? profileId : currentUser;
        if (message.senderId !== currentUser) {
            return message.statusUpdates && message.statusUpdates[_profileId] && message.statusUpdates[_profileId].status === "read";
        }
        else {
            return true;
        }
    };
    MessagingService.prototype.createConversation = function (conversation) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this._foundation.services.appMessaging.createConversation(conversation)
                .then(function (result) {
                return _this._config.conversationStore.createConversation(_this.mapConversation(result));
            });
        });
    };
    MessagingService.prototype.updateConversation = function (conversation) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this._foundation.services.appMessaging.updateConversation(conversation)
                .then(function (updated) {
                return true;
            });
        });
    };
    MessagingService.prototype.deleteConversation = function (conversationId) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this._foundation.services.appMessaging.deleteConversation(conversationId)
                .then(function () {
                return _this._config.conversationStore.deleteConversation(conversationId);
            })
                .then(function () {
                return _this._config.conversationStore.deleteConversationMessages(conversationId);
            });
        });
    };
    MessagingService.prototype.getParticipantsInConversation = function (conversationId) {
        return this._foundation.services.appMessaging.getParticipantsInConversation(conversationId);
    };
    MessagingService.prototype.addParticipantsToConversation = function (conversationId, participants) {
        return this._foundation.services.appMessaging.addParticipantsToConversation(conversationId, participants);
    };
    MessagingService.prototype.deleteParticipantsFromConversation = function (conversationId, participants) {
        return this._foundation.services.appMessaging.deleteParticipantsFromConversation(conversationId, participants);
    };
    MessagingService.prototype.getMessages = function (conversation) {
        var _this = this;
        var getMessagesResult;
        var messages;
        return this._foundation.services.appMessaging.getMessages(conversation.id, this._config.messagePageSize, conversation.continuationToken)
            .then(function (result) {
            getMessagesResult = result;
            messages = getMessagesResult.messages.map(function (message) {
                return {
                    conversationId: message.context && message.context.conversationId || undefined,
                    id: message.id,
                    metadata: message.metadata,
                    parts: message.parts,
                    senderId: message.context && message.context.from && message.context.from.id || undefined,
                    senderName: message.context && message.context.from && message.context.from.name || undefined,
                    sentEventId: message.sentEventId,
                    sentOn: message.context && message.context.sentOn || undefined,
                    statusUpdates: message.statusUpdates
                };
            });
            return utils_1.Utils.eachSeries(messages, function (message) {
                return _this._config.conversationStore.createMessage(message);
            });
        })
            .then(function () {
            conversation.earliestLocalEventId = getMessagesResult.earliestEventId;
            if (conversation.latestLocalEventId === undefined) {
                conversation.latestLocalEventId = getMessagesResult.latestEventId;
            }
            conversation.continuationToken = getMessagesResult.continuationToken;
            return _this._config.conversationStore.updateConversation(conversation);
        });
    };
    MessagingService.prototype.mapConversation = function (conversation) {
        return {
            description: conversation.description,
            eTag: conversation._etag,
            id: conversation.id,
            isPublic: conversation.isPublic,
            lastMessageTimestamp: conversation._updatedOn,
            latestRemoteEventId: conversation.latestSentEventId,
            name: conversation.name,
            roles: conversation.roles,
        };
    };
    MessagingService.prototype.getConversationSyncInfo = function (remoteConversations, localConversations) {
        var _this = this;
        var deleteArray = [];
        var addArray = [];
        var updateArray = [];
        for (var _i = 0, localConversations_1 = localConversations; _i < localConversations_1.length; _i++) {
            var localConv = localConversations_1[_i];
            (function (localConv) {
                var found = remoteConversations.find(function (o) { return o.id === localConv.id; });
                if (!found) {
                    _this._foundation.logger.log("Local conversation " + localConv.id + " needs deleting");
                    deleteArray.push(localConv.id);
                }
                else {
                    var needsUpdating = false;
                    if (localConv.latestRemoteEventId !== found.latestSentEventId) {
                        _this._foundation.logger.log(found.id + ": latestRemoteEventId and latestSentEventId differ, needs updating ");
                        needsUpdating = true;
                    }
                    else if (found._etag && localConv.eTag && found._etag !== localConv.eTag) {
                        _this._foundation.logger.log(found.id + ": etagS differ, needs updating ");
                        needsUpdating = true;
                    }
                    if (needsUpdating) {
                        localConv.name = found.name;
                        localConv.description = found.description;
                        localConv.roles = found.roles;
                        localConv.isPublic = found.isPublic;
                        localConv.eTag = found._etag;
                        localConv.latestRemoteEventId = found.latestSentEventId;
                        updateArray.push(localConv);
                    }
                }
            })(localConv);
        }
        for (var _a = 0, remoteConversations_1 = remoteConversations; _a < remoteConversations_1.length; _a++) {
            var remoteConv = remoteConversations_1[_a];
            (function (remoteConv) {
                if (!localConversations.find(function (o) { return o.id === remoteConv.id; })) {
                    _this._foundation.logger.log("Remote conversation " + remoteConv.id + " needs adding");
                    addArray.push(_this.mapConversation(remoteConv));
                }
            })(remoteConv);
        }
        return {
            addArray: addArray,
            deleteArray: deleteArray,
            updateArray: updateArray
        };
    };
    MessagingService.prototype.updateConversationWithEvents = function (conversation) {
        var _this = this;
        var self = this;
        var _events;
        var _getPageOfEventsFunc = function (conv) {
            var _this = this;
            return self._foundation.services.appMessaging.getConversationEvents(conv.id, conv.latestLocalEventId + 1, self._config.eventPageSize)
                .then(function (events) {
                _events = events;
                return utils_1.Utils.eachSeries(events, function (event) {
                    return self.applyConversationMessageEvent(event);
                }).then(function (result) {
                    conv.latestLocalEventId = _events[_events.length - 1].conversationEventId;
                    return conv;
                });
            })
                .catch(function (error) {
                _this._foundation.logger.error("getConversationEvents ;-( threw this", error);
                return conv;
            });
        };
        var _compareFunc = function (conv) {
            if (_events) {
                return _events.length === self._config.eventPageSize;
            }
            else {
                return false;
            }
        };
        return utils_1.Utils.doUntil(_getPageOfEventsFunc, _compareFunc, conversation)
            .then(function (conv) {
            return _this._config.conversationStore.updateConversation(conv);
        });
    };
    MessagingService.prototype.synchronizeConversation = function (conversation) {
        var _this = this;
        if (conversation.latestRemoteEventId === undefined) {
            this._foundation.logger.log("Conversation " + conversation.id + " is empty ...");
            return Promise.resolve(false);
        }
        if (conversation.continuationToken === undefined) {
            this._foundation.logger.log("Conversation " + conversation.id + " seen for first time on this device, initialising with messages ...");
            return this.getMessages(conversation);
        }
        else if (conversation.latestLocalEventId >= conversation.latestRemoteEventId) {
            this._foundation.logger.log("Conversation " + conversation.id + " already up to date ...");
            return Promise.resolve(false);
        }
        else {
            var gap = conversation.latestRemoteEventId - (conversation.latestLocalEventId + 1);
            if (gap < this._config.maxEventGap) {
                this._foundation.logger.log("Updating Conversation " + conversation.id + " with events ...");
                return this.updateConversationWithEvents(conversation);
            }
            else {
                this._foundation.logger.log("Conversation " + conversation.id + " too out of date, reloading last page of messages ...");
                return this._config.conversationStore.deleteConversationMessages(conversation.id)
                    .then(function (result) {
                    conversation.continuationToken = -1;
                    conversation.earliestLocalEventId = undefined;
                    conversation.latestLocalEventId = undefined;
                    return _this._config.conversationStore.updateConversation(conversation);
                })
                    .then(function (result) {
                    return _this.getMessages(conversation);
                });
            }
        }
    };
    MessagingService.prototype._applyConversationMessageEvent = function (event) {
        switch (event.name) {
            case "conversationMessage.sent":
                var messageSentPayload = event.payload;
                var message = {
                    conversationId: event.conversationId,
                    id: messageSentPayload.messageId,
                    metadata: messageSentPayload.metadata,
                    parts: messageSentPayload.parts,
                    senderId: messageSentPayload.context && messageSentPayload.context.from && messageSentPayload.context.from.id || undefined,
                    senderName: messageSentPayload.context && messageSentPayload.context.from && messageSentPayload.context.from.name || undefined,
                    sentEventId: event.conversationEventId,
                    sentOn: messageSentPayload.context && messageSentPayload.context.sentOn || undefined,
                };
                return this._config.conversationStore.createMessage(message);
            case "conversationMessage.delivered":
            case "conversationMessage.read":
                var splitResult = event.name.split(".");
                var statusUpdate = event.payload;
                return this._config.conversationStore.updateMessageStatus(statusUpdate.conversationId, statusUpdate.messageId, statusUpdate.profileId, splitResult[1], statusUpdate.timestamp);
            default:
                return Promise.reject({ message: "Unknown option " + event.name });
        }
    };
    MessagingService.prototype.applyConversationMessageEvent = function (event) {
        var _this = this;
        var _chatConversation;
        return this._config.conversationStore.getConversation(event.conversationId)
            .then(function (chatConversation) {
            if (chatConversation === null) {
                return _this.initialiseConversation(event.conversationId);
            }
            else {
                return chatConversation;
            }
        })
            .then(function (chatConversation) {
            _chatConversation = chatConversation;
            if (event.conversationEventId > _chatConversation.latestLocalEventId + 1) {
                _this._foundation.logger.warn("Gap detected in conversation: latestEventId: " + _chatConversation.latestLocalEventId + ", conversationEventId: " + event.conversationEventId);
            }
            return _this._applyConversationMessageEvent(event);
        })
            .then(function (updated) {
            if (_chatConversation.earliestLocalEventId === undefined) {
                _chatConversation.earliestLocalEventId = event.conversationEventId;
            }
            if (_chatConversation.latestLocalEventId === undefined) {
                _chatConversation.latestLocalEventId = event.conversationEventId;
            }
            if (event.conversationEventId > _chatConversation.latestLocalEventId) {
                _chatConversation.latestLocalEventId = event.conversationEventId;
            }
            return _this._config.conversationStore.updateConversation(_chatConversation);
        });
    };
    MessagingService.prototype.onConversationMessageEvent = function (event) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this._config.conversationStore.getConversation(event.conversationId)
                .then(function (conversation) {
                if (conversation !== null) {
                    var gap = event.conversationEventId - (conversation.latestLocalEventId + 1);
                    if (gap > 0) {
                        if (gap < _this._config.maxEventGap) {
                            return _this.updateConversationWithEvents(conversation);
                        }
                        else {
                            return _this._config.conversationStore.deleteConversationMessages(event.conversationId)
                                .then(function (result) {
                                conversation.continuationToken = -1;
                                conversation.earliestLocalEventId = undefined;
                                conversation.latestLocalEventId = undefined;
                                conversation.latestRemoteEventId = event.conversationEventId;
                                return _this._config.conversationStore.updateConversation(conversation);
                            })
                                .then(function (result) {
                                return _this.getMessages(conversation);
                            });
                        }
                    }
                    else {
                        return _this._onConversationMessageEvent(event);
                    }
                }
                else {
                    return _this._onConversationMessageEvent(event);
                }
            });
        });
    };
    MessagingService.prototype._onConversationMessageEvent = function (event) {
        var _this = this;
        this._foundation.logger.log("onConversationMessageEvent", event);
        return this.applyConversationMessageEvent(event)
            .then(function (updated) {
            var payload = event.payload;
            var currentUser = _this._foundation.session && _this._foundation.session.profileId || undefined;
            if (event.name === "conversationMessage.sent" && payload.context && payload.context.from && payload.context.from.id !== currentUser) {
                var status_1 = new sdk_js_foundation_1.MessageStatusBuilder().deliveredStatusUpdate(event.payload.messageId);
                _this._foundation.services.appMessaging.sendMessageStatusUpdates(event.conversationId, [status_1]);
            }
            return updated;
        });
    };
    MessagingService.prototype.onConversationDeleted = function (event) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            _this._foundation.logger.log("onConversationDeleted");
            return _this._config.conversationStore.deleteConversation(event.conversationId);
        });
    };
    MessagingService.prototype.onConversationUpdated = function (event) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            _this._foundation.logger.log("onConversationUpdated");
            return _this._config.conversationStore.getConversation(event.conversationId)
                .then(function (conversation) {
                conversation.name = event.name;
                conversation.description = event.description;
                conversation.roles = event.roles;
                conversation.isPublic = event.isPublic;
                conversation.eTag = event.eTag;
                conversation.lastMessageTimestamp = event.timestamp;
                return _this._config.conversationStore.updateConversation(conversation);
            });
        });
    };
    MessagingService.prototype.initialiseConversation = function (conversationId, depth) {
        var _this = this;
        if (depth === void 0) { depth = 0; }
        var _conversation;
        return this._foundation.services.appMessaging.getConversation(conversationId)
            .then(function (remoteConversation) {
            _conversation = _this.mapConversation(remoteConversation);
            return _this._config.conversationStore.createConversation(_conversation);
        })
            .then(function (result) {
            return _this.getMessages(_conversation);
        })
            .then(function (result) {
            return _conversation;
        })
            .catch(function (error) {
            if (error.statusCode === 404 && depth < _this._config.getConversationMaxRetry) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () { resolve(); }, _this._config.getConversationSleepTimeout);
                })
                    .then(function () {
                    return _this.initialiseConversation(conversationId, ++depth);
                });
            }
            else {
                throw error;
            }
        });
    };
    MessagingService.prototype.onParticipantAdded = function (event) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            _this._foundation.logger.log("onParticipantAdded");
            var currentUser = _this._foundation.session && _this._foundation.session.profileId || undefined;
            if (event.profileId === currentUser) {
                return _this._config.conversationStore.getConversation(event.conversationId)
                    .then(function (conversation) {
                    return conversation === null ?
                        _this.initialiseConversation(event.conversationId)
                        : conversation;
                })
                    .then(function (conversation) {
                    return conversation !== null;
                });
            }
            else {
                return Promise.resolve(false);
            }
        });
    };
    MessagingService.prototype.onParticipantRemoved = function (event) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            _this._foundation.logger.log("onParticipantRemoved");
            var currentUser = _this._foundation.session && _this._foundation.session.profileId || undefined;
            if (event.profileId === currentUser) {
                return _this._config.conversationStore.deleteConversation(event.conversationId);
            }
            else {
                return Promise.resolve(false);
            }
        });
    };
    return MessagingService;
}());
exports.MessagingService = MessagingService;
//# sourceMappingURL=messagingService.js.map