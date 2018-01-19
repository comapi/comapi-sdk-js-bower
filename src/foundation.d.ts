import { IEventManager, ILogger, ISession, IComapiConfig, IServices, IDevice, IChannels, IFoundation, INetworkManager } from "./interfaces";
import { ConversationBuilder } from "./conversationBuilder";
import { MessageBuilder } from "./messageBuilder";
import { MessageStatusBuilder } from "./messageStatusBuilder";
import { ComapiConfig } from "./comapiConfig";
import { ContentData } from "./contentData";
import { Mutex } from "./mutex";
export { ComapiConfig, MessageStatusBuilder, ConversationBuilder, MessageBuilder, ContentData, Mutex };
export declare class Foundation implements IFoundation {
    private _eventManager;
    private _logger;
    private _networkManager;
    /**
     * Singleton Foundation instance
     */
    private static _foundation;
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
    static initialiseShared(comapiConfig: IComapiConfig): Promise<Foundation>;
    /**
     * Factory method to create an instance of Foundation
     * @method Foundation#initialise
     * @param {IComapiConfig} comapiConfig - the app config (use `ComapiConfig` to create)
     * @returns {Promise} - returns promise
     */
    static initialise(comapiConfig: IComapiConfig): Promise<Foundation>;
    /**
     * Property to get the SDK version
     * @method Foundation#version
     */
    static readonly version: string;
    /**
     * Private initialisation method
     * @param comapiConfig
     * @param indexedDBLogger
     */
    private static _initialise(comapiConfig, doSingleton);
    /**
     * Foundation class constructor.
     * @class Foundation
     * @classdesc Class that implements Comapi foundation functionality.
     */
    constructor(_eventManager: IEventManager, _logger: ILogger, _networkManager: INetworkManager, services: IServices, device: IDevice, channels: IChannels);
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
    readonly services: IServices;
    /**
     * Method to get Device interface
     * @method Foundation#device
     * @returns {Device} - Returns Device
     */
    readonly device: IDevice;
    /**
     * Method to get Channels interface
     * @method Foundation#channels
     * @returns {Channels} - Returns Channels
     */
    readonly channels: IChannels;
    /**
     * Method to get current session
     * @method Foundation#session
     * @returns {ISession} - Returns an ISession interface
     */
    readonly session: ISession;
    /**
     * Method to get the logger
     * @method Foundation#logger
     * @returns {ILogger} - Returns an ILogger interface
     */
    readonly logger: ILogger;
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
