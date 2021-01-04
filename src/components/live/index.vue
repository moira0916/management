<template>
  
  <div>
  <h2>test..{{msg}}</h2>
  <el-row>
  <el-col :span="8">
        <el-row>
        <el-col :span="12">
            <div class="col" id="">
                <div class="embed-responsive embed-responsive-16by9">
                   <video :src-object.prop.camel="video" autoplay controls v-for="video in videos"></video>
                 <!-- <video controls class="embed-responsive-item lazyload" autoplay playsinline muted id="">
                          Your browser does not support HTML5 video.
                     </video> -->
                 </div>
             </div>
        </el-col>
        <el-col :span="12" align=‘center’>
          <el-form >
         <el-form-item label="编号：" class="form-item"></el-form-item> 
         <el-form-item label="姓名：" class="form-item">xx</el-form-item> 
          <el-form-item label="年龄：" class="form-item">x</el-form-item>  
         <el-form-item label="工种：" class="form-item">x</el-form-item>
          <el-form-item label="打分：" class="form-item">
            <el-select  placeholder="打分" style="width:30%"  class="form-item">
             <el-option label="A" value="A"></el-option>
              <el-option label="B" value="B"></el-option>
              <el-option label="C" value="C"></el-option>
             <el-option label="D" value="D"></el-option>
            </el-select>
         </el-form-item>
          <el-form-item>
           <el-button type="primary" round @click="toSaveScore()" style="margin:10px 0" size="mini" class="form-item">完成打分</el-button>
         </el-form-item>
          </el-form>
         </el-col>
      </el-row>
    </el-col>
  </el-row> 
  </div>
</template>

<script>
export default {
 name: 'livecomponent',
  props: {
    msg: {
      type: String,
      default: 'test msg'
    }
  },
  methods: {
    
  },
  data(){
     return {
        roomId: "",
        loading: false,
        stopDisabled: true,
        startButton: 'Enter Room',
        videos: [],
        streamIds: []
    };
  }
}
</script>

<style scoped>

</style>
