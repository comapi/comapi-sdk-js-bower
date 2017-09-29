"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IndexedDBConversationStore = (function () {
    function IndexedDBConversationStore() {
        this._DbNme = "IConversationStore4";
        this._ConversationsStore = "IChatConversation";
        this._MessagesStore = "IChatMessage";
        this._DbVersion = 1;
    }
    IndexedDBConversationStore.prototype.getConversation = function (conversationId) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._ConversationsStore], "readonly");
                var objectStore = transaction.objectStore(_this._ConversationsStore);
                var keyRange = IDBKeyRange.only(conversationId);
                var cursorRequest = objectStore.openCursor(keyRange);
                cursorRequest.onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        resolve(cursor.value);
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
    IndexedDBConversationStore.prototype.createConversation = function (conversation) {
        return this.putConversation(conversation);
    };
    IndexedDBConversationStore.prototype.updateConversation = function (conversation) {
        var _this = this;
        return this.getConversation(conversation.id)
            .then(function (c) {
            if (c) {
                return _this.putConversation(conversation);
            }
            else {
                return Promise.reject({ message: "Conversation " + conversation.id + " not found" });
            }
        });
    };
    IndexedDBConversationStore.prototype.deleteConversation = function (conversationId) {
        var _this = this;
        return this.getConversation(conversationId)
            .then(function (c) {
            if (c !== null) {
                return _this._deleteConversation(conversationId);
            }
            else {
                return Promise.reject({ message: "Conversation " + conversationId + " not found" });
            }
        });
    };
    IndexedDBConversationStore.prototype.getMessage = function (conversationId, messageId) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._MessagesStore], "readonly");
                var objectStore = transaction.objectStore(_this._MessagesStore);
                var cursorRequest = objectStore.get(messageId);
                cursorRequest.onsuccess = function (event) {
                    var message = event.target.result;
                    if (message) {
                        resolve(message);
                    }
                    else {
                        resolve(null);
                    }
                };
                cursorRequest.onerror = function (event) {
                    reject({ message: "Failed to openCursor: " + event.target.error.name });
                };
            });
        });
    };
    IndexedDBConversationStore.prototype.updateMessageStatus = function (conversationId, messageId, profileId, status, timestamp) {
        var _this = this;
        return this.getMessage(conversationId, messageId)
            .then(function (message) {
            if (message.statusUpdates &&
                message.statusUpdates[profileId] &&
                message.statusUpdates[profileId].status === "read") {
                Promise.resolve(false);
            }
            else {
                if (!message.statusUpdates) {
                    message.statusUpdates = {};
                }
                message.statusUpdates[profileId] = {
                    status: status,
                    on: timestamp
                };
                return _this.putMessage(message);
            }
        });
    };
    IndexedDBConversationStore.prototype.createMessage = function (message) {
        var _this = this;
        return this.getConversation(message.conversationId)
            .then(function (c) {
            if (c !== null) {
                return _this.putMessage(message);
            }
            else {
                return Promise.reject({ message: "Conversation " + message.conversationId + " not found" });
            }
        });
    };
    IndexedDBConversationStore.prototype.getConversations = function () {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._ConversationsStore], "readonly");
                var objectStore = transaction.objectStore(_this._ConversationsStore);
                var conversations = [];
                var cursorRequest = objectStore.openCursor();
                cursorRequest.onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        conversations.push(cursor.value);
                        cursor.continue();
                    }
                    else {
                        resolve(conversations);
                    }
                };
                cursorRequest.onerror = function (event) {
                    reject({ message: "Failed to openCursor: " + event.target.error.name });
                };
            });
        });
    };
    IndexedDBConversationStore.prototype.getMessages = function (conversationId) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._MessagesStore], "readonly");
                var objectStore = transaction.objectStore(_this._MessagesStore);
                var index = objectStore.index("conversation");
                var keyRange = IDBKeyRange.only("" + conversationId);
                var messages = [];
                var cursorRequest = index.openCursor(keyRange, "prev");
                cursorRequest.onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        messages.unshift(cursor.value);
                        cursor.continue();
                    }
                    else {
                        resolve(messages.sort(function (m1, m2) {
                            return m1.sentEventId - m2.sentEventId;
                        }));
                    }
                };
                cursorRequest.onerror = function (event) {
                    reject({ message: "Failed to openCursor: " + event.target.error.name });
                };
            });
        });
    };
    IndexedDBConversationStore.prototype.deleteConversationMessages = function (conversationId) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._MessagesStore], "readwrite");
                var objectStore = transaction.objectStore(_this._MessagesStore);
                var index = objectStore.index("conversation");
                var keyRange = IDBKeyRange.only("" + conversationId);
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
        });
    };
    IndexedDBConversationStore.prototype.reset = function () {
        var _this = this;
        return this.clearObjectStore(this._ConversationsStore)
            .then(function (cleared) {
            return _this.clearObjectStore(_this._MessagesStore);
        })
            .then(function (cleared) {
            return Promise.resolve(true);
        });
    };
    IndexedDBConversationStore.prototype.ensureInitialised = function () {
        if (!this._initialised) {
            this._initialised = this.initialise();
        }
        return this._initialised;
    };
    IndexedDBConversationStore.prototype.initialise = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ("indexedDB" in window) {
                var openRequest = indexedDB.open(_this._DbNme, _this._DbVersion);
                openRequest.onupgradeneeded = function (event) {
                    console.log("Upgrading database...");
                    var thisDB = event.target.result;
                    if (!thisDB.objectStoreNames.contains(_this._MessagesStore)) {
                        var os = thisDB.createObjectStore(_this._MessagesStore, { keyPath: "id" });
                        os.createIndex("conversation", "conversationId", { unique: false });
                    }
                    if (!thisDB.objectStoreNames.contains(_this._ConversationsStore)) {
                        thisDB.createObjectStore(_this._ConversationsStore, { keyPath: "id" });
                    }
                };
                openRequest.onsuccess = function (event) {
                    _this._database = event.target.result;
                    console.log("database opened ;-)");
                    resolve(true);
                };
                openRequest.onerror = function (event) {
                    reject({ message: "IndexedDBLogger.open failed : " + event.target.error.name });
                };
            }
            else {
                reject({ message: "IndexedDB not supported on this platform - use https://github.com/axemclion/IndexedDBShim or https://github.com/Microsoft/cordova-plugin-indexedDB" });
            }
        });
    };
    IndexedDBConversationStore.prototype.putMessage = function (message) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._MessagesStore], "readwrite");
                var store = transaction.objectStore(_this._MessagesStore);
                var request = store.put(message);
                request.onerror = function (e) {
                    console.error("Error", e.target.error.name);
                    reject({ message: "add failed: " + e.target.error.name });
                };
                request.onsuccess = function (event) {
                    resolve(true);
                };
            });
        });
    };
    IndexedDBConversationStore.prototype.putConversation = function (conversation) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._ConversationsStore], "readwrite");
                var store = transaction.objectStore(_this._ConversationsStore);
                var request = store.put(conversation);
                request.onerror = function (event) {
                    reject({ message: "add failed: " + event.target.error.name });
                };
                request.onsuccess = function (event) {
                    resolve(true);
                };
            });
        });
    };
    IndexedDBConversationStore.prototype.clearObjectStore = function (objectStoreName) {
        var _this = this;
        var _objectStoreName = objectStoreName;
        return this.ensureInitialised()
            .then(function (initialised) {
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
        });
    };
    IndexedDBConversationStore.prototype._deleteConversation = function (conversationId) {
        var _this = this;
        return this.ensureInitialised()
            .then(function (initialised) {
            return new Promise(function (resolve, reject) {
                var transaction = _this._database.transaction([_this._ConversationsStore], "readwrite");
                var store = transaction.objectStore(_this._ConversationsStore);
                var request = store.delete(conversationId);
                request.onerror = function (event) {
                    reject({ message: "delete failed: " + event.target.error.name });
                };
                request.onsuccess = function (event) {
                    console.log("store.delete", event.target.result);
                    _this.deleteConversationMessages(conversationId)
                        .then(function (succeeded) {
                        resolve(succeeded);
                    });
                };
            });
        });
    };
    return IndexedDBConversationStore;
}());
exports.IndexedDBConversationStore = IndexedDBConversationStore;
//# sourceMappingURL=dbStore.js.map