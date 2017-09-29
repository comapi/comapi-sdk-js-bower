"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
        throw new Error("Cannot new this class");
    }
    Utils.eachSeries = function (arr, iteratorFn) {
        return arr.reduce(function (p, item) {
            return p.then(function () {
                return iteratorFn(item);
            });
        }, Promise.resolve());
    };
    Utils.doUntil = function (operation, test, data) {
        return operation(data)
            .then(function (rslt) {
            return test(rslt) ? Utils.doUntil(operation, test, rslt) : rslt;
        });
    };
    return Utils;
}());
exports.Utils = Utils;
;
//# sourceMappingURL=utils.js.map