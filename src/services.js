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
exports.Services = void 0;
var inversify_1 = require("inversify");
var interfaceSymbols_1 = require("./interfaceSymbols");
var Services = /** @class */ (function () {
    /**
     * Services class constructor.
     * @class Services
     * @classdesc Class that implements Services interface
     * @parameter {AppMessaging} _appMessaging
     * @parameter {Profile} _profile
     */
    function Services(_appMessaging, _profile) {
        this._appMessaging = _appMessaging;
        this._profile = _profile;
    }
    Object.defineProperty(Services.prototype, "appMessaging", {
        /**
         * Method to get AppMessaging interface
         * @method Services#appMessaging
         * @returns {AppMessaging} - Returns AppMessaging interface
         */
        get: function () {
            this._appMessaging.enableSocket();
            return this._appMessaging;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Services.prototype, "profile", {
        /**
         * Method to get Profile interface
         * @method Services#profile
         * @returns {Profile} - Returns Profile interface
         */
        get: function () {
            return this._profile;
        },
        enumerable: false,
        configurable: true
    });
    Services = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AppMessaging)),
        __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Profile)),
        __metadata("design:paramtypes", [Object, Object])
    ], Services);
    return Services;
}());
exports.Services = Services;
//# sourceMappingURL=services.js.map