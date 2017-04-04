import { ISessionManager, IWebSocketManager, ISessionInfo } from "./interfaces";
export declare class SessionAndSocketResolver {
    private _sessionManager;
    private _webSocketManager;
    /**
     * SessionAndSocketResolver class constructor.
     * @class SessionAndSocketResolver
     * @ignore
     * @classdesc Class that implements Session And Socket Resolution.
     * @parameter {ISessionManager} _sessionManager
     * @parameter {IWebSocketManager} _webSocketManager
     */
    constructor(_sessionManager: ISessionManager, _webSocketManager: IWebSocketManager);
    /**
     * Ensure we have an active session and the websocket has been started
     * Socket may have disconected and be reconnecting. We just want to know that it was started
     * @method SessionAndSocketResolver#ensureSessionAndSocket
     * @returns {Promise} - returns a Promise
     */
    ensureSessionAndSocket(): Promise<ISessionInfo>;
    /**
     * Create a session if we don't have one already ...
     * @method SessionAndSocketResolver#ensureSession
     * @returns {Promise} - returns a Promise
     */
    private ensureSession();
    /**
     * Ensure the web socket has been started
     * @method SessionAndSocketResolver#ensureSocket
     * @returns {Promise} - returns a Promise
     */
    private ensureSocket();
}
