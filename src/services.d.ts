import { AppMessaging } from "./appMessaging";
import { Profile } from "./profile";
export declare class Services {
    private _appMessaging;
    private _profile;
    /**
     * Services class constructor.
     * @class Services
     * @classdesc Class that implements Services interface
     * @parameter {AppMessaging} _appMessaging
     * @parameter {Profile} _profile
     */
    constructor(_appMessaging: AppMessaging, _profile: Profile);
    /**
     * Method to get AppMessaging interface
     * @method Services#appMessaging
     * @returns {AppMessaging} - Returns AppMessaging interface
     */
    appMessaging: AppMessaging;
    /**
     * Method to get Profile interface
     * @method Services#profile
     * @returns {Profile} - Returns Profile interface
     */
    profile: Profile;
}
