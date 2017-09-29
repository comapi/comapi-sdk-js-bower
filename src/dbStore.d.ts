import { IChatConversation, IChatMessage, IConversationStore } from "./interfaces";
export declare class IndexedDBConversationStore implements IConversationStore {
    private _initialised;
    private _database;
    private _DbNme;
    private _ConversationsStore;
    private _MessagesStore;
    private _DbVersion;
    getConversation(conversationId: string): Promise<IChatConversation>;
    createConversation(conversation: IChatConversation): Promise<boolean>;
    updateConversation(conversation: IChatConversation): Promise<boolean>;
    deleteConversation(conversationId: string): Promise<boolean>;
    getMessage(conversationId: string, messageId: string): Promise<IChatMessage>;
    updateMessageStatus(conversationId: string, messageId: string, profileId: string, status: string, timestamp: string): Promise<boolean>;
    createMessage(message: IChatMessage): Promise<boolean>;
    getConversations(): Promise<IChatConversation[]>;
    getMessages(conversationId: string): Promise<IChatMessage[]>;
    deleteConversationMessages(conversationId: string): Promise<boolean>;
    reset(): Promise<boolean>;
    private ensureInitialised();
    private initialise();
    private putMessage(message);
    private putConversation(conversation);
    private clearObjectStore(objectStoreName);
    private _deleteConversation(conversationId);
}
