import { IEventManager, ILogger, ILocalStorageData, ISessionManager, ISession, IDeviceManager, IFacebookManager, IConversationManager, IProfileManager, IMessageManager, IComapiConfig, IWebSocketManager } from "./interfaces";
import { ConversationBuilder } from "./conversationBuilder";
import { MessageBuilder } from "./messageBuilder";
import { MessageStatusBuilder } from "./messageStatusBuilder";
import { ComapiConfig } from "./comapiConfig";
import { Services } from "./services";
import { Device } from "./device";
import { Channels } from "./channels";
export { ComapiConfig, MessageStatusBuilder, ConversationBuilder, MessageBuilder };
export declare class Foundation {
    private _eventManager;
    private _logger;
    private _sessionManager;
    private _webSocketManager;
    private _comapiConfig;
    /**
     * Singleton Foundation instance
     */
    private static _foundtion;
    /**
     * @name Foundation#_services
     * @private
     * @type {Services}
     */
    private _services;
    /**
     * @name Foundation#_device
     * @private
     * @type {Device}
     */
    private _device;
    /**
     * @name Foundation#_channels
     * @private
     * @type {Channels}
     */
    private _channels;
    /**
     * Factory method to create a singleton instance of Foundation
     * @method Foundation#initialise
     * @param {IComapiConfig} comapiConfig - the app config (use `ComapiConfig` to create)
     * @returns {Promise} - returns promise
     */
    static initialise(comapiConfig: IComapiConfig): Promise<Foundation>;
    /**
     * Property to get the SDK version
     * @method Foundation#version
     */
    static version: string;
    /**
     * Foundation class constructor.
     * @class Foundation
     * @classdesc Class that implements Comapi foundation functionality.
     */
    constructor(_eventManager: IEventManager, _logger: ILogger, _localStorageData: ILocalStorageData, _sessionManager: ISessionManager, _deviceManager: IDeviceManager, _facebookManager: IFacebookManager, _conversationManager: IConversationManager, _profileManager: IProfileManager, _messageManager: IMessageManager, _webSocketManager: IWebSocketManager, _comapiConfig: IComapiConfig);
    /**
     * Method to start a new authenticated session
     * @method Foundation#startSession
     * @returns {Promise} - Returns a promise
     */
    startSession(): Promise<ISession>;
    /**
     * Method to end an existing authenticated session
     * @method Foundation#endSession
     * @returns {Promise} - Returns a promise
     */
    endSession(): Promise<boolean>;
    /**
     * Method to get Services interface
     * @method Foundation#services
     * @returns {Services} - Returns Services
     */
    services: Services;
    /**
     * Method to get Device interface
     * @method Foundation#device
     * @returns {Device} - Returns Device
     */
    device: Device;
    /**
     * Method to get Channels interface
     * @method Foundation#channels
     * @returns {Channels} - Returns Channels
     */
    channels: Channels;
    /**
     * Method to get current session
     * @method Foundation#session
     * @returns {ISession} - Returns an ISession interface
     */
    session: ISession;
    /**
     * Subscribes the caller to a comapi event.
     * @method Foundation#on
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} handler - The callback
     */
    on(eventType: string, handler: Function): void;
    /**
     * Unsubscribes the caller to a comapi event.
     * @method Foundation#off
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} [handler] - The callback (optional - if not specified, all associated callbacks will be unregistered)
     */
    off(eventType: string, handler?: Function): void;
    /**
     * Method to retrieve the current debug log as a string
     * @method Foundation#getLogs
     * @returns {Promise} - Returns a promise
     */
    getLogs(): Promise<string>;
}
