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
}());
Channels = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager)),
    __metadata("design:paramtypes", [Object, Object])
], Channels);
exports.Channels = Channels;
//# sourceMappingURL=channels.js.map