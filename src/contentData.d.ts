import { IContentData } from "./interfaces";
export declare class ContentData implements IContentData {
    file: File;
    data: string;
    name: string;
    type: string;
    static createFromFile(file: File): ContentData;
    static createFromBase64(data: string, name: string, type: string): ContentData;
    private initFromFile(file);
    private initFromBase64Data(data, name, type);
}
