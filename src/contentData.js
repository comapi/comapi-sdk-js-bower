"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentData = (function () {
    function ContentData() {
    }
    ContentData.createFromFile = function (file) {
        return new ContentData().initFromFile(file);
    };
    ContentData.createFromBase64 = function (data, name, type) {
        return new ContentData().initFromBase64Data(data, name, type);
    };
    ContentData.prototype.initFromFile = function (file) {
        this.file = file;
        return this;
    };
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