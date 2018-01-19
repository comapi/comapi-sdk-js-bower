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
    private echoIntervalId;
    private echoIntervalTimeout;
    private STATE;
    private _opening;
    private _closing;
    private manuallyClosed;
    private didConnect;
    private attempts;
    /**
     * Is WebSocket connection in opening state.
     *
     * @returns {Boolean}
     */
    readonly isOpening: boolean;
    /**
     * Is WebSocket connection opened.
     *
     * @returns {Boolean}
     */
    readonly isOpened: boolean;
    /**
     * Is WebSocket connection in closing state.
     *
     * @returns {Boolean}
     */
    readonly isClosing: boolean;
    /**
     * Is WebSocket connection closed.
     *
     * @returns {Boolean}
     */
    readonly isClosed: boolean;
    /**
     * Function to determine te connection state of the websocket - rturns hether ther socket `did` connect rather than the current status as there is reconnection logic running.
     * @method WebSocketManager#isConnected
     * @returns {boolean}
     */
    isConnected(): boolean;
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
    constructor(_logger: ILogger, _localStorageData: ILocalStorageData, _comapiConfig: IComapiConfig, _sessionManager: ISessionManager, _eventManager: IEventManager, _eventMapper: IEventMapper);
    /**
     * Function to connect websocket
     * @method WebSocketManager#connect
     */
    connect(): Promise<boolean>;
    /**
     * Function to disconnect websocket
     * @method WebSocketManager#disconnect
     * @returns {Promise}
     */
    disconnect(): Promise<boolean>;
    /**
     * Function to send some data from the client down the websocket
     * @method WebSocketManager#send
     * @param {any} data -  the data to send
     * @returns {Promise}
     */
    send(data: any): void;
    /**
     * Function to determine te whether there is an ative socket or not (connected or disconnected)
     * @method WebSocketManager#hasSocket
     * @returns {boolean}
     */
    hasSocket(): boolean;
    /**
     * Function to generate an interval for reconnecton purposes
     * @method WebSocketManager#generateInterval
     * @param {number} k
     * @returns {Promise}
     */
    generateInterval(k: number): number;
    /**
     *
     * @param event
     */
    private _handleOpen(event);
    /**
     *
     * @param event
     */
    private _handleMessage(event);
    /**
     *
     * @param event
     */
    private _handleError(event);
    /**
     *
     * @param event
     */
    private _handleClose(event);
    /**
     *
     */
    private echo();
    /**
     *
     * @param name
     */
    private mapEventName(name);
    /**
     * Map internal event structure to a defined interface ...
     */
    private publishWebsocketEvent(event);
}
