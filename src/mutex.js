"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mutex = (function () {
    function Mutex() {
        this._queue = [];
        this._pending = false;
    }
    Mutex.prototype.acquire = function (name) {
        var _this = this;
        var ticket = new Promise(function (resolve) { return _this._queue.push({ method: resolve, name: name }); });
        if (!this._pending) {
            this._dispatchNext();
        }
        return ticket;
    };
    Mutex.prototype.runExclusive = function (callback, name) {
        return this
            .acquire()
            .then(function (release) {
            var result;
            try {
                result = callback();
            }
            catch (e) {
                release();
                throw (e);
            }
            return Promise
                .resolve(result)
                .then(function (x) { return (release(), x); }, function (e) {
                release();
                throw e;
            });
        });
    };
    Mutex.prototype._dispatchNext = function () {
        if (this._queue.length > 0) {
            this._pending = true;
            this._queue.shift().method(this._dispatchNext.bind(this));
        }
        else {
            this._pending = false;
        }
    };
    return Mutex;
}());
exports.Mutex = Mutex;
//# sourceMappingURL=mutex.js.map