import { IDeviceManager, ILogger, Environment, ILocalStorageData, IComapiConfig, IRestClient } from "./interfaces";
export declare class DeviceManager implements IDeviceManager {
    private _logger;
    private _restClient;
    private _localStorageData;
    private _comapiConfig;
    /**
     * DeviceManager class constructor.
     * @class DeviceManager
     * @ignore
     * @classdesc Class that implements all the DeviceManager functionality.
     * @parameter {ILogger} logger
     * @parameter {IRestClient} restClient
     * @parameter {ILocalStorageData} localStorageData
     * @parameter {IComapiConfig} ComapiConfig
     */
    constructor(_logger: ILogger, _restClient: IRestClient, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig);
    /**
     * Function to set FCM push details for the current session
     * @method DeviceManager#setFCMPushDetails
     * @param {string} sessionId
     * @param {string} packageName
     * @param {string} registrationId
     * @returns {Promise} - Returns a promise
     */
    setFCMPushDetails(sessionId: string, packageName: string, registrationId: string): Promise<boolean>;
    /**
     * Function to set APNS push details for the current session
     * @method DeviceManager#setAPNSPushDetails
     * @param {string} sessionId
     * @param {string} bundleId
     * @param {Environment} environment
     * @param {string} token
     * @returns {Promise} - Returns a promise
     */
    setAPNSPushDetails(sessionId: string, bundleId: string, environment: Environment, token: string): Promise<boolean>;
    /**
     * Function to remove push details for the current session
     * @method DeviceManager#removePushDetails
     * @param {string} sessionId
     * @returns {Promise} - Returns a promise
     */
    removePushDetails(sessionId: string): Promise<boolean>;
    /**
     * Getter to get the current push Url
     * @method DeviceManager#pushUrl
     * @returns {string}
     */
    private getPushUrl(sessionId);
}
