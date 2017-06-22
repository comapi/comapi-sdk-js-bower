import { IRestClient, IApiSpaceManager, IApiSpaceInfo, IApiSpaceAuthInfo } from "./interfaces";
export declare class ApiSpaceManager implements IApiSpaceManager {
    private _restClient;
    private _urlBase;
    constructor(_restClient: IRestClient, _urlBase: string);
    getToken(accountId: string, profileId: string): Promise<any>;
    createApiSpace(token: string, name: string): Promise<IApiSpaceInfo>;
    updateAuth(token: string, apiSpaceId: string, authInfo: IApiSpaceAuthInfo): Promise<IApiSpaceAuthInfo>;
}
