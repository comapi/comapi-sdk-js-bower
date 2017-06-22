import { IConversationManager, IConversationParticipant, ConversationScope, IConversationDetails, IConversationDetails2, ISessionManager, IRestClient, ILogger, ILocalStorageData, IComapiConfig } from "./interfaces";
export declare class ConversationManager implements IConversationManager {
    private _logger;
    private _restClient;
    private _localStorageData;
    private _comapiConfig;
    private _sessionManager;
    private isTypingInfo;
    private isTypingOffInfo;
    constructor(_logger: ILogger, _restClient: IRestClient, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig, _sessionManager: ISessionManager);
    createConversation(conversationDetails: IConversationDetails): Promise<IConversationDetails2>;
    updateConversation(conversationDetails: IConversationDetails, eTag?: string): Promise<IConversationDetails2>;
    getConversation(conversationId: string): Promise<IConversationDetails2>;
    deleteConversation(conversationId: string): Promise<boolean>;
    addParticipantsToConversation(conversationId: string, participants: IConversationParticipant[]): Promise<boolean>;
    deleteParticipantsFromConversation(conversationId: string, participants: string[]): Promise<boolean>;
    getParticipantsInConversation(conversationId: string): Promise<IConversationParticipant[]>;
    getConversations(scope?: ConversationScope, profileId?: string): Promise<IConversationDetails2[]>;
    sendIsTyping(conversationId: string): Promise<boolean>;
    sendIsTypingOff(conversationId: string): Promise<boolean>;
}
