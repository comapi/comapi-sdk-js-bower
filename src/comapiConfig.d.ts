import { IComapiConfig, IAuthChallenge, LogLevels, LogPersistences, IFoundationRestUrls, IEventMapping } from "./interfaces";
export declare class ComapiConfig implements IComapiConfig {
    apiSpaceId: string;
    logRetentionHours: number;
    authChallenge: IAuthChallenge;
    urlBase: string;
    webSocketBase: string;
    logLevel: LogLevels;
    logPersistence: LogPersistences;
    isTypingTimeout: number;
    isTypingOffTimeout: number;
    foundationRestUrls: IFoundationRestUrls;
    eventMapping: IEventMapping;
    localStoragePrefix: string;
    constructor();
    withApiSpace(id: string): this;
    withLogRetentionTime(hours: number): this;
    withAuthChallenge(authChallenge: IAuthChallenge): this;
    withUrlBase(urlBase: string): this;
    withWebSocketBase(webSocketBase: string): this;
    withLogLevel(logLevel: LogLevels): this;
    withLogPersistence(logPersistence: LogPersistences): this;
    withFoundationRestUrls(foundationRestUrls: IFoundationRestUrls): this;
    withEventMapping(eventMapping: IEventMapping): this;
    withLocalStoragePrefix(localStoragePrefix: string): this;
}
