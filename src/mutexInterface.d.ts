interface IMutexInterface {
    acquire(): Promise<IMutexInterface.IReleaser>;
    runExclusive<T>(callback: IMutexInterface.IWorker<T>): Promise<T>;
}
declare namespace IMutexInterface {
    interface IReleaser {
        (): void;
    }
    interface IWorker<T> {
        (): Promise<T> | T;
    }
}
export default IMutexInterface;
