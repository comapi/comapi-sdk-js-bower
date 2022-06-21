import { ISessionManager, IWebSocketManager, ISessionInfo, ISession, ILogger, INetworkManager } from "./interfaces";
export declare class NetworkManager implements INetworkManager {
    private _logger;
    private _sessionManager;
    private _webSocketManager;
    /**
     * NetworkManager class constructor.
     * @class NetworkManager
     * @ignore
     * @classdesc Class that implements Session And Socket Resolution.
     * @parameter {ISessionManager} _sessionManager
     * @parameter {IWebSocketManager} _webSocketManager
     */
    constructor(_logger: ILogger, _sessionManager: ISessionManager, _webSocketManager: IWebSocketManager);
    /**
     * Method to start a new authenticated session AND connect up the websocket
     * @method Foundation#startSession
     * @returns {Promise} - Returns a promise
     */
    startSession(): Promise<ISessionInfo>;
    /**
     * Method to restart an expired authenticated session
     * @method Foundation#restartSession
     * @returns {Promise} - Returns a promise
     */
    restartSession(): Promise<ISessionInfo>;
    /**
     * Method to get current session
     * @method Foundation#session
     * @returns {ISession} - Returns an ISession interface
     */
    get session(): ISession;
    /**
     * Method to end an existing authenticated session
     * @method Foundation#endSession
     * @returns {Promise} - Returns a promise
     */
    endSession(): Promise<boolean>;
    getValidToken(): Promise<string>;
    /**
     * Create a session if we don't have one already ...
     * @method NetworkManager#ensureSession
     * @returns {Promise} - returns a Promise
     */
    ensureSession(): Promise<ISessionInfo>;
    setWebsocketEnabled(enable: boolean): Promise<boolean>;
}
