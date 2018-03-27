import IMutexInterface from "./mutexInterface";
export declare class Mutex implements IMutexInterface {
    private _queue;
    private _pending;
    acquire(name?: string): Promise<IMutexInterface.IReleaser>;
    runExclusive<T>(callback: IMutexInterface.IWorker<T>, name?: string): Promise<T>;
    private _dispatchNext();
}
