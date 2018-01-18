import { IConversationDetails, IConversationRoles, IConversationParticipant, IConversationPrivelages } from "./interfaces";
export declare class ConversationBuilder implements IConversationDetails {
    /**
     * The conversation id
     */
    id: string;
    /**
     * The conversation name
     */
    name: string;
    /**
     * The conversation description
     */
    description: string;
    /**
     * The conversation roles
     */
    roles: IConversationRoles;
    /**
     * The isPublic field
     */
    isPublic: boolean;
    /**
     * The participants
     */
    participants: IConversationParticipant[];
    /**
     * ConversationBuilder class constructor.
     * initialises the id with a guid
     * @class ConversationBuilder
     * @classdesc Class that implements ConversationBuilder
     */
    constructor();
    /**
     * Method to specify the conversationId (defaults to a new guid if not used)
     * @method ConversationBuilder#withId
     * @param {string} id
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    withId(id: string): ConversationBuilder;
    /**
     * Method to specify the conversation name
     * @method ConversationBuilder#withName
     * @param {string} name
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    withName(name: string): ConversationBuilder;
    /**
     * Method to specify the conversation description
     * @method ConversationBuilder#withDescription
     * @param {string} description
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    withDescription(description: string): ConversationBuilder;
    /**
     * Method to specify initial participant list (will all be members)
     * @method ConversationBuilder#withUsers
     * @param {string[]} users
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    withUsers(users: string[]): ConversationBuilder;
    /**
     * Method to specify initial participant (will be a member)
     * @method ConversationBuilder#withUser
     * @param {string} user
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    withUser(user: string): ConversationBuilder;
    /**
     * Method to specify initial participants -  takes an array of IConversationParticipant objects which enables individual
     * roles to be specified for each user.
     * @method ConversationBuilder#withParticipants
     * @param {IConversationParticipant[]} participants
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    withParticipants(participants: IConversationParticipant[]): ConversationBuilder;
    /**
     * Method to set owner privelages for the conversation
     * @method ConversationBuilder#withOwnerPrivelages
     * @param {IConversationPrivelages} privelages
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    withOwnerPrivelages(privelages: IConversationPrivelages): this;
    /**
     * Method to set participant privelages for the conversation
     * @method ConversationBuilder#withParticipantPrivelages
     * @param {IConversationPrivelages} privelages
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    withParticipantPrivelages(privelages: IConversationPrivelages): this;
}
