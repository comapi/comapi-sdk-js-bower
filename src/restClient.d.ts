import { ILogger, IRestClient, IRestClientResult } from "./interfaces";
export declare class RestClient implements IRestClient {
    protected logger?: ILogger;
    private _readyStates;
    /**
     * RestClient class constructor.
     * @class RestClient
     * @ignore
     * @classdesc Class that implements a RestClient.
     * @param {ILogger} [logger] - the logger
     */
    constructor(logger?: ILogger);
    /**
     * Method to make a GET request
     * @method RestClient#get
     * @param  {string} url
     * @param  {any} [headers]
     * @returns {Promise} - returns a promise
     */
    get(url: string, headers?: any): Promise<IRestClientResult>;
    /**
     * Method to make a POST request
     * @method RestClient#post
     * @param  {string} url
     * @param  {any} data
     * @param  {any} headers
     * @returns {Promise} - returns a promise
     */
    post(url: string, headers: any, data: any): Promise<IRestClientResult>;
    /**
     * Method to make a PUT request
     * @method RestClient#put
     * @param  {string} url
     * @param  {any} headers
     * @param  {any} data
     * @returns {Promise} - returns a promise
     */
    put(url: string, headers: any, data: any): Promise<IRestClientResult>;
    /**
     * Method to make a PATCH request
     * @method RestClient#patch
     * @param  {string} url
     * @param  {any} headers
     * @param  {any} data
     * @returns {Promise} - returns a promise
     */
    patch(url: string, headers: any, data: any): Promise<IRestClientResult>;
    /**
     * Method to make a DELETE request
     * @method RestClient#delete
     * @param  {string} url
     * @param  {any} headers
     * @returns {Promise} - returns a promise
     */
    delete(url: string, headers: any): Promise<IRestClientResult>;
    /**
     * @param  {XMLHttpRequest} request
     * @param  {any} headers
     */
    private addHeaders;
    /**
     *
     */
    private getResponseHeaders;
    /**
     *
     */
    private createCORSRequest;
    /**
     * @param  {string} method (GET,POST,PUT,DELETE)
     * @param  {string} url
     * @param  {any} [headers]
     * @param  {any} [data]
     * @returns {Promise} - returns a promise
     */
    private makeRequest;
}
