"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
;
var IndexedDBOrphanedEventManager = (function () {
    function IndexedDBOrphanedEventManager() {
        this.idbSupported = "indexedDB" in window;
        this._name = "Comapi.OrphanedEvents";
        this._version = 1;
        this._continuationTokenStore = "ContinuationTokens";
        this._orphanedEventStore = "OrphanedEvents";
    }
    IndexedDBOrphanedEventManager.prototype.clearAll = function () {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return _this.clearObjectStore(_this._continuationTokenStore);
        })
            .then(function (cleared) {
            return _this.clearObjectStore(_this._orphanedEventStore);
        });
    };
    IndexedDBOrphanedEventManager.prototype.clear = function (conversationId) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return _this.deleteTokenInfo(conversationId);
        })
            .then(function (deleted) {
            return _this.deleteEvents(conversationId);
        });
    };
    IndexedDBOrphanedEventManager.prototype.getContinuationToken = function (conversationId) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._continuationTokenStore], "readonly");
                var objectStore = transaction.objectStore(_this._continuationTokenStore);
                var keyRange = IDBKeyRange.only(conversationId);
                var cursorRequest = objectStore.openCursor(keyRange);
                cursorRequest.onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        var info = cursor.value;
                        resolve(info.continuationToken);
                    }
                    else {
                        resolve(null);
                    }
                };
                cursorRequest.onerror = function (e) {
                    reject({ message: "Failed to openCursor: " + e.target.error.name });
                };
            });
        });
    };
    IndexedDBOrphanedEventManager.prototype.setContinuationToken = function (conversationId, continuationToken) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._continuationTokenStore], "readwrite");
                var store = transaction.objectStore(_this._continuationTokenStore);
                var request = store.put({
                    continuationToken: continuationToken,
                    conversationId: conversationId
                });
                request.onerror = function (event) {
                    reject({ message: "add failed: " + event.target.error.name });
                };
                request.onsuccess = function (event) {
                    resolve(true);
                };
            });
        });
    };
    IndexedDBOrphanedEventManager.prototype.addOrphanedEvent = function (event) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._orphanedEventStore], "readwrite");
                var store = transaction.objectStore(_this._orphanedEventStore);
                var request = store.put(event);
                request.onerror = function (e) {
                    console.error("Error", e.target.error.name);
                    reject({ message: "add failed: " + e.target.error.name });
                };
                request.onsuccess = function (e) {
                    resolve(true);
                };
            });
        });
    };
    IndexedDBOrphanedEventManager.prototype.removeOrphanedEvent = function (event) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._orphanedEventStore], "readwrite");
                var store = transaction.objectStore(_this._orphanedEventStore);
                var request = store.delete(event.eventId);
                request.onerror = function (e) {
                    reject({ message: "delete failed: " + e.target.error.name });
                };
                request.onsuccess = function (e) {
                    console.log("store.delete", e.target.result);
                    resolve(true);
                };
            });
        });
    };
    IndexedDBOrphanedEventManager.prototype.getOrphanedEvents = function (conversationId) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._orphanedEventStore], "readonly");
                var objectStore = transaction.objectStore(_this._orphanedEventStore);
                var index = objectStore.index("conversationId");
                var keyRange = IDBKeyRange.only(conversationId);
                var events = [];
                var cursorRequest = index.openCursor(keyRange, "prev");
                cursorRequest.onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        events.unshift(cursor.value);
                        cursor.continue();
                    }
                    else {
                        resolve(events.sort(function (e1, e2) {
                            return e1.conversationEventId - e2.conversationEventId;
                        }));
                    }
                };
                cursorRequest.onerror = function (event) {
                    reject({ message: "Failed to openCursor: " + event.target.error.name });
                };
            });
        });
    };
    IndexedDBOrphanedEventManager.prototype.ensureInitialised = function () {
        if (!this._initialised) {
            this._initialised = this.initialise();
        }
        return this._initialised;
    };
    IndexedDBOrphanedEventManager.prototype.initialise = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.idbSupported) {
                var self_1 = _this;
                var openRequest = indexedDB.open(_this._name, _this._version);
                openRequest.onupgradeneeded = function (event) {
                    var thisDB = event.target.result;
                    if (!thisDB.objectStoreNames.contains(self_1._continuationTokenStore)) {
                        thisDB.createObjectStore(self_1._continuationTokenStore, { keyPath: "conversationId" });
                    }
                    if (!thisDB.objectStoreNames.contains(self_1._orphanedEventStore)) {
                        var os = thisDB.createObjectStore(self_1._orphanedEventStore, { keyPath: "eventId" });
                        os.createIndex("conversationId", "conversationId", { unique: false });
                    }
                };
                openRequest.onsuccess = function (event) {
                    _this._database = event.target.result;
                    resolve(true);
                };
                openRequest.onerror = function (event) {
                    reject({ message: "IndexedDBOrphanedEventManager.initialise failed : " + event.target.error.name });
                };
            }
            else {
                reject({ message: "IndexedDBOrphanedEventManager not supported on this platform" });
            }
        });
    };
    IndexedDBOrphanedEventManager.prototype.clearObjectStore = function (objectStoreName) {
        var _this = this;
        var _objectStoreName = objectStoreName;
        return new Promise(function (resolve, reject) {
            var transaction = _this._database.transaction([_objectStoreName], "readwrite");
            transaction.onerror = function (event) {
                console.error("Transaction not opened due to error: " + transaction.error);
            };
            var objectStore = transaction.objectStore(_objectStoreName);
            var objectStoreRequest = objectStore.clear();
            objectStoreRequest.onsuccess = function (event) {
                resolve(true);
            };
            objectStoreRequest.onerror = function (event) {
                reject({ message: "Failed to clear object store: " + event.target.error.name });
            };
        });
    };
    IndexedDBOrphanedEventManager.prototype.deleteTokenInfo = function (conversationId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var transaction = _this._database.transaction([_this._continuationTokenStore], "readwrite");
            var store = transaction.objectStore(_this._continuationTokenStore);
            var request = store.delete(conversationId);
            request.onerror = function (event) {
                reject({ message: "delete failed: " + event.target.error.name });
            };
            request.onsuccess = function (event) {
                console.log("store.delete", event.target.result);
                resolve(true);
            };
        });
    };
    IndexedDBOrphanedEventManager.prototype.deleteEvents = function (conversationId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var transaction = _this._database.transaction([_this._orphanedEventStore], "readwrite");
            var objectStore = transaction.objectStore(_this._orphanedEventStore);
            var index = objectStore.index("conversationId");
            var keyRange = IDBKeyRange.only(conversationId);
            var cursorRequest = index.openCursor(keyRange, "next");
            cursorRequest.onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    objectStore.delete(cursor.primaryKey);
                    cursor.continue();
                }
                else {
                    resolve(true);
                }
            };
            cursorRequest.onerror = function (e) {
                reject({ message: "Failed to openCursor: " + e.target.error.name });
            };
        });
    };
    return IndexedDBOrphanedEventManager;
}());
IndexedDBOrphanedEventManager = __decorate([
    inversify_1.injectable()
], IndexedDBOrphanedEventManager);
exports.IndexedDBOrphanedEventManager = IndexedDBOrphanedEventManager;
//# sourceMappingURL=indexedDBOrphanedEventManager.js.map