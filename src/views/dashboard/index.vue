<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="grid-content bg-purple div-Calendar">
          <el-calendar v-model="timeValue" id="calendar">
            <template slot="dateCell" slot-scope="{date, data}">
              <!--自定义内容-->
              <div @click="changeTime(date,data)">
                <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
                <div v-for="item in calendarData">
                  <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                    <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                        <div class="is-text-selected">{{item.content}}</div>
                    </div>
                    <div v-else></div>
                  </div>
                  <div v-else></div>
                </div>
              </div>
            </template>
          </el-calendar>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label">今日待办 ({{nowtask}}) </span>
              <el-tabs :tab-position="tabPosition" v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane name="first" >
                  <span slot="label">招聘</span>
                  <ul class="infinite-list" style="overflow:auto;width:100%;height:330px;margin:0;">
                    <li v-for="i in taskInfo" class="infinite-list-item">
                      <div class="taskClass" v-html="i.name">{{i.name}}</div>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane name="second">
                  <span slot="label">考试</span>
                  <ul class="infinite-list" style="overflow:auto;width:100%;height:330px;margin:0;">
                    <li v-for="i in taskInfo2" class="infinite-list-item">
                      <div class="taskClass" v-html="i.name">{{i.name}}</div>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane  name="third">
                  <span slot="label">入境安排</span>
                  <ul class="infinite-list" style="overflow:auto;width:100%;height:330px;margin:0;">
                    <li v-for="i in taskInfo3" class="infinite-list-item">
                      <div class="taskClass" v-html="i.name">{{i.name}}</div>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane  name="fourth">
                  <span slot="label">员工管理</span>
                  <ul class="infinite-list" style="overflow:auto;width:100%;height:330px;margin:0;">
                    <li v-for="i in taskInfo4" class="infinite-list-item">
                      <div class="taskClass" v-html="i.name">{{i.name}}</div>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label">周报 ({{weektask}}) </span>
              周报内容
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label">月报 ({{monthtask}}) </span>
              月报内容
            </el-tab-pane>
            <!--
              <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i> 今日待办 ({{nowtask}}) </span>
              今日待办
            </el-tab-pane>
            -->
          </el-tabs>          
        </div>
      </el-col>    
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">        
        <div class="grid-content bg-purple" style="padding:30px">
          <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel" @click="">
                <div class="card-panel-icon-wrapper icon-people">
                  <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">
                    全部员工
                  </div>
                  <count-to :start-val="0" :end-val="5330" :duration="2600" class="card-panel-num" />
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel" @click="">
                <div class="card-panel-icon-wrapper icon-message">
                  <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">
                    全职
                  </div>
                  <count-to :start-val="0" :end-val="2000" :duration="3000" class="card-panel-num" />
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel" @click="">
                <div class="card-panel-icon-wrapper icon-shopping">
                  <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">
                    实习
                  </div>
                  <count-to :start-val="0" :end-val="330" :duration="3200" class="card-panel-num" />
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel" @click="">
                <div class="card-panel-icon-wrapper icon-money">
                  <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">
                    劳务外包
                  </div>
                  <count-to :start-val="0" :end-val="3000" :duration="3600" class="card-panel-num" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="wrap">
          <div class="left">
            <div><el-progress type="dashboard" :percentage="percentage" :color="colors"></el-progress></div>
            <div><span slot="label" style="display: inline-block;width: 126px;text-align: center;color:#409EFF;">用工安全</span></div>          
          </div>
          <div class="right" >
              <ul>
              <li>员工风险行为<span class="" style="color:#E6A23C;"> 0 人</span></li>
              <li>重要资料不完整<span style="color:#E6A23C;"> 4 人</span></li>
            </ul>

          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">        
        <div class="grid-content bg-purple">
          <div class="memberInfo">
            <div class="memberLeft">员工异动
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                根据入/离职日期统计<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">根据入/离职日期统计2</el-dropdown-item>
                <el-dropdown-item command="b">根据入/离职日期统计3</el-dropdown-item>                
              </el-dropdown-menu>
            </el-dropdown>            
            </div>
            <div class="memberRight"> <el-link type="primary">更多报表</el-link> </div>
            <div style="clear:both;padding: 20px;">
              <el-radio-group v-model="memberPosition" style="margin-bottom: 30px;margin-right:30px;">
                <el-radio-button label="week">按周</el-radio-button>
                <el-radio-button label="month">按月</el-radio-button>                
              </el-radio-group>
              <el-dropdown>
                <el-button >
                  全公司<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>1</el-dropdown-item>
                  <el-dropdown-item>2</el-dropdown-item>
                  <el-dropdown-item>3</el-dropdown-item>
                  <el-dropdown-item>4</el-dropdown-item>
                  <el-dropdown-item>4</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <el-table
              :data="tableData"
              class="memberTable">
              <el-table-column
                prop="nb"
                label="序号"
                width="100">
              </el-table-column>              
              <el-table-column
                prop="name"
                label="姓名"
                width="150">
              </el-table-column>
              <el-table-column
                prop="department"
                label="所属部门"
                width="150">
              </el-table-column>
              <el-table-column
                prop="title"
                label="职位"
                width="150">
              </el-table-column>
              <el-table-column
                prop="phonenumber"
                label="手机号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                width="100">
              </el-table-column>
              <el-table-column
                prop="age"
                label="年龄"
                width="100">
              </el-table-column>
               <el-table-column
                prop="entrytime"
                label="入职时间"
                width="150">
              </el-table-column>
              <el-table-column
                prop="nature"
                label="工作性质"
                width="200">
              </el-table-column>
              <el-table-column
                prop="nationality"
                label="国籍"
                width="200">
              </el-table-column>
               <el-table-column
                prop="status"
                label="状态"
                width="80">
               </el-table-column>
            </el-table>
          </div>
          
  <!--  <div class="line" id="line" :style="{width: '300px', height: '300px'}"></div> -->

    <div style="background:#fff;padding:30px;">
      <span>近6周趋势</span>
    <!--chart标签就是画布元素，设置chart的宽和高可以改变画布大小-->
    <!--options绑定的数据实际配置项，对应echarts实例中的option后面的对象-->
    <chart :options='bar' :style="{width: '100%', height: '300px',background:'#fff'}"></chart>
  </div>

        </div>
      </el-col>
     
    </el-row>
    <!--<el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="10">
    <div
      style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
    >
      UP
    </div>
  </el-backtop>-->
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import CountTo from 'vue-count-to'


