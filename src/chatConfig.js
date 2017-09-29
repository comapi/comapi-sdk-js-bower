"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_js_foundation_1 = require("@comapi/sdk-js-foundation");
var ComapiChatConfig = (function (_super) {
    __extends(ComapiChatConfig, _super);
    function ComapiChatConfig() {
        var _this = _super.call(this) || this;
        _this.eventPageSize = 10;
        _this.messagePageSize = 10;
        _this.lazyLoadThreshold = 1;
        _this.getConversationSleepTimeout = 1000;
        _this.getConversationMaxRetry = 3;
        _this.maxEventGap = 100;
        _this.conversationStore = undefined;
        return _this;
    }
    ComapiChatConfig.prototype.withStore = function (conversationStore) {
        this.conversationStore = conversationStore;
        return this;
    };
    ComapiChatConfig.prototype.withEventPageSize = function (eventPageSize) {
        this.eventPageSize = eventPageSize;
        return this;
    };
    ComapiChatConfig.prototype.withMessagePageSize = function (messagePageSize) {
        this.messagePageSize = messagePageSize;
        return this;
    };
    ComapiChatConfig.prototype.withLazyLoadThreshold = function (lazyLoadThreshold) {
        this.lazyLoadThreshold = lazyLoadThreshold;
        return this;
    };
    ComapiChatConfig.prototype.withMaxEventGap = function (maxEventGap) {
        this.maxEventGap = maxEventGap;
        return this;
    };
    return ComapiChatConfig;
}(sdk_js_foundation_1.ComapiConfig));
exports.ComapiChatConfig = ComapiChatConfig;
//# sourceMappingURL=chatConfig.js.map