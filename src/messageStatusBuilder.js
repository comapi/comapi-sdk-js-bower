"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatusBuilder = void 0;
/**
 * @class MessageStatusBuilder
 * @classdesc Class that implements MessageStatusBuilder
 */
var MessageStatusBuilder = /** @class */ (function () {
    function MessageStatusBuilder() {
    }
    /**
     * @method MessageStatusBuilder#deliveredStatusUpdate
     * @param {String} messageId
     * @returns {IMessageStatus} - Returns Mesage status object
     */
    MessageStatusBuilder.prototype.deliveredStatusUpdate = function (messageId) {
        return {
            messageIds: [messageId],
            status: "delivered",
            timestamp: new Date().toISOString()
        };
    };
    /**
     * @method MessageStatusBuilder#deliveredStatusUpdates
     * @param {String[]} messageIds
     * @returns {IMessageStatus} - Returns Mesage status object
     */
    MessageStatusBuilder.prototype.deliveredStatusUpdates = function (messageIds) {
        return {
            messageIds: messageIds,
            status: "delivered",
            timestamp: new Date().toISOString()
        };
    };
    /**
     * @method MessageStatusBuilder#readStatusUpdate
     * @param {String} messageId
     * @returns {IMessageStatus} - Returns Mesage status object
     */
    MessageStatusBuilder.prototype.readStatusUpdate = function (messageId) {
        return {
            messageIds: [messageId],
            status: "read",
            timestamp: new Date().toISOString()
        };
    };
    /**
     * @method MessageStatusBuilder#readStatusUpdates
     * @param {String[]} messageIds
     * @returns {IMessageStatus} - Returns Mesage status object
     */
    MessageStatusBuilder.prototype.readStatusUpdates = function (messageIds) {
        return {
            messageIds: messageIds,
            status: "read",
            timestamp: new Date().toISOString()
        };
    };
    return MessageStatusBuilder;
}());
exports.MessageStatusBuilder = MessageStatusBuilder;
//# sourceMappingURL=messageStatusBuilder.js.map