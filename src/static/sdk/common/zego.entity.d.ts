import { ZegoSignal } from './zego.signal';
import { ZegoPlayWeb } from '../webrtc/zego.play.web';
import { ZegoVideoCodec } from '../../types/index';
import { ZegoPublish } from '../webrtc/zego.publish';
import { TryStreamHandler } from '../webrtc/tryStreamHandler';
import { TryDispatchHandler } from '../webrtc/tryDispatchHandler';
export declare const PROTO_VERSION: any;
export declare const ROOMVERSION: any;
export declare enum ENUM_LOG_LEVEL {
    debug = 0,
    info = 1,
    warn = 2,
    error = 3,
    report = 99,
    disable = 100
}
export declare const LOG_LEVEL: {
    debug: number;
    info: number;
    warn: number;
    error: number;
    report: number;
    disable: number;
};
export declare enum ENUM_REMOTE_TYPE {
    disable = 0,
    websocket = 1,
    https = 2
}
export interface LogConfig {
    logLevel?: 'debug' | 'info' | 'warn' | 'error' | 'report' | 'disable';
    logURL?: string;
    remoteLogLevel?: 'debug' | 'info' | 'warn' | 'error' | 'report' | 'disable';
}
export interface WebConfig {
    nickName?: string;
    logLevel?: ENUM_LOG_LEVEL;
    logUrl?: string;
    remoteLogLevel?: ENUM_LOG_LEVEL;
    debug?: boolean;
    qualityInterval?: number;
    userUpdate?: boolean;
}
export interface WxConfig {
    nickName?: string;
    logLevel?: ENUM_LOG_LEVEL;
    logUrl?: string;
    remoteLogLevel?: ENUM_LOG_LEVEL;
    debug?: boolean;
    userUpdate?: boolean;
}
export interface User {
    userID: string;
    userName: string;
}
export interface RoomConfig {
    maxMemberCount?: number;
    userUpdate?: boolean;
}
interface CapabilityError {
    name?: string;
    message?: string;
}
export interface CapabilityDetection {
    webRTC: boolean;
    customCapture: boolean;
    camera: boolean;
    microphone: boolean;
    videoCodec: {
        H264: boolean;
        H265: boolean;
        VP8: boolean;
        VP9: boolean;
    };
    screenSharing: boolean;
    errInfo: {
        webRTC?: CapabilityError;
        customCapture?: CapabilityError;
        camera?: CapabilityError;
        microphone?: CapabilityError;
    };
}
export declare const sdkErrorList: {
    CLIENT: string;
    SERVER: string;
    SUCCESS: {
        code: string;
        msg: string;
    };
    PARAM: {
        code: string;
        msg: string;
    };
    HEARTBEAT_TIMEOUT: {
        code: string;
        msg: string;
    };
    LOGIN_TIMEOUT: {
        code: string;
        msg: string;
    };
    SEND_MSG_TIMEOUT: {
        code: string;
        msg: string;
    };
    RESET_QUEUE: {
        code: string;
        msg: string;
    };
    LOGIN_DISCONNECT: {
        code: string;
        msg: string;
    };
    KICK_OUT: {
        code: string;
        msg: string;
    };
    UNKNOWN: {
        code: string;
        msg: string;
    };
    FREQ_LIMITED: {
        code: string;
        msg: string;
    };
};
export declare const ERROR_CODES: {
    ROOM_SESSION_ID_ERR: number;
    FETCH_TRANS_UNKNOWN_CHANNEL: number;
    FETCH_TRANS_UNKNOWN_TYPE: number;
    FETCH_TRANS_WRONG_SEQ: number;
};
export interface DataStatisticsItemEvent {
    event: string;
    event_time: number;
    time_consumed?: number;
    msg_ext?: {
        [index: string]: string | number;
    };
}
export interface DataStatisticsItem {
    event_time: number;
    time_consumed: number;
    error: number;
    message: string;
    events: DataStatisticsItemEvent[];
    seq?: number;
    event_id?: string;
    msg_ext?: any;
    itemtype?: string;
    event?: string;
    client_type?: E_CLIENT_TYPE;
}
export interface DataStatistics {
    [index: string]: DataStatisticsItem;
}
export declare enum ENUM_SIGNAL_STATE {
    disconnected = 0,
    connecting = 1,
    connected = 2
}
export declare const ENUM_RESOLUTION_TYPE: {
    LOW: {
        width: number;
        height: number;
        frameRate: number;
        bitRate: number;
    };
    MEDIUM: {
        width: number;
        height: number;
        frameRate: number;
        bitRate: number;
    };
    HIGH: {
        width: number;
        height: number;
        frameRate: number;
        bitRate: number;
    };
};
export declare const ENUM_SCREEM_RESOLUTION_TYPE: {
    LOW: {
        frameRate: number;
        bitRate: number;
    };
    MEDIUM: {
        frameRate: number;
        bitRate: number;
    };
    HIGH: {
        frameRate: number;
        bitRate: number;
    };
};
export declare const ENUM_RETRY_STATE: {
    didNotStart: number;
    retrying: number;
    finished: number;
};
export declare const ENUM_PUBLISH_STATE: {
    start: number;
    waitingSessionRsp: number;
    waitingOffserRsp: number;
    waitingServerAnswer: number;
    waitingServerICE: number;
    connecting: number;
    publishing: number;
    stop: number;
    didNotStart: number;
};
export declare const ENUM_PLAY_STATE: {
    start: number;
    waitingSessionRsp: number;
    waitingOffserRsp: number;
    waitingServerAnswer: number;
    waitingServerICE: number;
    connecting: number;
    playing: number;
    stop: number;
    didNotStart: number;
};
export declare const ENUM_PLAY_STATE_NEGO: {
    stop: number;
    start: number;
    waiterAnswer: number;
    waitingCandidate: number;
    sendCandidate: number;
    iceConnected: number;
    iceDisconnected: number;
};
export interface VideoInfo {
    width: number;
    height: number;
    frameRate: number;
    bitRate: number;
    channelCount: number;
    audioBitrate: number;
}
export declare const ENUM_CONNECT_STATE: {
    disconnect: number;
    connecting: number;
    connected: number;
};
export declare const MAX_TRY_CONNECT_COUNT = 1;
export declare const SEND_MSG_RESET = 2;
export declare const SEND_MSG_TIMEOUT = 1;
export declare const MAX_TRY_HEARTBEAT_COUNT = 5;
export declare const MAX_STREAM_ID_LENGTH = 256;
export declare const MAX_USER_ID_LENGTH = 64;
export declare const MAX_USER_NAME_LENGTH = 256;
export declare const MAX_ROOM_ID_LENGTH = 128;
export declare const MAX_MESSAGE_LENGTH = 1024;
export declare const MAX_MIX_TASK_ID_LENGTH = 256;
export declare const MAX_TRANS_TYPE_LENGTH = 128;
export declare const MAX_TRANS_DATA_LENGTH: number;
export declare const ENUM_PUBLISH_STREAM_STATE: {
    waiting_url: number;
    tryPublish: number;
    update_info: number;
    publishing: number;
    stop: number;
};
export declare const ENUM_STREAM_SUB_CMD: {
    liveNone: number;
    liveBegin: number;
    liveEnd: number;
    liveUpdate: number;
};
export declare const ENUM_STREAM_UPDATE_TYPE: {
    added: number;
    deleted: number;
};
export declare enum ENUM_RUN_STATE {
    logout = 0,
    trylogin = 1,
    login = 2
}
export declare enum ENUM_NETWORK_STATE {
    offline = 0,
    online = 1
}
export declare const ENUM_PUBLISH_STATE_UPDATE: {
    start: number;
    error: number;
    retry: number;
};
export declare const ENUM_PLAY_STATE_UPDATE: {
    start: number;
    error: number;
    retry: number;
};
export interface StreamQuality {
    videoBitrate: number;
    videoFramesDecoded?: number;
    videoFramesDropped?: number;
    videoPacketsLostRate?: number;
    videoQuality?: number;
    videoWidth?: number;
    videoHeight?: number;
    audioBitrate: number;
    audioJitter?: number;
    audioLevel?: number;
    audioPacketsLost?: number;
    audioPacketsLostRate?: number;
    audioQuality?: number;
    audioSamplingRate?: number;
    audioSendLevel?: number;
    playData?: number;
    videoFPS: number;
    frameHeight: number;
    frameWidth: number;
    videoTransferFPS: number;
    audioCodec: string;
    nackCount: number;
    pliCount: number;
    totalRoundTripTime: number;
    currentRoundTripTime: number;
}
export interface StreamInfo {
    streamID: string;
    user: User;
    extraInfo: string;
    urlsFLV: string;
    urlsRTMP: string;
    urlsHLS: string;
    urlsHttpsFLV: string;
    urlsHttpsHLS: string;
}
export interface ERRO {
    code: number | string;
    msg: string;
}
export declare const MINIUM_HEARTBEAT_INTERVAL = 3000;
export declare const ENUM_STREAM_UPDATE_CMD: {
    added: number;
    deleted: number;
    updated: number;
};
export declare const SERVER_ERROR_CODE = 10000;
export declare const MIXSTREAM_ERROR_CODE = 10000;
export interface WaitingInfo {
    streamID: string;
    success: Function;
    error: Function | undefined;
}
export interface SignalInfo {
    signal: ZegoSignal;
    state: number;
    publishWaitingList: WaitingInfo[];
    playWaitingList: WaitingInfo[];
    publishConnectedList: string[];
    playConnectedList: string[];
    tokenInfo: any;
}
export interface ChargeInfo {
    is_publishing: number;
    play_stream_resolution_infos: Array<ResolutionInfo>;
    play_max_audio_bitrate: number;
}
export interface ResolutionInfo {
    video_width: number;
    video_height: number;
    count: number;
}
export interface ChargeInfos {
    itemtype: 'ChargeInfos';
    timestamp_begin: number;
    timestamp_end: number;
    timestamp_diff_flag: number;
    timestamp_diff: number;
    infos: Array<ChargeInfo>;
}
export interface PlayerInfo {
    seq: number;
    player: ZegoPlayWeb;
    signal: ZegoSignal | null;
    serverUrls: string[];
    streamID: string;
    playOption: webPlayOption | wxPlayOption;
    streamTryHandler: TryStreamHandler;
    tryDispatchHandler: TryDispatchHandler;
}
export interface PublisherInfo {
    seq: number;
    localStream: MediaStream | null;
    publisher: ZegoPublish;
    serverUrls: string[];
    streamID: string;
    publishOption: webPublishOption | wxPublishOption;
    cameraLabel?: string;
    microLabel: string;
    cameraDeviceId?: string;
    microDeviceId?: string;
    deviceStateCount: number;
    streamTryHandler: TryStreamHandler;
    tryDispatchHandler: TryDispatchHandler;
}
export declare enum QUALITYLEVEL {
    low = 1,
    stantard = 2,
    hight = 3,
    custome = 4
}
export interface MediaStreamConstraints {
    audio?: boolean;
    audioInput?: string;
    video?: boolean;
    facingMode?: string;
    videoInput?: string;
    videoQuality?: QUALITYLEVEL;
    externalCapture?: boolean;
    height?: number;
    frameRate?: number;
    width?: number;
    bitRate?: number;
    bitrate?: number;
    audioBitrate?: number;
    externalMediaStream?: MediaStream;
    noiseSuppression?: boolean;
    autoGainControl?: boolean;
    echoCancellation?: boolean;
    mediaSource?: 'screen' | 'application' | 'window';
    screen?: boolean;
    source?: HTMLElement | MediaStream;
    channelCount?: number;
}
export interface Constraints {
    camera?: {
        audio?: boolean;
        audioInput?: string;
        video?: boolean;
        height?: number;
        frameRate?: number;
        width?: number;
        bitRate?: number;
        bitrate?: number;
        audioBitrate?: number;
        facingMode?: string;
        videoInput?: string;
        videoQuality?: QUALITYLEVEL;
        channelCount?: number;
        ANS?: boolean;
        AGC?: boolean;
        AEC?: boolean;
    } | MediaStreamConstraints;
    screen?: {
        audio?: boolean;
        videoQuality?: 1 | 2 | 3 | 4;
        bitRate?: number;
        bitrate?: number;
        frameRate?: number;
        width?: number;
        height?: number;
    } | MediaStreamConstraints | boolean;
    custom?: {
        source: HTMLMediaElement | MediaStream;
        bitRate?: number;
        bitrate?: number;
        audioBitrate?: number;
        channelCount?: number;
    } | MediaStreamConstraints;
}
export interface PublishStreamConstraints {
    width?: number;
    height?: number;
    frameRate?: number;
    minBitrate?: number;
    maxBitrate?: number;
    ANS?: boolean;
    AGC?: boolean;
    AEC?: boolean;
}
export interface ScreenConfig {
    audio?: boolean;
    width?: number;
    height?: number;
    frameRate?: number;
    bitRate?: number;
}
export interface DeviceInfo {
    label: string;
    deviceID: string;
}
export interface Device {
    deviceName: string;
    deviceID: string;
}
export declare const ENUM_SIGNAL_SUB_CMD: {
    none: number;
    joinLiveRequest: number;
    joinLiveResult: number;
    joinLiveInvite: number;
    joinLiveStop: number;
};
export declare const ENUM_PUSH_SIGNAL_SUB_CMD: {
    none: number;
    pushJoinLiveRequest: number;
    pushJoinLiveResult: number;
    pushJoinLiveInvite: number;
    pushJoinLiveStop: number;
};
export interface ChatInfo {
    id_name: string;
    nick_name: string;
    role: number;
    msg_id: string;
    msg_category: number;
    msg_type: number;
    msg_content: string;
    send_time: number;
}
export interface UserInfo {
    userID: string;
    userName: string;
}
export interface MessageInfo {
    idName: string;
    nickName: string;
    messageId: string;
    category: number;
    type: number;
    content: string;
    time: number;
}
export interface AudioMixConfig {
    loop?: boolean;
    playTime?: number;
    streamID: string;
    effectID: string;
}
export interface CdnPushConfig {
    type: 'addpush' | 'delpush' | 'clearpush';
    streamID: string;
    pushUrl: string;
}
export interface WebQualityStats {
    video: {
        videoBitrate: number;
        videoFPS: number;
        videoTransferFPS?: number;
        frameHeight?: number;
        frameWidth?: number;
    };
    audio: {
        audioBitrate: number;
        audioCodec?: string;
        audioJitter?: number;
        audioLevel?: number;
        audioPacketsLost?: number;
        audioPacketsLostRate?: number;
        audioQuality?: number;
    };
    type: 1 | 0;
    roomId?: string;
    nackCount?: number;
    pliCount?: number;
    totalRoundTripTime?: number;
}
export interface WxQualityStats {
    video: {
        videoBitrate: number;
        videoFPS: number;
        videoHeight?: number;
        videoWidth?: number;
    };
    audio: {
        audioBitrate: number;
    };
}
export interface MixStreamConfig {
    taskID: string;
    inputList: Array<{
        streamID: string;
        contentType?: string;
        layout: {
            top: number;
            left: number;
            bottom: number;
            right: number;
        };
    }>;
    outputList: Array<string> | Array<{
        target: string;
    }>;
    outputConfig: {
        outputBitrate: number;
        outputFPS: number;
        outputFps?: number;
        outputWidth: number;
        outputHeight: number;
        outputAudioCodecID?: number;
        outputAudioBitrate?: number;
        outputAudioChannels?: number;
        singleStreamPassThrough?: boolean;
    };
}
export interface MixStreamAdvance {
    backgroundColor?: number;
    backgroundImage?: string;
    videoCodec?: 'VP8' | 'H264' | 'vp8' | 'h264';
    waterMark?: {
        image: string;
        layout: {
            top: number;
            bottom: number;
            left: number;
            right: number;
        };
    };
    extraParams?: Array<{
        key: string;
        value: string;
    }>;
}
export declare const ENUM_PUBLISH_STATE_NEGO: {
    stop: number;
    start: number;
    waiterAnswer: number;
    waitingCandidate: number;
    sendCandidate: number;
    iceConnected: number;
    iceDisconnected: number;
};
export interface WebPublishStats {
    video: {
        videoBitrate: number;
        videoFPS: number;
        videoTransferFPS: number;
        frameHeight: number;
        frameWidth: number;
        googCodecName: string;
        muteState: '0' | '1';
        videoPacketsLost: number;
        videoPacketsLostRate: number;
    };
    audio: {
        audioBitrate: number;
        audioCodec: string;
        googCodecName: string;
        muteState: '0' | '1';
        audioPacketsLost: number;
        audioPacketsLostRate: number;
        audioFPS: number;
    };
    streamID: string;
    nackCount: number;
    pliCount: number;
    totalRoundTripTime: number;
    currentRoundTripTime: number;
}
export interface WebPlayStats {
    video: {
        videoBitrate: number;
        videoFPS: number;
        videoTransferFPS: number;
        videoFramesDecoded: number;
        videoFramesDropped: number;
        videoPacketsLostRate: number;
        videoQuality: number;
        frameHeight: number;
        frameWidth: number;
        googCodecName: string;
        muteState: '0' | '1';
        videoPacketsLost: number;
    };
    audio: {
        audioBitrate: number;
        audioCodec: string;
        audioJitter: number;
        audioLevel: number;
        audioPacketsLost: number;
        audioPacketsLostRate: number;
        audioQuality: number;
        audioSamplingRate: number;
        audioSendLevel: number;
        muteState: '0' | '1';
        audioFPS: number;
    };
    streamID: string;
    nackCount: number;
    pliCount: number;
    totalRoundTripTime: number;
    playData: number;
    currentRoundTripTime: number;
}
export interface RoomExtraInfo {
    key: string;
    value: string;
    updateUser: User;
    updateTime: number;
}
export interface WebListener {
    roomUserUpdate: (roomID: string, updateType: 'DELETE' | 'ADD', userList: User[]) => void;
    roomOnlineUserCountUpdate: (roomID: string, userCount: number) => void;
    IMRecvCustomCommand: (roomID: string, fromUser: User, command: string) => void;
    IMRecvBroadcastMessage: (roomID: string, chatData: Array<{
        fromUser: User;
        message: string;
        sendTime: number;
        messageID: number;
    }>) => void;
    IMRecvBarrageMessage: (roomID: string, chatData: Array<{
        fromUser: User;
        message: string;
        sendTime: number;
        messageID: string;
    }>) => void;
    roomStreamUpdate: (roomID: string, updateType: 'DELETE' | 'ADD', streamList: StreamInfo[]) => void;
    streamExtraInfoUpdate: (roomID: string, streamList: {
        streamID: string;
        user: User;
        extraInfo: string;
    }[]) => void;
    playerStateUpdate: (result: {
        streamID: string;
        state: 'PLAYING' | 'NO_PLAY' | 'PLAY_REQUESTING';
        errorCode: number;
        extendedData: string;
    }) => void;
    publisherStateUpdate: (result: {
        streamID: string;
        state: 'PUBLISHING' | 'NO_PUBLISH' | 'PUBLISH_REQUESTING';
        errorCode: number;
        extendedData: string;
    }) => void;
    roomStateUpdate: (roomID: string, state: 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED', errorCode: number, extendedData: string) => void;
    screenSharingEnded: (stream: MediaStream) => void;
    publishQualityUpdate: (streamID: string, publishStats: WebPublishStats) => void;
    playQualityUpdate: (streamID: string, playStats: WebPlayStats) => void;
    remoteCameraStatusUpdate: (streamID: string, status: 'OPEN' | 'MUTE') => void;
    remoteMicStatusUpdate: (streamID: string, status: 'OPEN' | 'MUTE') => void;
    soundLevelUpdate: (soundLevelList: Array<{
        streamID: string;
        soundLevel: number;
        type: string;
    }>) => void;
    roomExtraInfoUpdate: (roomID: string, roomExtraInfoList: RoomExtraInfo[]) => void;
    videoDeviceStateChanged: (updateType: 'DELETE' | 'ADD', deviceInfo: Device) => void;
    audioDeviceStateChanged: (updateType: 'DELETE' | 'ADD', deviceType: 'Input' | 'Output', deviceInfo: Device) => void;
    deviceError: (errorCode: number, deviceName: string) => void;
}
export interface WxListener {
    roomUserUpdate: (roomID: string, updateType: 'DELETE' | 'ADD', userList: User[]) => void;
    roomOnlineUserCountUpdate: (roomID: string, userCount: number) => void;
    IMRecvCustomCommand: (roomID: string, fromUser: User, command: string) => void;
    IMRecvBroadcastMessage: (roomID: string, chatData: Array<{
        fromUser: User;
        message: string;
        sendTime: number;
        messageID: number;
    }>) => void;
    IMRecvBarrageMessage: (roomID: string, chatData: Array<{
        fromUser: User;
        message: string;
        sendTime: number;
        messageID: string;
    }>) => void;
    roomStreamUpdate: (roomID: string, updateType: 'DELETE' | 'ADD', streamList: StreamInfo[]) => void;
    streamExtraInfoUpdate: (roomID: string, streamList: {
        streamID: string;
        user: User;
        extraInfo: string;
    }[]) => void;
    playerStateUpdate: (result: {
        streamID: string;
        state: 'PLAYING' | 'NO_PLAY' | 'PLAY_REQUESTING';
        errorCode: number;
        extendedData: string;
    }) => void;
    publisherStateUpdate: (result: {
        streamID: string;
        state: 'PUBLISHING' | 'NO_PUBLISH' | 'PUBLISH_REQUESTING';
        errorCode: number;
        extendedData: string;
    }) => void;
    roomStateUpdate: (roomID: string, state: 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED', errorCode: number, extendedData: string) => void;
    publishQualityUpdate: (streamID: string, publishStats: WxQualityStats) => void;
    playQualityUpdate: (streamID: string, playStats: WxQualityStats) => void;
    soundLevelUpdate: (soundLevelList: Array<{
        streamID: string;
        soundLevel: number;
        type: string;
    }>) => void;
    roomExtraInfoUpdate: (roomID: string, roomExtraInfoList: RoomExtraInfo[]) => void;
}
export declare enum ENUM_PLAY_SOURCE_TYPE {
    cdn = 0,
    ultra = 1
}
export declare enum ENUM_BROADCASTER_STATUS {
    stop = 0,
    start = 1
}
export declare enum ENUM_DISPATCH_TYPE {
    cdn = 0,
    ultra = 1,
    customUrl = 2
}
export declare type webPublishOption = {
    streamParams?: string;
    extraInfo?: string;
    cdnUrl?: string;
    videoCodec?: ZegoVideoCodec;
};
export declare type wxPublishOption = {
    sourceType?: 'CDN' | 'BGP';
    streamParams?: string;
    extraInfo?: string;
};
export declare enum ENUM_SOURCE_TYPE {
    CDN = 0,
    BGP = 1
}
export declare type webPlayOption = {
    video?: boolean;
    audio?: boolean;
    streamParams?: string;
    videoCodec?: ZegoVideoCodec;
    cdnUrl?: string;
};
export declare type wxPlayOption = {
    streamParams?: string;
    isMix?: boolean;
};
export declare enum E_CLIENT_TYPE {
    ClientType_None = 0,
    ClientType_H5 = 1,
    ClientType_SmallPragram = 2,
    ClientType_Webrtc = 3
}
export declare class ListNode {
    _id: number | null;
    _data: any;
    next: ListNode | null;
    prev: ListNode | null;
    constructor(id?: number | null, data?: any);
    set id(id: number | null);
    get id(): null | number;
    set data(data: any);
    get data(): any;
    hasNext(): number | null;
    hasPrev(): number | null;
}
export declare class LinkedList {
    start: ListNode;
    end: ListNode;
    _idCounter: number;
    _numNodes: number;
    constructor();
    /**
     *   Inserts a node before another node in the linked list
     *   @param {Node} toInsertBefore
     *   @param {Node} node
     */
    insertBefore(toInsertBefore: ListNode, data: any): ListNode;
    /**
     *   Adds data wrapped in a Node object to the end of the linked list
     *   @param {object} data
     */
    addLast(data: any): ListNode;
    /**
     *   Alias for addLast
     *   @param {object} data
     */
    add(data: any): ListNode;
    /**
     *   Gets and returns the first node in the linked list or null
     *   @return {Node/null}
     */
    getFirst(): ListNode | null;
    /**
     *   Gets and returns the last node in the linked list or null
     *   @return {Node/null}
     */
    getLast(): ListNode | null;
    /**
     *   Gets and returns the size of the linked list
     *   @return {number}
     */
    size(): number;
    /**
     *   (Internal) Gets and returns the node at the specified index starting from the first in the linked list
     *   Use getAt instead of this function
     *   @param {number} index
     */
    getFromFirst(index: number): ListNode;
    /**
     *   Gets and returns the Node at the specified index in the linked list
     *   @param {number} index
     */
    get(index: number): ListNode | null;
    /**
     *   Removes and returns node from the linked list by rearranging pointers
     *   @param {Node} node
     *   @return {Node}
     */
    remove(node: ListNode): ListNode;
    /**
     *   Removes and returns the first node in the linked list if it exists, otherwise returns null
     *   @return {Node/null}
     */
    removeFirst(): ListNode | null;
    /**
     *   Removes and returns the last node in the linked list if it exists, otherwise returns null
     *   @return {Node/null}
     */
    removeLast(): ListNode | null;
    /**
     *   Removes all nodes from the list
     */
    removeAll(): void;
    /**
     *    Iterates the list calling the given fn for each node
     *    @param {function} fn
     */
    each(iterator: any): void;
    find(iterator: Function): ListNode | null;
    map(iterator: Function): ListNode[];
    /**
     *    Alias for addLast
     *    @param {object} data
     */
    push(data: any): ListNode;
    /**
     *    Performs insertBefore on the first node
     *    @param {object} data
     */
    unshift(data: any): void;
    /**
     *    Alias for removeLast
     */
    pop(): ListNode | null;
    /**
     *    Alias for removeFirst()
     */
    shift(): ListNode | null;
}
export {};
