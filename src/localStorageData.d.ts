import { ILocalStorageData, IComapiConfig } from "./interfaces";
export declare class LocalStorageData implements ILocalStorageData {
    private _comapiConfig;
    private _prefix;
    constructor(_comapiConfig: IComapiConfig);
    prefix: string;
    getString(key: string): Promise<string>;
    setString(key: string, value: string): Promise<boolean>;
    getObject(key: string): Promise<Object>;
    setObject(key: string, data: Object): Promise<boolean>;
    remove(key: string): Promise<boolean>;
}
