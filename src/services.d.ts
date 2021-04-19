import { IServices, IAppMessaging, IAppMessagingInternal, IProfile } from "./interfaces";
export declare class Services implements IServices {
    private _appMessaging;
    private _profile;
    /**
     * Services class constructor.
     * @class Services
     * @classdesc Class that implements Services interface
     * @parameter {AppMessaging} _appMessaging
     * @parameter {Profile} _profile
     */
    constructor(_appMessaging: IAppMessagingInternal, _profile: IProfile);
    /**
     * Method to get AppMessaging interface
     * @method Services#appMessaging
     * @returns {AppMessaging} - Returns AppMessaging interface
     */
    readonly appMessaging: IAppMessaging;
    /**
     * Method to get Profile interface
     * @method Services#profile
     * @returns {Profile} - Returns Profile interface
     */
    readonly profile: IProfile;
}
