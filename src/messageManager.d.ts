import { IMessageManager, IMessageStatus, IMessagePart, IMessageAlert, ISendMessageResult, IConversationManager, IConversationMessage, IConversationMessageEvent, IConversationMessagesResult, ISessionManager, IRestClient, ILogger, ILocalStorageData, IComapiConfig } from "./interfaces";
export declare class MessageManager implements IMessageManager {
    private _logger;
    private _restClient;
    private _localStorageData;
    private _comapiConfig;
    private _sessionManager;
    private _conversationManager;
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
    constructor(_logger: ILogger, _restClient: IRestClient, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig, _sessionManager: ISessionManager, _conversationManager: IConversationManager);
    /**
     * @method MessagesManager#getConversationEvents
     * @param {string} conversationId
     * @param {number} from
     * @param {number} limit
     * @returns {Promise}
     */
    getConversationEvents(conversationId: string, from: number, limit: number): Promise<IConversationMessageEvent[]>;
    /**
     * @method MessagesManager#getConversationMessages
     * @param {string} conversationId
     * @param {number} limit
     * @param {number} [from]
     * @returns {Promise}
     */
    getConversationMessages(conversationId: string, limit: number, from?: number): Promise<IConversationMessagesResult>;
    /**
     * @deprecated - use methd that uses IConversationDetails / ConversationBuilder
     * @method MessagesManager#sendMessageToConversation
     * @parameter {String} conversationId
     * @parameter {Object} metadata
     * @parameter {IMessagePart[]} parts
     * @parameter {IMessageAlert} alert
     * @returns {Promise}
     */
    _sendMessageToConversation(conversationId: string, metadata: Object, parts: IMessagePart[], alert: IMessageAlert): Promise<ISendMessageResult>;
    /**
     * @method MessagesManager#sendMessageToConversation2
     * @parameter {string} conversationId
     * @parameter {IConversationMessage} message
     */
    sendMessageToConversation(conversationId: string, message: IConversationMessage): Promise<ISendMessageResult>;
    /**
     * @method MessagesManager#sendMessageStatusUpdates
     * @param {string} conversationId
     * @param {IMessageStatus[]} statuses
     * @returns {Promise}
     */
    sendMessageStatusUpdates(conversationId: string, statuses: IMessageStatus[]): Promise<any>;
}
