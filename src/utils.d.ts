import { IBrowserInfo, DoUntilOperationFunction, DoUntilTestFunction } from "./interfaces";
export declare class Utils {
    /**
     * Static method to clone an object
     * @method Utils#clone
     * @param {any} obj - the object to clone
     * @returns {any} - returns a clone of the object
     */
    static clone(obj: any): any;
    /**
     * Static method to generate a uuid (simulated)
     * @method Utils#uuid
     * @returns {string} - returns a uuid
     */
    static uuid(): string;
    /**
     * Static method to get current browser info
     * @method Utils#getBrowserInfo
     * @param {string} [userAgent] - user agent string (optional - for unit tsting)
     * @returns {IBrowserInfo} - returns an IBrowserInfo interface
     */
    static getBrowserInfo(userAgent?: string): IBrowserInfo;
    /**
     * Static method to call some async function on an array of data and you want them called sequentially
     * @method Utils#eachSeries
     * @param {any[]} arr
     * @param {Function} iteratorFn
     * @returns {Promise} - returns a Promise
     */
    static eachSeries(arr: any[], iteratorFn: Function): Promise<any>;
    /**
     * Static method to encapsulate repeatdly calling an async method until a condition is met (tyoes defined at top)
     * @method Utils#doUntil
     * @param {DoUntilOperationFunction} operation - the operation to perform
     * @param {DoUntilTestFunction} test - the condition that stops the repeats
     * @param {any} data - the data
     */
    static doUntil(operation: DoUntilOperationFunction, test: DoUntilTestFunction, data?: any): Promise<any>;
    /**
     * Static method to provide Mustache/handlebars style formatting ...
     * @method Utils#format
     * @param {string} content
     * @param {Object} tags
     */
    static format(content: string, tags: Object): any;
    /**
     * Static method to het a header value from a headers collection in a case insensitive fashion
     * @method Utils#getHeaderValue
     * @param headers Helper function to deal with potential case issues accessing http headers collection
     * @param key
     */
    static getHeaderValue(headers: Object, key: string): any;
    /**
     * https://davidwalsh.name/javascript-debounce-function
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * N milliseconds. If `immediate` is passed, trigger the function on the
     * leading edge, instead of the trailing.
     */
    static debounce(func: Function, wait: number, immediate?: boolean): Function;
    /**
     * Utils class constructor.
     * @class Utils
     * @classdesc Class that implements a Utils.
     */
    constructor();
}
