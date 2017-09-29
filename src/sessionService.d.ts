import { IFoundation, ISession } from "@comapi/sdk-js-foundation";
import { IComapiChatConfig } from "./interfaces";
export declare class SessionService {
    private _foundation;
    private _config;
    constructor(_foundation: IFoundation, _config: IComapiChatConfig);
    startSession(): Promise<ISession>;
    readonly session: ISession;
    endSession(): Promise<boolean>;
}
