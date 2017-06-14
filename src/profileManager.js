var utils_1 = require("./utils");
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
})();
exports.ProfileManager = ProfileManager;
//# sourceMappingURL=profileManager.js.map