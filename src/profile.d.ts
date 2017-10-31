import { ILocalStorageData, IProfile, IProfileManager, INetworkManager } from "./interfaces";
export declare class Profile implements IProfile {
    private _networkManager;
    private _localStorage;
    private _profileManager;
    constructor(_networkManager: INetworkManager, _localStorage: ILocalStorageData, _profileManager: IProfileManager);
    getProfile(profileId: string): Promise<any>;
    queryProfiles(query?: string): Promise<any>;
    updateProfile(profileId: string, profile: any, eTag?: string): Promise<any>;
    patchProfile(profileId: string, profile: Object, eTag?: string): Promise<any>;
    getMyProfile(useEtag?: boolean): Promise<any>;
    updateMyProfile(profile: any, useEtag?: boolean): Promise<any>;
    patchMyProfile(profile: any, useEtag: boolean): Promise<any>;
    private getMyProfileETag(useEtag);
}
