"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
        throw new Error("Cannot new this class");
    }
    Utils.clone = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    Utils.uuid = function () {
        var d = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    Utils.getBrowserInfo = function (userAgent) {
        var ua = userAgent !== undefined ? userAgent : navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {
                name: "IE",
                version: tem[1] || ""
            };
        }
        if (M[1] === "Chrome") {
            tem = ua.match(/\bOPR\/(\d+)/);
            if (tem !== null) {
                return {
                    name: "Opera",
                    version: tem[1]
                };
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
        tem = ua.match(/version\/(\d+)/i);
        if (tem !== null) {
            M.splice(1, 1, tem[1]);
        }
        return {
            name: M[0],
            version: M[1]
        };
    };
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
    Utils.format = function (content, tags) {
        return content.replace(/{{(.*?)}}/g, function (tag, key) {
            var replacement;
            if (typeof tags[key] === "string") {
                replacement = tags[key];
            }
            return typeof replacement === "string" ? replacement : "";
        });
    };
    return Utils;
}());
exports.Utils = Utils;
;
//# sourceMappingURL=utils.js.map