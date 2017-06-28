"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var eventManager_1 = require("./eventManager");
var localStorageData_1 = require("./localStorageData");
var logger_1 = require("./logger");
var restClient_1 = require("./restClient");
var authenticatedRestClient_1 = require("./authenticatedRestClient");
var sessionManager_1 = require("./sessionManager");
var webSocketManager_1 = require("./webSocketManager");
var networkManager_1 = require("./networkManager");
var deviceManager_1 = require("./deviceManager");
var facebookManager_1 = require("./facebookManager");
var conversationManager_1 = require("./conversationManager");
var profileManager_1 = require("./profileManager");
var messageManager_1 = require("./messageManager");
var indexedDBOrphanedEventManager_1 = require("./indexedDBOrphanedEventManager");
var localStorageOrphanedEventManager_1 = require("./localStorageOrphanedEventManager");
var messagePager_1 = require("./messagePager");
var appMessaging_1 = require("./appMessaging");
var profile_1 = require("./profile");
var services_1 = require("./services");
var device_1 = require("./device");
var channels_1 = require("./channels");
var indexedDBLogger_1 = require("./indexedDBLogger");
var interfaceSymbols_1 = require("./interfaceSymbols");
var container = new inversify_1.Container();
exports.container = container;
function initInterfaces() {
    "use strict";
    container.unbindAll();
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager).to(eventManager_1.EventManager).inSingletonScope();
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData).to(localStorageData_1.LocalStorageData);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger).to(logger_1.Logger);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient).to(restClient_1.RestClient);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager).to(sessionManager_1.SessionManager).inSingletonScope();
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.WebSocketManager).to(webSocketManager_1.WebSocketManager);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager).to(networkManager_1.NetworkManager);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient).to(authenticatedRestClient_1.AuthenticatedRestClient);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager).to(deviceManager_1.DeviceManager);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager).to(facebookManager_1.FacebookManager);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager).to(conversationManager_1.ConversationManager);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager).to(profileManager_1.ProfileManager);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.MessagePager).to(messagePager_1.MessagePager);
    var dbSupported = "indexedDB" in window;
    if (dbSupported) {
        container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager).to(indexedDBOrphanedEventManager_1.IndexedDBOrphanedEventManager);
    }
    else {
        container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager).to(localStorageOrphanedEventManager_1.LocalStorageOrphanedEventManager);
    }
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager).to(messageManager_1.MessageManager);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.AppMessaging).to(appMessaging_1.AppMessaging);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Profile).to(profile_1.Profile);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Services).to(services_1.Services);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Device).to(device_1.Device);
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Channels).to(channels_1.Channels);
}
exports.initInterfaces = initInterfaces;
initInterfaces();
function bindIndexedDBLogger() {
    "use strict";
    if (container.isBound(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger)) {
        container.rebind(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger).to(indexedDBLogger_1.IndexedDBLogger);
    }
    else {
        container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger).to(indexedDBLogger_1.IndexedDBLogger);
    }
}
exports.bindIndexedDBLogger = bindIndexedDBLogger;
function unbindIndexedDBLogger() {
    "use strict";
    if (container.isBound(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger)) {
        container.unbind(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger);
    }
}
exports.unbindIndexedDBLogger = unbindIndexedDBLogger;
function bindComapiConfig(comapiConfig) {
    "use strict";
    if (container.isBound(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)) {
        container.unbind(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig);
    }
    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig).toDynamicValue(function (context) {
        return comapiConfig;
    });
}
exports.bindComapiConfig = bindComapiConfig;
//# sourceMappingURL=inversify.config.js.map