import { ILocalStorageData, IComapiConfig } from "./interfaces";
export declare class LocalStorageData implements ILocalStorageData {
    private _comapiConfig;
    private _prefix;
    /**
     * LocalStorageData class constructor.
     * @class LocalStorageData
     * @ignore
     * @classdesc Class that implements Local storage access.
     * @param  {string} [prefix]
     */
    constructor(_comapiConfig: IComapiConfig);
    /**
     * Setter to set the prefix
     * @method LocalStorageData#prefix
     * @param {string} prefix - the prefix
     */
    set prefix(prefix: string);
    /**
     * Get raw value as string from local storage.
     * @method LocalStorageData#getString
     * @param {String} key - the key
     * @returns (String) - the raw string value
     */
    getString(key: string): Promise<string>;
    /**
     * Set raw value as string to local storage.
     * @method LocalStorageData#setString
     * @param {String} key - the key
     * @param {String} value - the value
     */
    setString(key: string, value: string): Promise<boolean>;
    /**
     * Get value as object .
     * @method LocalStorageData#getObject
     * @param  {string} key
     * @returns {Object} - the value Object
     */
    getObject(key: string): Promise<Object>;
    /**
     * Set value as object.
     * @method LocalStorageData#setObject
     * @param  {string} key
     * @param  {Object} data
     * @returns {boolean} - returns boolean value representing success
     */
    setObject(key: string, data: Object): Promise<boolean>;
    /**
     * Remove a value from local storage.
     * @method LocalStorageData#remove
     * @param  {string} key
     */
    remove(key: string): Promise<boolean>;
}
