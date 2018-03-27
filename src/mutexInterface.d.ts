interface IMutexInterface {
    acquire(name?: string): Promise<IMutexInterface.IReleaser>;
    runExclusive<T>(callback: IMutexInterface.IWorker<T>, name?: string): Promise<T>;
}
declare namespace IMutexInterface {
    interface IReleaser {
        (): void;
    }
    type Worker = (release: IMutexInterface.IReleaser) => void;
    interface IQueueItem {
        method: Worker;
        name?: string;
    }
    interface IWorker<T> {
        (): Promise<T> | T;
    }
}
export default IMutexInterface;
