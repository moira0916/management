import { TryHandler } from '../common/clientBase/retryHandler';
import { Logger } from '../common/zego.logger';
import { StateCenter } from '../common/clientBase/stateCenter';
import { webPublishOption, webPlayOption } from '../common/zego.entity';
import { ZegoStreamCenterWeb } from './zego.streamCenter.web';
import { SocketCenter } from '../common/clientBase/socketCenter';
export declare class TryDispatchHandler extends TryHandler {
    logger: Logger;
    stateCenter: StateCenter;
    streamCenter: ZegoStreamCenterWeb;
    socketCenter: SocketCenter;
    isPublish: boolean;
    streamID: string;
    playOption: webPublishOption | webPlayOption;
    retryActiveCount: number;
    RETRY_MAX_TIME: number;
    constructor(logger: Logger, stateCenter: StateCenter, socketCenter: SocketCenter, streamCenter: ZegoStreamCenterWeb);
    initStream(streamID: string, playOption: webPublishOption | webPlayOption, isPublish: boolean): void;
    active(firstInterval?: number): boolean;
    startMaxTime(): void;
    stopMaxTime(): void;
    onactive(...args: Array<any>): void;
}
