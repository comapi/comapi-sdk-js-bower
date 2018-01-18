import "reflect-metadata";
import { IComapiConfig } from "./interfaces";
export declare class InterfaceContainer {
    private _container;
    private _overriddenInterfaces;
    constructor();
    /**
     *
     */
    initialise(comapiConfig?: IComapiConfig): void;
    /**
     *
     */
    uninitialise(): void;
    /**
     *
     */
    bindIndexedDBLogger(): void;
    /**
     *
     */
    unbindIndexedDBLogger(): void;
    /**
     *
     */
    bindComapiConfig(comapiConfig: IComapiConfig): void;
    /**
     *
     * @param serviceIdentifier
     */
    getInterface<T>(serviceIdentifier: string): T;
    /**
     *
     * @param serviceIdentifier
     */
    setInterface(serviceIdentifier: string, instance: any): void;
}
