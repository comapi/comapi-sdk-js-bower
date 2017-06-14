import { IComapiConfig, IAuthChallenge, LogLevels, LogPersistences, IFoundationRestUrls } from "./interfaces";
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
    /**
     * ComapiConfig class constructor.
     * @class ComapiConfig
     * @classdesc Class that implements IComapiConfig
     */
    constructor();
    /**
     * Function to set apiSpaceId
     * @method ComapiConfig#withApiSpace
     * @param {string} id - the api space id
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withApiSpace(id: string): ComapiConfig;
    /**
     * Function to set Logfile Retention Time in hours (Defaouts to `24`)
     * @method ComapiConfig#withLogRetentionTime
     * @param {number} hours - the log retention time in hours
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withLogRetentionTime(hours: number): ComapiConfig;
    /**
     * Function to set the authentication Challenge
     * @method ComapiConfig#withAuthChallenge
     * @param {IAuthChallenge} authChallenge - the authentication challenge
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withAuthChallenge(authChallenge: IAuthChallenge): ComapiConfig;
    /**
     * Function to set urlBase (Defaults to production)
     * @method ComapiConfig#withUrlBase
     * @param {string} urlBase - the url base
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withUrlBase(urlBase: string): ComapiConfig;
    /**
     * Function to set webSocketBase (Defaults to production)
     * @method ComapiConfig#withWebSocketBase
     * @param {string} webSocketBase - the web socket base
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withWebSocketBase(webSocketBase: string): ComapiConfig;
    /**
     * Function to set logLevel  (Defaults to errors only)
     * @method ComapiConfig#withLogLevel
     * @param {LogLevels} withLogLevel - the logLevel
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withLogLevel(logLevel: LogLevels): ComapiConfig;
    /**
     * Function to set logPersistence
     * @method ComapiConfig#withLogPersistence
     * @param {LogPersistences} logPersistence - the logPersistence
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withLogPersistence(logPersistence: LogPersistences): ComapiConfig;
    /**
     * Function to override foundationRestUrls
     * @method ComapiConfig#withFoundationRestUrls
     * @param {IFoundationRestUrls} foundationRestUrls - the foundationRestUrls
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withFoundationRestUrls(foundationRestUrls: IFoundationRestUrls): ComapiConfig;
}
