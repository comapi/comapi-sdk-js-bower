import { IContentData } from "./interfaces";
export declare class ContentData implements IContentData {
    file: File;
    data: string;
    name: string;
    type: string;
    /**
     * Static method that creates and initialises a ContentData instance from a File object
     * @param {File} file - the file object
     * @returns {ContentData}
     */
    static createFromFile(file: File): ContentData;
    /**
     * Static method that creates and initialises a ContentData instance from raw base64 data
     * @param {string} data - the base64 data
     * @param {string} name - the name of the attachment
     * @param {string} type - the type of attachment
     * @returns {ContentData}
     */
    static createFromBase64(data: string, name: string, type: string): ContentData;
    /**
     * ContentData class constructor.
     * @class ContentData
     * @classdesc Class that implements Content Data.
     */
    constructor();
    /**
     * Method that initialises a ContentData instance from a File object
     * @method ContentData#initFromFile
     * @param {File} file - the file object
     * @returns {ContentData}
     */
    initFromFile(file: File): ContentData;
    /**
     * Method that initialises a ContentData instance from raw base64 data
     * @method ContentData#initFromBase64Data
     * @param {string} data - the base64 data
     * @param {string} name - the name of the attachment
     * @param {string} type - the type of attachment
     * @returns {ContentData}
     */
    initFromBase64Data(data: string, name: string, type: string): ContentData;
}
