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
var RestClient = (function () {
    /**
     * RestClient class constructor.
     * @class RestClient
     * @ignore
     * @classdesc Class that implements a RestClient.
     * @param {ILogger} [logger] - the logger
     * @param {INetworkManager} [networkManager] - the network Manager
     */
    function RestClient(logger) {
        this.logger = logger;
        this._readyStates = [
            "request not initialized",
            "server connection established",
            "request received ",
            "processing request",
            "request finished and response is ready"
        ];
    }
    /**
     * Method to make a GET request
     * @method RestClient#get
     * @param  {string} url
     * @param  {any} [headers]
     * @returns {Promise} - returns a promise
     */
    RestClient.prototype.get = function (url, headers) {
        return this.makeRequest("GET", url, headers);
    };
    /**
     * Method to make a POST request
     * @method RestClient#post
     * @param  {string} url
     * @param  {any} data
     * @param  {any} headers
     * @returns {Promise} - returns a promise
     */
    RestClient.prototype.post = function (url, headers, data) {
        return this.makeRequest("POST", url, headers, data);
    };
    /**
     * Method to make a PUT request
     * @method RestClient#put
     * @param  {string} url
     * @param  {any} headers
     * @param  {any} data
     * @returns {Promise} - returns a promise
     */
    RestClient.prototype.put = function (url, headers, data) {
        return this.makeRequest("PUT", url, headers, data);
    };
    /**
     * Method to make a PATCH request
     * @method RestClient#patch
     * @param  {string} url
     * @param  {any} headers
     * @param  {any} data
     * @returns {Promise} - returns a promise
     */
    RestClient.prototype.patch = function (url, headers, data) {
        return this.makeRequest("PATCH", url, headers, data);
    };
    /**
     * Method to make a DELETE request
     * @method RestClient#delete
     * @param  {string} url
     * @param  {any} headers
     * @returns {Promise} - returns a promise
     */
    RestClient.prototype.delete = function (url, headers) {
        return this.makeRequest("DELETE", url, headers);
    };
    /**
     * @param  {XMLHttpRequest} request
     * @param  {any} headers
     */
    RestClient.prototype.addHeaders = function (request, headers) {
        for (var prop in headers) {
            if (headers.hasOwnProperty(prop)) {
                request.setRequestHeader(prop, headers[prop]);
            }
        }
    };
    /**
     *
     */
    RestClient.prototype.getResponseHeaders = function (xhr) {
        var headers = {};
        var headerStr = xhr.getAllResponseHeaders();
        if (headerStr) {
            var headerPairs = headerStr.split("\u000d\u000a");
            for (var i = 0; i < headerPairs.length; i++) {
                var headerPair = headerPairs[i];
                // Can't use split() here because it does the wrong thing
                // if the header value has the string ": " in it.
                var index = headerPair.indexOf("\u003a\u0020");
                if (index > 0) {
                    var key = headerPair.substring(0, index);
                    var val = headerPair.substring(index + 2);
                    headers[key] = val;
                }
            }
        }
        return headers;
    };
    /**
     *
     */
    RestClient.prototype.createCORSRequest = function (method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);
        } /*else if (typeof XDomainRequest != "undefined") {

                // Otherwise, check if XDomainRequest.
                // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                xhr = new XDomainRequest();
                xhr.open(method, url);

            } else {

                // Otherwise, CORS is not supported by the browser.
                xhr = null;

            }*/
        return xhr;
    };
    /**
     * @param  {string} method (GET,POST,PUT,DELETE)
     * @param  {string} url
     * @param  {any} [headers]
     * @param  {any} [data]
     * @returns {Promise} - returns a promise
     */
    RestClient.prototype.makeRequest = function (method, url, headers, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            headers = headers || {};
            // We want this as a default default ...
            if (!headers["Content-Type"]) {
                headers["Content-Type"] = "application/json";
            }
            // Edge/IE want to cache requests by default ...
            /* tslint:disable:no-string-literal */
            if (!headers["Cache-Control"]) {
                headers["Cache-Control"] = "no-cache";
                headers["Pragma"] = "no-cache";
                headers["If-Modified-Since"] = "Mon, 26 Jul 1997 05:00:00 GMT";
            }
            /* tslint:enable:no-string-literal */
            if (_this.logger) {
                _this.logger.log(method + "'ing " + url + "  ...");
            }
            var xhr = _this.createCORSRequest(method, url);
            if (_this.logger) {
                _this.logger.log("Created XMLHttpRequest ...");
            }
            if (headers !== undefined) {
                _this.addHeaders(xhr, headers);
            }
            if (_this.logger) {
                _this.logger.log("added headers", headers);
            }
            xhr.onload = function () {
                if (_this.logger) {
                    _this.logger.log("xhr.onload", xhr.responseText);
                }
                var succeeded = xhr.status >= 200 && xhr.status < 300;
                var result = {
                    headers: _this.getResponseHeaders(xhr),
                    response: undefined,
                    statusCode: xhr.status,
                };
                if (xhr.responseText) {
                    try {
                        result.response = JSON.parse(xhr.responseText);
                        if (_this.logger) {
                            _this.logger.log(method + "'ing to " + url + " returned this object: ", result.response);
                        }
                    }
                    catch (e) {
                        result.response = xhr.responseText;
                        if (_this.logger) {
                            _this.logger.log(method + "'ing to " + url + " returned this text: " + xhr.responseText);
                        }
                    }
                }
                if (succeeded) {
                    resolve(result);
                }
                else {
                    reject(result);
                }
            };
            xhr.onerror = function () {
                // There was a connection error of some sort
                if (_this.logger) {
                    _this.logger.log("xhr.onerror", xhr.responseText);
                }
                if (_this.logger) {
                    _this.logger.error(method + "'ing to " + url + " failed");
                }
                var result = {
                    headers: _this.getResponseHeaders(xhr),
                    response: xhr.responseText,
                    statusCode: xhr.status,
                };
                reject(result);
            };
            xhr.onreadystatechange = function (evt) {
                if (_this.logger) {
                    _this.logger.log("onreadystatechange: " + _this._readyStates[xhr.readyState] + " [status=" + xhr.status + "]");
                }
            };
            xhr.onabort = function (evt) {
                if (_this.logger) {
                    _this.logger.log("onabort", evt);
                }
            };
            xhr.send(data ? JSON.stringify(data) : null);
            if (_this.logger) {
                _this.logger.log("send data", data);
            }
        });
    };
    return RestClient;
}());
RestClient = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)), __param(0, inversify_1.optional()),
    __metadata("design:paramtypes", [Object])
], RestClient);
exports.RestClient = RestClient;
//# sourceMappingURL=restClient.js.map