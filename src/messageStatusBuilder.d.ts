import { IMessageStatus } from "./interfaces";
/**
 * @class MessageStatusBuilder
 * @classdesc Class that implements MessageStatusBuilder
 */
export declare class MessageStatusBuilder {
    /**
     * @method MessageStatusBuilder#deliveredStatusUpdate
     * @param {String} messageId
     * @returns {IMessageStatus} - Returns Mesage status object
     */
    deliveredStatusUpdate(messageId: string): IMessageStatus;
    /**
     * @method MessageStatusBuilder#deliveredStatusUpdates
     * @param {String[]} messageIds
     * @returns {IMessageStatus} - Returns Mesage status object
     */
    deliveredStatusUpdates(messageIds: string[]): IMessageStatus;
    /**
     * @method MessageStatusBuilder#readStatusUpdate
     * @param {String} messageId
     * @returns {IMessageStatus} - Returns Mesage status object
     */
    readStatusUpdate(messageId: string): IMessageStatus;
    /**
     * @method MessageStatusBuilder#readStatusUpdates
     * @param {String[]} messageIds
     * @returns {IMessageStatus} - Returns Mesage status object
     */
    readStatusUpdates(messageIds: string[]): IMessageStatus;
}
