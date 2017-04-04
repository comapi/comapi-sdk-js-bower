var LocalStorageData = (function () {
    /**
     * LocalStorageData class constructor.
     * @class LocalStorageData
     * @ignore
     * @classdesc Class that implements Local storage access.
     * @param  {string} [prefix]
     */
    function LocalStorageData(prefix) {
        this._prefix = "comapi.";
        if (prefix) {
            this._prefix = prefix;
        }
    }
    /**
     * Get raw value as string from local storage.
     * @method LocalStorageData#getString
     * @param {String} key - the key
     * @returns (String) - the raw string value
     */
    LocalStorageData.prototype.getString = function (key) {
        return localStorage.getItem(this._prefix + key);
    };
    /**
     * Set raw value as string to local storage.
     * @method LocalStorageData#setString
     * @param {String} key - the key
     * @param {String} value - the value
     */
    LocalStorageData.prototype.setString = function (key, value) {
        localStorage.setItem(this._prefix + key, value);
    };
    /**
     * Get value as object .
     * @method LocalStorageData#getObject
     * @param  {string} key
     * @returns {Object} - the value Object
     */
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
            console.log("caught exception in LocalStorageData.set(" + key + "): " + e);
            succeeded = false;
        }
        return succeeded;
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
    };
    return LocalStorageData;
})();
exports.LocalStorageData = LocalStorageData;
//# sourceMappingURL=localStorageData.js.map