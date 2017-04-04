import { ILogEvent } from "./interfaces";
export declare class IndexedDBLogger {
    private idbSupported;
    private _database;
    private _name;
    private _version;
    private _store;
    /**
     * IndexedDBLogger class constructor.
     * @class IndexedDBLogger
     * @ignore
     * @classdesc Class that implements an IndexedDBLogger.
     * @param {string} name - database name (for overriding in unit tests)
     */
    constructor(name?: string);
    /**
     * Method to open a connection to the database
     * @method IndexedDBLogger#openDatabase
     * @returns {Promise} - returns a promise
     */
    openDatabase(): Promise<boolean>;
    /**
     * Removes all records older than specified date
     * @method IndexedDBLogger#purge
     * @param {Date} date threshold (messages older than this will be deleted)
     * @returns {Promise} - returns a promise
     */
    purge(when: Date): Promise<boolean>;
    /**
     * Method to delete a database
     * @method IndexedDBLogger#deleteDatabase
     * @returns {Promise} - returns a promise
     */
    deleteDatabase(): Promise<boolean>;
    /**
     * Method to clear the data in an object store
     * @method IndexedDBLogger#clearData
     * @returns {Promise} - returns a promise
     */
    clearData(): Promise<boolean>;
    /**
     * Method to get all or the first n objects in an object store
     * @method IndexedDBLogger#getData
     * @param {number} [count] - number of records to query - retrieves all if not specified
     * @param {boolean} [getIndexes] - whether to add the key into the returned record - doesn'tadd by default
     * @returns {Promise} - returns a promise
     */
    getData(count?: number, getIndexes?: boolean): Promise<Object[]>;
    /**
     * Method to get the count of objects in the object store
     * @method IndexedDBLogger#getCount
     * @returns {Promise} - returns a promise
     */
    getCount(): Promise<number>;
    /**
     * Method to close a database connection
     * @method IndexedDBLogger#closeDatabase
     */
    closeDatabase(): void;
    /**
     * Method to add a record to a previously opened indexed database
     * @method IndexedDBLogger#addRecord
     * @param {Object} entity - The entity
     * @returns {Promise} - returns a promise
     */
    addRecord(entity: ILogEvent): Promise<number>;
}
