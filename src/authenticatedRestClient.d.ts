import { ILogger, IRestClient, IRestClientResult, INetworkManager } from "./interfaces";
export declare class AuthenticatedRestClient implements IRestClient {
    private logger;
    private restClient;
    private networkManager;
    private retryCount;
    constructor(logger: ILogger, restClient: IRestClient, networkManager: INetworkManager);
    get(url: string, headers?: any): Promise<IRestClientResult>;
    post(url: string, headers: any, data: any): Promise<IRestClientResult>;
    patch(url: string, headers: any, data: any): Promise<IRestClientResult>;
    put(url: string, headers: any, data: any): Promise<IRestClientResult>;
    delete(url: string, headers: any): Promise<IRestClientResult>;
    private makeRequestWithRetry(count, verb, url, headers?, data?);
    private constructAUthHeader(token);
}
