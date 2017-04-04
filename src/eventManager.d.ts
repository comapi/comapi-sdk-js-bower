import { IEventManager } from "./interfaces";
export declare class EventManager implements IEventManager {
    private eventSubscribers;
    /**
     * EventManager class constructor.
     * @class EventManager
     * @ignore
     * @classdesc Class that implements all local event management.
     */
    constructor();
    /**
     * Subscribes the caller to a local event type.
     * @method EventManager#subscribeToLocalEvent
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} handler - The callback
     */
    subscribeToLocalEvent(eventType: string, handler: Function): void;
    /**
     * Checks for an event subscriptionfor a local event type.
     * @method EventManager#isSubscribedToLocalEvent
     * @param {string} eventType - The type of event to check
     */
    isSubscribedToLocalEvent(eventType: string): boolean;
    /**
     * Removes a subscription for a local event type.
     * @method EventManager#unsubscribeFromLocalEvent
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} [handler] - The callback (optional - if not specified, all associated callbacks will be unregistered)
     */
    unsubscribeFromLocalEvent(eventType: string, handler?: Function): void;
    /**
     * Publishes a LocalEvent.
     * @method EventManager#publishLocalEvent
     * @param {string} eventType - The type of event to publish
     * @param {Object} data - The data associated with the event
     */
    publishLocalEvent(eventType: string, data: any): void;
}
