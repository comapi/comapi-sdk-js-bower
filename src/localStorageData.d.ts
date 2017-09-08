import { ILocalStorageData, IComapiConfig } from "./interfaces";
export declare class LocalStorageData implements ILocalStorageData {
    private _comapiConfig;
    private _prefix;
    constructor(_comapiConfig: IComapiConfig);
    prefix: string;
    getString(key: string): string;
    setString(key: string, value: string): void;
    getObject(key: string): Object;
    setObject(key: string, data: Object): boolean;
    remove(key: string): void;
}
