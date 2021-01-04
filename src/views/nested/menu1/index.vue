<template>
<el-tabs type="border-card">
  <el-tab-pane label="木工考场">
    <div class="home">
    <div class="content">
      <el-container>
       <!-- <el-aside>
          <ul class="menu-list">
            <li v-for="(menu, index) of menuList" :key="index" @dragstart="dragItem(menu)" draggable="true">{{ index }}-{{ menu.name }}</li>
          </ul>
        </el-aside> -->
        <el-main>
          <div class="tips">
           <!-- <el-button-group>
              <el-button type="primary" @click="tabRow(1)">一等份</el-button>
              <el-button type="primary" @click="tabRow(2)">四等份</el-button>
              <el-button type="primary" @click="tabRow(3)">九等份</el-button>
              <el-button type="primary" @click="tabRow(4)">一十六等份</el-button>
            </el-button-group> -->
            <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="addVideo">添加</el-button> -->
            </div>
          <div class="video-list" style="flex-wrap:wrap;">
          <div class="flash-err" v-if="flashErrShow">
            <div slot="title">本页面视频技术采用Flash支撑，检测到您并未开启Flash，请按照后面的提示打开Flash，以便更好的服务于您！ 请先 <a href="http://get.adobe.com/cn/flashplayer" target="_blank"> 安装 </a> 或者 <a href="/flash_tutorial.pdf" target="_blank"> 启用 </a> Flash Player 插件</div>
          </div>
          <el-row :gutter="24">
            <el-col :span="rowNumber" v-for="(videoItem,index) of videoList" :key="index" :style="{height:videoItemHeight}">
              <div class="video-item" @drop="dropVideo(videoItem)" @dragover.prevent>
                <div class="video-item-nothing" v-if="!videoItem.playerOptions">未连接视频{{videoItem.id}}</div>
                <div v-if="videoItem.playerOptions" class="video-player" v-loading="videoItem.loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                  <video-player
                    class="vjs-custom-skin videoPlayer"
                    :options="videoItem.playerOptions"
                    ref="videoPlayer"
                    @play="onPlayerPlay($event,videoItem)"
                    @pause="onPlayerPause($event,videoItem)"
                    @ended="onPlayerEnded($event,videoItem)"
                    @ready="playerReadied($event,videoItem)"
                  ></video-player>
                </div>
                <div class="close-video" @click="delVideo(videoItem)" v-if="videoItem.playerOptions"><i class="el-icon-close"></i></div>
              </div>
            </el-col>
          </el-row>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
  </el-tab-pane>
  <el-tab-pane label="瓦工考场">

  </el-tab-pane>
  <el-tab-pane label="标签三">

  </el-tab-pane>
  <el-tab-pane label="标签四">

  </el-tab-pane>
