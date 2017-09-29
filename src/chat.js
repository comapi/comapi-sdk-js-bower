"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_js_foundation_1 = require("@comapi/sdk-js-foundation");
var ChatAdmin = (function () {
    function ChatAdmin(_comapiConfig, _restClient, _networkManager) {
        this._comapiConfig = _comapiConfig;
        this._restClient = _restClient;
        this._networkManager = _networkManager;
    }
    ChatAdmin.prototype.assign = function (chatId, assignInfo) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            var url = sdk_js_foundation_1.Utils.format("{{urlBase}}/apispaces/{{apiSpaceId}}/chats/{{chatId}}", {
                apiSpaceId: _this._comapiConfig.apiSpaceId,
                chatId: chatId,
                urlBase: _this._comapiConfig.urlBase,
            });
            return _this._restClient.put(url, {}, assignInfo)
                .then(function (result) {
                result.response._etag = result.headers.ETag;
                return Promise.resolve(result.response);
            });
        });
    };
    return ChatAdmin;
}());
exports.ChatAdmin = ChatAdmin;
//# sourceMappingURL=chat.js.map