import { ILogger, IRestClient, IRestClientResult, INetworkManager } from "./interfaces";
export declare class RestClient implements IRestClient {
    protected logger: ILogger;
    protected networkManager: INetworkManager;
    private _readyStates;
    constructor(logger?: ILogger);
    get(url: string, headers?: any): Promise<IRestClientResult>;
    post(url: string, headers: any, data: any): Promise<IRestClientResult>;
    put(url: string, headers: any, data: any): Promise<IRestClientResult>;
    patch(url: string, headers: any, data: any): Promise<IRestClientResult>;
    delete(url: string, headers: any): Promise<IRestClientResult>;
    private addHeaders(request, headers);
    private getResponseHeaders(xhr);
    private createCORSRequest(method, url);
    private makeRequest(method, url, headers?, data?);
}
