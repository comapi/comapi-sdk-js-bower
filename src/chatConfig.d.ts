import { ComapiConfig } from "@comapi/sdk-js-foundation";
import { IComapiChatConfig, IConversationStore } from "./interfaces";
export declare class ComapiChatConfig extends ComapiConfig implements IComapiChatConfig {
    conversationStore: IConversationStore;
    eventPageSize: number;
    messagePageSize: number;
    lazyLoadThreshold: number;
    getConversationSleepTimeout: number;
    getConversationMaxRetry: number;
    maxEventGap: number;
    constructor();
    withStore(conversationStore: IConversationStore): this;
    withEventPageSize(eventPageSize: number): this;
    withMessagePageSize(messagePageSize: number): this;
    withLazyLoadThreshold(lazyLoadThreshold: number): this;
    withMaxEventGap(maxEventGap: number): this;
}
