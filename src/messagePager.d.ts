import { ILogger, ILocalStorageData, IConversationMessage, IMessageManager, IGetMessagesResponse, IOrphanedEventManager, IConversationMessageEvent, IMessagePager } from "./interfaces";
export declare class MessagePager implements IMessagePager {
    private _logger;
    private _localStorage;
    private _messageManager;
    private _orphanedEventManager;
    constructor(_logger: ILogger, _localStorage: ILocalStorageData, _messageManager: IMessageManager, _orphanedEventManager: IOrphanedEventManager);
    getMessages(conversationId: string, pageSize: number, continuationToken?: number): Promise<IGetMessagesResponse>;
    getOrphanedEvents(conversationId: string, orphanedEvents: any[]): Promise<IConversationMessageEvent[]>;
    markMessagesAsDelivered(id: string, messages: IConversationMessage[], userId: string): Promise<string>;
    resetConversation(conversationId: string): Promise<boolean>;
    private applyOrphanedEvents(messages, orphanedEvents);
    private playEvent(event, messages);
    private mapOrphanedEvent(event);
}
