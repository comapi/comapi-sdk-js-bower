import { ILogger, LogLevels, IEventManager, ILocalStorageData } from "./interfaces";
import { IndexedDBLogger } from "./indexedDBLogger";
export declare class Logger implements ILogger {
    private _eventManager?;
    private _localStorageData?;
    private _indexedDB?;
    private _logLevel;
    private _uid;
    private _maxLocalStorageLogSize;
    private _localStorageKey;
    /**
     * Logger class constructor.
     * @class Logger
     * @ignore
     * @classdesc Class that implements all the Logger functionality.
     * @param {IEventManager} [eventManager] - event manager interface - for publishing log events
     * @param {ILocalStorageData} [localStorageData] - local storage interface  - for publishing log events
     * @param {IndexedDB} [indexedDB] - indexedDB interface - assumed to be open and ready to go
     */
    constructor(_eventManager?: IEventManager, _localStorageData?: ILocalStorageData, _indexedDB?: IndexedDBLogger);
    /**
     * Getter to get the log level
     * @method Logger#logLevel
     * @returns {LogLevels} - returns the current log level
     */
    get logLevel(): LogLevels;
    /**
     * Setter to set the log level
     * @method Logger#logLevel
     * @param {LogLevels} theLogLevel - the log level
     */
    set logLevel(theLogLevel: LogLevels);
    /**
     * Write custon content to the diagnostic log of type info.
     * @method Logger#log
     * @param  {String} message
     * @param  {Object} [data]
     * @returns {Promise} - returns promise
     */
    log(message: string, data?: Object): Promise<boolean>;
    /**
     * Write custon content to the diagnostic log of type warning.
     * @method Logger#warn
     * @param  {String} message
     * @param  {Object} [data]
     * @returns {Promise} - returns promise
     */
    warn(message: string, data?: Object): Promise<boolean>;
    /**
     * Write custon content to the diagnostic log of type error.
     * @method Logger#error
     * @param  {String} message
     * @param  {Object} [data]
     * @returns {Promise} - returns promise
     */
    error(message: string, data?: Object): Promise<boolean>;
    /**
     * Method to get the current logfile
     * @method Logger#getLog
     * @returns {Promise} - returns promise
     */
    getLog(): Promise<string>;
    /**
     * Method to clear the current logfile.
     * @method Logger#clearLog
     * @returns {Promise} - returns promise
     */
    clearLog(): Promise<boolean>;
    /**
     * Private method to get a string representation of a log level
     * @param {LogLevels} level
     * @returns {String}
     */
    private _stringForLogLevel;
    /**
     * Private method to log a message
     * @param  {LogLevels} level
     * @param  {string} message
     * @param  {Object} [data]
     * @returns Promise
     */
    private _log;
}
