import "reflect-metadata";
import { Container } from "inversify";
declare let container: Container;
declare function initInterfaces(): void;
declare function bindIndexedDBLogger(): void;
declare function unbindIndexedDBLogger(): void;
export { container, initInterfaces, bindIndexedDBLogger, unbindIndexedDBLogger };
