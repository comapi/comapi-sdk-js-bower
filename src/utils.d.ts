import { IBrowserInfo } from "./interfaces";
export declare class Utils {
    /**
     * Function to clone an object
     * @method Utils#clone
     * @param {any} obj - the object to clone
     * @returns {any} - returns a clone of the object
     */
    static clone(obj: any): any;
    /**
     * Method to generate a uuid (simulated)
     * @method Utils#uuid
     * @returns {string} - returns a uuid
     */
    static uuid(): string;
    /**
     * Internal method to get current browser info
     * @method Utils#getBrowserInfo
     * @param {string} [userAgent] - user agent string (optional - for unit tsting)
     * @returns {IBrowserInfo} - returns an IBrowserInfo interface
     */
    static getBrowserInfo(userAgent?: string): IBrowserInfo;
    /**
     * @class Utils
     * @ignore
     * @classdesc Class that implements a Utils.
     */
    constructor();
}
