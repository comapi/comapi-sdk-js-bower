import { IDeviceManager, Environment, IDevice, INetworkManager } from "./interfaces";
export declare class Device implements IDevice {
    private _networkManager;
    private _deviceManager;
    constructor(_networkManager: INetworkManager, _deviceManager: IDeviceManager);
    setFCMPushDetails(packageName: string, registrationId: string): Promise<boolean>;
    setAPNSPushDetails(bundleId: string, environment: Environment, token: string): Promise<boolean>;
    removePushDetails(): Promise<boolean>;
}
