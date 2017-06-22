"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Channels = (function () {
    function Channels(_networkManager, _facebookManager) {
        this._networkManager = _networkManager;
        this._facebookManager = _facebookManager;
    }
    Channels.prototype.createFbOptInState = function (data) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._facebookManager.createSendToMessengerState(data);
        });
    };
    return Channels;
}());
exports.Channels = Channels;
//# sourceMappingURL=channels.js.map