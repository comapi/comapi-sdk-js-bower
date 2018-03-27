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
     */
    function MessageManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager) {
        this._logger = _logger;
        this._restClient = _restClient;
        this._localStorageData = _localStorageData;
        this._comapiConfig = _comapiConfig;
        this._sessionManager = _sessionManager;
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
}());
MessageManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], MessageManager);
exports.MessageManager = MessageManager;
//# sourceMappingURL=messageManager.js.map