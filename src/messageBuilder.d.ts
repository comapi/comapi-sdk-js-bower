import { IConversationMessage, IMessagePart, IMessageAlert, IApnsAlert, IFcmAlert } from "./interfaces";
export declare class MessageBuilder implements IConversationMessage {
    id: string;
    metadata: any;
    parts: IMessagePart[];
    alert: IMessageAlert;
    context: any;
    sentEventId: number;
    statusUpdates: any;
    withText(text: any): MessageBuilder;
    withData(type: string, data: string): this;
    withURL(type: string, url: string, size?: number): this;
    withPart(part: IMessagePart): this;
    withPush(text: any): this;
    withApnsAlert(info: IApnsAlert): this;
    withFcmAlert(info: IFcmAlert): this;
    withMetadata(metadata: any): this;
}
