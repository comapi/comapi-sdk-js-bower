import { ILogger, IComapiConfig, IContentData, INetworkManager, IUploadContentResult } from "./interfaces";
export declare class ContentManager {
    private _logger;
    private networkManager;
    private _comapiConfig;
    /**
     * ContentManager class constructor.
     * @class ContentManager
     * @ignore
     * @classdesc Class that implements all the ContentManager functionality.
     * @parameter {ILogger} logger
     * @parameter {IRestClient} restClient
     * @parameter {IComapiConfig} ComapiConfig
     */
    constructor(_logger: ILogger, networkManager: INetworkManager, _comapiConfig: IComapiConfig);
    /**
     * Method to upload content data
     * @method ContentManager#uploadContent
     * @param {string} folder - the folder
     * @param {ContentData} content - the content
     * @returns {IUploadContentResult} - the result
     */
    uploadContent(content: IContentData, folder?: string): Promise<IUploadContentResult>;
    /**
     * Method to create an auth header from a token
     * @method ContentManager#constructAUthHeader
     * @param {string} token
     * @returns {string} - returns the auth header
     */
    private constructAUthHeader(token);
}
