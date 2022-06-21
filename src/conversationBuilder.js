"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationBuilder = void 0;
var utils_1 = require("./utils");
var ConversationBuilder = /** @class */ (function () {
    /**
     * ConversationBuilder class constructor.
     * initialises the id with a guid
     * @class ConversationBuilder
     * @classdesc Class that implements ConversationBuilder
     */
    function ConversationBuilder() {
        /**
         * The conversation description
         */
        this.description = undefined;
        /**
         * The conversation roles
         */
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
        /**
         * The isPublic field
         */
        this.isPublic = false;
        /**
         * The participants
         */
        this.participants = undefined;
        this.id = utils_1.Utils.uuid();
    }
    /**
     * Method to specify the conversationId (defaults to a new guid if not used)
     * @method ConversationBuilder#withId
     * @param {string} id
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    ConversationBuilder.prototype.withId = function (id) {
        this.id = id;
        return this;
    };
    /**
     * Method to specify the conversation name
     * @method ConversationBuilder#withName
     * @param {string} name
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    ConversationBuilder.prototype.withName = function (name) {
        this.name = name;
        return this;
    };
    /**
     * Method to specify the conversation description
     * @method ConversationBuilder#withDescription
     * @param {string} description
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    ConversationBuilder.prototype.withDescription = function (description) {
        this.description = description;
        return this;
    };
    /**
     * Method to specify initial participant list (will all be members)
     * @method ConversationBuilder#withUsers
     * @param {string[]} users
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    ConversationBuilder.prototype.withUsers = function (users) {
        this.participants = [];
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var user = users_1[_i];
            this.participants.push({ id: user });
        }
        return this;
    };
    /**
     * Method to specify initial participant (will be a member)
     * @method ConversationBuilder#withUser
     * @param {string} user
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    ConversationBuilder.prototype.withUser = function (user) {
        this.participants = [{ id: user }];
        return this;
    };
    /**
     * Method to specify initial participants -  takes an array of IConversationParticipant objects which enables individual
     * roles to be specified for each user.
     * @method ConversationBuilder#withParticipants
     * @param {IConversationParticipant[]} participants
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    ConversationBuilder.prototype.withParticipants = function (participants) {
        this.participants = participants;
        return this;
    };
    /**
     * Method to set owner privelages for the conversation
     * @method ConversationBuilder#withOwnerPrivelages
     * @param {IConversationPrivelages} privelages
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    ConversationBuilder.prototype.withOwnerPrivelages = function (privelages) {
        this.roles.owner = privelages;
        return this;
    };
    /**
     * Method to set participant privelages for the conversation
     * @method ConversationBuilder#withParticipantPrivelages
     * @param {IConversationPrivelages} privelages
     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
     */
    ConversationBuilder.prototype.withParticipantPrivelages = function (privelages) {
        this.roles.participant = privelages;
        return this;
    };
    return ConversationBuilder;
}());
exports.ConversationBuilder = ConversationBuilder;
//# sourceMappingURL=conversationBuilder.js.map