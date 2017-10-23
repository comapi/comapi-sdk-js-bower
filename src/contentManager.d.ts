import { ILogger, IComapiConfig, IContentData, INetworkManager } from "./interfaces";
export declare class ContentManager {
    private _logger;
    private networkManager;
    private _comapiConfig;
    constructor(_logger: ILogger, networkManager: INetworkManager, _comapiConfig: IComapiConfig);
    uploadContent(content: IContentData, folder?: string): Promise<string>;
    private constructAUthHeader(token);
}
