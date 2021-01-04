<template>
  <div class="app-container">    
    <div style="height:100%">    
      
    </div>
    <div style="padding:20px">
        <el-row>
         <el-col :span="6">
            <el-select
            v-model="contractBind.code"
              clearable
              :placeholder="$t('m.exam.contractPlacehoder')"
              @change="getcontractOption"
            >
              <el-option
                v-for="(item,index) in contractOption"
                :key="index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            </el-col>
            <el-col :span="6">
              <el-select
              v-model="projectBind.name"
              clearable
              :placeholder="$t('m.exam.projectPlacehoder')"
              @change="getprojectOption"
            >
              <el-option
                v-for="(item,index) in projectOption"
                :key="index"
                :label="item.project.name"
                :value="item"
              ></el-option>
            </el-select>
         </el-col>
         <el-col :span="6">
            <el-button type="primary" round @click.native.prevent="getExamLIst()" v-loading.fullscreen.lock="fullscreenLoading">{{$t('m.common.searchbtn')}}</el-button>
         </el-col>
        
       </el-row>         
    </div>
    <div style="padding:20px" v-if="interviewFlag">
        <el-form v-loading="scoreFormLoading" ref="scoreForm" :model="scoreForm" >
          <el-row>
            <el-col :span="24">
              <span style="font-size:16px;font-weight:bold">{{$t('m.exam.examInfo')}}</span>
          </el-col>
          <el-col :span="6">
                <el-form-item :label="$t('m.exam.examid')" :label-width="formLabelWidth" prop="">
                  {{ scoreForm.interview.id }}
                </el-form-item>
                
          </el-col>
          <el-col :span="18">
                <el-form-item :label="$t('m.exam.scheduleDate')" :label-width="formLabelWidth" prop="">
                  {{ $moment(scoreForm.interview.scheduleDate).format('yyyy-MM-DD HH:mm:ss') }}
                </el-form-item>
                
          </el-col>
          <el-col :span="24">
                <el-form-item :label="$t('m.exam.scheduleInfo')" :label-width="formLabelWidth" prop="">
                  {{ scoreForm.interview.scheduleInfo }}
                </el-form-item>
                
          </el-col>
           <el-col :span="24">
                <el-form-item :label="$t('m.exam.flightTicket')" :label-width="formLabelWidth" prop="">
                  {{ scoreForm.interview.flightTicket }}
                </el-form-item>
                
          </el-col>
          <el-col :span="24">
          <el-row  v-for="(item,index) in scoreForm.scores" :key="index">
            <el-col :span="14">
               
             <span style="font-size:16px;font-weight:bold;display:block;padding:10px 0"> {{ item.jobType }}{{$t('m.exam.examscorename')}} </span>
             
             <el-table :data="item.scores" row-key="employeeCode" ref="dragTable"  class="sort-box" fit highlight-current-row>
               
              <el-table-column align="center" :label="$t('m.exam.employeecode')" >
                <template slot-scope="scope">                
                {{ scope.row.employeeCode }}
                </template>
              </el-table-column>
              <el-table-column                
                :label="$t('m.exam.name')"
                align="center"
                >
                <template slot-scope="scope">
                {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('m.exam.age')" align="center"
                >
                <template slot-scope="scope">
                {{ scope.row.age }}
                </template>
              </el-table-column>
              <el-table-column  :label="$t('m.exam.examscorename')" align="center"
                >
                <template slot-scope="scope">
                {{ scope.row.score }}
                </template>
              </el-table-column>              
            </el-table>
            </el-col>
           </el-row>
          </el-col>
          <el-col :span="14" align="center">
            <el-button v-if="scoreForm.scores.length>0" style="margin:20px 0;width:200px" type="primary"  @click.native.prevent="saveSort()" >{{$t('m.exam.examscoresave')}} </el-button>
          </el-col>
          </el-row>
        </el-form>
  
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Sortable from 'sortablejs';
import { allContract, contractDetail, contractDelete, contractAdd, contractUpdate } from '@/api/contract'
import { getProjectByCode } from '@/api/project'
import { getExamList,getExamAdd,getExamDetail,getExamUpdate,getExamDelete,getInviewListDetails,intViewAddEmployee,intViewDeleteEmployee,interViewScores, updateScoreSort} from "@/api/exam"
import { employeeList, employeeListByInterview,} from '@/api/company'
export default {
  components: {
      draggable,
      Sortable
    },

  data() {
    return {       
      formLabelWidth:"180px", 
      contractOption:[],
       projectOption:[],
       selectContractOption:'',
       selectProjectOption:'',     
       contractBind:{code:"",name:""},
       projectBind:{id:"",name:""}, 
      firstcompanyInfo:{code:'',name:''},
      optcountry: [],
      scoreForm: {
        interview:{
          id:'',
          scheduleDate:'',
          scheduleInfo:'',
          flightTicket:'',
          hotel:'',
          flightAttachment:'',
          hotelAttachment:'',
          projectId:''        
        },
      scores:{}
      },
      scoreFormLoading:false,
      fullscreenLoading:false,
      scoreFormData:{"interview":{"id":239,"scheduleDate":"","scheduleInfo":"wjqg61","flightTicket":"8u7bnm","hotel":"rqb30m","flightAttachment":"wj0ybo","hotelAttachment":"nfwot8","projectId":346,"createTime":"2020-12-10","updateTime":"2020-12-10"},"scores":[{"jobType":"木工","scores":[{"employeeCode":"CN14322123","name":"张三1","age":22,"score":"A"},{"employeeCode":"CN188923","name":"张三2","age":22,"score":"A"},{"employeeCode":"CN1565623","name":"张三3","age":22,"score":"A"}]},{"jobType":"瓦工","scores":[{"employeeCode":"CN12454543","name":"张三1","age":22,"score":"A"},{"employeeCode":"CN126783","name":"张三2","age":22,"score":"A"},{"employeeCode":"CN1456623","name":"张三3","age":22,"score":"A"}]},{"jobType":"木工","scores":[{"employeeCode":"CN12333","name":"张三1","age":22,"score":"A"},{"employeeCode":"CN12903","name":"张三2","age":22,"score":"A"},{"employeeCode":"CN128883","name":"张三3","age":22,"score":"A"}]},{"jobType":"瓦工","scores":[{"employeeCode":"CN123777","name":"张三1","age":22,"score":"A"},{"employeeCode":"CN123666","name":"张三2","age":22,"score":"A"},{"employeeCode":"CN123345","name":"张三3","age":22,"score":"A"}]}]},
      sortable: null,
      oldList: [],
      newList: [],
      newScoreList:[],
      interviewFlag:false
    }
  },
  
  created() {
    this.allContractData()    
  },
  mounted() {
    // this.$nextTick(()=>{
    //    setTimeout(()=>{
    //      this.sortFn()
    //    },100)
    //   })    
  },
  updated(){
  },
  methods: {
     
     send(){
     },
     sortFn () {
        const _this = this
       const newScoreListObj = this.scoreForm.scores
       this.newScoreList=this.scoreForm.scores
        
      for(let i= 0;i<document.querySelectorAll('.sort-box tbody').length;i++){
       
        const el = document.querySelectorAll('.sort-box tbody')[i]

        this.sortable = Sortable.create(el, {
        setData: function(dataTransfer) {
          //  dataTransfer.setData('Text', '')
        },        
        onEnd: evt => {
          // alert(evt.item)  
          const accArr = _this.newScoreList[i].scores
            const targetRow = _this.newScoreList[i].scores.splice(evt.oldIndex, 1)[0]
            _this.newScoreList[i].scores.splice(evt.newIndex, 0, targetRow)
             console.dir(_this.newScoreList)
        }
      })
      }
      
        
    },
    saveSort(){
      const listObj = this.newScoreList
      this.newList =[]
      for(let i =0;i<listObj.length;i++){
        const scoresArr =[]
        for(let k =0;k<listObj[i].scores.length;k++){
           const scoresParam = {'sort':k,'employeeCode':listObj[i].scores[k].employeeCode}
          scoresArr.push(scoresParam)
        }
        const params = {'jobType':listObj[i].jobType,'scoreSortList':scoresArr}
        this.newList.push(params)
      }

      console.dir(this.newList)
      const params= {'interviewId':this.scoreForm.interview.id,'jobScoreSortList':this.newList}
      this.fullscreenLoading = true
           updateScoreSort(params).then(response =>{
             this.fullscreenLoading = false
            this.$message({
            type: 'success',
            message: '保存成功'
          });
          this.getExamLIst()
          }).catch(response => {
             this.fullscreenLoading = false
            })       
    },
    
    allContractData() {
         
      allContract().then(response => {    
      
      if(response.data.length>0){
        this.contractOption = response.data
        }
      }).catch(response =>{
         
        
      })
    },
 
nowDateFunc(startDate){
  const date = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')	
  const beginDate = this.$moment(startDate).format('YYYY-MM-DD HH:mm:ss') 

    if (date >= beginDate) { 
      return true
    } else {
     return false
      }

},
     getcontractOption(value) {
       this.$forceUpdate()
        if(!value){
          this.$message({
            type: 'warning',
            message: '请先选择合约信息'
          });
          return false;
        }else{
          this.projectBind={id:"",name:""} 
          this.selectContractOption = value
          this.getProjectList(value)
        }
      },
      getprojectOption(item) {
       this.$forceUpdate()
        if(!item){
          this.$message({
            type: 'warning',
            message: '请先选择合约信息'
          });
          return false;
        }else{
          
          this.selectProjectOption = item.project.id
          this.projectBind.id =item.project.id
          this.projectBind.name = item.project.name
        }
      },

      getProjectList(code){
        getProjectByCode(code).then(response => {
          this.projectOption=response.data
        }).catch(response => {
          this.projectOption ={}
      })      
      
    },
    getExamLIst(){
      
      const projectId = this.selectProjectOption
      if(!projectId){
        this.$message({
            type: 'warning',
            message: '请选择要查询的项目'
          });
          return false;
      }else{
        this.fullscreenLoading = true
        interViewScores(projectId).then(response =>{
          this.fullscreenLoading = false       
          if(response.data){    
            this.interviewFlag=true
            this.scoreForm = response.data
            this.$nextTick(()=>{
              setTimeout(()=>{
                this.sortFn()
              },100)
              }) 
          }else{
            this.interviewFlag=false
          }
        }).catch(response =>{
          this.interviewFlag=false
            this.fullscreenLoading = false
            
          //   if(this.scoreFormData){    
          //   this.interviewFlag=true
          //   this.scoreForm = this.scoreFormData
             
          //    this.$nextTick(()=>{
          //     setTimeout(()=>{
          //       this.sortFn()
          //     },100)
          //     })    
          // }else{
          //   this.interviewFlag=false
          // }
        })
      }
    },
    resetform(){
     
    }
    
  }
}
</script>
<style>

  .common-writeBtn{
    margin-right:10px;
  }
</style>