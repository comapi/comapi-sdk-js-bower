"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppMessaging = (function () {
    function AppMessaging(_networkManager, _conversationManager, _messageManager, _messagePager) {
        this._networkManager = _networkManager;
        this._conversationManager = _conversationManager;
        this._messageManager = _messageManager;
        this._messagePager = _messagePager;
    }
    AppMessaging.prototype.createConversation = function (conversationDetails) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.createConversation(conversationDetails);
        });
    };
    AppMessaging.prototype.updateConversation = function (conversationDetails, eTag) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.updateConversation(conversationDetails, eTag);
        });
    };
    AppMessaging.prototype.getConversation = function (conversationId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.getConversation(conversationId);
        });
    };
    AppMessaging.prototype.deleteConversation = function (conversationId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.deleteConversation(conversationId);
        })
            .then(function (deleted) {
            return _this._messagePager.resetConversation(conversationId);
        });
    };
    AppMessaging.prototype.addParticipantsToConversation = function (conversationId, participants) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.addParticipantsToConversation(conversationId, participants);
        });
    };
    AppMessaging.prototype.deleteParticipantsFromConversation = function (conversationId, participants) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.deleteParticipantsFromConversation(conversationId, participants);
        });
    };
    AppMessaging.prototype.getParticipantsInConversation = function (conversationId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.getParticipantsInConversation(conversationId);
        });
    };
    AppMessaging.prototype.getConversations = function (scope, profileId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.getConversations(scope, profileId);
        });
    };
    AppMessaging.prototype.getConversationEvents = function (conversationId, from, limit) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._messageManager.getConversationEvents(conversationId, from, limit);
        });
    };
    AppMessaging.prototype.sendMessageToConversation = function (conversationId, message) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._messageManager.sendMessageToConversation(conversationId, message);
        });
    };
    AppMessaging.prototype.sendMessageStatusUpdates = function (conversationId, statuses) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._messageManager.sendMessageStatusUpdates(conversationId, statuses);
        });
    };
    AppMessaging.prototype.getMessages = function (conversationId, pageSize, continuationToken) {
        var _this = this;
        var profileId;
        var _getMessagesResponse;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            profileId = sessionInfo.session.profileId;
            return _this._messagePager.getMessages(conversationId, pageSize, continuationToken);
        })
            .then(function (getMessagesResponse) {
            _getMessagesResponse = getMessagesResponse;
            return _this._messagePager.markMessagesAsDelivered(conversationId, getMessagesResponse.messages, profileId);
        })
            .then(function (markDeliveredresponse) {
            return Promise.resolve(_getMessagesResponse);
        });
    };
    AppMessaging.prototype.sendIsTyping = function (conversationId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.sendIsTyping(conversationId);
        });
    };
    AppMessaging.prototype.sendIsTypingOff = function (conversationId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.sendIsTypingOff(conversationId);
        });
    };
    return AppMessaging;
}());
exports.AppMessaging = AppMessaging;
//# sourceMappingURL=appMessaging.js.map