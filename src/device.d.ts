import { IDeviceManager, Environment } from "./interfaces";
import { SessionAndSocketResolver } from "./resolver";
export declare class Device {
    private _sessionAndSocketResolver;
    private _deviceManager;
    /**
     * Device class constructor.
     * @class Device
     * @classdesc Class that implements Device related functionality.
     * @parameter {SessionAndSocketResolver} resolver
     * @parameter {IDeviceManager} deviceManager
     */
    constructor(_sessionAndSocketResolver: SessionAndSocketResolver, _deviceManager: IDeviceManager);
    /**
     * Function to set FCM push details for the current session
     * @method Device#setFCMPushDetails
     * @param {string} packageName - the andriod package name of your cordova app
     * @param {string} registrationId - the push registration id
     * @returns {Promise} - Returns a promise
     */
    setFCMPushDetails(packageName: string, registrationId: string): Promise<boolean>;
    /**
     * Function to set APNS push details for the current session
     * @method Device#setAPNSPushDetails
     * @param {string} bundleId - the iOS bundleId of your cordova app
     * @param {Environment} environment - the environment ["`development`"|"`production`"]
     * @param {string} token
     * @returns {Promise} - Returns a promise
     */
    setAPNSPushDetails(bundleId: string, environment: Environment, token: string): Promise<boolean>;
    /**
     * Function to remove push details for the current session
     * @method Device#removePushDetails
     * @returns {Promise} - Returns a promise
     */
    removePushDetails(): Promise<boolean>;
}
