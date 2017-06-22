import { ILogEvent } from "./interfaces";
export declare class IndexedDBLogger {
    private idbSupported;
    private _database;
    private _name;
    private _version;
    private _store;
    constructor(name?: string);
    openDatabase(): Promise<boolean>;
    purge(when: Date): Promise<boolean>;
    deleteDatabase(): Promise<boolean>;
    clearData(): Promise<boolean>;
    getData(count?: number, getIndexes?: boolean): Promise<Object[]>;
    getCount(): Promise<number>;
    closeDatabase(): void;
    addRecord(entity: ILogEvent): Promise<number>;
}
