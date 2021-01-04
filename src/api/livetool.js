
const appID = 770416104;
const server = 'wss://webliveroom-hk-test.zegocloud.com/ws';
const tokenUrl = 'https://wsliveroom-alpha.zego.im:8282/token';
let zg;
let streamCache = {};
let pullStreamIDCache = [];
let currentRoomID;
let published;

$(async () => {
    zg = new ZegoExpressEngine(appID, server);
    zg.setDebugVerbose(false);
    zg.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
        console.log('roomID:' + roomID);
        if (state == 'DISCONNECTED') {
            // 与房间断开了连接
            console.log('断开连接');
        }

        if (state == 'CONNECTING') {
            // 与房间尝试连接中
            console.log('连接中');
        }

        if (state == 'CONNECTED') {
            // 与房间连接成功
            console.log('连接成功');
            currentRoomID = roomID;
            let actor = $("input[name='radioSetOne']:checked").val();
            switch (actor) {
                case "host":
                    publishStream(roomID);
                    break;
                default:
                    console.log('拉流角色:' + actor);
            }
        }
    });

    $('#enter_btn').click(async () => {
       
    });

    zg.on('publisherStateUpdate', result => {
        // 推流状态变更通知
        console.log('推流状态变更:' + JSON.stringify(result));
    });

    zg.on('playerStateUpdate', result => {
//处理拉流状态
        console.log('拉流状态变更:' + JSON.stringify(result));
    });
    zg.on('roomStreamUpdate', async (roomID, updateType, streamList) => {
        console.log('房间流更新,roomID:' + roomID + ',updateType:' + updateType + ',streamList:' + JSON.stringify(streamList));
        if ($("input[name='radioSetOne']:checked").val() === 'host') {
            console.log('推流端，不拉流，直接结束');
            return;
        }

        if (updateType === 'ADD') {
            streamList.forEach(async stream => {
                let streamID = stream.streamID;
                if (!pullStreamIDCache.includes(streamID)) {
                    pullStreamIDCache.push(streamID);
                    $('<div class="col" id="room-' + streamID + '">\n' +
                        '                    <div class="embed-responsive embed-responsive-16by9">\n' +
                        '                        <video controls class="embed-responsive-item lazyload" autoplay playsinline muted id="' + streamID + '">\n' +
                        '                            Your browser does not support HTML5 video.\n' +
                        '                        </video>\n' +
                        '                    </div>\n' +
                        '                    <div class="text-center ">\n' +
                        '                        <a href="javascript:exitRoomPull(\'' + streamID + '\');" class="btn btn-dodger-blue btn-lg"><span\n' +
                        '                                class="icon-spacer feather-icon icon-power none"></span>exit room</a>\n' +
                        '                    </div>\n' +
                        '                </div>').appendTo($('#result_row'));

                    let $mediaObj = $('#' + streamID)[0];
                    $mediaObj.srcObject = await zg.startPlayingStream(streamID);
                    $mediaObj.muted = false;
                }
            });
        } else if (updateType === 'DELETE') {
            streamList.forEach(stream => {
                let streamID = stream.streamID;
                if (pullStreamIDCache.includes(streamID)) {
                    exitRoomPull(streamID);
                }
            });
        }
    });
});

function exitRoom(roomID, streamID) {
    zg.stopPublishingStream(streamID);
    zg.destroyStream(streamCache[streamID]);
    zg.logoutRoom(roomID);
    $('#room-' + streamID).remove();
}

function exitRoomPull(streamID) {
    zg.stopPlayingStream(streamID);
    let i = pullStreamIDCache.indexOf(streamID);
    if (i > -1) {
        pullStreamIDCache.splice(i, 1);
    }
    if (pullStreamIDCache.length === 0) {
        zg.logoutRoom(currentRoomID);
        currentRoomID = null;
    }
    $('#room-' + streamID).remove();
}
function loginRooms(){
     // 进入房间
     if (currentRoomID) {
        if (published) {
            exitRoom(currentRoomID, Object.keys(streamCache)[0]);
            streamCache = {};
            published = null;
        } else {
            Object.keys(streamCache).forEach(streamID => {
                zg.stopPlayingStream(streamID);
                $('#room-' + streamID).remove();
            });
            zg.logoutRoom(currentRoomID);
        }
    }
    let userID = 'userID-' + new Date().getTime();
    let userName = 'userName-' + new Date().getTime();
    let token = await $.get(tokenUrl, {'app_id': appID, 'id_name': userID});
    const loginResult = await zg.loginRoom($('#name').val(), token, {userID, userName});
    console.log('login result:' + loginResult);
}
async function publishStream(roomID) {
    const stream = await zg.createStream({
        camera: {
            audio: false,
            videoQuality: 4,
            width: 200,
            height: 680,
            frameRate: 30,
            bitrate: 1500
        }
    });
    let streamID = 'streamID-' + new Date().getTime();
    $('<div class="col" id="room-' + streamID + '">\n' +
        '                    <div class="embed-responsive embed-responsive-16by9">\n' +
        '                        <video controls class="embed-responsive-item lazyload" autoplay playsinline muted id="' + streamID + '">\n' +
        '                            Your browser does not support HTML5 video.\n' +
        '                        </video>\n' +
        '                    </div>\n' +
        '                    <div class="text-center ">\n' +
        '                        <a href="javascript:exitRoom(\'' + roomID + '\',\'' + streamID + '\');" class="btn btn-dodger-blue btn-lg"><span\n' +
        '                                class="icon-spacer feather-icon icon-power none"></span>exit room</a>\n' +
        '                    </div>\n' +
        '                </div>').appendTo($('#result_row'));
    let $mediaObj = $('#' + streamID)[0];
    console.log('找到的video对象是:' + JSON.stringify($mediaObj));
    $mediaObj.srcObject = stream;
    $mediaObj.muted = true;
    streamCache[streamID] = stream;
    zg.startPublishingStream(streamID, stream, {videoCodec: 'VP8'});
    published = true;
}