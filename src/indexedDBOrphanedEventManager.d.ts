import { IOrphanedEventManager, IConversationMessageEvent } from "./interfaces";
export declare class IndexedDBOrphanedEventManager implements IOrphanedEventManager {
    private _initialised;
    private idbSupported;
    private _database;
    private _name;
    private _version;
    private _continuationTokenStore;
    private _orphanedEventStore;
    clearAll(): Promise<boolean>;
    clear(conversationId: string): Promise<boolean>;
    getContinuationToken(conversationId: string): Promise<number>;
    setContinuationToken(conversationId: string, continuationToken: number): Promise<boolean>;
    addOrphanedEvent(event: IConversationMessageEvent): Promise<boolean>;
    removeOrphanedEvent(event: IConversationMessageEvent): Promise<boolean>;
    getOrphanedEvents(conversationId: string): Promise<IConversationMessageEvent[]>;
    private ensureInitialised();
    private initialise();
    private clearObjectStore(objectStoreName);
    private deleteTokenInfo(conversationId);
    private deleteEvents(conversationId);
}
