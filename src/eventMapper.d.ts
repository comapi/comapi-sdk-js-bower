import { IEventMapper, IConversationDeletedEventData, IConversationUndeletedEventData, IConversationUpdatedEventData, IParticipantAddedEventData, IParticipantRemovedEventData, IParticipantTypingEventData, IParticipantTypingOffEventData, IConversationMessageEvent, IProfileUpdatedEvent } from "./interfaces";
export declare class EventMapper implements IEventMapper {
    conversationDeleted(event: any): IConversationDeletedEventData;
    conversationUndeleted(event: any): IConversationUndeletedEventData;
    conversationUpdated(event: any): IConversationUpdatedEventData;
    participantAdded(event: any): IParticipantAddedEventData;
    participantRemoved(event: any): IParticipantRemovedEventData;
    participantTyping(event: any): IParticipantTypingEventData;
    participantTypingOff(event: any): IParticipantTypingOffEventData;
    conversationMessageSent(event: any): IConversationMessageEvent;
    conversationMessageRead(event: any): IConversationMessageEvent;
    conversationMessageDelivered(event: any): IConversationMessageEvent;
    profileUpdated(event: any): IProfileUpdatedEvent;
}
