import { ILogger, IRestClient, IRestClientResult, INetworkManager } from "./interfaces";
import { RestClient } from "./restClient";
export declare class AuthenticatedRestClient extends RestClient implements IRestClient {
    /**
     * AuthenticatedRestClient class constructor.
     * @class AuthenticatedRestClient
     * @ignore
     * @classdesc Class that implements an Authenticated RestClient.
     * @param {ILogger} logger - the logger
     * @param {INetworkManager} networkManager - the Network Manager
     */
    constructor(logger: ILogger, networkManager: INetworkManager);
    /**
     * Method to make a GET request
     * @method AuthenticatedRestClient#get
     * @param  {string} url
     * @param  {any} [headers]
     * @returns {Promise} - returns a promise
     */
    get(url: string, headers?: any): Promise<IRestClientResult>;
    /**
     * Method to make a POST request
     * @method AuthenticatedRestClient#post
     * @param  {string} url
     * @param  {any} data
     * @param  {any} headers
     * @returns {Promise} - returns a promise
     */
    post(url: string, headers: any, data: any): Promise<IRestClientResult>;
    /**
     * Method to make a PATCH request
     * @method AuthenticatedRestClient#patch
     * @param  {string} url
     * @param  {any} data
     * @param  {any} headers
     * @returns {Promise} - returns a promise
     */
    patch(url: string, headers: any, data: any): Promise<IRestClientResult>;
    /**
     * Method to make a PUT request
     * @method AuthenticatedRestClient#put
     * @param  {string} url
     * @param  {any} headers
     * @param  {any} data
     * @returns {Promise} - returns a promise
     */
    put(url: string, headers: any, data: any): Promise<IRestClientResult>;
    /**
     * Method to make a DELETE request
     * @method AuthenticatedRestClient#delete
     * @param  {string} url
     * @param  {any} headers
     * @returns {Promise} - returns a promise
     */
    delete(url: string, headers: any): Promise<IRestClientResult>;
    /**
     * Method to create an auth header from a token
     * @method AuthenticatedRestClient#constructAUthHeader
     * @param {string} token
     * @returns {string} - returns the auth header
     */
    private constructAUthHeader(token);
}
