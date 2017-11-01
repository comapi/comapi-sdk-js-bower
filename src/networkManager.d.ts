import { ISessionManager, IWebSocketManager, ISessionInfo, ISession, INetworkManager } from "./interfaces";
export declare class NetworkManager implements INetworkManager {
    private _sessionManager;
    private _webSocketManager;
    private _mutex;
    constructor(_sessionManager: ISessionManager, _webSocketManager: IWebSocketManager);
    startSession(): Promise<ISessionInfo>;
    restartSession(): Promise<ISessionInfo>;
    readonly session: ISession;
    endSession(): Promise<boolean>;
    getValidToken(): Promise<string>;
    ensureSessionAndSocket(): Promise<ISessionInfo>;
    private ensureSession();
    private ensureSocket();
}
