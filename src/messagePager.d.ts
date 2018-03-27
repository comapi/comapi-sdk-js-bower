import { ILogger, ILocalStorageData, IConversationMessage, IMessageManager, IGetMessagesResponse, IOrphanedEventManager, IConversationMessageEvent, IMessagePager } from "./interfaces";
export declare class MessagePager implements IMessagePager {
    private _logger;
    private _localStorage;
    private _messageManager;
    private _orphanedEventManager;
    /**
     * MessagePager class constructor.
     * @class MessagePager
     * @ignore
     * @classdesc Class that implements Conversation Message Pagination.
     * @parameter {ILogger} _logger
     * @parameter {ILocalStorageData} _localStorage
     * @parameter {IMessageManager} _messageManager
     */
    constructor(_logger: ILogger, _localStorage: ILocalStorageData, _messageManager: IMessageManager, _orphanedEventManager: IOrphanedEventManager);
    /**
     * Get a page of messages, internally deal with orphaned events etc ...
     * @method MessagePager#getMessages
     * @param {string} id - the conversationId
     * @param {number} pageSize - the page size
     * @param {number} [continuationToken] - the continuation token (optional - if not specified then retrieve from the end)
     * @returns {Promise<any>} - TODO: incorporate continuationToken into respose
     */
    getMessages(conversationId: string, pageSize: number, continuationToken?: number): Promise<IGetMessagesResponse>;
    /**
     * Method to append a new batch of orphaned events to the store and then return them all ..
     * @param {string} conversationId
     * @param {any[]} orphanedEvents
     * @returns {Promise<IConversationMessageEvent[]>}
     */
    getOrphanedEvents(conversationId: string, orphanedEvents: any[]): Promise<IConversationMessageEvent[]>;
    /**
     * Function to iterate through a bunch of messages and mark as delivered as appropriate - NOTE: this is automatically called by  AppMessaging.getMessages()
     * @method MessagePager#markMessagesAsDelivered
     * @param {string} id - the conversationId
     * @param {Object[]} messages - the messages to check
     * @param {string} uerId - the userId
     * @returns {Promise}
     */
    markMessagesAsDelivered(id: string, messages: IConversationMessage[], userId: string): Promise<string>;
    /**
     * Method to reset any cached info abut a conversation
     */
    resetConversation(conversationId: string): Promise<boolean>;
    /**
     * Orphaned events must be applied in ascending order, so if we want to loop backwards through these they need to be sorted
     * by id descending
     */
    private applyOrphanedEvents(messages, orphanedEvents);
    /**
     *
     */
    private playEvent(event, messages);
    private mapOrphanedEvent(event);
}
