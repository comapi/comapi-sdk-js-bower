import { IProfileManager, ISessionManager, ILogger, IRestClient, ILocalStorageData, IComapiConfig } from "./interfaces";
export declare class ProfileManager implements IProfileManager {
    private _logger;
    private _restClient;
    private _localStorageData;
    private _comapiConfig;
    private _sessionManager;
    constructor(_logger: ILogger, _restClient: IRestClient, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig, _sessionManager: ISessionManager);
    getProfile(id: string): Promise<any>;
    queryProfiles(query?: string): Promise<any>;
    updateProfile(id: string, profile: Object, eTag?: string): Promise<any>;
    patchProfile(id: string, profile: Object, eTag?: string): Promise<any>;
}
