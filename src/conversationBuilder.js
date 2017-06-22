"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var ConversationBuilder = (function () {
    function ConversationBuilder() {
        this.description = undefined;
        this.roles = {
            "owner": {
                "canSend": true,
                "canAddParticipants": true,
                "canRemoveParticipants": true
            },
            "participant": {
                "canSend": true,
                "canAddParticipants": true,
                "canRemoveParticipants": true
            }
        };
        this.isPublic = false;
        this.participants = undefined;
        this.id = utils_1.Utils.uuid();
    }
    ConversationBuilder.prototype.withId = function (id) {
        this.id = id;
        return this;
    };
    ConversationBuilder.prototype.withName = function (name) {
        this.name = name;
        return this;
    };
    ConversationBuilder.prototype.withDescription = function (description) {
        this.description = description;
        return this;
    };
    ConversationBuilder.prototype.withUsers = function (users) {
        this.participants = [];
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var user = users_1[_i];
            this.participants.push({ id: user });
        }
        return this;
    };
    ConversationBuilder.prototype.withUser = function (user) {
        this.participants = [{ id: user }];
        return this;
    };
    ConversationBuilder.prototype.withParticipants = function (participants) {
        this.participants = participants;
        return this;
    };
    ConversationBuilder.prototype.withOwnerPrivelages = function (privelages) {
        this.roles.owner = privelages;
        return this;
    };
    ConversationBuilder.prototype.withParticipantPrivelages = function (privelages) {
        this.roles.participant = privelages;
        return this;
    };
    return ConversationBuilder;
}());
exports.ConversationBuilder = ConversationBuilder;
//# sourceMappingURL=conversationBuilder.js.map