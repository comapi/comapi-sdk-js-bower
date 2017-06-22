"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IndexedDBLogger = (function () {
    function IndexedDBLogger(name) {
        this.idbSupported = "indexedDB" in window;
        this._name = "Comapi";
        this._version = 1;
        this._store = "Logs";
        if (name) {
            this._name = name;
        }
    }
    IndexedDBLogger.prototype.openDatabase = function () {
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
    IndexedDBLogger.prototype.purge = function (when) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._database) {
                var transaction = _this._database.transaction([_this._store], "readwrite");
                var objectStore_1 = transaction.objectStore(_this._store);
                var index = objectStore_1.index("created");
                var keyRangeValue = IDBKeyRange.upperBound(when.valueOf());
                index.openCursor(keyRangeValue).onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        objectStore_1["delete"](cursor.primaryKey);
                        cursor["continue"]();
                    }
                    else {
                        resolve(true);
                    }
                };
            }
            else {
                reject({ message: "Database not open" });
            }
        });
    };
    IndexedDBLogger.prototype.deleteDatabase = function () {
        var _this = this;
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
    };
    IndexedDBLogger.prototype.clearData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._database) {
                var transaction_1 = _this._database.transaction([_this._store], "readwrite");
                transaction_1.onerror = function (event) {
                    console.error("Transaction not opened due to error: " + transaction_1.error);
                };
                var objectStore = transaction_1.objectStore(_this._store);
                var objectStoreRequest = objectStore.clear();
                objectStoreRequest.onsuccess = function (event) {
                    resolve(true);
                };
                objectStoreRequest.onerror = function (e) {
                    reject({ message: "Failed to clear object store: " + e.target.error.name });
                };
            }
            else {
                reject({ message: "Database not open" });
            }
        });
    };
    IndexedDBLogger.prototype.getData = function (count, getIndexes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._database) {
                var transaction = _this._database.transaction([_this._store], "readonly");
                var objectStore = transaction.objectStore(_this._store);
                var cursorRequest = objectStore.openCursor();
                var numRetrieved_1 = 0;
                var data_1 = [];
                cursorRequest.onsuccess = function (event) {
                    var cursor = event.target.result;
                    numRetrieved_1++;
                    if (cursor) {
                        var record = cursor.value;
                        if (getIndexes === true) {
                            record.key = cursor.key;
                        }
                        data_1.push(cursor.value);
                        if (numRetrieved_1 && numRetrieved_1 >= count) {
                            resolve(data_1);
                        }
                        else {
                            cursor.continue();
                        }
                    }
                    else {
                        resolve(data_1);
                    }
                };
                cursorRequest.onerror = function (e) {
                    reject({ message: "Failed to openCursor: " + e.target.error.name });
                };
            }
            else {
                reject({ message: "Database not open" });
            }
        });
    };
    IndexedDBLogger.prototype.getCount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._database) {
                var transaction = _this._database.transaction([_this._store], "readonly");
                var objectStore = transaction.objectStore(_this._store);
                var count_1 = objectStore.count();
                count_1.onerror = function (e) {
                    reject({ message: "Failed to get count: " + e.target.error.name });
                };
                count_1.onsuccess = function () {
                    resolve(count_1.result);
                };
            }
            else {
                reject({ message: "Database not open" });
            }
        });
    };
    IndexedDBLogger.prototype.closeDatabase = function () {
        if (this._database) {
            this._database.close();
        }
    };
    IndexedDBLogger.prototype.addRecord = function (entity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._database) {
                var transaction = _this._database.transaction([_this._store], "readwrite");
                var store = transaction.objectStore(_this._store);
                var request = store.add(entity);
                request.onerror = function (e) {
                    console.error("Error", e.target.error.name);
                    reject({ message: "add failed: " + e.target.error.name });
                };
                request.onsuccess = function (e) {
                    resolve(e.target.result);
                };
            }
            else {
                reject({ message: "Database not open" });
            }
        });
    };
    return IndexedDBLogger;
}());
exports.IndexedDBLogger = IndexedDBLogger;
//# sourceMappingURL=indexedDBLogger.js.map