"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var interfaceSymbols_1 = require("./interfaceSymbols");
var mutex_1 = require("./mutex");
/*
 * http://blog.vanamco.com/indexeddb-fundamentals-plus-a-indexeddb-example-tutorial/
 * http://code.tutsplus.com/tutorials/working-with-indexeddb--net-34673
 */
var IndexedDBLogger = (function () {
    /**
     * IndexedDBLogger class constructor.
     * @class IndexedDBLogger
     * @ignore
     * @classdesc Class that implements an IndexedDBLogger.
     * @param {string} name - database name (for overriding in unit tests)
     */
    function IndexedDBLogger(_comapiConfig) {
        this._comapiConfig = _comapiConfig;
        this.idbSupported = "indexedDB" in window;
        this._version = 1;
        this._store = "Logs";
        this._mutex = new mutex_1.Mutex();
        this._name = "Comapi";
    }
    Object.defineProperty(IndexedDBLogger.prototype, "name", {
        /**
         * Setter to set the name
         * @method IndexedDBLogger#name
         * @param {string} name - the name
         */
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Removes all records older than specified date
     * @method IndexedDBLogger#purge
     * @param {Date} date threshold (messages older than this will be deleted)
     * @returns {Promise} - returns a promise
     */
    IndexedDBLogger.prototype.purge = function (when) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this.ensureInitialised()
                .then(function (initialised) {
                return new Promise(function (resolve, reject) {
                    var transaction = _this._database.transaction([_this._store], "readwrite");
                    var objectStore = transaction.objectStore(_this._store);
                    var index = objectStore.index("created");
                    // we want all keys less than this date
                    var keyRangeValue = IDBKeyRange.upperBound(when.valueOf());
                    index.openCursor(keyRangeValue).onsuccess = function (event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            objectStore["delete"](cursor.primaryKey);
                            cursor["continue"]();
                        }
                        else {
                            // should be all deleted 
                            resolve(true);
                        }
                    };
                });
            });
        }, "purge");
    };
    /**
     * Method to delete a database
     * @method IndexedDBLogger#deleteDatabase
     * @returns {Promise} - returns a promise
     */
    IndexedDBLogger.prototype.deleteDatabase = function () {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this.ensureInitialised()
                .then(function (initialised) {
                return new Promise(function (resolve, reject) {
                    var req = indexedDB.deleteDatabase(_this._name);
                    var self = _this;
                    req.onsuccess = function () {
                        console.log("Deleted database " + self._name + " successfully");
                        resolve(true);
                    };
                    req.onerror = function (e) {
                        reject({ message: "Couldn't delete database " + self._name + " : " + e.target.error.name });
                    };
                    req.onblocked = function () {
                        console.warn("Couldn't delete database " + self._name + " due to the operation being blocked");
                    };
                });
            });
        }, "deleteDatabase");
    };
    /**
     * Method to clear the data in an object store
     * @method IndexedDBLogger#clearData
     * @returns {Promise} - returns a promise
     */
    IndexedDBLogger.prototype.clearData = function () {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this.ensureInitialised()
                .then(function (initialised) {
                return new Promise(function (resolve, reject) {
                    // open a read/write db transaction, ready for clearing the data
                    var transaction = _this._database.transaction([_this._store], "readwrite");
                    transaction.onerror = function (event) {
                        console.error("Transaction not opened due to error: " + transaction.error);
                    };
                    // create an object store on the transaction
                    var objectStore = transaction.objectStore(_this._store);
                    // clear all the data out of the object store
                    var objectStoreRequest = objectStore.clear();
                    objectStoreRequest.onsuccess = function (event) {
                        resolve(true);
                    };
                    objectStoreRequest.onerror = function (e) {
                        reject({ message: "Failed to clear object store: " + e.target.error.name });
                    };
                });
            });
        }, "clearData");
    };
    /**
     * Method to get all or the first n objects in an object store
     * @method IndexedDBLogger#getData
     * @param {number} [count] - number of records to query - retrieves all if not specified
     * @param {boolean} [getIndexes] - whether to add the key into the returned record - doesn'tadd by default
     * @returns {Promise} - returns a promise
     */
    IndexedDBLogger.prototype.getData = function (count, getIndexes) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this.ensureInitialised()
                .then(function (initialised) {
                return new Promise(function (resolve, reject) {
                    var transaction = _this._database.transaction([_this._store], "readonly");
                    var objectStore = transaction.objectStore(_this._store);
                    var cursorRequest = objectStore.openCursor();
                    var numRetrieved = 0;
                    var data = [];
                    cursorRequest.onsuccess = function (event) {
                        var cursor = event.target.result;
                        numRetrieved++;
                        if (cursor) {
                            var record = cursor.value;
                            if (getIndexes === true) {
                                record.key = cursor.key;
                            }
                            data.push(cursor.value);
                            if (numRetrieved && numRetrieved >= count) {
                                resolve(data);
                            }
                            else {
                                cursor.continue();
                            }
                        }
                        else {
                            resolve(data);
                        }
                    };
                    cursorRequest.onerror = function (e) {
                        reject({ message: "Failed to openCursor: " + e.target.error.name });
                    };
                });
            });
        }, "getData");
    };
    /**
     * Method to get the count of objects in the object store
     * @method IndexedDBLogger#getCount
     * @returns {Promise} - returns a promise
     */
    IndexedDBLogger.prototype.getCount = function () {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this.ensureInitialised()
                .then(function (initialised) {
                return new Promise(function (resolve, reject) {
                    var transaction = _this._database.transaction([_this._store], "readonly");
                    var objectStore = transaction.objectStore(_this._store);
                    var count = objectStore.count();
                    count.onerror = function (e) {
                        reject({ message: "Failed to get count: " + e.target.error.name });
                    };
                    count.onsuccess = function () {
                        resolve(count.result);
                    };
                });
            });
        }, "getCount");
    };
    /**
     * Method to close a database connection
     * @method IndexedDBLogger#closeDatabase
     */
    IndexedDBLogger.prototype.closeDatabase = function () {
        if (this._database) {
            this._database.close();
        }
    };
    /**
     * Method to add a record to a previously opened indexed database
     * @method IndexedDBLogger#addRecord
     * @param {Object} entity - The entity
     * @returns {Promise} - returns a promise
     */
    IndexedDBLogger.prototype.addRecord = function (entity) {
        var _this = this;
        return this._mutex.runExclusive(function () {
            return _this.ensureInitialised()
                .then(function (initialised) {
                return new Promise(function (resolve, reject) {
                    var transaction = _this._database.transaction([_this._store], "readwrite");
                    var store = transaction.objectStore(_this._store);
                    // Perform the add
                    var request = store.add(entity);
                    request.onerror = function (e) {
                        console.error("Error", e.target.error.name);
                        reject({ message: "add failed: " + e.target.error.name });
                    };
                    request.onsuccess = function (e) {
                        // http://stackoverflow.com/questions/12502830/how-to-return-auto-increment-id-from-objectstore-put-in-an-indexeddb
                        // returns auto incremented id ...
                        resolve(e.target.result);
                    };
                });
            });
        }, "addRecord");
    };
    /**
     *
     */
    IndexedDBLogger.prototype.ensureInitialised = function () {
        var _this = this;
        if (!this._initialised) {
            // this is a promise instance to ensure it's only called once
            this._initialised = this.initialise()
                .then(function (result) {
                if (_this._comapiConfig) {
                    var retentionHours = _this._comapiConfig.logRetentionHours === undefined ? 24 : _this._comapiConfig.logRetentionHours;
                    var purgeDate = new Date((new Date()).valueOf() - 1000 * 60 * 60 * retentionHours);
                    return _this.purge(purgeDate);
                }
                else {
                    return result;
                }
            });
        }
        return this._initialised;
    };
    /**
     * Method to open a connection to the database
     * @method IndexedDBLogger#initialise
     * @returns {Promise} - returns a promise
     */
    IndexedDBLogger.prototype.initialise = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.idbSupported) {
                var self_1 = _this;
                var openRequest = indexedDB.open(_this._name, _this._version);
                openRequest.onupgradeneeded = function (e) {
                    console.log("Upgrading database...");
                    var thisDB = e.target.result;
                    if (!thisDB.objectStoreNames.contains(self_1._store)) {
                        var os = thisDB.createObjectStore(self_1._store, { autoIncrement: true });
                        os.createIndex("created", "created", { unique: false });
                    }
                };
                openRequest.onsuccess = function (e) {
                    self_1._database = e.target.result;
                    resolve(true);
                };
                openRequest.onerror = function (e) {
                    reject({ message: "IndexedDBLogger.open failed : " + e.target.error.name });
                };
            }
            else {
                reject({ message: "IndexedDBLogger not supported on this platform" });
            }
        });
    };
    return IndexedDBLogger;
}());
IndexedDBLogger = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)), __param(0, inversify_1.optional()),
    __metadata("design:paramtypes", [Object])
], IndexedDBLogger);
exports.IndexedDBLogger = IndexedDBLogger;
//# sourceMappingURL=indexedDBLogger.js.map