var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var restClient_1 = require("./restClient");
var AuthenticatedRestClient = (function (_super) {
    __extends(AuthenticatedRestClient, _super);
    /**
     * AuthenticatedRestClient class constructor.
     * @class AuthenticatedRestClient
     * @ignore
     * @classdesc Class that implements an Authenticated RestClient.
     * @param {ILogger} logger - the logger
     * @param {INetworkManager} networkManager - the Network Manager
     */
    function AuthenticatedRestClient(logger, networkManager) {
        _super.call(this, logger, networkManager);
    }
    /**
     * Method to make a GET request
     * @method AuthenticatedRestClient#get
     * @param  {string} url
     * @param  {any} [headers]
     * @returns {Promise} - returns a promise
     */
    AuthenticatedRestClient.prototype.get = function (url, headers) {
        var _this = this;
        headers = headers || {};
        return this.networkManager.getValidToken()
            .then(function (token) {
            headers.authorization = _this.constructAUthHeader(token);
            return _super.prototype.get.call(_this, url, headers);
        });
    };
    /**
     * Method to make a POST request
     * @method AuthenticatedRestClient#post
     * @param  {string} url
     * @param  {any} data
     * @param  {any} headers
     * @returns {Promise} - returns a promise
     */
    AuthenticatedRestClient.prototype.post = function (url, headers, data) {
        var _this = this;
        return this.networkManager.getValidToken()
            .then(function (token) {
            headers.authorization = _this.constructAUthHeader(token);
            return _super.prototype.post.call(_this, url, headers, data);
        });
    };
    /**
     * Method to make a PATCH request
     * @method AuthenticatedRestClient#patch
     * @param  {string} url
     * @param  {any} data
     * @param  {any} headers
     * @returns {Promise} - returns a promise
     */
    AuthenticatedRestClient.prototype.patch = function (url, headers, data) {
        var _this = this;
        return this.networkManager.getValidToken()
            .then(function (token) {
            headers.authorization = _this.constructAUthHeader(token);
            return _super.prototype.patch.call(_this, url, headers, data);
        });
    };
    /**
     * Method to make a PUT request
     * @method AuthenticatedRestClient#put
     * @param  {string} url
     * @param  {any} headers
     * @param  {any} data
     * @returns {Promise} - returns a promise
     */
    AuthenticatedRestClient.prototype.put = function (url, headers, data) {
        var _this = this;
        return this.networkManager.getValidToken()
            .then(function (token) {
            headers.authorization = _this.constructAUthHeader(token);
            return _super.prototype.put.call(_this, url, headers, data);
        });
    };
    /**
     * Method to make a DELETE request
     * @method AuthenticatedRestClient#delete
     * @param  {string} url
     * @param  {any} headers
     * @returns {Promise} - returns a promise
     */
    AuthenticatedRestClient.prototype.delete = function (url, headers) {
        var _this = this;
        return this.networkManager.getValidToken()
            .then(function (token) {
            headers.authorization = _this.constructAUthHeader(token);
            return _super.prototype.delete.call(_this, url, headers);
        });
    };
    /**
     * Method to create an auth header from a token
     * @method AuthenticatedRestClient#constructAUthHeader
     * @param {string} token
     * @returns {string} - returns the auth header
     */
    AuthenticatedRestClient.prototype.constructAUthHeader = function (token) {
        return "Bearer " + token;
    };
    return AuthenticatedRestClient;
})(restClient_1.RestClient);
exports.AuthenticatedRestClient = AuthenticatedRestClient;
//# sourceMappingURL=authenticatedRestClient.js.map