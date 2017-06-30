"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_config_1 = require("./inversify.config");
var interfaceSymbols_1 = require("./interfaceSymbols");
var InterfaceManager = (function () {
    function InterfaceManager() {
    }
    InterfaceManager.bindIndexedDBLogger = function () {
        inversify_config_1.bindIndexedDBLogger();
    };
    InterfaceManager.unbindIndexedDBLogger = function () {
        inversify_config_1.unbindIndexedDBLogger();
    };
    InterfaceManager.bindComapiConfig = function (omapiConfig) {
        inversify_config_1.bindComapiConfig(omapiConfig);
    };
    InterfaceManager.getInterface = function (serviceIdentifier) {
        return inversify_config_1.container.get(serviceIdentifier);
    };
    InterfaceManager.setInterface = function (serviceIdentifier, instance) {
        if (inversify_config_1.container.isBound(serviceIdentifier)) {
            inversify_config_1.container.unbind(serviceIdentifier);
        }
        InterfaceManager.interfaces[serviceIdentifier.toString()] = instance;
        inversify_config_1.container.bind(serviceIdentifier).toDynamicValue(function (context) {
            return InterfaceManager.interfaces[serviceIdentifier.toString()];
        });
    };
    Object.defineProperty(InterfaceManager, "IEventManager", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager);
        },
        set: function (eventManager) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager, eventManager);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "ILocalStorageData", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData);
        },
        set: function (localStorageData) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData, localStorageData);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "ILogger", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger);
        },
        set: function (logger) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger, logger);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IRestClient", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient);
        },
        set: function (restClient) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient, restClient);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "ISessionManager", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager);
        },
        set: function (sessionManager) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager, sessionManager);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IEventMapper", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.EventMapper);
        },
        set: function (eventMapper) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.EventMapper, eventMapper);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IWebSocketManager", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.WebSocketManager);
        },
        set: function (webSocketManager) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.WebSocketManager, webSocketManager);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "INetworkManager", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager);
        },
        set: function (networkManager) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager, networkManager);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "AuthenticatedRestClient", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient);
        },
        set: function (authenticatedRestClient) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient, authenticatedRestClient);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IDeviceManager", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager);
        },
        set: function (deviceManager) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager, deviceManager);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IFacebookManager", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager);
        },
        set: function (facebookManager) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager, facebookManager);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IConversationManager", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager);
        },
        set: function (facebookManager) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager, facebookManager);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IProfileManager", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager);
        },
        set: function (profileManager) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager, profileManager);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IMessageManager", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager);
        },
        set: function (messageManager) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager, messageManager);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IMessagePager", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.MessagePager);
        },
        set: function (messagePager) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.MessagePager, messagePager);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IAppMessaging", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.AppMessaging);
        },
        set: function (appMessaging) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.AppMessaging, appMessaging);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IProfile", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Profile);
        },
        set: function (profile) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Profile, profile);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IDevice", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Device);
        },
        set: function (device) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Device, device);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterfaceManager, "IChannels", {
        get: function () {
            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Channels);
        },
        set: function (channels) {
            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Channels, channels);
        },
        enumerable: true,
        configurable: true
    });
    return InterfaceManager;
}());
InterfaceManager.interfaces = {};
exports.InterfaceManager = InterfaceManager;
//# sourceMappingURL=interfaceManager.js.map