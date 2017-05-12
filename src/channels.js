var Channels = (function () {
    /**
     * Channels class constructor.
     * @class Channels
     * @classdesc Class that implements Channels interface
     * @parameter {NetworkManager} networkManager
     * @parameter {IFacebookManager} facebookManager
     */
    function Channels(_networkManager, _facebookManager) {
        this._networkManager = _networkManager;
        this._facebookManager = _facebookManager;
    }
    /**
     * Method to create opt in state for facebook messenger
     * @method Channels#createFbOptInState
     * @param {any} [data] - the data to post
     */
    Channels.prototype.createFbOptInState = function (data) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._facebookManager.createSendToMessengerState(data);
        });
    };
    return Channels;
})();
exports.Channels = Channels;
//# sourceMappingURL=channels.js.map