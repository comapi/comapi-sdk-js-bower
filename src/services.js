var Services = (function () {
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
            return this._appMessaging;
        },
        enumerable: true,
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
        enumerable: true,
        configurable: true
    });
    return Services;
})();
exports.Services = Services;
//# sourceMappingURL=services.js.map