import { IWebSocketManager, ISessionManager, IEventManager, ILogger, ILocalStorageData, IComapiConfig } from "./interfaces";
export declare class WebSocketManager implements IWebSocketManager {
    private _logger;
    private _localStorageData;
    private _comapiConfig;
    private _sessionManager;
    private _eventManager;
    private readystates;
    private webSocket;
    private manuallyClosed;
    private connected;
    private didConnect;
    private attempts;
    private echoIntervalId;
    private echoIntervalTimeout;
    /**
     * WebSocketManager class constructor.
     * @class  WebSocketManager
     * @ignore
     * @classdesc Class that implements WebSocketManager
     * @param {ILogger} _logger
     * @param {ILocalStorageData} _localStorageData
     * @param {IComapiConfig} _comapiConfig
     * @param {ISessionManager} _sessionManager
     * @param {IEventManager} _eventManager
     */
    constructor(_logger: ILogger, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig, _sessionManager: ISessionManager, _eventManager: IEventManager);
    /**
     * Function to connect websocket
     * @method WebSocketManager#connect
     * @returns {Promise}
     */
    connect(): Promise<boolean>;
    /**
     * Function to send some data from the client down the websocket
     * @method WebSocketManager#send
     * @param {any} data -  the data to send
     * @returns {Promise}
     */
    send(data: any): void;
    /**
     * Function to determine te connection state of the websocket - rturns hether ther socket `did` connect rather than the current status as there is reconnection logic running.
     * @method WebSocketManager#isConnected
     * @returns {boolean}
     */
    isConnected(): boolean;
    /**
     * Function to determine te whether there is an ative socket or not (connected or disconnected)
     * @method WebSocketManager#hasSocket
     * @returns {boolean}
     */
    hasSocket(): boolean;
    /**
     * Function to disconnect websocket
     * @method WebSocketManager#disconnect
     * @returns {Promise}
     */
    disconnect(): Promise<boolean>;
    /**
     * Function to generate an interval for reconnecton purposes
     * @method WebSocketManager#generateInterval
     * @param {number} k
     * @returns {Promise}
     */
    generateInterval(k: number): number;
    /**
     *
     */
    private echo();
    /**
     * Map internal event structure to a defined interface ...
     */
    private publishWebsocketEvent(event);
}
