import { ILocalStorageData } from "./interfaces";
export declare class LocalStorageData implements ILocalStorageData {
    private _prefix;
    constructor();
    prefix: string;
    getString(key: string): string;
    setString(key: string, value: string): void;
    getObject(key: string): Object;
    setObject(key: string, data: Object): boolean;
    remove(key: string): void;
}
