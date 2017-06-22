import { IDeviceManager, ILogger, Environment, ILocalStorageData, IComapiConfig, IRestClient } from "./interfaces";
export declare class DeviceManager implements IDeviceManager {
    private _logger;
    private _restClient;
    private _localStorageData;
    private _comapiConfig;
    constructor(_logger: ILogger, _restClient: IRestClient, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig);
    setFCMPushDetails(sessionId: string, packageName: string, registrationId: string): Promise<boolean>;
    setAPNSPushDetails(sessionId: string, bundleId: string, environment: Environment, token: string): Promise<boolean>;
    removePushDetails(sessionId: string): Promise<boolean>;
    private getPushUrl(sessionId);
}
