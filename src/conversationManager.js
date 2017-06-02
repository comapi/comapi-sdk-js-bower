var interfaces_1 = require("./interfaces");
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
     * Function to create a onversation
     * @method ConversationManager#createConversation
     * @param {IConversationDetails} conversationDetails
     * @returns {Promise}
     */
    ConversationManager.prototype.createConversation = function (conversationDetails) {
        return this._restClient.post(this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/conversations", {}, conversationDetails)
            .then(function (result) {
            result.response._etag = result.headers.ETag;
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
        return this._restClient.put(this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/conversations/" + conversationDetails.id, headers, args)
            .then(function (result) {
            result.response._etag = result.headers.ETag;
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
        return this._restClient.get(this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/conversations/" + conversationId)
            .then(function (result) {
            result.response._etag = result.headers.ETag;
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
        return this._restClient.delete(this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/conversations/" + conversationId, {})
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
        return this._restClient.post(this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/conversations/" + conversationId + "/participants", {}, participants)
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
        return this._restClient.delete((this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/conversations/" + conversationId + "/participants") + query, {})
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
        return this._restClient.get(this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/conversations/" + conversationId + "/participants")
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
        var url = this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/conversations";
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
        var url = this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/conversations/" + conversationId + "/typing";
        return this._restClient.post(url, {}, {})
            .then(function (result) {
            _this.isTypingInfo[conversationId] = new Date().toISOString();
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
        var url = this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/conversations/" + conversationId + "/typing";
        return this._restClient.delete(url, {})
            .then(function (result) {
            _this.isTypingOffInfo[conversationId] = new Date().toISOString();
            return Promise.resolve(true);
        });
    };
    return ConversationManager;
})();
exports.ConversationManager = ConversationManager;
//# sourceMappingURL=conversationManager.js.map