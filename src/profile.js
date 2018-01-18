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
var interfaceSymbols_1 = require("./interfaceSymbols");
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
     * Function to patch a profile
     * @method Profile#updateProfile
     * @param {string} profileId - the id of the profile to update
     * @param {any} profile - the profile to patch
     * @param {string} [eTag] - the eTag (returned in headers from getProfile())
     * @returns {Promise}
     */
    Profile.prototype.patchProfile = function (profileId, profile, eTag) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.patchProfile(profileId, profile, eTag);
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
            return _this._profileManager.getProfile(sessionInfo.session.profileId);
        })
            .then(function (result) {
            if (useEtag) {
                _this._localStorage.setString("MyProfileETag", utils_1.Utils.getHeaderValue(result.headers, "ETag"));
            }
            return Promise.resolve(result.response);
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
            return Promise.all([sessionInfo, _this.getMyProfileETag(useEtag)]);
        })
            .then(function (_a) {
            var sessionInfo = _a[0], eTag = _a[1];
            return _this._profileManager.updateProfile(sessionInfo.session.profileId, profile, eTag);
        })
            .then(function (result) {
            if (useEtag) {
                _this._localStorage.setString("MyProfileETag", utils_1.Utils.getHeaderValue(result.headers, "ETag"));
            }
            return Promise.resolve(result.response);
        });
    };
    /**
     * Patch current user's profile
     * @method Profile#patchMyProfile
     * @param {any} profile - the profile of the logged in user to update
     * @returns {Promise} - returns a Promise
     */
    Profile.prototype.patchMyProfile = function (profile, useEtag) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return Promise.all([sessionInfo, _this.getMyProfileETag(useEtag)]);
        })
            .then(function (_a) {
            var sessionInfo = _a[0], eTag = _a[1];
            return _this._profileManager.patchProfile(sessionInfo.session.profileId, profile, eTag);
        })
            .then(function (result) {
            if (useEtag) {
                _this._localStorage.setString("MyProfileETag", utils_1.Utils.getHeaderValue(result.headers, "ETag"));
            }
            return Promise.resolve(result.response);
        });
    };
    /**
     *
     * @param useEtag
     */
    Profile.prototype.getMyProfileETag = function (useEtag) {
        if (useEtag) {
            return this._localStorage.getString("MyProfileETag");
        }
        else {
            return Promise.resolve(undefined);
        }
    };
    return Profile;
}());
Profile = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager)),
    __metadata("design:paramtypes", [Object, Object, Object])
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=profile.js.map