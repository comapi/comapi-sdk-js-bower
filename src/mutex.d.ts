import IMutexInterface from "./mutexInterface";
export declare class Mutex implements IMutexInterface {
    private _queue;
    private _pending;
    acquire(): Promise<IMutexInterface.IReleaser>;
    runExclusive<T>(callback: IMutexInterface.IWorker<T>): Promise<T>;
    private _dispatchNext();
}
