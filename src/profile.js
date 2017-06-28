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
Profile = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager)),
    __metadata("design:paramtypes", [Object, Object, Object])
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=profile.js.map