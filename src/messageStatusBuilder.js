"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageStatusBuilder = (function () {
    function MessageStatusBuilder() {
    }
    MessageStatusBuilder.prototype.deliveredStatusUpdate = function (messageId) {
        return {
            messageIds: [messageId],
            status: "delivered",
            timestamp: new Date().toISOString()
        };
    };
    MessageStatusBuilder.prototype.deliveredStatusUpdates = function (messageIds) {
        return {
            messageIds: messageIds,
            status: "delivered",
            timestamp: new Date().toISOString()
        };
    };
    MessageStatusBuilder.prototype.readStatusUpdate = function (messageId) {
        return {
            messageIds: [messageId],
            status: "read",
            timestamp: new Date().toISOString()
        };
    };
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