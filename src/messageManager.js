var utils_1 = require("./utils");
var MessageManager = (function () {
    /**
     * MessagesManager class constructor.
     * @class MessagesManager
     * @ignore
     * @classdesc Class that implements Messages Management.
     * @parameter {ILogger} logger
     * @parameter {IRestClient} restClient
     * @parameter {ILocalStorageData} localStorageData
     * @parameter {IComapiConfig} comapiConfig
     * @parameter {ISessionManager} sessionManager
     * @parameter {IChannelManager} channelManager
     */
    function MessageManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager, _conversationManager) {
        this._logger = _logger;
        this._restClient = _restClient;
        this._localStorageData = _localStorageData;
        this._comapiConfig = _comapiConfig;
        this._sessionManager = _sessionManager;
        this._conversationManager = _conversationManager;
    }
    /**
     * @method MessagesManager#getConversationEvents
     * @param {string} conversationId
     * @param {number} from
     * @param {number} limit
     * @returns {Promise}
     */
    MessageManager.prototype.getConversationEvents = function (conversationId, from, limit) {
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.events, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationId,
            urlBase: this._comapiConfig.urlBase,
        });
        url += "?from=" + from;
        url += "&limit=" + limit;
        return this._restClient.get(url)
            .then(function (result) {
            return Promise.resolve(result.response);
        });
    };
    /**
     * @method MessagesManager#getConversationMessages
     * @param {string} conversationId
     * @param {number} limit
     * @param {number} [from]
     * @returns {Promise}
     */
    MessageManager.prototype.getConversationMessages = function (conversationId, limit, from) {
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.messages, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationId,
            urlBase: this._comapiConfig.urlBase,
        });
        url += "?limit=" + limit;
        if (from !== undefined) {
            url += "&from=" + from;
        }
        return this._restClient.get(url)
            .then(function (result) {
            return Promise.resolve(result.response);
        });
    };
    /**
     * @deprecated - use methd that uses IConversationDetails / ConversationBuilder
     * @method MessagesManager#sendMessageToConversation
     * @parameter {String} conversationId
     * @parameter {Object} metadata
     * @parameter {IMessagePart[]} parts
     * @parameter {IMessageAlert} alert
     * @returns {Promise}
     */
    MessageManager.prototype._sendMessageToConversation = function (conversationId, metadata, parts, alert) {
        var request = {
            alert: alert,
            metadata: metadata,
            parts: parts,
        };
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.messages, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.post(url, {}, request)
            .then(function (result) {
            return Promise.resolve(result.response);
        });
    };
    /**
     * @method MessagesManager#sendMessageToConversation2
     * @parameter {string} conversationId
     * @parameter {IConversationMessage} message
     */
    MessageManager.prototype.sendMessageToConversation = function (conversationId, message) {
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.messages, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.post(url, {}, message)
            .then(function (result) {
            return Promise.resolve(result.response);
        });
    };
    /**
     * @method MessagesManager#sendMessageStatusUpdates
     * @param {string} conversationId
     * @param {IMessageStatus[]} statuses
     * @returns {Promise}
     */
    MessageManager.prototype.sendMessageStatusUpdates = function (conversationId, statuses) {
        var headers = {
            "Content-Type": "application/json",
        };
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.statusUpdates, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            conversationId: conversationId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.post(url, headers, statuses)
            .then(function (result) {
            return Promise.resolve(result.response);
        });
    };
    return MessageManager;
})();
exports.MessageManager = MessageManager;
//# sourceMappingURL=messageManager.js.map