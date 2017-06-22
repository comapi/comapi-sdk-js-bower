import { IMessageManager, IMessageStatus, IMessagePart, IMessageAlert, ISendMessageResult, IConversationManager, IConversationMessage, IConversationMessageEvent, IConversationMessagesResult, ISessionManager, IRestClient, ILogger, ILocalStorageData, IComapiConfig } from "./interfaces";
export declare class MessageManager implements IMessageManager {
    private _logger;
    private _restClient;
    private _localStorageData;
    private _comapiConfig;
    private _sessionManager;
    private _conversationManager;
    constructor(_logger: ILogger, _restClient: IRestClient, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig, _sessionManager: ISessionManager, _conversationManager: IConversationManager);
    getConversationEvents(conversationId: string, from: number, limit: number): Promise<IConversationMessageEvent[]>;
    getConversationMessages(conversationId: string, limit: number, from?: number): Promise<IConversationMessagesResult>;
    _sendMessageToConversation(conversationId: string, metadata: Object, parts: IMessagePart[], alert: IMessageAlert): Promise<ISendMessageResult>;
    sendMessageToConversation(conversationId: string, message: IConversationMessage): Promise<ISendMessageResult>;
    sendMessageStatusUpdates(conversationId: string, statuses: IMessageStatus[]): Promise<any>;
}
