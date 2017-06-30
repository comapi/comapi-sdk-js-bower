import { IEventMapper, IWebSocketManager, ISessionManager, IEventManager, ILogger, ILocalStorageData, IComapiConfig } from "./interfaces";
export declare class WebSocketManager implements IWebSocketManager {
    private _logger;
    private _localStorageData;
    private _comapiConfig;
    private _sessionManager;
    private _eventManager;
    private _eventMapper;
    private readystates;
    private webSocket;
    private manuallyClosed;
    private connected;
    private didConnect;
    private attempts;
    private echoIntervalId;
    private echoIntervalTimeout;
    constructor(_logger: ILogger, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig, _sessionManager: ISessionManager, _eventManager: IEventManager, _eventMapper: IEventMapper);
    connect(): Promise<boolean>;
    send(data: any): void;
    isConnected(): boolean;
    hasSocket(): boolean;
    disconnect(): Promise<boolean>;
    generateInterval(k: number): number;
    private echo();
    private mapEventName(name);
    private publishWebsocketEvent(event);
}
