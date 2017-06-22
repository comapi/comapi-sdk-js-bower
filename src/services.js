"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Services = (function () {
    function Services(_appMessaging, _profile) {
        this._appMessaging = _appMessaging;
        this._profile = _profile;
    }
    Object.defineProperty(Services.prototype, "appMessaging", {
        get: function () {
            return this._appMessaging;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Services.prototype, "profile", {
        get: function () {
            return this._profile;
        },
        enumerable: true,
        configurable: true
    });
    return Services;
}());
exports.Services = Services;
//# sourceMappingURL=services.js.map