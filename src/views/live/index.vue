<template>
  <div class="app-container" style="width:75%;margin-bottom:30px">    
    <el-row id="result_row">
        <el-col :span="24" align="right">
          <el-button :disabled="stopDisabled" @click.native.prevent="stopLive(true)" type="danger" round style="margin:20px">{{$t('m.live.exitexam')}}</el-button>
        </el-col>
        <el-col :span="12"   v-for="(employee,index) in employeeInfo" :key="index">
          <el-row>
          <el-col :span="14">
             
              <div class="embed-responsive embed-responsive-16by9">
                <video :src-object.prop.camel="employee.videos" autoplay controls ></video>                  
              </div>
              
          </el-col>
          <el-col :span="10" align='left'>
            <el-form :v-model="employee" :key="index" v-if="employee">
              <el-form-item :label="$t('m.live.employeecode')" class="form-item">{{employee.employeeCode}}</el-form-item> 
              <el-form-item :label="$t('m.live.name')" class="form-item">{{employee.username}}</el-form-item> 
                <el-form-item :label="$t('m.live.age')" class="form-item">{{employee.age}}</el-form-item>  
              <el-form-item :label="$t('m.live.jobtype')" class="form-item">{{employee.job}}</el-form-item>
                <el-form-item :label="$t('m.live.score')" class="form-item">
                  <el-select  :placeholder="$t('m.live.score')" style="width:30%" v-model="employee.score"   class="form-item">
                  <el-option label="A" value="A"></el-option>
                    <el-option label="B" value="B"></el-option>
                    <el-option label="C" value="C"></el-option>
                  <el-option label="D" value="D"></el-option>
                  </el-select>
              </el-form-item>
                <el-form-item>
                <el-button type="primary" round @click.native.prevent="toSaveScore(employee.employeeCode,employee.score,index)" style="margin:10px 0" size="small" class="form-item">{{$t('m.live.finish')}}</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAudienceVerify,getshowEmployee } from '@/api/live'
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
import { interViewScore } from "@/api/exam"

const appID = 770416104;
const server = 'wss://webliveroom-hk-test.zegocloud.com/ws';
const tokenUrl = 'https://wsliveroom-alpha.zego.im:8282/token';
let zg;
let streamCache = {};
let pullStreamIDCache = [];
let currentRoomID;
let published;



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
async function loginRooms(params){
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
    let id = params.roomId
    let userID = params.userId
    let userName = params.username
    let token = params.token
    const loginResult = await zg.loginRoom(id, token, {userID, userName},{
    userUpdate: true
});
    
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
export default {

  data() {
    // 初始化实例
    return {
      liveInfo:{
        token:"",
        userId:"",
        username:"",
        roomId:""
      },
      liveUserInfos:{
        username:'',
        employeeCode:'',
        age:'',
        job:'',
        score:'',
        videos:''
      },
      scoreBind:{id:"",name:""},
      player: null,
      roomId: "",
      loading: false,
      stopDisabled: true,
      startButton: 'Enter Room',
      videos: [],
      streamIds: [],
      employeeInfo:[]
    }
     
  },
  mounted() {
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
            this.stopDisabled = false;
           
        }
    });



 

zg.on('playQualityUpdate', (streamID,stats) => {
    // 拉流质量回调
})

zg.on('streamExtraInfoUpdate', (roomID, streamList) => {
       // console.log(`streamExtraInfoUpdate: room ${roomID},  `, JSON.stringify(streamList));
    });
    zg.on('playerStateUpdate', result => {
  
//处理拉流状态
        //console.log('拉流状态变更:' + JSON.stringify(result));
    });
   

    zg.on('roomStreamUpdate', async (roomID, updateType, streamList) => {
        //console.log('房间流更新,roomID:' + roomID + ',updateType:' + updateType + ',streamList:' + JSON.stringify(streamList));

        
        if (updateType === 'ADD') {
          
            streamList.forEach(async stream => {
                let streamID = stream.streamID;
                let userId = stream.user.userID
                const params = {'userId':userId,'roomId':roomID}                
                                
                this.streamIds.push(streamID) 
                const liveUserInfo={
                  username:'',
                  employeeCode:'',
                  age:'',
                  job:'',
                  score:'',
                  videos:''
                }
              liveUserInfo.videos =await zg.startPlayingStream(streamID) 
               await getshowEmployee(params).then( response =>{
                  liveUserInfo.employeeCode =response.data.employeeCode                 
                  liveUserInfo.username= response.data.username
                  liveUserInfo.age= response.data.age
                  liveUserInfo.job= response.data.job
                 this.employeeInfo.push(liveUserInfo)                                   
                })
                
            });
            
        } else if (updateType === 'DELETE') {
          streamList.forEach(stream => {
              let streamID = stream.streamID;
              let i = this.streamIds.indexOf(streamID);
              if (i > -1) {
                  zg.stopPlayingStream(streamID);
                  this.streamIds.splice(i, 1);
                  //this.videos.splice(i, 1);
                  this.employeeInfo.splice(i,1)
              }
          });
            // streamList.forEach(stream => {
            //     let streamID = stream.streamID;
            //     if (pullStreamIDCache.includes(streamID)) {
            //        // exitRoomPull(streamID);
            //     }
            // });
        }
    });
});

  },
  
// 销毁监听事件
destroyed() {
  this.stopLive()
},
  created() {
      this.fetchData()
      
  },
  methods: {
    fetchData() {  
      const id = this.$route.query.id
      if(id){
          this.getAudienceVerifyFunc(id)
      }else{        
      
      }     
      
    },
    getScoreOption(item) {
       this.$forceUpdate()
       
    },
    getAudienceVerifyFunc(id){
      this.resetObject()
      getAudienceVerify(id).then(response =>{
          if(response.data){
            if(response.data){
              this.liveInfo = response.data
              loginRooms(response.data)
            }else{

            }
            
          }
          
      }).catch(response =>{

      })
    },
    toSaveScore(employeecode,score,index){
      if(score){
        const params = {'employeeCode':employeecode,'roomId':this.liveInfo.roomId,'score':score}
      interViewScore(params).then(response =>{
         // zg.stopPlayingStream(this.streamIds[index]);
      }).catch(response =>{

      })
      }else{
        this.$message({
          type: 'warning',
          message: this.$t('m.live.message1')
        });
      }

      // const params = {'employeeCode':userId,'roomId':roomId,'score':score}
      // interViewScore(params).then(response =>{
      //     exitRoomPull(steamId)
      // }).catch(response =>{

      // })
    },
    resetObject(){
      this.liveInfo={
        token:"",
        userId:"",
        username:"",
        roomId:""
      }
    },
    async stopLive(btn) {
        this.streamIds.forEach(streamId => {
            zg.stopPlayingStream(streamId);
        });

        this.videos = []
        this.streamIds = []
        this.employeeInfo =[]
        zg.logoutRoom(this.liveInfo.roomId)
        this.stopDisabled = true
        if(btn){
          this.$router.push('/exam/index')
        }
        
    }
  }
}
</script>
<style  lang="less">
  .video-js{
    width:100%;
    height:100%;
    .no-video{
      display:flex;
      height:100%;
      font-size:14px;
      text-align:center;
      justify-content: center;
      align-items:center;
    }
  }
  
 video {
	object-fit:fill;
	width:90%;
	height:250px;
}
.form-item{
  margin-bottom: 0;
}
</style>