export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  components: {
    CountTo
  },
  data() {
      return {
        timeValue: new Date(),
        calendarData:[],
        nowtask:"12",
        weektask:"10",
        monthtask:"1",
        tabPosition: 'left',
        memberPosition:'week',
        activeName: 'first',
        taskInfo:[{id:1,name:"一、待确认招聘计划<br/>1、<br/>2、<br/>3、<br/>"},{id:2,name:"二、待确认招工文件<br/>1、<br/>2、<br/>3、<br/>"},{id:3,name:"三、待确认招聘计划<br/>1、<br/>2、<br/>3、<br/>"}],
        taskInfo2:[{id:1,name:"一、考试计划<br/>1、需确认工作<br/>1.1酒店预订单<br/>1.2机票行程单<br/>1.3签证办理"},{id:2,name:"二、考试计划<br/>1、需确认工作<br/>1.1酒店预订单<br/>1.2机票行程单<br/>1.3签证办理"},{id:3,name:"三、考试计划<br/>1、需确认工作<br/>1.1酒店预订单<br/>1.2机票行程单<br/>1.3签证办理"},{id:3,name:"四、考试计划<br/>1、需确认工作<br/>1.1酒店预订单<br/>1.2机票行程单<br/>1.3签证办理"}],
        taskInfo3:[{id:1,name:"一、接机安排<br/>1、1.航班号 hk123，时间 12：30 , 机场  利雅得国际机场T1， 人数 50人， 项目  利雅得房建， 招聘编<br/>2、<br/>3、<br/>"},{id:2,name:"二、待确认招工文件<br/>1、<br/>2、<br/>3、<br/>"},{id:3,name:"三、待确认招聘计划<br/>1、<br/>2、<br/>3、<br/>"}],
        taskInfo4:[{id:1,name:"一、证件办理提醒<br/>1、社保办理   10人<br/>2、合同续签   20人<br/>3、<br/>"},{id:2,name:"二、待确认招工文件<br/>1、<br/>2、<br/>3、<br/>"},{id:3,name:"三、待确认招聘计划<br/>1、<br/>2、<br/>3、<br/>"}],
        tableData: [{
            nb:"1",
            name: '王小虎',
            department:"人力资源部",
            title:"高级人力资源",
            phonenumber:"18951603113",
            sex:"男",
            age:"30岁",
            entrytime:"2014-09-01",
            nature:"全职",
            nationality:"中国",
            status:"休假",
          }, {
           nb:"1",
            name: '王小虎',
            department:"人力资源部",
            title:"高级人力资源，",
            phonenumber:"18951603113",
            sex:"男",
            age:"30岁",
            entrytime:"2014-09-01",
            nature:"兼职",
            nationality:"中国",
            status:"在职",
          }, {
           nb:"1",
            name: '王小虎',
            department:"人力资源部",
            title:"高级人力资源，",
            phonenumber:"18951603113",
            sex:"男",
            age:"30岁",
            entrytime:"2014-09-01",
            nature:"实习",
            nationality:"菲律宾",
            status:"休假",
          }, {
            nb:"1",
            name: '王小虎',
            department:"人力资源部",
            title:"高级人力资源，",
            phonenumber:"18951603113",
            sex:"男",
            age:"30岁",
            entrytime:"2014-09-01",
            nature:"劳务外包",
            nationality:"印度",
            status:"在职",
          }, {
            nb:"1",
            name: '王小虎',
            department:"人力资源部",
            title:"高级人力资源，",
            phonenumber:"18951603113",
            sex:"男",
            age:"30岁",
            entrytime:"2014-09-01",
            nature:"其他类型",
            nationality:"中国",
            status:"在职",
          }],
          bar:{
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['2019-09-01至2019-09-07', '2019-09-01至2019-09-07', '2019-09-01至2019-09-07', '2019-09-01至2019-09-07', '2019-09-01至2019-09-07', '2019-09-01至2019-09-07', '2019-09-01至2019-09-07'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
            ]
          },
          percentage: 40,
          colors: [
            {color: '#f56c6c', percentage: 20},
            {color: '#e6a23c', percentage: 40},
            {color: '#5cb87a', percentage: 60},
            {color: '#1989fa', percentage: 80},
            {color: '#6f7ad3', percentage: 100}
          ]
      }
    },  
  created(){
      this.$nextTick(() => {
        // 点击前一个月
        let prevBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(1)"
        );
        prevBtn.addEventListener("click", e => {
          let d = new Date(this.timeValue);
          let resDate = d.getFullYear() + '-' + this.handleTime((d.getMonth() + 1));//2020-08
        })
        //点击下一个月
        let nextBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(3)"
        );
        nextBtn.addEventListener("click", e => {
          let d = new Date(this.timeValue);
          let resDate = d.getFullYear() + '-' + this.handleTime((d.getMonth() + 1));//2020-10
        })
        //点击今天
        let todayBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(2)"
        );
        todayBtn.addEventListener("click", e => {
          let d = new Date(this.timeValue);
          let resDate = d.getFullYear() + '-' + this.handleTime((d.getMonth() + 1));//2020-09
        })

      });  
    
  },
  mounted(){
    this.calendarData.push({
          months: ["09","10"],//当前月
          days:["04","5","06"],//天
          content:''
        }),
         // 调用方法绘制图表
      this.drawLine();

        
    },
  methods:{
    //处理时间
    handleTime(s) {
      return s < 10 ? '0' + s : s
    },
    //点击天数
   changeTime(date, data) {
      //console.log(date,data);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCommand(command) {
        this.$message('click on item ' + command);
      },
     drawLine(){
          // 为charts选定父容器并初始化charts画布
          // let myChart = this.$echarts.init(document.getElementById('line'));
          // // 为图表添加数据
          // myChart.setOption({
          //     xAxis: {
          //         type: 'category',
          //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          //     },
          //     yAxis: {
          //         type: 'value'
          //     },
          //     series: [{
          //         data: [820, 932, 901, 934, 1290, 1330, 1320],
          //         type: 'line'
          //     }]
          // })                
      }

    
  }

}
</script>

