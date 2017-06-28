import "reflect-metadata";
import { Container } from "inversify";
import { IComapiConfig } from "./interfaces";
declare let container: Container;
declare function initInterfaces(): void;
declare function bindIndexedDBLogger(): void;
declare function unbindIndexedDBLogger(): void;
declare function bindComapiConfig(comapiConfig: IComapiConfig): void;
export { container, initInterfaces, bindIndexedDBLogger, unbindIndexedDBLogger, bindComapiConfig };
