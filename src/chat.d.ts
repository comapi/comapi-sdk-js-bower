import { IComapiConfig, INetworkManager, IRestClient } from "@comapi/sdk-js-foundation";
export interface ITeamAssignInfo {
    agentId: string;
    teamId: string;
}
export declare class ChatAdmin {
    private _comapiConfig;
    private _restClient;
    private _networkManager;
    constructor(_comapiConfig: IComapiConfig, _restClient: IRestClient, _networkManager: INetworkManager);
    assign(chatId: string, assignInfo: ITeamAssignInfo): Promise<boolean>;
}
