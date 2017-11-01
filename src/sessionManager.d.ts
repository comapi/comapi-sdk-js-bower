import { ISessionManager, ISessionInfo, ILogger, ILocalStorageData, IComapiConfig, IRestClient } from "./interfaces";
export declare class SessionManager implements ISessionManager {
    private _logger;
    private _restClient;
    private _localStorageData;
    private _comapiConfig;
    private _deviceId;
    private _sessionInfo;
    constructor(_logger: ILogger, _restClient: IRestClient, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig);
    initialise(): Promise<boolean>;
    readonly sessionInfo: ISessionInfo;
    getValidToken(): Promise<string>;
    startSession(): Promise<ISessionInfo>;
    endSession(): Promise<boolean>;
    private _createAuthenticatedSession(jwt, authenticationId, deviceInfo);
    private _startAuth();
    private _endAuth();
    private _setSession(sessionInfo);
    private _removeSession();
    private getAuthHeader();
    private getDeviceId();
    private hasExpired(expiresOn);
    private isSessionValid(sessionInfo);
}
