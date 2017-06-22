import { IConversationDetails, IConversationRoles, IConversationParticipant, IConversationPrivelages } from "./interfaces";
export declare class ConversationBuilder implements IConversationDetails {
    id: string;
    name: string;
    description: string;
    roles: IConversationRoles;
    isPublic: boolean;
    participants: IConversationParticipant[];
    constructor();
    withId(id: string): ConversationBuilder;
    withName(name: string): ConversationBuilder;
    withDescription(description: string): ConversationBuilder;
    withUsers(users: string[]): ConversationBuilder;
    withUser(user: string): ConversationBuilder;
    withParticipants(participants: IConversationParticipant[]): ConversationBuilder;
    withOwnerPrivelages(privelages: IConversationPrivelages): this;
    withParticipantPrivelages(privelages: IConversationPrivelages): this;
}
