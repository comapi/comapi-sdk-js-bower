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
var utils_1 = require("./utils");
var FacebookManager = (function () {
    function FacebookManager(_restClient, _comapiConfig) {
        this._restClient = _restClient;
        this._comapiConfig = _comapiConfig;
    }
    FacebookManager.prototype.createSendToMessengerState = function (data) {
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.facebook, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.post(url, {}, data || {});
    };
    return FacebookManager;
}());
FacebookManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("AuthenticatedRestClient")),
    __param(1, inversify_1.inject("ComapiConfig")),
    __metadata("design:paramtypes", [Object, Object])
], FacebookManager);
exports.FacebookManager = FacebookManager;
//# sourceMappingURL=facebookManager.js.map