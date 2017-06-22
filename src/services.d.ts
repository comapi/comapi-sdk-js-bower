import { IServices, IAppMessaging, IProfile } from "./interfaces";
export declare class Services implements IServices {
    private _appMessaging;
    private _profile;
    constructor(_appMessaging: IAppMessaging, _profile: IProfile);
    readonly appMessaging: IAppMessaging;
    readonly profile: IProfile;
}
