import { IConversationManager, IConversationDetails, IConversationDetails2, IConversationParticipant, ConversationScope, IMessageManager, IConversationMessageEvent, IConversationMessage, ISendMessageResult, IMessageStatus, IGetMessagesResponse, INetworkManager, IMessagePager } from "./interfaces";
export declare class AppMessaging {
    private _networkManager;
    private _conversationManager;
    private _messageManager;
    private _messagePager;
    constructor(_networkManager: INetworkManager, _conversationManager: IConversationManager, _messageManager: IMessageManager, _messagePager: IMessagePager);
    createConversation(conversationDetails: IConversationDetails): Promise<IConversationDetails2>;
    updateConversation(conversationDetails: IConversationDetails, eTag?: string): Promise<IConversationDetails2>;
    getConversation(conversationId: string): Promise<IConversationDetails2>;
    deleteConversation(conversationId: string): Promise<boolean>;
    addParticipantsToConversation(conversationId: string, participants: IConversationParticipant[]): Promise<boolean>;
    deleteParticipantsFromConversation(conversationId: string, participants: string[]): Promise<boolean>;
    getParticipantsInConversation(conversationId: string): Promise<IConversationParticipant[]>;
    getConversations(scope?: ConversationScope, profileId?: string): Promise<IConversationDetails2[]>;
    getConversationEvents(conversationId: string, from: number, limit: number): Promise<IConversationMessageEvent[]>;
    sendMessageToConversation(conversationId: string, message: IConversationMessage): Promise<ISendMessageResult>;
    sendMessageStatusUpdates(conversationId: string, statuses: IMessageStatus[]): Promise<any>;
    getMessages(conversationId: string, pageSize: number, continuationToken?: number): Promise<IGetMessagesResponse>;
    sendIsTyping(conversationId: string): Promise<boolean>;
    sendIsTypingOff(conversationId: string): Promise<boolean>;
}
