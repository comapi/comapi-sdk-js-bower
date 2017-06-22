import { IEventManager } from "./interfaces";
export declare class EventManager implements IEventManager {
    private eventSubscribers;
    constructor();
    subscribeToLocalEvent(eventType: string, handler: Function): void;
    isSubscribedToLocalEvent(eventType: string): boolean;
    unsubscribeFromLocalEvent(eventType: string, handler?: Function): void;
    publishLocalEvent(eventType: string, data: any): void;
}
