"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBuilder = void 0;
/**
 * @class MessageBuilder
 * @classdesc Class that implements MessageBuilder
 */
var MessageBuilder = /** @class */ (function () {
    function MessageBuilder() {
        this.id = undefined;
        this.metadata = {};
        this.parts = [];
        this.alert = undefined;
        this.context = undefined;
        this.sentEventId = undefined;
        this.statusUpdates = undefined;
    }
    /**
     * Method to create a simple text based message
     * @method MessageBuilder#withText
     * @param {String} text - the text of the message
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    MessageBuilder.prototype.withText = function (text) {
        this.parts.push({
            data: text,
            size: text.length,
            type: "text/plain",
        });
        return this;
    };
    /**
     * Method to create a message containing a single data part
     * @method MessageBuilder#withData
     * @param {String} type - the type of the data i.e. `image/png`
     * @param {String} data - the data (if you want to pass binary data, then base64 encode it first)
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    MessageBuilder.prototype.withData = function (type, data) {
        this.parts.push({
            data: data,
            size: data.length,
            type: type,
        });
        return this;
    };
    /**
     * Method to create a message containing a single data part
     * @method MessageBuilder#withData
     * @param {String} type - the type of the data i.e. `image/png`
     * @param {String} url - the url
     * @param {Number} [size] - the size of the resource the URL is pointing to
     * @param {String} [name] - the teh name of the original file
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    MessageBuilder.prototype.withURL = function (type, url, size, name) {
        this.parts.push({
            name: name,
            size: size,
            type: type,
            url: url,
        });
        return this;
    };
    /**
     * Method to add a message part to the message. This can be called multiple times
     * @method MessageBuilder#withPart
     * @param {IMessagePart} part - the message part to add
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    MessageBuilder.prototype.withPart = function (part) {
        this.parts.push(part);
        return this;
    };
    /**
     * Method to set the generic title for a push message. It also allocates placeholders for apns and fcm info
     * @method MessageBuilder#withPush
     * @param {String} text - The title of the push message. Note call this method BEFORE `withApnsAlert()` and `withFcmAlert()`
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    MessageBuilder.prototype.withPush = function (text) {
        this.alert = {
            "text": text,
            "platforms": {
                "apns": undefined,
                "fcm": undefined
            }
        };
        return this;
    };
    /**
     * Method to specify APNS specific push info - Note: must call `withPush()` first.
     * @method MessageBuilder#withApnsAlert
     * @param {IApnsAlert} info - the APNS speific push info
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    MessageBuilder.prototype.withApnsAlert = function (info) {
        // TODO: cater for incorrect usage
        this.alert.platforms.apns = info;
        return this;
    };
    /**
     * Method to specify FCM specific push info - Note: must call `withPush()` first.
     * @method MessageBuilder#withFcmAlert
     * @param {IFcmAlert} info - the FCM speific push info
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    MessageBuilder.prototype.withFcmAlert = function (info) {
        // TODO: cater for incorrect usage        
        this.alert.platforms.fcm = info;
        return this;
    };
    /**
     * Method to specify additional metadata to accompany the message
     * @method MessageBuilder#withMetadata
     * @param {any} metadata - the metadata.
     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
     */
    MessageBuilder.prototype.withMetadata = function (metadata) {
        this.metadata = metadata;
        return this;
    };
    return MessageBuilder;
}());
exports.MessageBuilder = MessageBuilder;
//# sourceMappingURL=messageBuilder.js.map