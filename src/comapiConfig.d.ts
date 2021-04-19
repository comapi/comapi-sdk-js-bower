import { IComapiConfig, IAuthChallenge, LogLevels, LogPersistences, OrphanedEventPersistences, IFoundationRestUrls, IEventMapping } from "./interfaces";
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
    orphanedEventPersistence: OrphanedEventPersistences;
    enableWebsocketForNonChatUsage: boolean;
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
    withApiSpace(id: string): this;
    /**
     * Function to set Logfile Retention Time in hours (Defaouts to `24`)
     * @method ComapiConfig#withLogRetentionTime
     * @param {number} hours - the log retention time in hours
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withLogRetentionTime(hours: number): this;
    /**
     * Function to set the authentication Challenge
     * @method ComapiConfig#withAuthChallenge
     * @param {IAuthChallenge} authChallenge - the authentication challenge
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withAuthChallenge(authChallenge: IAuthChallenge): this;
    /**
     * Function to set urlBase (Defaults to production)
     * @method ComapiConfig#withUrlBase
     * @param {string} urlBase - the url base
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withUrlBase(urlBase: string): this;
    /**
     * Function to set webSocketBase (Defaults to production)
     * @method ComapiConfig#withWebSocketBase
     * @param {string} webSocketBase - the web socket base
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withWebSocketBase(webSocketBase: string): this;
    /**
     * Function to set logLevel  (Defaults to errors only)
     * @method ComapiConfig#withLogLevel
     * @param {LogLevels} withLogLevel - the logLevel
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withLogLevel(logLevel: LogLevels): this;
    /**
     * Function to set logPersistence
     * @method ComapiConfig#withLogPersistence
     * @param {LogPersistences} logPersistence - the logPersistence
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withLogPersistence(logPersistence: LogPersistences): this;
    /**
     * Function to override foundationRestUrls
     * @method ComapiConfig#withFoundationRestUrls
     * @param {IFoundationRestUrls} foundationRestUrls - the foundationRestUrls
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withFoundationRestUrls(foundationRestUrls: IFoundationRestUrls): this;
    /**
     * Function to override eventMapping
     * @method ComapiConfig#withEventMapping
     * @param {IEventMapping} eventMapping - the eventMapping
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withEventMapping(eventMapping: IEventMapping): this;
    /**
     * Function to override localStoragePrefix
     * @method ComapiConfig#withLocalStoragePrefix
     * @param {string} localStoragePrefix - the localStoragePrefix
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withLocalStoragePrefix(localStoragePrefix: string): this;
    /**
     * Function to override orphanedEventPersistence
     * @method ComapiConfig#withOrphanedEventPersistence
     * @param {string} orphanedEventPersistence - the orphanedEventPersistence
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withOrphanedEventPersistence(orphanedEventPersistence: OrphanedEventPersistences): this;
    /**
     * Function to override enableWebsocketForNonChatUsage
     * @method ComapiConfig#withEnabledNonChatSocket
     * @param {string} enabled - enabled
     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
     */
    withEnabledNonChatSocket(enabled: boolean): this;
}
