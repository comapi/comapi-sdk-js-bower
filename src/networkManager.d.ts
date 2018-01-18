import { ISessionManager, IWebSocketManager, ISessionInfo, ISession, INetworkManager } from "./interfaces";
export declare class NetworkManager implements INetworkManager {
    private _sessionManager;
    private _webSocketManager;
    private _mutex;
    /**
     * NetworkManager class constructor.
     * @class NetworkManager
     * @ignore
     * @classdesc Class that implements Session And Socket Resolution.
     * @parameter {ISessionManager} _sessionManager
     * @parameter {IWebSocketManager} _webSocketManager
     */
    constructor(_sessionManager: ISessionManager, _webSocketManager: IWebSocketManager);
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
    readonly session: ISession;
    /**
     * Method to end an existing authenticated session
     * @method Foundation#endSession
     * @returns {Promise} - Returns a promise
     */
    endSession(): Promise<boolean>;
    getValidToken(): Promise<string>;
    /**
     * Ensure we have an active session and the websocket has been started
     * Socket may have disconected and be reconnecting. We just want to know that it was started
     * @method NetworkManager#ensureSessionAndSocket
     * @returns {Promise} - returns a Promise
     */
    ensureSessionAndSocket(): Promise<ISessionInfo>;
    /**
     * Create a session if we don't have one already ...
     * @method NetworkManager#ensureSession
     * @returns {Promise} - returns a Promise
     */
    private ensureSession();
    /**
     * Ensure the web socket has been started
     * @method NetworkManager#ensureSocket
     * @returns {Promise} - returns a Promise
     */
    private ensureSocket();
}
