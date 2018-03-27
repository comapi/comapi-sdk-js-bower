import { IConversationManager, IConversationDetails, IConversationDetails2, IConversationParticipant, ConversationScope, IMessageManager, IConversationMessageEvent, IConversationMessage, ISendMessageResult, IMessageStatus, IGetMessagesResponse, INetworkManager, IMessagePager, IContentManager, IContentData, IUploadContentResult } from "./interfaces";
export declare class AppMessaging {
    private _networkManager;
    private _conversationManager;
    private _messageManager;
    private _messagePager;
    private _contentManager;
    /**
     * AppMessaging class constructor.
     * @class  AppMessaging
     * @classdesc Class that implements AppMessaging
     * @param {INetworkManager} networkManager
     * @param {IConversationManager} conversationManager
     * @param {IMessageManager} messageManager
     */
    constructor(_networkManager: INetworkManager, _conversationManager: IConversationManager, _messageManager: IMessageManager, _messagePager: IMessagePager, _contentManager: IContentManager);
    /**
     * Function to create a conversation
     * @method AppMessaging#createConversation
     * @param {IConversationDetails} conversationDetails - the conversation details (use `ConversationBuilder` to create this)
     * @returns {Promise}
     */
    createConversation(conversationDetails: IConversationDetails): Promise<IConversationDetails2>;
    /**
     * Function to update a conversation
     * @method AppMessaging#updateConversation
     * @param {IConversationDetails} conversationDetails - the conversation details (use `ConversationBuilder` to create this)
     * @param {string} [eTag] - the eTag
     * @returns {Promise}
     */
    updateConversation(conversationDetails: IConversationDetails, eTag?: string): Promise<IConversationDetails2>;
    /**
     * Function to get a conversation
     * @method AppMessaging#getConversation
     * @param {string} conversationId
     * @returns {Promise}
     */
    getConversation(conversationId: string): Promise<IConversationDetails2>;
    /**
     * Function to delete a conversation
     * @method AppMessaging#deleteConversation
     * @param {string} conversationId
     * @returns {Promise}
     */
    deleteConversation(conversationId: string): Promise<boolean>;
    /**
     * Function to add participants to a conversation
     * @method AppMessaging#addParticipantsToConversation
     * @param {string} conversationId
     * @param {IConversationParticipant[]} participants
     * @returns {Promise}
     */
    addParticipantsToConversation(conversationId: string, participants: IConversationParticipant[]): Promise<boolean>;
    /**
     * Function to remove participants to a conversation
     * @method AppMessaging#deleteParticipantsFromConversation
     * @param {string} conversationId
     * @param {string[]} participants
     * @returns {Promise}
     */
    deleteParticipantsFromConversation(conversationId: string, participants: string[]): Promise<boolean>;
    /**
     * Function to get participantss in a conversation
     * @method AppMessaging#getParticipantsInConversation
     * @param {string} conversationId
     * @returns {Promise}
     */
    getParticipantsInConversation(conversationId: string): Promise<IConversationParticipant[]>;
    /**
     * Function to get all conversations  the user is a participant in
     * @method AppMessaging#getConversations
     * @param {ConversationScope} [scope] - the conversation scope ["`public`"|"`participant`"]
     * @param {string} [profileId] - The profileId to search with
     * @returns {Promise}
     */
    getConversations(scope?: ConversationScope, profileId?: string): Promise<IConversationDetails2[]>;
    /**
     * Function to get events from a conversation
     * @method AppMessaging#getConversationEvents
     * @param {string} conversationId - the conversation Id
     * @param {number} from - the event Id to start from
     * @param {number} limit - the maximum number of events to retrievee
     * @returns {Promise}
     */
    getConversationEvents(conversationId: string, from: number, limit: number): Promise<IConversationMessageEvent[]>;
    /**
     * Function to send a message to a conversation
     * @method AppMessaging#sendMessageToConversation
     * @param {string} conversationId  - the conversation Id
     * @param {IConversationMessage} - the message to send (Use `MessageBuilder` to create a message)
     * @returns {Promise}
     */
    sendMessageToConversation(conversationId: string, message: IConversationMessage): Promise<ISendMessageResult>;
    /**
     * Function to sent message status udates for messages in a conversation
     * @method AppMessaging#sendMessageStatusUpdates
     * @param {string} conversationId  - the conversation Id
     * @param {IMessageStatus[]} statuses -  the message statuses (Use `MessageStatusBuilder` to create the status objects)
     * @returns {Promise}
     */
    sendMessageStatusUpdates(conversationId: string, statuses: IMessageStatus[]): Promise<any>;
    /**
     * Get a page of messages, internally deal with orphaned events etc ...
     * @method AppMessaging#getMessages
     * @param {string} id - the conversationId
     * @param {number} pageSize - the page size
     * @param {number} [continuationToken] - the continuation token (optional - if not specified then retrieve from the end)
     * @returns {Promise<IGetMessagesResponse>}
     */
    getMessages(conversationId: string, pageSize: number, continuationToken?: number): Promise<IGetMessagesResponse>;
    /**
     * Function to send typing event to a conversation
     * @method AppMessaging#sendIsTyping
     * @param {string} conversationId - the conversation Id
     * @returns {Promise}
     */
    sendIsTyping(conversationId: string): Promise<boolean>;
    /**
     * Function to send typing off event to a conversation
     * @method AppMessaging#sendIsTypingOff
     * @param {string} conversationId - the conversation Id
     * @returns {Promise}
     */
    sendIsTypingOff(conversationId: string): Promise<boolean>;
    /**
     * Method to upload content data
     * @method AppMessaging#uploadContent
     * @param {ContentData} content - the content
     * @returns {IUploadContentResult} - the result
     */
    uploadContent(content: IContentData, folder?: string): Promise<IUploadContentResult>;
}
