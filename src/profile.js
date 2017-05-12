var Profile = (function () {
    /**
     * Profile class constructor.
     * @class Profile
     * @classdesc Class that implements Profile.
     * @parameter {INetworkManager} _networkManager
     * @parameter {ILocalStorageData} localStorageData
     * @parameter {IProfileManager} profileManager
     */
    function Profile(_networkManager, _localStorage, _profileManager) {
        this._networkManager = _networkManager;
        this._localStorage = _localStorage;
        this._profileManager = _profileManager;
    }
    /**
     * Get a profile
     * @method Profile#getProfile
     * @param {string} profileId - The id of the profile  to get
     * @returns {Promise} - returns a Promise
     */
    Profile.prototype.getProfile = function (profileId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.getProfile(profileId);
        });
    };
    /**
     * Function to query for a list of profiles matching the search criteria
     * @method Profile#queryProfiles
     * @param {string} [query] - See <a href="https://www.npmjs.com/package/mongo-querystring">mongo-querystring</a> for query syntax.
     * @returns {Promise}
     */
    Profile.prototype.queryProfiles = function (query) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.queryProfiles(query);
        });
    };
    /**
     * Function to update a profile
     * @method Profile#updateProfile
     * @param {string} profileId - the id of the profile to update
     * @param {any} profile - the profile to update
     * @param {string} [eTag] - the eTag (returned in headers from getProfile())
     * @returns {Promise}
     */
    Profile.prototype.updateProfile = function (profileId, profile, eTag) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.updateProfile(profileId, profile, eTag);
        });
    };
    /**
     * Get current user's profile
     * @method Profile#getMyProfile
     * @param {boolean} [useEtag=true] - Whether to use eTags to maintain consistency of profile data (defaults to true)
     * @returns {Promise} - returns a Promise
     */
    Profile.prototype.getMyProfile = function (useEtag) {
        var _this = this;
        if (useEtag === void 0) { useEtag = true; }
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.getProfile(sessionInfo.session.profileId)
                .then(function (result) {
                if (useEtag) {
                    _this._localStorage.setString("MyProfileETag", result.headers.ETag);
                }
                return Promise.resolve(result.response);
            });
        });
    };
    /**
     * Update current user's profile
     * @method Profile#updateMyProfile
     * @param {any} profile - the profile of the logged in user to update
     * @param {boolean} [useEtag=true] - Whether to use eTags to maintain consistency of profile data (defaults to true)
     * @returns {Promise} - returns a Promise
     */
    Profile.prototype.updateMyProfile = function (profile, useEtag) {
        var _this = this;
        if (useEtag === void 0) { useEtag = true; }
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.updateProfile(sessionInfo.session.profileId, profile, useEtag ? _this._localStorage.getString("MyProfileETag") : undefined)
                .then(function (result) {
                if (useEtag) {
                    _this._localStorage.setString("MyProfileETag", result.headers.ETag);
                }
                return Promise.resolve(result.response);
            });
        });
    };
    return Profile;
})();
exports.Profile = Profile;
//# sourceMappingURL=profile.js.map