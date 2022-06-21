import { ISessionManager, ISessionInfo, ILogger, ILocalStorageData, IComapiConfig, IRestClient } from "./interfaces";
export declare class SessionManager implements ISessionManager {
    private _logger;
    private _restClient;
    private _localStorageData;
    private _comapiConfig;
    private _deviceId;
    /**
     * Current session
     */
    private _sessionInfo;
    /**
     * SessionManager class constructor.
     * @class SessionManager
     * @ignore
     * @classdesc Class that implements all the SessionManager functionality.
     * @parameter {ILogger} logger
     * @parameter {IRestClient} restClient
     * @parameter {ILocalStorageData} localStorageData
     * @parameter {IComapiConfig} comapiConfig
     */
    constructor(_logger: ILogger, _restClient: IRestClient, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig);
    /**
     * Retrieve a cached session if there is one
     */
    initialise(): Promise<boolean>;
    /**
     * Getter to get the current sessionInfo
     * @method SessionManager#sessionInfo
     * @returns {ISessionInfo}
     */
    get sessionInfo(): ISessionInfo;
    /**
     * Function to get auth token
     * @method SessionManager#token
     * @returns {Promise} - returns the auth token via a promise
     */
    getValidToken(): Promise<string>;
    /**
     * Function to start a new session or return an existing session
     * @method SessionManager#startSession
     * @param {any} userDefined -  Additional client-specific information
     * @returns {Promise} - Returns a promise
     */
    startSession(): Promise<ISessionInfo>;
    /**
     * Function to end the current session
     * @method SessionManager#endSession
     * @returns {Promise} - Returns a promise
     */
    endSession(): Promise<boolean>;
    /**
     * Retrieves details about a session
     * @method SessionManager#requestSession
     * @returns {Promise} - Returns a promise
     */
    requestSession(): Promise<any>;
    /**
     * Internal function to remove an existing cached session
     * @returns {Promise} - returns boolean result
     */
    removeSession(): Promise<boolean>;
    private _buildPushPayload;
    /**
     * Internal function to create an authenticated session
     * @param (String) jwt - the jwt retrieved from the integrator
     * @param (String) authenticationId - the authenticationId given by comapi back end
     * @param (Object) deviceInfo - the deviceInfo
     * @returns {Promise} - Returns a promise
     */
    private _createAuthenticatedSession;
    /**
     * Internal function to start an authenticated session
     * @returns {Promise} - Returns a promise
     */
    private _startAuth;
    /**
     * Internal function to end an authenticated session
     * @returns {Promise} - Returns a promise
     */
    private _endAuth;
    /**
     * Internal function to load in an existing session if available
     * @returns {boolean} - returns boolean reault
     */
    private _setSession;
    /**
     *
     */
    private getAuthHeader;
    /**
     * Create one if not available ...
     */
    private getDeviceId;
    /**
     * Check a token exp property not in the past ...
     * @param token
     */
    private hasExpired;
    /**
     * Extract payload from a jwt
     * @param token
     * @returns payload object
     */
    private extractTokenPayload;
    /**
     * Checks validity of session based on expiry and matching apiSpace
     * @param sessionInfo
     */
    private isSessionValid;
}
