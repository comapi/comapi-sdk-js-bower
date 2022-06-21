import { IOrphanedEventManager, IConversationMessageEvent, ILocalStorageData } from "./interfaces";
export declare class LocalStorageOrphanedEventManager implements IOrphanedEventManager {
    private _localStorage;
    private _initialised;
    private _orphanedEvents;
    /**
     *
     */
    constructor(_localStorage: ILocalStorageData);
    /**
     *
     */
    clearAll(): Promise<boolean>;
    /**
     *
     */
    clear(conversationId: string): Promise<boolean>;
    /**
     *
     */
    getContinuationToken(conversationId: string): Promise<number>;
    /**
     *
     */
    setContinuationToken(conversationId: string, continuationToken: number): Promise<boolean>;
    /**
     *
     */
    addOrphanedEvent(event: IConversationMessageEvent): Promise<boolean>;
    /**
     *
     */
    removeOrphanedEvent(event: IConversationMessageEvent): Promise<boolean>;
    /**
     *
     */
    getOrphanedEvents(conversationId: string): Promise<IConversationMessageEvent[]>;
    private ensureInitialised;
    /**
     *
     */
    private initialise;
}
