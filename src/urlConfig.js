"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FoundationRestUrls = (function () {
    function FoundationRestUrls() {
        this.content = "{{urlBase}}/apispaces/{{apiSpaceId}}/content";
        this.conversations = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations";
        this.conversation = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}";
        this.participants = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/participants";
        this.typing = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/typing";
        this.push = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions/{{sessionId}}/push";
        this.facebook = "{{urlBase}}/apispaces/{{apiSpaceId}}/channels/facebook/state";
        this.events = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/events";
        this.messages = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/messages";
        this.statusUpdates = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/messages/statusupdates";
        this.profiles = "{{urlBase}}/apispaces/{{apiSpaceId}}/profiles";
        this.profile = "{{urlBase}}/apispaces/{{apiSpaceId}}/profiles/{{profileId}}";
        this.sessions = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions";
        this.sessionStart = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions/start";
        this.session = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions/{{sessionId}}";
    }
    return FoundationRestUrls;
}());
exports.FoundationRestUrls = FoundationRestUrls;
//# sourceMappingURL=urlConfig.js.map