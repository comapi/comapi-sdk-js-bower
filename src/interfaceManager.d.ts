import { IComapiConfig, IEventManager, ILocalStorageData, ILogger, IRestClient, ISessionManager, IEventMapper, IWebSocketManager, INetworkManager, IDeviceManager, IFacebookManager, IConversationManager, IProfileManager, IMessageManager, IMessagePager, IAppMessaging, IProfile, IDevice, IChannels } from "./interfaces";
export declare class InterfaceManager {
    private static interfaces;
    static bindIndexedDBLogger(): void;
    static unbindIndexedDBLogger(): void;
    static bindComapiConfig(omapiConfig: IComapiConfig): void;
    private static getInterface(serviceIdentifier);
    private static setInterface(serviceIdentifier, instance);
    static IEventManager: IEventManager;
    static ILocalStorageData: ILocalStorageData;
    static ILogger: ILogger;
    static IRestClient: IRestClient;
    static ISessionManager: ISessionManager;
    static IEventMapper: IEventMapper;
    static IWebSocketManager: IWebSocketManager;
    static INetworkManager: INetworkManager;
    static AuthenticatedRestClient: IRestClient;
    static IDeviceManager: IDeviceManager;
    static IFacebookManager: IFacebookManager;
    static IConversationManager: IConversationManager;
    static IProfileManager: IProfileManager;
    static IMessageManager: IMessageManager;
    static IMessagePager: IMessagePager;
    static IAppMessaging: IAppMessaging;
    static IProfile: IProfile;
    static IDevice: IDevice;
    static IChannels: IChannels;
}
