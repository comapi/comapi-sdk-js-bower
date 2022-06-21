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
exports.LocalStorageData = void 0;
var inversify_1 = require("inversify");
var interfaceSymbols_1 = require("./interfaceSymbols");
var LocalStorageData = /** @class */ (function () {
    /**
     * LocalStorageData class constructor.
     * @class LocalStorageData
     * @ignore
     * @classdesc Class that implements Local storage access.
     * @param  {string} [prefix]
     */
    function LocalStorageData(_comapiConfig) {
        this._comapiConfig = _comapiConfig;
        if (_comapiConfig && _comapiConfig.localStoragePrefix) {
            this._prefix = _comapiConfig.localStoragePrefix;
        }
        else {
            this._prefix = "comapi.";
        }
    }
    Object.defineProperty(LocalStorageData.prototype, "prefix", {
        /**
         * Setter to set the prefix
         * @method LocalStorageData#prefix
         * @param {string} prefix - the prefix
         */
        set: function (prefix) {
            this._prefix = prefix;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get raw value as string from local storage.
     * @method LocalStorageData#getString
     * @param {String} key - the key
     * @returns (String) - the raw string value
     */
    LocalStorageData.prototype.getString = function (key) {
        return Promise.resolve(localStorage.getItem(this._prefix + key));
    };
    /**
     * Set raw value as string to local storage.
     * @method LocalStorageData#setString
     * @param {String} key - the key
     * @param {String} value - the value
     */
    LocalStorageData.prototype.setString = function (key, value) {
        localStorage.setItem(this._prefix + key, value);
        return Promise.resolve(true);
    };
    /**
     * Get value as object .
     * @method LocalStorageData#getObject
     * @param  {string} key
     * @returns {Object} - the value Object
     */
    LocalStorageData.prototype.getObject = function (key) {
        return this.getString(key)
            .then(function (raw) {
            var obj = null;
            try {
                obj = JSON.parse(raw);
            }
            catch (e) {
                console.error("caught exception in LocalStorageData.get(" + key + "): " + e);
            }
            return Promise.resolve(obj);
        });
    };
    /**
     * Set value as object.
     * @method LocalStorageData#setObject
     * @param  {string} key
     * @param  {Object} data
     * @returns {boolean} - returns boolean value representing success
     */
    LocalStorageData.prototype.setObject = function (key, data) {
        var succeeded = true;
        try {
            var stringified = JSON.stringify(data);
            this.setString(key, stringified);
        }
        catch (e) {
            succeeded = false;
        }
        return Promise.resolve(succeeded);
    };
    /**
     * Remove a value from local storage.
     * @method LocalStorageData#remove
     * @param  {string} key
     */
    LocalStorageData.prototype.remove = function (key) {
        try {
            localStorage.removeItem(this._prefix + key);
        }
        catch (e) {
            console.error("caught exception in LocalStorageData.remove(" + key + "): " + e);
        }
        return Promise.resolve(true);
    };
    LocalStorageData = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
        __metadata("design:paramtypes", [Object])
    ], LocalStorageData);
    return LocalStorageData;
}());
exports.LocalStorageData = LocalStorageData;
//# sourceMappingURL=localStorageData.js.map