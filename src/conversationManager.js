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
var interfaces_1 = require("./interfaces");
var utils_1 = require("./utils");
var interfaceSymbols_1 = require("./interfaceSymbols");
var ConversationManager = (function () {
    /**
     * ConversationManager class constructor.
     * @class ConversationManager
     * @ignore
     * @classdesc Class that implements Conversation Management.
     * @parameter {ILogger} logger
     * @parameter {IRestClient} restClient
     * @parameter {ILocalStorageData} localStorageData
     * @parameter {IComapiConfig} ComapiConfig
     * @parameter {ISessionManager} sessionManager
     */
    function ConversationManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager) {
        this._logger = _logger;
        this._restClient = _restClient;
        this._localStorageData = _localStorageData;
        this._comapiConfig = _comapiConfig;
        this._sessionManager = _sessionManager;
        //  This object is an in-memory dictionary of last sent timestamps (conversationId: timestamp) ...
        //  "FA93AA1B-DEA5-4182-BE67-3DEAF4021040": "2017-02-28T14:48:21.634Z"
        this.isTypingInfo = {};
        // same for typing off 
        this.isTypingOffInfo = {};
    }
    /**
     * Function to create a conversation
     * @method ConversationManager#createConversation
     * @param {IConversationDetails} conversationDetails
     * @returns {Promise}
     */
    ConversationManager.prototype.createConversation = function (conversationDetails) {
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversations, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.post(url, {}, conversationDetails)
            .then(function (result) {
            result.response._etag = utils_1.Utils.getHeaderValue(result.headers, "ETag");
            return Promise.resolve(result.response);
        });
    };
    /**
     * Function to update a conversation
     * @method ConversationManager#updateConversation
     * @param {IConversationDetails} conversationDetails
     * @param {string} [eTag] - the eTag
     * @returns {Promise}
     */
    ConversationManager.prototype.updateConversation = function (conversationDetails, eTag) {
        var headers = {};
        if (eTag) {
            headers["if-match"] = eTag;
        }
        var args = {
            description: conversationDetails.description,
            isPublic: conversationDetails.isPublic,
            name: conversationDetails.name,
            roles: conversationDetails.roles,
        };
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversation, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationDetails.id,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.put(url, headers, args)
            .then(function (result) {
            result.response._etag = utils_1.Utils.getHeaderValue(result.headers, "ETag");
            return Promise.resolve(result.response);
        });
    };
    /**
     * Function to get a conversation
     * @method ConversationManager#getConversation
     * @param {string} conversationId
     * @returns {Promise}
     */
    ConversationManager.prototype.getConversation = function (conversationId) {
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversation, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.get(url)
            .then(function (result) {
            result.response._etag = utils_1.Utils.getHeaderValue(result.headers, "ETag");
            return Promise.resolve(result.response);
        });
    };
    /**
     * Function to delete a conversation
     * @method ConversationManager#deleteConversation
     * @param {string} conversationId
     * @returns {Promise}
     */
    ConversationManager.prototype.deleteConversation = function (conversationId) {
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversation, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.delete(url, {})
            .then(function (result) {
            return Promise.resolve(true);
        });
    };
    /**
     * Function to add participants to a conversation
     * @method ConversationManager#addParticipantsToConversation
     * @param {string} conversationId
     * @param {IConversationParticipant[]} participants
     * @returns {Promise}
     */
    ConversationManager.prototype.addParticipantsToConversation = function (conversationId, participants) {
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.participants, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.post(url, {}, participants)
            .then(function (result) {
            return Promise.resolve(true);
        });
    };
    /**
     * Function to remove participants to a conversation
     * @method ConversationManager#deleteParticipantsFromConversation
     * @param {string} conversationId
     * @param {string[]} participants
     * @returns {Promise}
     */
    ConversationManager.prototype.deleteParticipantsFromConversation = function (conversationId, participants) {
        var query = "";
        for (var i = 0; i < participants.length; i++) {
            query += (i === 0 ? "?id=" + participants[i] : "&id=" + participants[i]);
        }
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.participants, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.delete(url + query, {})
            .then(function (result) {
            return Promise.resolve(true);
        });
    };
    /**
     * Function to get participantss in a conversation
     * @method ConversationManager#getParticipantsInConversation
     * @param {string} conversationId
     * @returns {Promise}
     */
    ConversationManager.prototype.getParticipantsInConversation = function (conversationId) {
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.participants, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.get(url)
            .then(function (result) {
            return Promise.resolve(result.response);
        });
    };
    /**
     * @method ConversationManager#getConversations
     * @param {ConversationScope} [scope]
     * @param {string} [profileId]
     * @returns {Promise}
     */
    ConversationManager.prototype.getConversations = function (scope, profileId) {
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversations, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            urlBase: this._comapiConfig.urlBase,
        });
        if (scope || profileId) {
            url += "?";
            if (scope !== undefined) {
                url += "scope=" + interfaces_1.ConversationScope[scope] + "&";
            }
            if (profileId !== undefined) {
                url += "profileId=" + profileId;
            }
        }
        return this._restClient.get(url)
            .then(function (result) {
            return Promise.resolve(result.response);
        });
    };
    /**
     * Function to send an is-typing event
     * @method ConversationManager#sendIsTyping
     * @param {string} conversationId
     * @returns {Promise}
     */
    ConversationManager.prototype.sendIsTyping = function (conversationId) {
        var _this = this;
        // we only want to call this once every n seconds (10?)
        if (this.isTypingInfo[conversationId]) {
            var lastSentTime = new Date(this.isTypingInfo[conversationId]);
            var now = new Date();
            var diff = (now.getTime() - lastSentTime.getTime()) / 1000;
            if (diff < (this._comapiConfig.isTypingTimeout || 10)) {
                return Promise.resolve(false);
            }
        }
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.typing, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.post(url, {}, {})
            .then(function (result) {
            _this.isTypingInfo[conversationId] = new Date().toISOString();
            if (_this.isTypingOffInfo[conversationId]) {
                delete _this.isTypingOffInfo[conversationId];
            }
            return Promise.resolve(true);
        });
    };
    /**
     * Function to send an is-typing off event
     * @method ConversationManager#sendIsTyping
     * @param {string} conversationId
     * @returns {Promise}
     */
    ConversationManager.prototype.sendIsTypingOff = function (conversationId) {
        var _this = this;
        // we only want to call this once every n seconds (10?)
        if (this.isTypingOffInfo[conversationId]) {
            var lastSentTime = new Date(this.isTypingOffInfo[conversationId]);
            var now = new Date();
            var diff = (now.getTime() - lastSentTime.getTime()) / 1000;
            if (diff < (this._comapiConfig.isTypingOffTimeout || 10)) {
                return Promise.resolve(false);
            }
        }
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.typing, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.delete(url, {})
            .then(function (result) {
            _this.isTypingOffInfo[conversationId] = new Date().toISOString();
            if (_this.isTypingInfo[conversationId]) {
                delete _this.isTypingInfo[conversationId];
            }
            return Promise.resolve(true);
        });
    };
    return ConversationManager;
}());
ConversationManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], ConversationManager);
exports.ConversationManager = ConversationManager;
//# sourceMappingURL=conversationManager.js.map