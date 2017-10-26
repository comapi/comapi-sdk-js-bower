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
var utils_1 = require("./utils");
var ContentManager = (function () {
    function ContentManager(_logger, networkManager, _comapiConfig) {
        this._logger = _logger;
        this.networkManager = networkManager;
        this._comapiConfig = _comapiConfig;
    }
    ContentManager.prototype.uploadContent = function (content, folder) {
        var _this = this;
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.content, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this.networkManager.getValidToken()
            .then(function (token) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                xhr.setRequestHeader("authorization", _this.constructAUthHeader(token));
                var body;
                if (content.file) {
                    throw new Error("Not implemented");
                }
                else {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    body = JSON.stringify({
                        data: content.data,
                        name: content.name,
                        type: content.type
                    });
                }
                xhr.send(body);
                xhr.onload = function () {
                    var response;
                    try {
                        response = JSON.parse(xhr.responseText);
                        if (_this._logger) {
                            _this._logger.log("uploadContent() returned this object: ", response);
                        }
                    }
                    catch (e) {
                        if (_this._logger) {
                            _this._logger.log("uploadContent returned this text: " + xhr.responseText);
                        }
                        reject(xhr.responseText);
                    }
                    if (xhr.status === 200) {
                        resolve(response);
                    }
                    else {
                        reject(response);
                    }
                };
                xhr.onerror = function () {
                    reject(xhr.responseText);
                };
                xhr.onabort = function () {
                    reject(xhr.responseText);
                };
                xhr.onprogress = function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = (evt.loaded / evt.total) * 100;
                        console.log("onprogress: " + percentComplete + " %");
                    }
                };
            });
        });
    };
    ContentManager.prototype.constructAUthHeader = function (token) {
        return "Bearer " + token;
    };
    return ContentManager;
}());
ContentManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ContentManager);
exports.ContentManager = ContentManager;
//# sourceMappingURL=contentManager.js.map