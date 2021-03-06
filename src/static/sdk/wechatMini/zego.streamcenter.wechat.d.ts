/**
 ZegoStreamCenter
 */
import { ZegoStreamCenter } from '../common/ZegoStreamCenter';
import { LoggerWechat } from './zego.logger.wx';
import { ZegoDataReport } from '../common/zego.datareport';
import { StateCenter } from '../common/clientBase/stateCenter';
import { Logger } from '../common/zego.logger';
import { ERRO } from '../common/zego.entity';
export declare class ZegoStreamCenterWechat extends ZegoStreamCenter {
    dataReport: ZegoDataReport;
    playerList: any;
    playerCount: number;
    logger: LoggerWechat;
    playingList: any;
    publishingList: any;
    eventSeq: number;
    streamEventMap: any;
    streamReportMap: any;
    stateCenter: StateCenter;
    playerWaitingList: never[];
    playerStatistics: {};
    constructor(log: LoggerWechat | Logger, stateCenter: StateCenter, dataReport: ZegoDataReport);
    updatePlayingState(streamId: string, streamParams?: any, start?: boolean): boolean;
    updatePublishingState(streamId: string, streamParams?: string, start?: boolean): boolean;
    updateStreamState(streamID: string, start: boolean, streamParams: string, streamList: Array<{
        streamID: string;
        params: string;
    }>): void;
    isPlaying(): boolean;
    isPublishing(): boolean;
    startPlayingStream(streamId: string, streamUrlList: string[], dispatchType?: number): any;
    startPlayer(streamID: string, streamUrlList: string[], dispatchType: number, playerType: number): any;
    /**
     * "zpc.gnu"
     * @param streamID
     */
    getNextUrl(streamID: string): any;
    stopPlayingStream(streamId: string | undefined): void;
    stopPlayer(streamId: string | number): void;
    startPublishingStream(streamID: string, streamUrlList: string[], dispatchType?: number): any;
    stopPublishingStream(streamId: string | undefined): void;
    updatePlayerState(streamId: string, event: any): void;
    updatePlayerNetStatus(streamId: string, event: any): void;
    reset(): void;
    reportPublishEvent(streamId: string, error?: any): void;
    reportPlayEvent(streamId: string, error?: any): void;
    onPlayStateUpdate(type: number, streamId: string, error: ERRO): void;
    onPlayQualityUpdate(streamID: string, streamQuality: any): void;
    onPublishStateUpdate(type: number, streamId: string, error: number | {
        code: string | number;
        msg: string;
    } | undefined): void;
    onPublishQualityUpdate(streamId: string, streamQuality: any): void;
    onPublisherStreamUrlUpdate(streamId: any, url: any): void;
    onPublisherStreamUrlFail(code: number, msg: string): void;
    onPlayerStreamUrlUpdate(streamId: any, url: any): void;
    getReconnectLimit(sourceType: number): number;
    onPlayerStart(streamId: string, playerType: number): void;
    onPlayerStop(streamId: string, playerType: number, error: any): void;
    onPlayerRetry(streamId: string, playerType: number): void;
    onPlayerQuality(streamID: string, streamQuality: {
        videoBitrate: any;
        audioBitrate: any;
        videoFPS: any;
        videoHeight: any;
        videoWidth: any;
    }, playerType: number): void;
    onSoundLevelUpdate(soundLevelList: Array<{
        streamID: string;
        soundLevel: number;
        type: string;
    }>): void;
    onStreamUrlUpdate(streamId: string, url: string, playerType: number): void;
    getTotalStreamId(streamid: string): string;
    getRealStreamId(streamid: string): string;
}
