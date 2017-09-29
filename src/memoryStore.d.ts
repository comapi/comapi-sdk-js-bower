import { IChatConversation, IChatMessage, IConversationStore } from "./interfaces";
export declare class MemoryConversationStore implements IConversationStore {
    private conversations;
    private messageStore;
    reset(): Promise<boolean>;
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
    private _findConversation(conversationId);
    private _indexOfConversation(conversationId);
    private _findMessage(conversationId, messageId);
}
