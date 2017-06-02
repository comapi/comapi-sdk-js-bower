;
var LocalStorageOrphanedEventManager = (function () {
    /**
     *
     */
    function LocalStorageOrphanedEventManager(_localStorage) {
        this._localStorage = _localStorage;
        this._orphanedEevnts = {};
        this._orphanedEevnts = this._localStorage.getObject("orphanedEevnts") || {};
    }
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.clearAll = function () {
        this._orphanedEevnts = {};
        this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
        return Promise.resolve(true);
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.clear = function (conversationId) {
        this._orphanedEevnts[conversationId] = {
            orphanedEvents: []
        };
        this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
        return Promise.resolve(true);
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.getContinuationToken = function (conversationId) {
        var container = this._orphanedEevnts[conversationId];
        return Promise.resolve(container ? container.continuationToken : null);
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.setContinuationToken = function (conversationId, continuationToken) {
        var _info = this._orphanedEevnts[conversationId];
        if (_info) {
            _info.continuationToken = continuationToken;
        }
        else {
            this._orphanedEevnts[conversationId] = {
                continuationToken: continuationToken,
                orphanedEvents: []
            };
        }
        return Promise.resolve(true);
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.addOrphanedEvent = function (event) {
        var info = this._orphanedEevnts[event.conversationId];
        if (info) {
            // check for dupe 
            var found = info.orphanedEvents.filter(function (e) { return e.eventId === event.eventId; });
            if (found.length === 0) {
                // insert
                info.orphanedEvents.unshift(event);
                // sort
                info.orphanedEvents = info.orphanedEvents.sort(function (e1, e2) {
                    if (e1.conversationEventId > e2.conversationEventId) {
                        return 1;
                    }
                    else if (e1.conversationEventId < e2.conversationEventId) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                });
                // save
                this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
            }
        }
        else {
            return Promise.reject({ message: "No container for conversation " + event.conversationId });
        }
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.removeOrphanedEvent = function (event) {
        var info = this._orphanedEevnts[event.conversationId];
        if (info) {
            for (var i = info.orphanedEvents.length - 1; i >= 0; i--) {
                var e = info.orphanedEvents[i];
                if (e.eventId === event.eventId) {
                    info.orphanedEvents.splice(i, 1);
                    break;
                }
            }
            // save
            this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
            return Promise.resolve(true);
        }
        else {
            return Promise.reject({ message: "No container for conversation " + event.conversationId });
        }
    };
    /**
     *
     */
    LocalStorageOrphanedEventManager.prototype.getOrphanedEvents = function (conversationId) {
        var info = this._orphanedEevnts[conversationId];
        return Promise.resolve(info ? info.orphanedEvents : []);
    };
    return LocalStorageOrphanedEventManager;
})();
exports.LocalStorageOrphanedEventManager = LocalStorageOrphanedEventManager;
//# sourceMappingURL=localStorageOrphanedEventManager.js.map