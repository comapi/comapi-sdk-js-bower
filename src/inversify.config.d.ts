import "reflect-metadata";
import { Container } from "inversify";
declare let container: Container;
declare function initInterfaces(): void;
export { container, initInterfaces };
