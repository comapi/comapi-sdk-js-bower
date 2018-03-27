import { IConversationManager, IConversationParticipant, ConversationScope, IConversationDetails, IConversationDetails2, ISessionManager, IRestClient, ILogger, ILocalStorageData, IComapiConfig } from "./interfaces";
export declare class ConversationManager implements IConversationManager {
    private _logger;
    private _restClient;
    private _localStorageData;
    private _comapiConfig;
    private _sessionManager;
    private isTypingInfo;
    private isTypingOffInfo;
    /**
     * ConversationManager class constructor.
     * @class ConversationManager
     * @ignore
     * @classdesc Class that implements Conversation Management.
     * @parameter {ILogger} logger
     * @parameter {IRestClient} restClient
     * @parameter {ILocalStorageData} localStorageData
     * @parameter {IComapiConfig} ComapiConfig
     * @parameter {ISessionManager} sessionManager
     */
    constructor(_logger: ILogger, _restClient: IRestClient, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig, _sessionManager: ISessionManager);
    /**
     * Function to create a conversation
     * @method ConversationManager#createConversation
     * @param {IConversationDetails} conversationDetails
     * @returns {Promise}
     */
    createConversation(conversationDetails: IConversationDetails): Promise<IConversationDetails2>;
    /**
     * Function to update a conversation
     * @method ConversationManager#updateConversation
     * @param {IConversationDetails} conversationDetails
     * @param {string} [eTag] - the eTag
     * @returns {Promise}
     */
    updateConversation(conversationDetails: IConversationDetails, eTag?: string): Promise<IConversationDetails2>;
    /**
     * Function to get a conversation
     * @method ConversationManager#getConversation
     * @param {string} conversationId
     * @returns {Promise}
     */
    getConversation(conversationId: string): Promise<IConversationDetails2>;
    /**
     * Function to delete a conversation
     * @method ConversationManager#deleteConversation
     * @param {string} conversationId
     * @returns {Promise}
     */
    deleteConversation(conversationId: string): Promise<boolean>;
    /**
     * Function to add participants to a conversation
     * @method ConversationManager#addParticipantsToConversation
     * @param {string} conversationId
     * @param {IConversationParticipant[]} participants
     * @returns {Promise}
     */
    addParticipantsToConversation(conversationId: string, participants: IConversationParticipant[]): Promise<boolean>;
    /**
     * Function to remove participants to a conversation
     * @method ConversationManager#deleteParticipantsFromConversation
     * @param {string} conversationId
     * @param {string[]} participants
     * @returns {Promise}
     */
    deleteParticipantsFromConversation(conversationId: string, participants: string[]): Promise<boolean>;
    /**
     * Function to get participantss in a conversation
     * @method ConversationManager#getParticipantsInConversation
     * @param {string} conversationId
     * @returns {Promise}
     */
    getParticipantsInConversation(conversationId: string): Promise<IConversationParticipant[]>;
    /**
     * @method ConversationManager#getConversations
     * @param {ConversationScope} [scope]
     * @param {string} [profileId]
     * @returns {Promise}
     */
    getConversations(scope?: ConversationScope, profileId?: string): Promise<IConversationDetails2[]>;
    /**
     * Function to send an is-typing event
     * @method ConversationManager#sendIsTyping
     * @param {string} conversationId
     * @returns {Promise}
     */
    sendIsTyping(conversationId: string): Promise<boolean>;
    /**
     * Function to send an is-typing off event
     * @method ConversationManager#sendIsTyping
     * @param {string} conversationId
     * @returns {Promise}
     */
    sendIsTypingOff(conversationId: string): Promise<boolean>;
}