<style lang="scss" scoped>
.infinite-list{padding:0;margin:0;}
.infinite-list li{padding:0;margin:0;list-style:none}
.dashboard {
  &-container {
    position:relative;
    padding:30px;
    background-color: #f0f2f5;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
 
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #fff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .item {
  margin-top: 10px;
  margin-right: 40px;
}
.el-calendar{
  border-right:1px solid #EBEEF5;
  border-bottom:1px solid #EBEEF5;
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.el-button:focus, .el-button:hover {
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}
.el-calendar-table tr td:focus, .el-calendar-table tr td:hover{
   color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}
.el-calendar-day {
  height: auto;
}
.div-Calendar {
  width: 100%;
  height: 100%;
  box-sizing: border-box;  
}

.calendar-day {
  text-align: center;
  line-height: 30px;
  font-size: 14px;
}
.is-text-selected {
  color: #F8A535;
  font-size: 10px;
}
#calendar .el-button-group>.el-button:not(:first-child):not(:last-child):after {
  content: '当月';
}
.el-tabs__item .is-left{
  background:#99a9bf;
}
.taskClass{
  font-size: 14px;
  color:#99a9bf;
  padding:10px 5px;
  line-height: 24px;
}
.memberInfo{
  position: relative;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding:15px;
  background:#fff;
}

.memberLeft{
  float:left;
  position: relative;
  line-height: 24px;
  color:#606266;
  padding-left:20px;
}
.memberRight{
float:right;
padding-right:20px;
font-size: 16px;
}
.el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

   .wrap {
        display: -webkit-box;
    }
    .wrap .left{
      width:35%;
       background:#fff;
       padding:20px 40px;
    }
    .wrap .right {
       width:65%;
       background:#fff;padding:10px; 
    }
  .wrap .right ul li{
    padding:0;margin:0;list-style:none;
    
    line-height: 44px;
  }
  .panel-group {
  margin-top: 0px;

  .card-panel-col {
    margin-bottom: 20px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
<style >
.el-tabs--border-card>.el-tabs__content{
  padding:0;
}
.el-tabs--left .el-tabs__header.is-left{
  width:125px;
}
.el-tabs--left.el-tabs--card .el-tabs__nav{
  border-bottom: none;
}
.memberTable{
  width: 100%;
}
.memberTable table tr th,.memberTable table tr td{
  text-align: center;
}

</style>