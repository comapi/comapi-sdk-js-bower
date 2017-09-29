"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MemoryConversationStore = (function () {
    function MemoryConversationStore() {
        this.conversations = [];
        this.messageStore = {};
    }
    MemoryConversationStore.prototype.reset = function () {
        this.conversations = [];
        this.messageStore = {};
        return Promise.resolve(true);
    };
    MemoryConversationStore.prototype.getConversation = function (conversationId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this._findConversation(conversationId));
        });
    };
    MemoryConversationStore.prototype.createConversation = function (conversation) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._indexOfConversation(conversation.id) === -1) {
                _this.conversations.push(conversation);
                _this.messageStore[conversation.id] = [];
                resolve(true);
            }
            else {
                reject({ message: "Conversation " + conversation.id + " already exists" });
            }
        });
    };
    MemoryConversationStore.prototype.updateConversation = function (conversation) {
        var _this = this;
        console.log("%c updateConversation', 'background: #222; color: #bada55", conversation);
        return new Promise(function (resolve, reject) {
            var found = _this._findConversation(conversation.id);
            if (found) {
                found.name = conversation.name;
                found.description = conversation.description;
                found.roles = conversation.roles;
                found.isPublic = conversation.isPublic;
                found.earliestLocalEventId = conversation.earliestLocalEventId;
                found.latestLocalEventId = conversation.latestLocalEventId;
                found.continuationToken = conversation.continuationToken;
                resolve(true);
            }
            else {
                reject({ message: "Conversation " + conversation.id + " not found" });
            }
        });
    };
    MemoryConversationStore.prototype.deleteConversation = function (conversationId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var index = _this._indexOfConversation(conversationId);
            if (index >= 0) {
                _this.conversations.splice(index, 1);
                resolve(true);
            }
            else {
                reject({ message: "Conversation " + conversationId + " not found" });
            }
        });
    };
    MemoryConversationStore.prototype.getMessage = function (conversationId, messageId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this._findMessage(conversationId, messageId));
        });
    };
    MemoryConversationStore.prototype.updateMessageStatus = function (conversationId, messageId, profileId, status, timestamp) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var message = _this._findMessage(conversationId, messageId);
            if (message) {
                if (message.statusUpdates &&
                    message.statusUpdates[profileId] &&
                    message.statusUpdates[profileId].status === "read") {
                    console.log("<-- updateMessageStatus(false)");
                    resolve(false);
                }
                else {
                    if (!message.statusUpdates) {
                        message.statusUpdates = {};
                    }
                    message.statusUpdates[profileId] = {
                        status: status,
                        on: timestamp
                    };
                    console.log("<-- updateMessageStatus(true)");
                    resolve(true);
                }
            }
            else {
                reject({ message: "Message " + messageId + " not found in conversation " + conversationId });
            }
        });
    };
    MemoryConversationStore.prototype.createMessage = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var found = _this._findMessage(message.conversationId, message.id);
            if (found === null) {
                var conversationMessages = _this.messageStore[message.conversationId];
                if (conversationMessages) {
                    var position = 0;
                    for (var i = conversationMessages.length - 1; i >= 0; i--) {
                        var _message = conversationMessages[i];
                        if (_message.sentEventId < message.sentEventId) {
                            position = i + 1;
                            break;
                        }
                    }
                    conversationMessages.splice(position, 0, message);
                    resolve(true);
                }
                else {
                    reject({ message: "Conversation " + message.conversationId + " not found in messageStore" });
                }
            }
            else {
                console.warn("Message already in store, updating ...", message);
                found.sentEventId = message.sentEventId;
                found.senderId = message.senderId;
                found.sentOn = message.sentOn;
                found.statusUpdates = message.statusUpdates;
                resolve(false);
            }
        });
    };
    MemoryConversationStore.prototype.getConversations = function () {
        return Promise.resolve(this.conversations);
    };
    MemoryConversationStore.prototype.getMessages = function (conversationId) {
        var conversationMessages = this.messageStore[conversationId];
        return Promise.resolve(conversationMessages ? conversationMessages : []);
    };
    MemoryConversationStore.prototype.deleteConversationMessages = function (conversationId) {
        this.messageStore[conversationId] = [];
        return Promise.resolve(true);
    };
    MemoryConversationStore.prototype._findConversation = function (conversationId) {
        var result = this.conversations.filter(function (x) { return x.id === conversationId; });
        return result.length === 1 ? result[0] : null;
    };
    MemoryConversationStore.prototype._indexOfConversation = function (conversationId) {
        return this.conversations.map(function (c) { return c.id; }).indexOf(conversationId);
    };
    MemoryConversationStore.prototype._findMessage = function (conversationId, messageId) {
        var conversationMessages = this.messageStore[conversationId];
        if (conversationMessages) {
            var message = conversationMessages.filter(function (x) { return x.id === messageId; });
            if (message.length === 1) {
                return message[0];
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    return MemoryConversationStore;
}());
exports.MemoryConversationStore = MemoryConversationStore;
//# sourceMappingURL=memoryStore.js.map