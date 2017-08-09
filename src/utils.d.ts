import { IBrowserInfo } from "./interfaces";
export declare type DoUntilOperationFunction = (data: any) => Promise<any>;
export declare type DoUntilTestFunction = (data: any) => boolean;
export declare class Utils {
    static clone(obj: any): any;
    static uuid(): string;
    static getBrowserInfo(userAgent?: string): IBrowserInfo;
    static eachSeries(arr: any[], iteratorFn: Function): Promise<any>;
    static doUntil(operation: DoUntilOperationFunction, test: DoUntilTestFunction, data?: any): Promise<any>;
    static format(content: string, tags: Object): any;
    static getHeaderValue(headers: Object, key: string): any;
    constructor();
}
