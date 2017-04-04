import { IConversationMessage, IMessagePart, IMessageAlert, IApnsAlert, IFcmAlert } from "./interfaces";
/**
 * @class MessageBuilder
 * @classdesc Class that implements MessageBuilder
 */
export declare class MessageBuilder implements IConversationMessage {
    metadata: any;
    parts: IMessagePart[];
    alert: IMessageAlert;
    /**
     * Method to create a simple text based message
     * @method MessageBuilder#withText
     * @param {String} text - the text of the message
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    withText(text: any): MessageBuilder;
    /**
     * Method to create a message containing a single data part
     * @method MessageBuilder#withData
     * @param {String} type - the type of the data i.e. `image/png`
     * @param {String} data - the data (if you want to pass binary data, then base64 encode it first)
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    withData(type: string, data: string): MessageBuilder;
    /**
     * Method to add a message part to the message. This can be called multiple times
     * @method MessageBuilder#withPart
     * @param {IMessagePart} part - the message part to add
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    withPart(part: IMessagePart): MessageBuilder;
    /**
     * Method to set the generic title for a push message. It also allocates placeholders for apns and fcm info
     * @method MessageBuilder#withPush
     * @param {String} text - The title of the push message. Note call this method BEFORE `withApnsAlert()` and `withFcmAlert()`
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    withPush(text: any): MessageBuilder;
    /**
     * Method to specify APNS specific push info - Note: must call `withPush()` first.
     * @method MessageBuilder#withApnsAlert
     * @param {IApnsAlert} info - the APNS speific push info
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    withApnsAlert(info: IApnsAlert): MessageBuilder;
    /**
     * Method to specify FCM specific push info - Note: must call `withPush()` first.
     * @method MessageBuilder#withFcmAlert
     * @param {IFcmAlert} info - the FCM speific push info
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    withFcmAlert(info: IFcmAlert): MessageBuilder;
    /**
     * Method to specify additional metadata to accompany the message
     * @method MessageBuilder#withMetadata
     * @param {any} metadata - the metadata.
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    withMetadata(metadata: any): MessageBuilder;
}
