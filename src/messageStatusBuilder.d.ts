import { IMessageStatus } from "./interfaces";
export declare class MessageStatusBuilder {
    deliveredStatusUpdate(messageId: string): IMessageStatus;
    deliveredStatusUpdates(messageIds: string[]): IMessageStatus;
    readStatusUpdate(messageId: string): IMessageStatus;
    readStatusUpdates(messageIds: string[]): IMessageStatus;
}
