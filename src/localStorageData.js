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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var LocalStorageData = (function () {
    function LocalStorageData() {
        this._prefix = "comapi.";
    }
    Object.defineProperty(LocalStorageData.prototype, "prefix", {
        set: function (prefix) {
            this._prefix = prefix;
        },
        enumerable: true,
        configurable: true
    });
    LocalStorageData.prototype.getString = function (key) {
        return localStorage.getItem(this._prefix + key);
    };
    LocalStorageData.prototype.setString = function (key, value) {
        localStorage.setItem(this._prefix + key, value);
    };
    LocalStorageData.prototype.getObject = function (key) {
        var obj = null;
        var raw = this.getString(key);
        try {
            obj = JSON.parse(raw);
        }
        catch (e) {
            console.error("caught exception in LocalStorageData.get(" + key + "): " + e);
        }
        return obj;
    };
    LocalStorageData.prototype.setObject = function (key, data) {
        var succeeded = true;
        try {
            var stringified = JSON.stringify(data);
            this.setString(key, stringified);
        }
        catch (e) {
            console.log("caught exception in LocalStorageData.set(" + key + "): " + e);
            succeeded = false;
        }
        return succeeded;
    };
    LocalStorageData.prototype.remove = function (key) {
        try {
            localStorage.removeItem(this._prefix + key);
        }
        catch (e) {
            console.error("caught exception in LocalStorageData.remove(" + key + "): " + e);
        }
    };
    return LocalStorageData;
}());
LocalStorageData = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], LocalStorageData);
exports.LocalStorageData = LocalStorageData;
//# sourceMappingURL=localStorageData.js.map