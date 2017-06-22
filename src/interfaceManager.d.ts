import { IEventManager, ILocalStorageData, ILogger, IRestClient, ISessionManager, IWebSocketManager, INetworkManager, IDeviceManager, IFacebookManager, IConversationManager, IProfileManager, IMessageManager } from "./interfaces";
export declare class InterfaceManager {
    private static interfaces;
    private static getInterface(serviceIdentifier);
    private static setInterface(serviceIdentifier, instance);
    static IEventManager: IEventManager;
    static ILocalStorageData: ILocalStorageData;
    static ILogger: ILogger;
    static IRestClient: IRestClient;
    static ISessionManager: ISessionManager;
    static IWebSocketManager: IWebSocketManager;
    static INetworkManager: INetworkManager;
    static AuthenticatedRestClient: IRestClient;
    static IDeviceManager: IDeviceManager;
    static IFacebookManager: IFacebookManager;
    static IConversationManager: IConversationManager;
    static IProfileManager: IProfileManager;
    static IMessageManager: IMessageManager;
}
