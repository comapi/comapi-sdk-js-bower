import { IProfileManager, ISessionManager, ILogger, IRestClient, ILocalStorageData, IComapiConfig } from "./interfaces";
export declare class ProfileManager implements IProfileManager {
    private _logger;
    private _restClient;
    private _localStorageData;
    private _comapiConfig;
    private _sessionManager;
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
    constructor(_logger: ILogger, _restClient: IRestClient, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig, _sessionManager: ISessionManager);
    /**
     * Function to retrieve a user's profile
     * @method ProfileManager#getProfile
     * @param {string} id
     * @returns {Promise}
     */
    getProfile(id: string): Promise<any>;
    /**
     * Function to query for a list of profiles matching the search criteria
     * @method ProfileManager#getProfile
     * @param {string} [query] - See https://www.npmjs.com/package/mongo-querystring for query syntax.
     * @returns {Promise}
     */
    queryProfiles(query?: string): Promise<any>;
    /**
     * Function to update a profile
     * @method ProfileManager#updateProfile
     * @param {string} id
     * @param {Object} profile
     * @param {string} [eTag]
     * @returns {Promise}
     */
    updateProfile(id: string, profile: Object, eTag?: string): Promise<any>;
    /**
     * Function to patch a profile
     * @method ProfileManager#updateProfile
     * @param {string} id
     * @param {Object} profile
     * @param {string} [eTag]
     * @returns {Promise}
     */
    patchProfile(id: string, profile: Object, eTag?: string): Promise<any>;
}
