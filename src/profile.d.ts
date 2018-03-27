import { ILocalStorageData, IProfile, IProfileManager, INetworkManager } from "./interfaces";
export declare class Profile implements IProfile {
    private _networkManager;
    private _localStorage;
    private _profileManager;
    /**
     * Profile class constructor.
     * @class Profile
     * @classdesc Class that implements Profile.
     * @parameter {INetworkManager} _networkManager
     * @parameter {ILocalStorageData} localStorageData
     * @parameter {IProfileManager} profileManager
     */
    constructor(_networkManager: INetworkManager, _localStorage: ILocalStorageData, _profileManager: IProfileManager);
    /**
     * Get a profile
     * @method Profile#getProfile
     * @param {string} profileId - The id of the profile  to get
     * @returns {Promise} - returns a Promise
     */
    getProfile(profileId: string): Promise<any>;
    /**
     * Function to query for a list of profiles matching the search criteria
     * @method Profile#queryProfiles
     * @param {string} [query] - See <a href="https://www.npmjs.com/package/mongo-querystring">mongo-querystring</a> for query syntax.
     * @returns {Promise}
     */
    queryProfiles(query?: string): Promise<any>;
    /**
     * Function to update a profile
     * @method Profile#updateProfile
     * @param {string} profileId - the id of the profile to update
     * @param {any} profile - the profile to update
     * @param {string} [eTag] - the eTag (returned in headers from getProfile())
     * @returns {Promise}
     */
    updateProfile(profileId: string, profile: any, eTag?: string): Promise<any>;
    /**
     * Function to patch a profile
     * @method Profile#updateProfile
     * @param {string} profileId - the id of the profile to update
     * @param {any} profile - the profile to patch
     * @param {string} [eTag] - the eTag (returned in headers from getProfile())
     * @returns {Promise}
     */
    patchProfile(profileId: string, profile: Object, eTag?: string): Promise<any>;
    /**
     * Get current user's profile
     * @method Profile#getMyProfile
     * @param {boolean} [useEtag=true] - Whether to use eTags to maintain consistency of profile data (defaults to true)
     * @returns {Promise} - returns a Promise
     */
    getMyProfile(useEtag?: boolean): Promise<any>;
    /**
     * Update current user's profile
     * @method Profile#updateMyProfile
     * @param {any} profile - the profile of the logged in user to update
     * @param {boolean} [useEtag=true] - Whether to use eTags to maintain consistency of profile data (defaults to true)
     * @returns {Promise} - returns a Promise
     */
    updateMyProfile(profile: any, useEtag?: boolean): Promise<any>;
    /**
     * Patch current user's profile
     * @method Profile#patchMyProfile
     * @param {any} profile - the profile of the logged in user to update
     * @returns {Promise} - returns a Promise
     */
    patchMyProfile(profile: any, useEtag: boolean): Promise<any>;
    /**
     *
     * @param useEtag
     */
    private getMyProfileETag(useEtag);
}
