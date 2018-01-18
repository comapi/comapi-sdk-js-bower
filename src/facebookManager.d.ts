import { IComapiConfig, IRestClient, IFacebookManager } from "./interfaces";
export declare class FacebookManager implements IFacebookManager {
    private _restClient;
    private _comapiConfig;
    /**
     * FacebookManager class constructor.
     * @class FacebookManager
     * @ignore
     * @classdesc Class that implements all the FacebookManager functionality.
     * @parameter {IRestClient} restClient
     * @parameter {IComapiConfig} comapiConfig
     */
    constructor(_restClient: IRestClient, _comapiConfig: IComapiConfig);
    /**
     * @param {any} [data] - the data to post
     */
    createSendToMessengerState(data?: any): Promise<any>;
}