</el-tabs>
  
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      flashErrShow: false,
      menuList: [
        {
          name: "张1",
          type: "rtmp/mp4",
          src: "rtmp://58.200.131.2:1935/livetv/hunantv",// 这里可以已湖南卫视为例
        },
        {
          name: "张2",
          type: "rtmp/mp4",
          src: "rtmp://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        },
        {
          name: "张3",
          type: "rtmp/mp4",
          src: "rtmp://58.200.131.2:1935/livetv/hunantv",
        },
        {
          name: "张4",
          type: "rtmp/mp4",
          src: "rtmp://xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        },
        {
          name: "张5",
          type: "rtmp/mp4",
          src: "rtmp://xxxxxxxxxxxxxxxxxxx",
        },
        {
          name: "张6",
          type: "rtmp/mp4",
          src: "rtmp://xxxxxxxxxxxxxxxxxxxxxxxxx",
        },
      ],
      menuItem:'',
      playerOptions: {
        height: "360",
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "rtmp/mp4",
            src: null,
          },
        ],
        poster: require('../../../assets/404_images/404_cloud.png'), // 封面图片
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        techOrder: ["flash"],
        controls: true,// 是否显示播放组件
      },
      videoList:[],
      // 总宽度为24份，默认的四个框的时候
      videoItemHeight: '50%',
      rowNumber: 12,
    };
  },
  computed: {
    // player() {
    //   return this.$refs.videoPlayer.player;
    // },
    // 检测浏览器是否启动flash 的公共方法
    
  },
  created(){
    this.tabRow(3)
  },
  mounted() {
    // console.log("this is current player instance object", this.player);
    // 检测浏览器是否安装flash的方法,下面的非 ie ActiveXObject 会报错
    let isFlash = navigator.plugins['Shockwave Flash'] ? true : false
    if(!isFlash){
      this.flashErrShow = true
    }
  },
  methods: {
    // 视频已经准备好了
    playerReadied(player) {
      console.log("the player is readied", player);
      // you can use it to do something...
      // player.[methods]
    },
    // 视频开始播放
    onPlayerPlay(player,videoItem) {
      videoItem.loading = false
      console.log("player play!", player);
    },
    // 视频暂停
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    // 视频播放完成
    onPlayerEnded(player) {
      console.log("player onPlayerEnded!", player);
    },
    // 拖拽
    dragItem(item){
      this.menuItem = item
    },
    // 拖拽以后放入
    dropVideo(videoItem){
      if(this.flashErrShow){
        this.$message.error('请先按照提示启用Flash！');
      }else{
        videoItem.loading = true
        // 先把值src的值挂载到this.playerOptions，再给把完整的playerOptions赋给到当前video的playerOptions
        this.playerOptions.sources[0]['src'] = this.menuItem.src
        videoItem.playerOptions = this.playerOptions
      }
    },
    // 添加视频布局的公共函数
    addVideo(forNum){
      this.videoList = []
      for (let index = 0; index < forNum; index++) {
        this.videoList.push({index:index,playerOptions:null,loading:false})
      }
    },
    // 删除
    delVideo(videoItem){
      videoItem.playerOptions = null
    },
    // 切换不同的窗口
    tabRow(rowNum){
      // 1*1 ，2*2，3*3,4*4，因为矩阵的 排 和 列 的个数都是一样的
      this.rowNumber = 24 / rowNum // 宽度
      this.videoItemHeight = (100 / rowNum) + '%' // 高度
      this.addVideo(rowNum * rowNum) // 个数
    }
  },
};
</script>
<style lang="scss" scoped>
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.video-item-nothing{
  text-align: center;
  position: absolute;
  top:45%;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.el-main {
  // background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0;
  text-align: none;
}

.el-container {
  height: 100vh;
}

.menu-list {
  li{
    height: 40px;
    line-height: 40px;
    text-align: left;
    padding: 0 10px;
    cursor: pointer;
    transition: all 1s ease;
  }
  li:hover{
    background: #e9eef3;
  }
}
.tips{
  background: #fff;
  padding:10px 20px;
  text-align:right;
  border-bottom: 1px solid #f2f2f2;
}
.video-list{
  padding: 10px 20px;
  height: calc(100vh - 100px);
  .el-row{
    height: 100%;
    padding-bottom: 10px;
    .el-col{
      padding-bottom: 12px;
      padding-left: 6px !important;
      padding-right: 6px !important;
    }
  }
  .video-item {
    width: 100%;
    height: 100%;
    background: #000;
    position: relative;
    box-shadow: 0px 5px 5px rgba($color: #000000, $alpha: 0.5);
    border-radius: 4px;
    .video-player{
      position: relative;
      box-sizing: border-box;
      height: 100% !important;
    }
    .close-video{
      position: absolute;
      top: 0;
      right: 5px;
      z-index: 100;
      width: 26px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      background: #fc0635;
      cursor: pointer;
      color: #fff;
      opacity: 0.7;
      display: none;
      transition: all 1s ease;
      border-radius: 0 0 10px 10px;
      i{
        font-size: 14px;
      }
    }
    .close-video:hover{
      opacity: 1;
    }
  }
  .video-item:hover{
    .close-video{
      display: block;
    }
  }
}
.btnAll {
  text-align: center;
  button {
    margin: 10px;
    padding: 10px 20px;
  }
}
.flash-err{
  margin-bottom: 10px;
  background: #fc0635;
  color: #fff;
  padding: 8px 0;
  font-size: 14px;

}
// 穿透 >>> 无效，/deep/ 报错 ::v-deep 是别名
.video-player ::v-deep .video-js.vjs-fluid{
    height: 100% !important;
    padding-top:0 !important;
}
// 播放按钮的修饰
.video-js .vjs-big-play-button{}
</style>