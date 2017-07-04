import "reflect-metadata";
import { IComapiConfig } from "./interfaces";
export declare class InterfaceContainer {
    private _container;
    private _overriddenInterfaces;
    constructor();
    initialise(): void;
    uninitialise(): void;
    bindIndexedDBLogger(): void;
    unbindIndexedDBLogger(): void;
    bindComapiConfig(comapiConfig: IComapiConfig): void;
    getInterface<T>(serviceIdentifier: string): T;
    setInterface(serviceIdentifier: string, instance: any): void;
}
