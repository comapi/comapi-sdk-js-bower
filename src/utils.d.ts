export declare type DoUntilOperationFunction = (data: any) => Promise<any>;
export declare type DoUntilTestFunction = (data: any) => boolean;
export declare class Utils {
    static eachSeries(arr: any[], iteratorFn: Function): Promise<any>;
    static doUntil(operation: DoUntilOperationFunction, test: DoUntilTestFunction, data?: any): Promise<any>;
    constructor();
}
