"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedRestClient = void 0;
var inversify_1 = require("inversify");
var interfaceSymbols_1 = require("./interfaceSymbols");
var AuthenticatedRestClient = /** @class */ (function () {
    /**
     * AuthenticatedRestClient class constructor.
     * @class AuthenticatedRestClient
     * @ignore
     * @classdesc Class that implements an Authenticated RestClient.
     * @param {ILogger} logger - the logger
     * @param {IRestClient} restClient - the restClient
     * @param {INetworkManager} networkManager - the Network Manager
     */
    function AuthenticatedRestClient(logger, restClient, networkManager) {
        this.logger = logger;
        this.restClient = restClient;
        this.networkManager = networkManager;
        this.retryCount = 3;
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
            return _this.makeRequestWithRetry(0, _this.restClient.get.bind(_this.restClient), url, headers);
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
            return _this.makeRequestWithRetry(0, _this.restClient.post.bind(_this.restClient), url, headers, data);
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
            return _this.makeRequestWithRetry(0, _this.restClient.patch.bind(_this.restClient), url, headers, data);
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
            return _this.makeRequestWithRetry(0, _this.restClient.put.bind(_this.restClient), url, headers, data);
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
            return _this.makeRequestWithRetry(0, _this.restClient.delete.bind(_this.restClient), url, headers);
        });
    };
    /**
     * Method to check token prior to making a rest call and retry on 401 if necessary ...
     * @param {number} count - The number of retries (this function is called recursively)
     * @param {Function} verb  - The actual rest method to call
     * @param {string} url  - The url
     * @param {any} [headers] - The headers
     * @param {any} [data]  - The data
     */
    AuthenticatedRestClient.prototype.makeRequestWithRetry = function (count, verb, url, headers, data) {
        var _this = this;
        return verb(url, headers, data)
            .catch(function (result) {
            if (count < _this.retryCount && result.statusCode === 401 && _this.networkManager) {
                return _this.networkManager.restartSession()
                    .then(function (sessionInfo) {
                    headers.authorization = _this.constructAUthHeader(sessionInfo.token);
                    return _this.makeRequestWithRetry(++count, verb, url, headers, data);
                });
            }
            throw result;
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
    AuthenticatedRestClient = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
        __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient)),
        __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], AuthenticatedRestClient);
    return AuthenticatedRestClient;
}());
exports.AuthenticatedRestClient = AuthenticatedRestClient;
//# sourceMappingURL=authenticatedRestClient.js.map