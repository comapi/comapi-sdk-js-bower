"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var EventMapper = (function () {
    function EventMapper() {
    }
    EventMapper.prototype.conversationDeleted = function (event) {
        return {
            conversationId: event.conversationId,
            createdBy: event.context.createdBy,
            timestamp: event.publishedOn,
        };
    };
    EventMapper.prototype.conversationUndeleted = function (event) {
        return {
            conversationId: event.conversationId,
            createdBy: event.context.createdBy,
            timestamp: event.publishedOn,
        };
    };
    EventMapper.prototype.conversationUpdated = function (event) {
        return {
            conversationId: event.conversationId,
            // the user who updated the conversation
            createdBy: event.context.createdBy,
            description: event.payload.description,
            eTag: event.etag,
            isPublic: event.payload.isPublic,
            name: event.payload.name,
            roles: event.payload.roles,
            timestamp: event.publishedOn,
        };
    };
    EventMapper.prototype.participantAdded = function (event) {
        return {
            conversationId: event.conversationId,
            createdBy: event.context.createdBy,
            profileId: event.payload.profileId,
            role: event.payload.role,
            timestamp: event.publishedOn,
        };
    };
    EventMapper.prototype.participantRemoved = function (event) {
        return {
            conversationId: event.conversationId,
            createdBy: event.context.createdBy,
            profileId: event.payload.profileId,
            timestamp: event.publishedOn,
        };
    };
    EventMapper.prototype.participantTyping = function (event) {
        return {
            conversationId: event.payload.conversationId,
            createdBy: event.context.createdBy,
            profileId: event.payload.profileId,
            timestamp: event.publishedOn,
        };
    };
    EventMapper.prototype.participantTypingOff = function (event) {
        return {
            conversationId: event.payload.conversationId,
            createdBy: event.context.createdBy,
            profileId: event.payload.profileId,
            timestamp: event.publishedOn,
        };
    };
    EventMapper.prototype.conversationMessageSent = function (event) {
        return {
            conversationEventId: event.conversationEventId,
            conversationId: event.payload.context.conversationId,
            eventId: event.eventId,
            name: "conversationMessage.sent",
            payload: {
                alert: event.payload.alert,
                context: event.payload.context,
                messageId: event.payload.messageId,
                metadata: event.payload.metadata,
                parts: event.payload.parts,
            }
        };
    };
    EventMapper.prototype.conversationMessageRead = function (event) {
        return {
            conversationEventId: event.conversationEventId,
            conversationId: event.payload.conversationId,
            eventId: event.eventId,
            name: "conversationMessage.read",
            payload: {
                conversationId: event.payload.conversationId,
                messageId: event.payload.messageId,
                profileId: event.payload.profileId,
                timestamp: event.payload.timestamp
            }
        };
    };
    EventMapper.prototype.conversationMessageDelivered = function (event) {
        return {
            conversationEventId: event.conversationEventId,
            conversationId: event.payload.conversationId,
            eventId: event.eventId,
            name: "conversationMessage.delivered",
            payload: {
                conversationId: event.payload.conversationId,
                messageId: event.payload.messageId,
                profileId: event.payload.profileId,
                timestamp: event.payload.timestamp
            }
        };
    };
    EventMapper.prototype.profileUpdated = function (event) {
        return {
            eTag: event.eTag,
            profile: event.payload
        };
    };
    return EventMapper;
}());
EventMapper = __decorate([
    inversify_1.injectable()
], EventMapper);
exports.EventMapper = EventMapper;
//# sourceMappingURL=eventMapper.js.map