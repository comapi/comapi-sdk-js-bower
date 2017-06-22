import { IFacebookManager, IChannels, INetworkManager } from "./interfaces";
export declare class Channels implements IChannels {
    private _networkManager;
    private _facebookManager;
    constructor(_networkManager: INetworkManager, _facebookManager: IFacebookManager);
    createFbOptInState(data?: any): Promise<any>;
}
