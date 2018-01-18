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
var AppMessaging = (function () {
    /**
     * AppMessaging class constructor.
     * @class  AppMessaging
     * @classdesc Class that implements AppMessaging
     * @param {INetworkManager} networkManager
     * @param {IConversationManager} conversationManager
     * @param {IMessageManager} messageManager
     */
    function AppMessaging(_networkManager, _conversationManager, _messageManager, _messagePager, _contentManager) {
        this._networkManager = _networkManager;
        this._conversationManager = _conversationManager;
        this._messageManager = _messageManager;
        this._messagePager = _messagePager;
        this._contentManager = _contentManager;
    }
    /**
     * Function to create a conversation
     * @method AppMessaging#createConversation
     * @param {IConversationDetails} conversationDetails - the conversation details (use `ConversationBuilder` to create this)
     * @returns {Promise}
     */
    AppMessaging.prototype.createConversation = function (conversationDetails) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.createConversation(conversationDetails);
        });
    };
    /**
     * Function to update a conversation
     * @method AppMessaging#updateConversation
     * @param {IConversationDetails} conversationDetails - the conversation details (use `ConversationBuilder` to create this)
     * @param {string} [eTag] - the eTag
     * @returns {Promise}
     */
    AppMessaging.prototype.updateConversation = function (conversationDetails, eTag) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.updateConversation(conversationDetails, eTag);
        });
    };
    /**
     * Function to get a conversation
     * @method AppMessaging#getConversation
     * @param {string} conversationId
     * @returns {Promise}
     */
    AppMessaging.prototype.getConversation = function (conversationId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.getConversation(conversationId);
        });
    };
    /**
     * Function to delete a conversation
     * @method AppMessaging#deleteConversation
     * @param {string} conversationId
     * @returns {Promise}
     */
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
    /**
     * Function to add participants to a conversation
     * @method AppMessaging#addParticipantsToConversation
     * @param {string} conversationId
     * @param {IConversationParticipant[]} participants
     * @returns {Promise}
     */
    AppMessaging.prototype.addParticipantsToConversation = function (conversationId, participants) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.addParticipantsToConversation(conversationId, participants);
        });
    };
    /**
     * Function to remove participants to a conversation
     * @method AppMessaging#deleteParticipantsFromConversation
     * @param {string} conversationId
     * @param {string[]} participants
     * @returns {Promise}
     */
    AppMessaging.prototype.deleteParticipantsFromConversation = function (conversationId, participants) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.deleteParticipantsFromConversation(conversationId, participants);
        });
    };
    /**
     * Function to get participantss in a conversation
     * @method AppMessaging#getParticipantsInConversation
     * @param {string} conversationId
     * @returns {Promise}
     */
    AppMessaging.prototype.getParticipantsInConversation = function (conversationId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.getParticipantsInConversation(conversationId);
        });
    };
    /**
     * Function to get all conversations  the user is a participant in
     * @method AppMessaging#getConversations
     * @param {ConversationScope} [scope] - the conversation scope ["`public`"|"`participant`"]
     * @param {string} [profileId] - The profileId to search with
     * @returns {Promise}
     */
    AppMessaging.prototype.getConversations = function (scope, profileId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.getConversations(scope, profileId);
        });
    };
    /**
     * Function to get events from a conversation
     * @method AppMessaging#getConversationEvents
     * @param {string} conversationId - the conversation Id
     * @param {number} from - the event Id to start from
     * @param {number} limit - the maximum number of events to retrievee
     * @returns {Promise}
     */
    AppMessaging.prototype.getConversationEvents = function (conversationId, from, limit) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._messageManager.getConversationEvents(conversationId, from, limit);
        });
    };
    /**
     * Function to send a message to a conversation
     * @method AppMessaging#sendMessageToConversation
     * @param {string} conversationId  - the conversation Id
     * @param {IConversationMessage} - the message to send (Use `MessageBuilder` to create a message)
     * @returns {Promise}
     */
    AppMessaging.prototype.sendMessageToConversation = function (conversationId, message) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._messageManager.sendMessageToConversation(conversationId, message);
        });
    };
    /**
     * Function to sent message status udates for messages in a conversation
     * @method AppMessaging#sendMessageStatusUpdates
     * @param {string} conversationId  - the conversation Id
     * @param {IMessageStatus[]} statuses -  the message statuses (Use `MessageStatusBuilder` to create the status objects)
     * @returns {Promise}
     */
    AppMessaging.prototype.sendMessageStatusUpdates = function (conversationId, statuses) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._messageManager.sendMessageStatusUpdates(conversationId, statuses);
        });
    };
    /**
     * Get a page of messages, internally deal with orphaned events etc ...
     * @method AppMessaging#getMessages
     * @param {string} id - the conversationId
     * @param {number} pageSize - the page size
     * @param {number} [continuationToken] - the continuation token (optional - if not specified then retrieve from the end)
     * @returns {Promise<IGetMessagesResponse>}
     */
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
    /**
     * Function to send typing event to a conversation
     * @method AppMessaging#sendIsTyping
     * @param {string} conversationId - the conversation Id
     * @returns {Promise}
     */
    AppMessaging.prototype.sendIsTyping = function (conversationId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.sendIsTyping(conversationId);
        });
    };
    /**
     * Function to send typing off event to a conversation
     * @method AppMessaging#sendIsTypingOff
     * @param {string} conversationId - the conversation Id
     * @returns {Promise}
     */
    AppMessaging.prototype.sendIsTypingOff = function (conversationId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._conversationManager.sendIsTypingOff(conversationId);
        });
    };
    /**
     * Method to upload content data
     * @method AppMessaging#uploadContent
     * @param {ContentData} content - the content
     * @returns {IUploadContentResult} - the result
     */
    AppMessaging.prototype.uploadContent = function (content, folder) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._contentManager.uploadContent(content, folder);
        });
    };
    return AppMessaging;
}());
AppMessaging = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager)),
    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.MessagePager)),
    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ContentManager)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], AppMessaging);
exports.AppMessaging = AppMessaging;
//# sourceMappingURL=appMessaging.js.map