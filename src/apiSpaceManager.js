"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiSpaceManager = (function () {
    function ApiSpaceManager(_restClient, _urlBase) {
        this._restClient = _restClient;
        this._urlBase = _urlBase;
    }
    /**
     *
     */
    ApiSpaceManager.prototype.getToken = function (accountId, profileId) {
        return this._restClient.get(this._urlBase + "/token/" + accountId + "/" + profileId)
            .then(function (result) {
            console.log("resolving with " + result.response.token);
            return Promise.resolve(result.response.token);
        });
    };
    /**
     *
     */
    ApiSpaceManager.prototype.createApiSpace = function (token, name) {
        var headers = {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        };
        return this._restClient.post(this._urlBase + "/apispaces", headers, { name: name })
            .then(function (result) {
            return Promise.resolve(result.response);
            /*
                {
                "id": "1783e4b7-f9d6-4ea0-807b-f8e1bc5a313a",
                "name": "App Space No. 14",
                "createdOn": "2016-08-02T14:24:42.802Z",
                "updatedOn": "2016-08-02T14:24:42.802Z"
                }
            */
        });
    };
    /**
     *
     */
    ApiSpaceManager.prototype.updateAuth = function (token, apiSpaceId, authInfo) {
        var headers = {
            "authorization": "Bearer " + token
        };
        return this._restClient.put(this._urlBase + "/apispaces/" + apiSpaceId + "/auth", headers, authInfo)
            .then(function (result) {
            return Promise.resolve(result.response);
        });
    };
    return ApiSpaceManager;
}());
exports.ApiSpaceManager = ApiSpaceManager;
//# sourceMappingURL=apiSpaceManager.js.map