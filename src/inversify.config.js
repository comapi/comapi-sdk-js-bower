"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var interfaces_1 = require("./interfaces");
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
var eventMapper_1 = require("./eventMapper");
var contentManager_1 = require("./contentManager");
var interfaceSymbols_1 = require("./interfaceSymbols");
var InterfaceContainer = (function () {
    function InterfaceContainer() {
        this._overriddenInterfaces = {};
        this._container = new inversify_1.Container();
    }
    InterfaceContainer.prototype.initialise = function (comapiConfig) {
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager).to(eventManager_1.EventManager).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData).to(localStorageData_1.LocalStorageData).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger).to(logger_1.Logger).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient).to(restClient_1.RestClient).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager).to(sessionManager_1.SessionManager).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.EventMapper).to(eventMapper_1.EventMapper).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.WebSocketManager).to(webSocketManager_1.WebSocketManager).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager).to(networkManager_1.NetworkManager).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient).to(authenticatedRestClient_1.AuthenticatedRestClient).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager).to(deviceManager_1.DeviceManager).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager).to(facebookManager_1.FacebookManager).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager).to(conversationManager_1.ConversationManager).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager).to(profileManager_1.ProfileManager).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.MessagePager).to(messagePager_1.MessagePager).inSingletonScope();
        var dbSupported = "indexedDB" in window;
        if (comapiConfig && comapiConfig.orphanedEventPersistence) {
            if (comapiConfig.orphanedEventPersistence === interfaces_1.OrphanedEventPersistences.LocalStorage) {
                this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager).to(localStorageOrphanedEventManager_1.LocalStorageOrphanedEventManager).inSingletonScope();
            }
            else if (comapiConfig.orphanedEventPersistence === interfaces_1.OrphanedEventPersistences.IndexedDbIfSupported) {
                if (dbSupported) {
                    this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager).to(indexedDBOrphanedEventManager_1.IndexedDBOrphanedEventManager).inSingletonScope();
                }
                else {
                    this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager).to(localStorageOrphanedEventManager_1.LocalStorageOrphanedEventManager).inSingletonScope();
                }
            }
        }
        else {
            if (dbSupported) {
                this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager).to(indexedDBOrphanedEventManager_1.IndexedDBOrphanedEventManager).inSingletonScope();
            }
            else {
                this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager).to(localStorageOrphanedEventManager_1.LocalStorageOrphanedEventManager).inSingletonScope();
            }
        }
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager).to(messageManager_1.MessageManager).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.AppMessaging).to(appMessaging_1.AppMessaging).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Profile).to(profile_1.Profile).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Services).to(services_1.Services).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Device).to(device_1.Device).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Channels).to(channels_1.Channels).inSingletonScope();
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ContentManager).to(contentManager_1.ContentManager).inSingletonScope();
    };
    InterfaceContainer.prototype.uninitialise = function () {
        this._container.unbindAll();
    };
    InterfaceContainer.prototype.bindIndexedDBLogger = function () {
        if (this._container.isBound(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger)) {
            this._container.rebind(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger).to(indexedDBLogger_1.IndexedDBLogger).inSingletonScope();
        }
        else {
            this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger).to(indexedDBLogger_1.IndexedDBLogger).inSingletonScope();
        }
    };
    InterfaceContainer.prototype.unbindIndexedDBLogger = function () {
        if (this._container.isBound(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger)) {
            this._container.unbind(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger);
        }
    };
    InterfaceContainer.prototype.bindComapiConfig = function (comapiConfig) {
        var _comapiConfig = comapiConfig;
        if (this._container.isBound(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)) {
            this._container.unbind(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig);
        }
        else {
        }
        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig).toDynamicValue(function (context) {
            return _comapiConfig;
        });
    };
    InterfaceContainer.prototype.getInterface = function (serviceIdentifier) {
        return this._container.get(serviceIdentifier);
    };
    InterfaceContainer.prototype.setInterface = function (serviceIdentifier, instance) {
        var _this = this;
        if (this._container.isBound(serviceIdentifier)) {
            this._container.unbind(serviceIdentifier);
        }
        this._overriddenInterfaces[serviceIdentifier.toString()] = instance;
        this._container.bind(serviceIdentifier).toDynamicValue(function (context) {
            return _this._overriddenInterfaces[serviceIdentifier.toString()];
        });
    };
    return InterfaceContainer;
}());
exports.InterfaceContainer = InterfaceContainer;
//# sourceMappingURL=inversify.config.js.map