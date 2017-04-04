import { IFacebookManager } from "./interfaces";
import { SessionAndSocketResolver } from "./resolver";
export declare class Channels {
    private _sessionAndSocketResolver;
    private _facebookManager;
    /**
     * Channels class constructor.
     * @class Channels
     * @classdesc Class that implements Channels interface
     * @parameter {SessionAndSocketResolver} resolver
     * @parameter {IFacebookManager} facebookManager
     */
    constructor(_sessionAndSocketResolver: SessionAndSocketResolver, _facebookManager: IFacebookManager);
    /**
     * Method to create opt in state for facebook messenger
     * @method Channels#createFbOptInState
     * @param {any} [data] - the data to post
     */
    createFbOptInState(data?: any): Promise<any>;
}
