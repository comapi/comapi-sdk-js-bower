import { ILogger, LogLevels, IEventManager, ILocalStorageData } from "./interfaces";
import { IndexedDBLogger } from "./indexedDBLogger";
export declare class Logger implements ILogger {
    private _eventManager;
    private _localStorageData;
    private _indexedDB;
    private _logLevel;
    private _uid;
    private _maxLocalStorageLogSize;
    private _localStorageKey;
    constructor(_eventManager?: IEventManager, _localStorageData?: ILocalStorageData, _indexedDB?: IndexedDBLogger);
    logLevel: LogLevels;
    log(message: string, data?: Object): Promise<boolean>;
    warn(message: string, data?: Object): Promise<boolean>;
    error(message: string, data?: Object): Promise<boolean>;
    getLog(): Promise<string>;
    clearLog(): Promise<boolean>;
    private _stringForLogLevel(level);
    private _log(level, message, data?);
}
