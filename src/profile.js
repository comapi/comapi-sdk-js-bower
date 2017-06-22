"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Profile = (function () {
    function Profile(_networkManager, _localStorage, _profileManager) {
        this._networkManager = _networkManager;
        this._localStorage = _localStorage;
        this._profileManager = _profileManager;
    }
    Profile.prototype.getProfile = function (profileId) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.getProfile(profileId);
        });
    };
    Profile.prototype.queryProfiles = function (query) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.queryProfiles(query);
        });
    };
    Profile.prototype.updateProfile = function (profileId, profile, eTag) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.updateProfile(profileId, profile, eTag);
        });
    };
    Profile.prototype.patchProfile = function (profileId, profile, eTag) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.patchProfile(profileId, profile, eTag);
        });
    };
    Profile.prototype.getMyProfile = function (useEtag) {
        var _this = this;
        if (useEtag === void 0) { useEtag = true; }
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.getProfile(sessionInfo.session.profileId);
        })
            .then(function (result) {
            if (useEtag) {
                _this._localStorage.setString("MyProfileETag", result.headers.ETag);
            }
            return Promise.resolve(result.response);
        });
    };
    Profile.prototype.updateMyProfile = function (profile, useEtag) {
        var _this = this;
        if (useEtag === void 0) { useEtag = true; }
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.updateProfile(sessionInfo.session.profileId, profile, useEtag ? _this._localStorage.getString("MyProfileETag") : undefined);
        })
            .then(function (result) {
            if (useEtag) {
                _this._localStorage.setString("MyProfileETag", result.headers.ETag);
            }
            return Promise.resolve(result.response);
        });
    };
    Profile.prototype.patchMyProfile = function (profile, useEtag) {
        var _this = this;
        return this._networkManager.ensureSessionAndSocket()
            .then(function (sessionInfo) {
            return _this._profileManager.patchProfile(sessionInfo.session.profileId, profile, useEtag ? _this._localStorage.getString("MyProfileETag") : undefined);
        })
            .then(function (result) {
            if (useEtag) {
                _this._localStorage.setString("MyProfileETag", result.headers.ETag);
            }
            return Promise.resolve(result.response);
        });
    };
    return Profile;
}());
exports.Profile = Profile;
//# sourceMappingURL=profile.js.map