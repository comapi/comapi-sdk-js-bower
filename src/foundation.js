"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var interfaces_1 = require("./interfaces");
var indexedDBLogger_1 = require("./indexedDBLogger");
var messagePager_1 = require("./messagePager");
var conversationBuilder_1 = require("./conversationBuilder");
exports.ConversationBuilder = conversationBuilder_1.ConversationBuilder;
var messageBuilder_1 = require("./messageBuilder");
exports.MessageBuilder = messageBuilder_1.MessageBuilder;
var messageStatusBuilder_1 = require("./messageStatusBuilder");
exports.MessageStatusBuilder = messageStatusBuilder_1.MessageStatusBuilder;
var indexedDBOrphanedEventManager_1 = require("./indexedDBOrphanedEventManager");
var localStorageOrphanedEventManager_1 = require("./localStorageOrphanedEventManager");
var comapiConfig_1 = require("./comapiConfig");
exports.ComapiConfig = comapiConfig_1.ComapiConfig;
var appMessaging_1 = require("./appMessaging");
var profile_1 = require("./profile");
var services_1 = require("./services");
var device_1 = require("./device");
var channels_1 = require("./channels");
var urlConfig_1 = require("./urlConfig");
var interfaceManager_1 = require("./interfaceManager");
exports.InterfaceManager = interfaceManager_1.InterfaceManager;
var interfaceSymbols_1 = require("./interfaceSymbols");
exports.INTERFACE_SYMBOLS = interfaceSymbols_1.INTERFACE_SYMBOLS;
var inversify_config_1 = require("./inversify.config");
var Foundation = Foundation_1 = (function () {
    function Foundation(_eventManager, _logger, _localStorageData, _networkManager, _deviceManager, _facebookManager, _conversationManager, _profileManager, _messageManager, _comapiConfig) {
        this._eventManager = _eventManager;
        this._logger = _logger;
        this._networkManager = _networkManager;
        var dbSupported = "indexedDB" in window;
        var orphanedEventManager;
        if (dbSupported) {
            orphanedEventManager = new indexedDBOrphanedEventManager_1.IndexedDBOrphanedEventManager();
        }
        else {
            orphanedEventManager = new localStorageOrphanedEventManager_1.LocalStorageOrphanedEventManager(_localStorageData);
        }
        var messagePager = new messagePager_1.MessagePager(_logger, _localStorageData, _messageManager, orphanedEventManager);
        var appMessaging = new appMessaging_1.AppMessaging(this._networkManager, _conversationManager, _messageManager, messagePager);
        var profile = new profile_1.Profile(this._networkManager, _localStorageData, _profileManager);
        this._services = new services_1.Services(appMessaging, profile);
        this._device = new device_1.Device(this._networkManager, _deviceManager);
        this._channels = new channels_1.Channels(this._networkManager, _facebookManager);
    }
    Foundation.initialiseShared = function (comapiConfig) {
        return Foundation_1._initialise(comapiConfig, true);
    };
    Foundation.initialise = function (comapiConfig) {
        return Foundation_1._initialise(comapiConfig, false);
    };
    Object.defineProperty(Foundation, "version", {
        get: function () {
            return "1.0.2.117";
        },
        enumerable: true,
        configurable: true
    });
    Foundation._initialise = function (comapiConfig, doSingleton) {
        if (inversify_config_1.container.isBound(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)) {
            inversify_config_1.container.unbind(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig);
        }
        inversify_config_1.container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig).toDynamicValue(function (context) {
            return comapiConfig;
        });
        if (doSingleton && Foundation_1._foundation) {
            return Promise.resolve(Foundation_1._foundation);
        }
        if (comapiConfig.foundationRestUrls === undefined) {
            comapiConfig.foundationRestUrls = new urlConfig_1.FoundationRestUrls();
        }
        if (comapiConfig.logPersistence &&
            comapiConfig.logPersistence === interfaces_1.LogPersistences.IndexedDB) {
            var indexedDBLogger_2 = new indexedDBLogger_1.IndexedDBLogger();
            return indexedDBLogger_2.openDatabase()
                .then(function () {
                var retentionHours = comapiConfig.logRetentionHours === undefined ? 24 : comapiConfig.logRetentionHours;
                var purgeDate = new Date((new Date()).valueOf() - 1000 * 60 * 60 * retentionHours);
                return indexedDBLogger_2.purge(purgeDate);
            })
                .then(function () {
                var foundation = foundationFactory(comapiConfig, indexedDBLogger_2);
                if (doSingleton) {
                    Foundation_1._foundation = foundation;
                }
                return Promise.resolve(foundation);
            });
        }
        else {
            var foundation = foundationFactory(comapiConfig);
            if (doSingleton) {
                Foundation_1._foundation = foundation;
            }
            return Promise.resolve(foundation);
        }
        function foundationFactory(config, indexedDBLogger) {
            var eventManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager);
            var localStorageData = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData);
            var logger = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger);
            if (config.logLevel) {
                logger.logLevel = config.logLevel;
            }
            var networkManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager);
            var deviceManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager);
            var facebookManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager);
            var conversationManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager);
            var profileManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager);
            var messageManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager);
            var foundation = new Foundation_1(eventManager, logger, localStorageData, networkManager, deviceManager, facebookManager, conversationManager, profileManager, messageManager, config);
            return foundation;
        }
    };
    Foundation.prototype.startSession = function () {
        return this._networkManager.startSession()
            .then(function (sessionInfo) {
            return sessionInfo.session;
        });
    };
    Foundation.prototype.endSession = function () {
        return this._networkManager.endSession();
    };
    Object.defineProperty(Foundation.prototype, "services", {
        get: function () {
            return this._services;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "device", {
        get: function () {
            return this._device;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "channels", {
        get: function () {
            return this._channels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "session", {
        get: function () {
            return this._networkManager.session;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "logger", {
        get: function () {
            return this._logger;
        },
        enumerable: true,
        configurable: true
    });
    Foundation.prototype.on = function (eventType, handler) {
        this._eventManager.subscribeToLocalEvent(eventType, handler);
    };
    Foundation.prototype.off = function (eventType, handler) {
        this._eventManager.unsubscribeFromLocalEvent(eventType, handler);
    };
    Foundation.prototype.getLogs = function () {
        return this._logger.getLog();
    };
    return Foundation;
}());
Foundation = Foundation_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager)),
    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager)),
    __param(5, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager)),
    __param(6, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager)),
    __param(7, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager)),
    __param(8, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager)),
    __param(9, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], Foundation);
exports.Foundation = Foundation;
var Foundation_1;
//# sourceMappingURL=foundation.js.map