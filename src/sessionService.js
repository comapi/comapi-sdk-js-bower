"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionService = (function () {
    function SessionService(_foundation, _config) {
        this._foundation = _foundation;
        this._config = _config;
    }
    SessionService.prototype.startSession = function () {
        return this._foundation.startSession();
    };
    Object.defineProperty(SessionService.prototype, "session", {
        get: function () {
            return this._foundation.session;
        },
        enumerable: true,
        configurable: true
    });
    SessionService.prototype.endSession = function () {
        var _this = this;
        return this._foundation.endSession()
            .then(function () {
            return _this._config.conversationStore.reset();
        });
    };
    return SessionService;
}());
exports.SessionService = SessionService;
//# sourceMappingURL=sessionService.js.map