import { ILogger, IComapiConfig, IContentData, INetworkManager, IUploadContentResult } from "./interfaces";
export declare class ContentManager {
    private _logger;
    private networkManager;
    private _comapiConfig;
    constructor(_logger: ILogger, networkManager: INetworkManager, _comapiConfig: IComapiConfig);
    uploadContent(content: IContentData, folder?: string): Promise<IUploadContentResult>;
    private constructAUthHeader(token);
}
