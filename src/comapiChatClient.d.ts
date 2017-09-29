import { IFoundation, IProfile, IDevice, IChannels, InterfaceContainer, INTERFACE_SYMBOLS, Utils, MessageBuilder } from "@comapi/sdk-js-foundation";
import { IComapiChatConfig } from "./interfaces";
import { SessionService } from "./sessionService";
import { MessagingService } from "./messagingService";
import { ComapiChatConfig } from "./chatConfig";
import { MemoryConversationStore } from "./memoryStore";
import { IndexedDBConversationStore } from "./dbStore";
export { ComapiChatConfig, MemoryConversationStore, IndexedDBConversationStore, InterfaceContainer, INTERFACE_SYMBOLS, Utils, MessageBuilder };
export declare class ComapiChatClient {
    private _comapiChatConfig;
    private _sessionService;
    private _messagingService;
    private _foundation;
    constructor();
    readonly session: SessionService;
    readonly profile: IProfile;
    readonly messaging: MessagingService;
    readonly device: IDevice;
    readonly channels: IChannels;
    readonly foundation: IFoundation;
    initialise(comapiChatConfig: IComapiChatConfig): Promise<boolean>;
    initialiseWithFoundation(foundation: IFoundation, comapiChatConfig: IComapiChatConfig): Promise<boolean>;
    uninitialise(): Promise<boolean>;
    private _initialise(foundation, comapiChatConfig);
    static readonly version: string;
}
