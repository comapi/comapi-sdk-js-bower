import { IComapiConfig, ILogEvent } from "./interfaces";
export declare class IndexedDBLogger {
    private _comapiConfig;
    private _initialised;
    private idbSupported;
    private _database;
    private _name;
    private _version;
    private _store;
    private _mutex;
    constructor(_comapiConfig?: IComapiConfig);
    name: string;
    purge(when: Date): Promise<boolean>;
    deleteDatabase(): Promise<boolean>;
    clearData(): Promise<boolean>;
    getData(count?: number, getIndexes?: boolean): Promise<Object[]>;
    getCount(): Promise<number>;
    closeDatabase(): void;
    addRecord(entity: ILogEvent): Promise<number>;
    private ensureInitialised();
    private initialise();
}
