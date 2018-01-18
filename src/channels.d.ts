import { IFacebookManager, IChannels, INetworkManager } from "./interfaces";
export declare class Channels implements IChannels {
    private _networkManager;
    private _facebookManager;
    /**
     * Channels class constructor.
     * @class Channels
     * @classdesc Class that implements Channels interface
     * @parameter {NetworkManager} networkManager
     * @parameter {IFacebookManager} facebookManager
     */
    constructor(_networkManager: INetworkManager, _facebookManager: IFacebookManager);
    /**
     * Method to create opt in state for facebook messenger
     * @method Channels#createFbOptInState
     * @param {any} [data] - the data to post
     */
    createFbOptInState(data?: any): Promise<any>;
}
