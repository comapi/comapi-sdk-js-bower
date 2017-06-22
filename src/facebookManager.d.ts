import { IComapiConfig, IRestClient, IFacebookManager } from "./interfaces";
export declare class FacebookManager implements IFacebookManager {
    private _restClient;
    private _comapiConfig;
    constructor(_restClient: IRestClient, _comapiConfig: IComapiConfig);
    createSendToMessengerState(data?: any): Promise<any>;
}
