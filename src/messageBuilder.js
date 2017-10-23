"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBuilder = (function () {
    function MessageBuilder() {
        this.id = undefined;
        this.metadata = {};
        this.parts = [];
        this.alert = undefined;
        this.context = undefined;
        this.sentEventId = undefined;
        this.statusUpdates = undefined;
    }
    MessageBuilder.prototype.withText = function (text) {
        this.parts.push({
            data: text,
            size: text.length,
            type: "text/plain",
        });
        return this;
    };
    MessageBuilder.prototype.withData = function (type, data) {
        this.parts.push({
            data: data,
            size: data.length,
            type: type,
        });
        return this;
    };
    MessageBuilder.prototype.withURL = function (type, url, size, name) {
        this.parts.push({
            name: name,
            size: size,
            type: type,
            url: url,
        });
        return this;
    };
    MessageBuilder.prototype.withPart = function (part) {
        this.parts.push(part);
        return this;
    };
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
    MessageBuilder.prototype.withApnsAlert = function (info) {
        this.alert.platforms.apns = info;
        return this;
    };
    MessageBuilder.prototype.withFcmAlert = function (info) {
        this.alert.platforms.fcm = info;
        return this;
    };
    MessageBuilder.prototype.withMetadata = function (metadata) {
        this.metadata = metadata;
        return this;
    };
    return MessageBuilder;
}());
exports.MessageBuilder = MessageBuilder;
//# sourceMappingURL=messageBuilder.js.map