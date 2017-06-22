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
var inversify_1 = require("inversify");
var interfaceSymbols_1 = require("./interfaceSymbols");
var AuthenticatedRestClient = (function () {
    function AuthenticatedRestClient(logger, restClient, networkManager) {
        this.logger = logger;
        this.restClient = restClient;
        this.networkManager = networkManager;
        this.retryCount = 3;
    }
    AuthenticatedRestClient.prototype.get = function (url, headers) {
        var _this = this;
        headers = headers || {};
        return this.networkManager.getValidToken()
            .then(function (token) {
            headers.authorization = _this.constructAUthHeader(token);
            return _this.makeRequestWithRetry(0, _this.restClient.get.bind(_this.restClient), url, headers);
        });
    };
    AuthenticatedRestClient.prototype.post = function (url, headers, data) {
        var _this = this;
        return this.networkManager.getValidToken()
            .then(function (token) {
            headers.authorization = _this.constructAUthHeader(token);
            return _this.makeRequestWithRetry(0, _this.restClient.post.bind(_this.restClient), url, headers, data);
        });
    };
    AuthenticatedRestClient.prototype.patch = function (url, headers, data) {
        var _this = this;
        return this.networkManager.getValidToken()
            .then(function (token) {
            headers.authorization = _this.constructAUthHeader(token);
            return _this.makeRequestWithRetry(0, _this.restClient.patch.bind(_this.restClient), url, headers, data);
        });
    };
    AuthenticatedRestClient.prototype.put = function (url, headers, data) {
        var _this = this;
        return this.networkManager.getValidToken()
            .then(function (token) {
            headers.authorization = _this.constructAUthHeader(token);
            return _this.makeRequestWithRetry(0, _this.restClient.put.bind(_this.restClient), url, headers, data);
        });
    };
    AuthenticatedRestClient.prototype.delete = function (url, headers) {
        var _this = this;
        return this.networkManager.getValidToken()
            .then(function (token) {
            headers.authorization = _this.constructAUthHeader(token);
            return _this.makeRequestWithRetry(0, _this.restClient.delete.bind(_this.restClient), url, headers);
        });
    };
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
    AuthenticatedRestClient.prototype.constructAUthHeader = function (token) {
        return "Bearer " + token;
    };
    return AuthenticatedRestClient;
}());
AuthenticatedRestClient = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthenticatedRestClient);
exports.AuthenticatedRestClient = AuthenticatedRestClient;
//# sourceMappingURL=authenticatedRestClient.js.map