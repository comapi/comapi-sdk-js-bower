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
var ProfileManager = (function () {
    /**
     * ProfileManager class constructor.
     * @class ProfileManager
     * @ignore
     * @classdesc Class that implements Profile Management.
     * @parameter {ILogger} logger
     * @parameter {IRestClient} restClient
     * @parameter {ILocalStorageData} localStorageData
     * @parameter {IComapiConfig} comapiConfig
     * @parameter {ISessionManager} sessionManager
     */
    function ProfileManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager) {
        this._logger = _logger;
        this._restClient = _restClient;
        this._localStorageData = _localStorageData;
        this._comapiConfig = _comapiConfig;
        this._sessionManager = _sessionManager;
    }
    /**
     * Function to retrieve a user's profile
     * @method ProfileManager#getProfile
     * @param {string} id
     * @returns {Promise}
     */
    ProfileManager.prototype.getProfile = function (id) {
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profile, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            profileId: id,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.get(url);
    };
    /**
     * Function to query for a list of profiles matching the search criteria
     * @method ProfileManager#getProfile
     * @param {string} [query] - See https://www.npmjs.com/package/mongo-querystring for query syntax.
     * @returns {Promise}
     */
    ProfileManager.prototype.queryProfiles = function (query) {
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profiles, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            urlBase: this._comapiConfig.urlBase,
        });
        if (query) {
            url += ("?" + query);
        }
        return this._restClient.get(url);
    };
    /**
     * Function to update a profile
     * @method ProfileManager#updateProfile
     * @param {string} id
     * @param {Object} profile
     * @param {string} [eTag]
     * @returns {Promise}
     */
    ProfileManager.prototype.updateProfile = function (id, profile, eTag) {
        var headers = {};
        if (eTag) {
            headers["If-Match"] = eTag;
        }
        // take a copy of it prior to messing with it ...
        var data = utils_1.Utils.clone(profile);
        if (data.id === undefined) {
            data.id = id;
        }
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profile, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            profileId: id,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.put(url, headers, data);
    };
    /**
     * Function to patch a profile
     * @method ProfileManager#updateProfile
     * @param {string} id
     * @param {Object} profile
     * @param {string} [eTag]
     * @returns {Promise}
     */
    ProfileManager.prototype.patchProfile = function (id, profile, eTag) {
        var headers = {};
        if (eTag) {
            headers["If-Match"] = eTag;
        }
        // take a copy of it prior to messing with it ...
        var data = utils_1.Utils.clone(profile);
        if (data.id === undefined) {
            data.id = id;
        }
        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profile, {
            apiSpaceId: this._comapiConfig.apiSpaceId,
            profileId: id,
            urlBase: this._comapiConfig.urlBase,
        });
        return this._restClient.patch(url, headers, data);
    };
    return ProfileManager;
}());
ProfileManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], ProfileManager);
exports.ProfileManager = ProfileManager;
//# sourceMappingURL=profileManager.js.map