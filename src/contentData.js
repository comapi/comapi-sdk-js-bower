"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentData = void 0;
/*
 * Helper class to create the content
 */
var ContentData = /** @class */ (function () {
    /**
     * ContentData class constructor.
     * @class ContentData
     * @classdesc Class that implements Content Data.
     */
    /* tslint:disable:no-empty */
    function ContentData() {
    }
    /**
     * Static method that creates and initialises a ContentData instance from a File object
     * @param {File} file - the file object
     * @returns {ContentData}
     */
    ContentData.createFromFile = function (file) {
        return new ContentData().initFromFile(file);
    };
    /**
     * Static method that creates and initialises a ContentData instance from raw base64 data
     * @param {string} data - the base64 data
     * @param {string} name - the name of the attachment
     * @param {string} type - the type of attachment
     * @returns {ContentData}
     */
    ContentData.createFromBase64 = function (data, name, type) {
        return new ContentData().initFromBase64Data(data, name, type);
    };
    /* tslint:enable:no-empty */
    /**
     * Method that initialises a ContentData instance from a File object
     * @method ContentData#initFromFile
     * @param {File} file - the file object
     * @returns {ContentData}
     */
    ContentData.prototype.initFromFile = function (file) {
        this.file = file;
        return this;
    };
    /**
     * Method that initialises a ContentData instance from raw base64 data
     * @method ContentData#initFromBase64Data
     * @param {string} data - the base64 data
     * @param {string} name - the name of the attachment
     * @param {string} type - the type of attachment
     * @returns {ContentData}
     */
    ContentData.prototype.initFromBase64Data = function (data, name, type) {
        this.data = data;
        this.name = name;
        this.type = type;
        return this;
    };
    return ContentData;
}());
exports.ContentData = ContentData;
//# sourceMappingURL=contentData.js.map