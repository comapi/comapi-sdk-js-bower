var FacebookManager = (function () {
    /**
     * FacebookManager class constructor.
     * @class FacebookManager
     * @ignore
     * @classdesc Class that implements all the FacebookManager functionality.
     * @parameter {IRestClient} restClient
     * @parameter {IComapiConfig} comapiConfig
     */
    function FacebookManager(_restClient, _comapiConfig) {
        this._restClient = _restClient;
        this._comapiConfig = _comapiConfig;
    }
    /**
     * @param {any} [data] - the data to post
     */
    FacebookManager.prototype.createSendToMessengerState = function (data) {
        var url = this._comapiConfig.urlBase + "/apispaces/" + this._comapiConfig.apiSpaceId + "/channels/facebook/state";
        return this._restClient.post(url, {}, data || {});
    };
    return FacebookManager;
})();
exports.FacebookManager = FacebookManager;
//# sourceMappingURL=facebookManager.js.map