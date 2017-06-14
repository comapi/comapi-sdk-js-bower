import { IBrowserInfo } from "./interfaces";
/**
 * Method to perform the asnc operation
 * @param {any} data  the data to operate on
 * @returns {Promise<any>} returns a promise
 */
export declare type DoUntilOperationFunction = (data: any) => Promise<any>;
/**
 * Method to decide whether to continue or not
 * @param {any} data  the data to look at (will have been returned vi a promise from DoUntilOperationFunction)
 * @returns {boolean} returns true or false. return false to stop
 */
export declare type DoUntilTestFunction = (data: any) => boolean;
/**
 * Utility class
 */
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
     * Method to call some async function on an array of data and you want them called sequentially
     * @param {any[]} arr
     * @param {Function} iteratorFn
     * @returns {Promise} - returns a Promise
     */
    static eachSeries(arr: any[], iteratorFn: Function): Promise<any>;
    /**
     * Method to encapsulate repeatdly calling an async method until a condition is met (tyoes defined at top)
     * @param {DoUntilOperationFunction} operation - the operation to perform
     * @param {DoUntilTestFunction} test - the condition that stops the repeats
     * @param {any} data - the data
     */
    static doUntil(operation: DoUntilOperationFunction, test: DoUntilTestFunction, data?: any): Promise<any>;
    /**
     * Mustache/handlebars style formatting ...
     * @param {string} content
     * @param {Object} tags
     */
    static format(content: string, tags: Object): any;
    /**
     * @class Utils
     * @ignore
     * @classdesc Class that implements a Utils.
     */
    constructor();
}
