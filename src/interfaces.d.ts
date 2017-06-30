export interface IEventManager {
    subscribeToLocalEvent(eventType: string, handler: Function): any;
    unsubscribeFromLocalEvent(eventType: string, handler?: Function): any;
    isSubscribedToLocalEvent(eventType: string): boolean;
    publishLocalEvent(eventType: string, data: any): any;
}
export interface ILocalStorageData {
    getString(key: string): string;
    setString(key: string, data: string): any;
    getObject(key: string): Object;
    setObject(key: string, data: Object): boolean;
    remove(key: string): any;
}
export declare enum LogLevels {
    None = 0,
    Error = 1,
    Warn = 2,
    Debug = 3,
}
export declare enum LogPersistences {
    None = 0,
    IndexedDB = 1,
    LocalStorage = 2,
}
export interface ILogEvent {
    key?: number;
    logLevel: LogLevels;
    message: string;
    created: number;
    timestamp: string;
    data: any;
}
export interface ILogger {
    logLevel: LogLevels;
    log(message: String, data?: Object): Promise<boolean>;
    warn(message: String, data?: Object): Promise<boolean>;
    error(message: String, data?: Object): Promise<boolean>;
    clearLog(): Promise<boolean>;
    getLog(): Promise<string>;
}
export interface IRestClientResult {
    statusCode: number;
    response: any;
    headers: any;
}
export interface IRestClient {
    get(url: string, headers?: any): Promise<IRestClientResult>;
    post(url: string, headers: any, data: any): Promise<IRestClientResult>;
    put(url: string, headers: any, data: any): Promise<IRestClientResult>;
    patch(url: string, headers: any, data: any): Promise<IRestClientResult>;
    delete(url: string, headers: any): Promise<IRestClientResult>;
}
export interface IApiSpaceInfo {
    createdOn: string;
    id: string;
    name: string;
    updatedOn: string;
}
export interface IApiSpaceAuthInfo {
    audience: string;
    idClaim: string;
    issuer: string;
    sharedSecret: string;
}
export interface IApiSpaceManager {
    getToken(accountId: string, profileId: string): Promise<any>;
    createApiSpace(token: string, name: string): Promise<IApiSpaceInfo>;
    updateAuth(token: string, apiSpaceId: string, authInfo: IApiSpaceAuthInfo): Promise<IApiSpaceAuthInfo>;
}
export interface ISessionStartResponse {
    authenticationId: string;
    provider: string;
    nonce: string;
    expiresOn: string;
}
export interface ISession {
    id: string;
    profileId: string;
    deviceId: string;
    platform: string;
    platformVersion: string;
    sdkType: string;
    sdkVersion: string;
    sourceIp: string;
    isActive: boolean;
    createdOn: string;
    expiresOn: string;
}
export interface ISessionInfo {
    token: string;
    session: ISession;
}
export interface IBrowserInfo {
    name: string;
    version: string;
}
export declare enum Environment {
    development = 0,
    production = 1,
}
export interface ISessionManager {
    sessionInfo: ISessionInfo;
    getValidToken(): Promise<string>;
    startSession(): Promise<ISessionInfo>;
    endSession(): Promise<boolean>;
}
export interface INetworkManager {
    session: ISession;
    getValidToken(): Promise<string>;
    startSession(): Promise<ISessionInfo>;
    restartSession(): Promise<ISessionInfo>;
    endSession(): Promise<boolean>;
    ensureSessionAndSocket(): Promise<ISessionInfo>;
}
export interface IDeviceManager {
    setFCMPushDetails(sessionId: string, packageName: string, registrationId: string): Promise<boolean>;
    setAPNSPushDetails(sessionId: string, bundleId: string, environment: Environment, token: string): Promise<boolean>;
    removePushDetails(sessionId: string): Promise<boolean>;
}
export interface IFacebookManager {
    createSendToMessengerState(data?: any): Promise<any>;
}
export interface IAuthChallengeOptions {
    nonce: string;
}
export interface IAuthChallenge {
    (options: IAuthChallengeOptions, answerAuthenticationChallenge: Function): void;
}
export interface IFoundationRestUrls {
    conversations: string;
    conversation: string;
    participants: string;
    typing: string;
    push: string;
    facebook: string;
    events: string;
    messages: string;
    statusUpdates: string;
    profiles: string;
    profile: string;
    sessions: string;
    sessionStart: string;
    session: string;
}
export interface IEventMapping {
    [category: string]: string[];
}
export interface IComapiConfig {
    apiSpaceId: string;
    logRetentionHours: number;
    authChallenge?: IAuthChallenge;
    urlBase?: string;
    webSocketBase?: string;
    logLevel?: LogLevels;
    logPersistence?: LogPersistences;
    isTypingTimeout?: number;
    isTypingOffTimeout?: number;
    foundationRestUrls?: IFoundationRestUrls;
    eventMapping?: IEventMapping;
}
export interface IProfileManager {
    getProfile(id: string): Promise<any>;
    updateProfile(id: string, profile: Object, eTag?: string): Promise<any>;
    patchProfile(id: string, profile: Object, eTag?: string): Promise<any>;
    queryProfiles(query: string): Promise<any>;
}
export declare enum ConversationScope {
    public = 0,
    participant = 1,
}
export interface IConversationManager {
    createConversation(conversationDetails: IConversationDetails): Promise<IConversationDetails2>;
    updateConversation(conversationDetails: IConversationDetails, eTag?: string): Promise<IConversationDetails2>;
    deleteConversation(conversationId: string): Promise<boolean>;
    getConversation(conversationId: string): Promise<IConversationDetails2>;
    addParticipantsToConversation(conversationlId: string, participants: IConversationParticipant[]): Promise<boolean>;
    deleteParticipantsFromConversation(conversationId: string, participants: string[]): Promise<boolean>;
    getParticipantsInConversation(conversationId: string): Promise<IConversationParticipant[]>;
    getConversations(scope?: ConversationScope, profileId?: string): Promise<IConversationDetails2[]>;
    sendIsTyping(conversationId: string): Promise<boolean>;
    sendIsTypingOff(conversationId: string): Promise<boolean>;
}
export interface IConversationPrivelages {
    canSend: boolean;
    canAddParticipants: boolean;
    canRemoveParticipants: boolean;
}
export interface IConversationRoles {
    owner: IConversationPrivelages;
    participant: IConversationPrivelages;
}
export interface IConversationParticipant {
    id: string;
    role?: string;
}
export interface IConversationDetails {
    id: string;
    name: string;
    description?: string;
    roles: IConversationRoles;
    isPublic: boolean;
}
export interface IConversationDetails2 extends IConversationDetails {
    _createdOn: string;
    _etag?: string;
    _updatedOn: string;
    latestSentEventId?: number;
    participantCount?: number;
}
export interface ISendMessageResult {
    id: string;
    eventId: number;
}
export interface IConversationMessage {
    id?: string;
    sentEventId?: number;
    metadata?: any;
    context?: any;
    parts?: IMessagePart[];
    alert?: IMessageAlert;
    statusUpdates?: any;
}
export interface IConversationMessagesResult {
    earliestEventId: number;
    latestEventId: number;
    messages: IConversationMessage[];
    orphanedEvents?: any[];
}
export interface IMessageManager {
    sendMessageToConversation(conversationId: string, message: IConversationMessage): Promise<ISendMessageResult>;
    getConversationMessages(conversation: string, limit: number, from?: number): Promise<IConversationMessagesResult>;
    sendMessageStatusUpdates(conversation: string, statuses: IMessageStatus[]): Promise<any>;
    getConversationEvents(conversation: string, from: number, limit: number): Promise<IConversationMessageEvent[]>;
}
export interface IMessagePart {
    name?: string;
    type?: string;
    url?: string;
    data?: string;
    size?: number;
}
export interface IApnsAlert {
    badge?: number;
    sound?: string;
    alert: string;
    payload?: any;
}
export interface IFcmAlert {
    collapse_key?: string;
    data?: any;
    notification: {
        title: string;
        body: string;
    };
}
export interface IMessageAlert {
    text: string;
    platforms: {
        apns: IApnsAlert;
        fcm: IFcmAlert;
    };
}
export interface IMessageStatus {
    messageIds: string[];
    status: string;
    timestamp: string;
}
export interface IEventMapper {
    conversationDeleted(event: any): IConversationDeletedEventData;
    conversationUndeleted(event: any): IConversationUndeletedEventData;
    conversationUpdated(event: any): IConversationUpdatedEventData;
    participantAdded(event: any): IParticipantAddedEventData;
    participantRemoved(event: any): IParticipantRemovedEventData;
    participantTyping(event: any): IParticipantTypingEventData;
    participantTypingOff(event: any): IParticipantTypingOffEventData;
    conversationMessageSent(event: any): IConversationMessageEvent;
    conversationMessageRead(event: any): IConversationMessageEvent;
    conversationMessageDelivered(event: any): IConversationMessageEvent;
    profileUpdated(event: any): IProfileUpdatedEvent;
}
export interface IWebSocketManager {
    connect(): Promise<boolean>;
    disconnect(): Promise<boolean>;
    isConnected(): boolean;
    hasSocket(): boolean;
    send(data: any): void;
    generateInterval(k: number): number;
}
export interface IMessageSentPayload {
    messageId: string;
    metadata: any;
    context: any;
    parts: IMessagePart[];
    alert: IMessageAlert;
}
export interface IMessageStatusUpdatePayload {
    messageId: string;
    conversationId: string;
    profileId: string;
    timestamp: string;
}
export interface IConversationMessageEvent {
    eventId: string;
    name: string;
    conversationId: string;
    conversationEventId: number;
    payload: IMessageSentPayload | IMessageStatusUpdatePayload;
}
export interface IConversationDeletedEventData {
    conversationId: string;
    createdBy: string;
    timestamp: string;
}
export interface IConversationUndeletedEventData {
    conversationId: string;
    createdBy: string;
    timestamp: string;
}
export interface IConversationUpdatedEventData {
    conversationId: string;
    createdBy: string;
    name: string;
    description: string;
    roles: IConversationRoles;
    isPublic: boolean;
    timestamp: string;
    eTag: string;
}
export interface IParticipantAddedEventData {
    conversationId: string;
    createdBy: string;
    profileId: string;
    role: string;
    timestamp: string;
}
export interface IParticipantRemovedEventData {
    conversationId: string;
    createdBy: string;
    profileId: string;
    timestamp: string;
}
export interface IParticipantTypingEventData {
    conversationId: string;
    createdBy: string;
    profileId: string;
    timestamp: string;
}
export interface IParticipantTypingOffEventData {
    conversationId: string;
    createdBy: string;
    profileId: string;
    timestamp: string;
}
export interface IProfileUpdatedEvent {
    eTag: string;
    profile: any;
}
export interface IGetMessagesResponse {
    continuationToken?: number;
    earliestEventId?: number;
    latestEventId?: number;
    messages: IConversationMessage[];
}
export interface IAppMessaging {
    createConversation(conversationDetails: IConversationDetails): Promise<IConversationDetails2>;
    updateConversation(conversationDetails: IConversationDetails, eTag?: string): Promise<IConversationDetails2>;
    getConversation(conversationId: string): Promise<IConversationDetails2>;
    deleteConversation(conversationId: string): Promise<boolean>;
    addParticipantsToConversation(conversationId: string, participants: IConversationParticipant[]): Promise<boolean>;
    deleteParticipantsFromConversation(conversationId: string, participants: string[]): Promise<boolean>;
    getParticipantsInConversation(conversationId: string): Promise<IConversationParticipant[]>;
    getConversations(scope?: ConversationScope, profileId?: string): Promise<IConversationDetails2[]>;
    getConversationEvents(conversationId: string, from: number, limit: number): Promise<IConversationMessageEvent[]>;
    sendMessageToConversation(conversationId: string, message: IConversationMessage): Promise<ISendMessageResult>;
    sendMessageStatusUpdates(conversationId: string, statuses: IMessageStatus[]): Promise<any>;
    getMessages(conversationId: string, pageSize: number, continuationToken?: number): Promise<IGetMessagesResponse>;
    sendIsTyping(conversationId: string): Promise<boolean>;
    sendIsTypingOff(conversationId: string): Promise<boolean>;
}
export interface IProfile {
    getProfile(profileId: string): Promise<any>;
    queryProfiles(query?: string): Promise<any>;
    updateProfile(profileId: string, profile: any, eTag?: string): Promise<any>;
    patchProfile(id: string, profile: Object, eTag?: string): Promise<any>;
    getMyProfile(useEtag?: boolean): Promise<any>;
    updateMyProfile(profile: any, useEtag?: boolean): Promise<any>;
    patchMyProfile(profile: any, useEtag?: boolean): Promise<any>;
}
export interface IServices {
    appMessaging: IAppMessaging;
    profile: IProfile;
}
export interface IDevice {
    setFCMPushDetails(packageName: string, registrationId: string): Promise<boolean>;
    setAPNSPushDetails(bundleId: string, environment: Environment, token: string): Promise<boolean>;
    removePushDetails(): Promise<boolean>;
}
export interface IChannels {
    createFbOptInState(data?: any): Promise<any>;
}
export interface IOrphanedEventManager {
    clearAll(): Promise<boolean>;
    clear(conversationId: string): Promise<boolean>;
    getContinuationToken(conversationId: string): Promise<number>;
    setContinuationToken(conversationId: string, continuationToken: number): Promise<boolean>;
    addOrphanedEvent(event: IConversationMessageEvent): Promise<boolean>;
    removeOrphanedEvent(event: IConversationMessageEvent): Promise<boolean>;
    getOrphanedEvents(conversationId: string): Promise<IConversationMessageEvent[]>;
}
export interface IMessagePager {
    getMessages(conversationId: string, pageSize: number, continuationToken?: number): Promise<IGetMessagesResponse>;
    getOrphanedEvents(conversationId: string, orphanedEvents: any[]): Promise<IConversationMessageEvent[]>;
    markMessagesAsDelivered(id: string, messages: IConversationMessage[], userId: string): Promise<string>;
    resetConversation(conversationId: string): Promise<boolean>;
}
export interface IFoundation {
    services: IServices;
    device: IDevice;
    channels: IChannels;
    session: ISession;
    logger: ILogger;
    startSession(): Promise<ISession>;
    endSession(): Promise<boolean>;
    on(eventType: string, handler: Function): void;
    off(eventType: string, handler?: Function): void;
    getLogs(): Promise<string>;
}
