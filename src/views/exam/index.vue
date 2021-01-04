<template>
  <div class="app-container">    
    <div style="height:100%">      <!-- intViewEmployeeList -->
      <el-dialog  :title="$t('m.exam.exammanager')" :visible.sync="employManagerFormVisible" :before-close="employManagercloseDialog" :close-on-click-modal="false">
        <el-table
          v-loading="managerLoading"
          :data="intViewEmployeeList"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
           ref="employeeManagerTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleEmployeeManagerChange"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column :label="$t('m.exam.name')" align="center">
            <template slot-scope="scope">
              <span> {{ scope.row.name }} </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('m.exam.age')"  align="center">
            <template slot-scope="scope">
            {{ scope.row.age }} 
            </template>
          </el-table-column>
          <el-table-column :label="$t('m.exam.jobType')"  align="center">
            <template slot-scope="scope">
              {{ scope.row.jobType }} 
            </template>
          </el-table-column>    
          <el-table-column :label="$t('m.exam.livePassword')"  align="center">
            <template slot-scope="scope">
              {{ scope.row.livePassword }}
            </template>
          </el-table-column>   
          <el-table-column :label="$t('m.exam.qrUrl')"  align="center" width="150">
            <template slot-scope="scope">
              <el-popover
                  placement="left-start"
                  width="320"
                  trigger="hover" >
                  <vue-qr :text="scope.row.qrUrl"  colorDark="#000" colorLight="#fff"   :size="300" ></vue-qr>
                   <vue-qr :text="scope.row.qrUrl" :margin="0" colorDark="#000" colorLight="#fff"  :size="50" slot="reference"></vue-qr>
                </el-popover>
            
             
            </template>
          </el-table-column>         
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="deleteBtn" type="primary" @click.native.prevent="toIntViewDeleteEmployee()">{{$t('m.common.deleteBtn')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog  :title="$t('m.exam.examemployeeAdd')" :visible.sync="employListFormVisible" :before-close="employListcloseDialog" :close-on-click-modal="false">
        <el-table
          v-loading="listLoading"
          :data="employeeList"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
           ref="employeeListTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleEmployeeListChange"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column :label="$t('m.exam.name')" align="center">
            <template slot-scope="scope">
              <span> {{ scope.row.passportName }} </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('m.exam.age')"  align="center">
            <template slot-scope="scope">
            {{ scope.row.age }} 
            </template>
          </el-table-column>
          <el-table-column :label="$t('m.exam.jobType')"  align="center">
            <template slot-scope="scope">
              {{ scope.row.jobTypes }} 
            </template>
          </el-table-column>    
          
          </el-table-column>          
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="addbtn" type="primary" @click.native.prevent="toAddEmployee()">{{ $t('m.exam.examemployeeAdd') }}</el-button>
        </div>
      </el-dialog>
     <el-dialog  :title="$t('m.exam.examInfo')" :visible.sync="examFormVisible" :before-close="closeDialog" :close-on-click-modal="false">
        <el-form v-loading="examAddLoading" :model="examEditForm" :rules="rules" ref="examEditForm" label-width="100px" class="demo-ruleForm">
          <el-form-item  v-if="projectFlag"  :label="$t('m.exam.examid')" :label-width="formLabelWidth" >
          <el-input v-model="examEditForm.id" autocomplete="off" disabled></el-input>
        </el-form-item>
            <el-form-item  v-if="projectFlag"  :label="$t('m.exam.examprojectid')" :label-width="formLabelWidth" >
          <el-input v-model="examEditForm.projectId" autocomplete="off" disabled></el-input>
        </el-form-item>
         
        <el-form-item :label="$t('m.exam.scheduleDate')" :label-width="formLabelWidth" prop="scheduleDate">
          <el-date-picker
              v-model="examEditForm.scheduleDate"
              type="datetime"
              :placeholder="$t('m.exam.scheduleplacehoder')" >
            </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('m.exam.scheduleInfo')" :label-width="formLabelWidth" prop="scheduleInfo">
          <el-input v-model="examEditForm.scheduleInfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.exam.flightTicket')" :label-width="formLabelWidth" prop="flightTicket">
          <el-input v-model="examEditForm.flightTicket" autocomplete="off"></el-input>       
        </el-form-item>
        <el-form-item :label="$t('m.exam.hotel')" :label-width="formLabelWidth" prop="hotel">
            <el-input v-model="examEditForm.hotel" autocomplete="off"></el-input>            
        </el-form-item>       
        <el-form-item :label="$t('m.exam.flightAttachment')" :label-width="formLabelWidth" prop="flightAttachment">                  
                  <el-upload
                    ref="flightAttUpload"
                    class="upload-demo"
                    action="string"
                    accept="image/jpeg,image/png,image/jpg"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                    :http-request="uploadFlightAtt"
                    list-type="picture"
                    v-model="examEditForm.flightAttachment"
                    >
                    <el-button size="small" type="primary">{{$t('m.common.uploadbtn')}}</el-button>
                    <div slot="tip" class="el-upload__tip">{{$t('m.common.uploadtip')}}</div>
                    
                  </el-upload>
                </el-form-item>
                   <el-form-item :label="$t('m.exam.hotelAttachment')" :label-width="formLabelWidth" prop="hotelAttachment">
                  <el-upload
                    ref="AttUpload"
                    class="upload-demo"
                    action="string"
                    accept="image/jpeg,image/png,image/jpg"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                    :http-request="uploadHotel"
                    list-type="picture"
                    v-model="examEditForm.hotelAttachment"
                    >
                    <el-button size="small" type="primary">{{$t('m.common.uploadbtn')}}</el-button>
                    <div slot="tip" class="el-upload__tip">{{$t('m.common.uploadtip')}}</div>
                  </el-upload>
                </el-form-item>
        
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="closeDialog()">{{$t('m.common.cancelbtn')}}</el-button>
        <el-button type="primary" @click.native.prevent="submitExamAddForm('examEditForm')">{{$t('m.common.okbtn')}}</el-button>
      </div>
    </el-dialog> 
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
         <el-col :span="6">
            <el-button type="primary" v-if="examFlag" round @click.native.prevent="openExamDialog()">{{$t('m.exam.examadd')}}</el-button>
         </el-col>
       </el-row>         
    </div>
    <el-table
      v-loading="examlistLoading"
      :data="examList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
   
      <el-table-column :label="$t('m.exam.scheduleDate')" align="center" width="200px">
        <template slot-scope="scope">
          <span> {{ $moment(scope.row.scheduleDate).format('yyyy-MM-DD HH:mm:ss') }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.exam.scheduleInfo')"  align="center">
        <template slot-scope="scope">
         {{ scope.row.scheduleInfo }} 
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.exam.flightTicket')"  align="center">
        <template slot-scope="scope">
           {{ scope.row.flightTicket }} 
        </template>
      </el-table-column>    
      <el-table-column :label="$t('m.exam.hotel')"  align="center">
        <template slot-scope="scope">
           {{ scope.row.hotel }} 
        </template>
      </el-table-column> 
      <el-table-column :label="$t('m.exam.flightAttachment')"  align="center">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
            style="width: 100px; height: 100px"
            :src='getImgUrl(scope.row.flightAttachment)'
            ></el-image>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('m.exam.hotelAttachment')"  align="center">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
            style="width: 100px; height: 100px"
            :src='getImgUrl(scope.row.hotelAttachment)'
            ></el-image>
          </div>
          
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" :label="$t('m.common.handle')" width="150">
        <template slot-scope="scope">
          <el-link type="primary" class="common-writeBtn"  @click.native.prevent="deleteExamInfo(scope.row.id)">{{$t('m.common.deleteBtn')}}</el-link>
          <el-link type="primary" class="common-writeBtn"  @click.native.prevent="openExamDialog(scope.row.id)">{{$t('m.common.updateBtn')}}</el-link>
          <el-link type="primary" v-if="nowDateFunc(scope.row.scheduleDate)"  class="common-writeBtn"  @click.native.prevent="enterInterView(scope.row.id)">{{$t('m.exam.enterexam')}}</el-link>
        </template>
      </el-table-column>      
    </el-table>
    <el-row>
      <el-col :span="24">
        <span v-if="projectDetailFlag" style="margin:20px 0;font-weight:bold;display:block">用工需求信息</span>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="projectDetailList"
          border
          fit
          highlight-current-row
          v-if="projectDetailFlag"
        >
      
          <el-table-column :label="$t('m.common.tableindex')" align="center">
            <template slot-scope="scope">
              <span> {{ scope.$index+1 }} </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('m.exam.employeeType')"  align="center">
            <template slot-scope="scope">
            {{ scope.row.employeeType }} 
            </template>
          </el-table-column>
          <el-table-column :label="$t('m.exam.employeeNation')"  align="center">
            <template slot-scope="scope">
              {{ scope.row.employeeNation }} 
            </template>
          </el-table-column>    
          <el-table-column :label="$t('m.exam.employeeNum')"  align="center">
            <template slot-scope="scope">
              {{ scope.row.employeeNum }} 
            </template>
          </el-table-column> 
          <el-table-column :label="$t('m.exam.inViewnum')"  align="center">
            <template slot-scope="scope">
              {{ scope.row.inViewnum }}
            </template>
          </el-table-column> 
        
          <el-table-column align="center" prop="created_at" :label="$t('m.common.handle')" width="150">
            <template slot-scope="scope">
              <el-link type="primary" class="common-writeBtn"  @click.native.prevent="openEmployeeList(scope.row.id)">{{$t('m.exam.examemployeeAdd')}}</el-link>        
              <el-link type="primary" class="common-writeBtn"  @click.native.prevent="openEmployeeManager(scope.row.id)">{{$t('m.exam.examemployeemanager')}}</el-link>
            </template>
          </el-table-column>      
        </el-table>
      </el-col>
    </el-row>
    
     
  </div>
</template>

<script>

import vueQr from 'vue-qr'
import { allContract, contractDetail, contractDelete, contractAdd, contractUpdate } from '@/api/contract'
import { getProjectByCode } from '@/api/project'
import { commonUpload } from "@/api/uploadfile"
import { getExamList,getExamAdd,getExamDetail,getExamUpdate,getExamDelete,getInviewListDetails,intViewAddEmployee,intViewDeleteEmployee} from "@/api/exam"
import { employeeList, employeeListByInterview } from '@/api/company'
export default {
   components: {
        vueQr
   },
  data() {
    return {
       contractOption:[],
       projectOption:[],
       selectContractOption:'',
       selectProjectOption:'',
       fullscreenLoading:false,
       examlistLoading:false,
       examList:[],
       projectDetailList:[],
       examFlag:false,
       projectFlag:false,
       projectDetailFlag:false,
       employeeList:null,
       examId:'',
       addbtn:false,
       deleteBtn:false,
       enterExamFlag:false,
       contractBind:{code:"",name:""},
       projectBind:{id:"",name:""}, 
      firstcompanyInfo:{code:'',name:''},
      optcountry: [],
      fileList: [],
      imabaseUrl:'https://junxi-hr-manager.herokuapp.com',
      fileParam:{
        type:""
      },
      formLabelWidth:"120px",      
      examEditForm: {
        scheduleDate:'',
        scheduleInfo:'',
        flightTicket:'',
        hotel:'',
        flightAttachment:'',
        hotelAttachment:'',
        projectId:'',
        id:''
      },
      examEditInfo:{
         scheduleDate:'',
        scheduleInfo:'',
        flightTicket:'',
        hotel:'',
        flightAttachment:'',
        hotelAttachment:'',
        projectId:'',
        id:''
      },
      formLabelWidth: '120px',      
      rules: {
          scheduleInfo: [
            { required: true, message: this.$t('m.exam.rulemessage1'), trigger: 'blur' }
          ],          
          flightTicket: [
            { required: true, message: this.$t('m.exam.rulemessage2'), trigger: 'change' }
          ],
          scheduleDate: [
            { required: true, message: this.$t('m.exam.rulemessage3'), trigger: 'change' }
          ],
          hotel: [
            { required: true, message: this.$t('m.exam.rulemessage4'), trigger: 'change' }
          ],
          flightAttachment: [
            { required: true, message: this.$t('m.exam.rulemessage5'), trigger: 'blur' }
          ],
          hotelAttachment: [
            { required: true, message: this.$t('m.exam.rulemessage6'), trigger: 'blur' }
          ]
        },
        examListLoading: false,
        examFormVisible: false,
        examAddLoading: false,
        multipleSelection:[],
        employeeManagerSelection:[],
        listLoading:false,
        employListFormVisible:false,
        projectDetailId:'',
        intViewEmployeeList:null,
        employManagerFormVisible:false,
        managerLoading:false,
        srcList:[],
        interviewList:[
		{
			"id":954,
			"name":"耀杰.罗",
			"age":14,
			"jobType":"k6lg68",
			"qrUrl":"www.baidu.com",
			"livePassword":"fhav4j"
		}
	]

    }
  },
  created() {
    this.allContractData()
  },
  methods: {
    allContractData() {
         
      allContract().then(response => {    
      
      if(response.data.length>0){
        this.contractOption = response.data
        }
      }).catch(response =>{
         
        
      })
    },
    //获取图片地址
getImgUrl(icon){
  const fullUrl = this.imabaseUrl+icon
  this.srcList = fullUrl
   return fullUrl;
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
            message: this.$t('m.exam.rulemessage8')
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
            message: this.$t('m.exam.rulemessage8')
          });
          return false;
        }else{
          
          this.selectProjectOption = item.project.id
          this.projectBind.id =item.project.id
          this.projectBind.name = item.project.name
          this.projectDetailList = item.detail
          
          
        }
      },

      getProjectList(code){
        getProjectByCode(code).then(response => {
          this.projectOption=response.data
        }).catch(response => {

      })      
      
    },
    getExamLIst(){
      
      const projectId = this.selectProjectOption
      if(!projectId){
        this.$message({
            type: 'warning',
            message: this.$t('m.exam.rulemessage9')
          });
          return false;
      }else{
        this.projectDetailFlag = false
        this.examFlag = false
        this.fullscreenLoading = true
        this.examList=[]
        getExamList(projectId).then(response =>{
          this.fullscreenLoading = false       
          if(response.data){
            this.examFlag= false
            this.projectDetailFlag = true
            this.examId = response.data.id   
            this.examList.push(response.data)         
          this.getInterviewListDetail(response.data.id)

          //this.examEditInfo = response.data
          }else{
            this.examFlag = true
            this.projectDetailFlag = false
            this.examId = ''
          }
        }).catch(response =>{
            this.fullscreenLoading = false
            
            this.examFlag = false
            this.examId = ''

        })
      }
    },
    getInterviewListDetail(interviewId){
      if(this.projectDetailList.length>0){
       this.projectDetailList.forEach((item, index) => {        
           const params = {'interviewId':interviewId,'projectDetailId':item.id}
           console.log(params)
          getInviewListDetails(params).then(response =>{
            if(response.data.length>0){
                this.$set(this.projectDetailList[index],'inViewnum',response.data.length)
            }else{
              this.$set(this.projectDetailList[index],'inViewnum',0)
            }

          }).catch(response =>{               
              
            })   
        })
        
      }
    },
    deleteExamInfo(id){
      this.fullscreenLoading = true
      getExamDelete(id).then(response =>{
        this.fullscreenLoading = false
         this.examList=[]     
         this.getExamLIst()
      }).catch(response =>{
          this.fullscreenLoading = false   
          

      })
    },
    openExamDialog(id){
      this.resetform()
      this.examEditForm.projectId = this.projectBind.id
      this.examFormVisible = true
      if(id){
        this.projectFlag = true
        this.getExamDetailInfo(id)
      }else{
        this.projectFlag = false
      }

    },
    getExamDetailInfo(id){
      this.examAddLoading = true
      getExamDetail(id).then(response => {
        this.examAddLoading = false
        this.examEditForm=response.data
      }).catch(response =>{        
        this.examAddLoading = false       
              
            })   
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`文件上传限制选择 1 个文件`);
      },
      beforeUpload(file) {
        console.log("文件类型"+file.type)
        this.fileParam.type = file.type
        const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        console.log("isJPG"+isJPG)
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG格式!');
        }        
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG || isPNG && isLt2M;
      },
      uploadFlightAtt(param){
        this.UploadImage(param,'flight')
      },
      uploadHotel(param){
        this.UploadImage(param,'hotel')
      },
      UploadImage(param,type){
      const formData = new FormData()
      console.dir(formData.type)
      formData.append('file', param.file)
      formData.append('type', param.file.type)
      
      
      this.addExamLoading = true
      commonUpload(formData).then(response => {
      
         const imgUrl = response.data.url   
        //this.contractform.scanningCopyUrl = response.data.url
        if(type==='flight'){
          this.examEditForm.flightAttachment=imgUrl     
        }
        if(type==='hotel'){
          this.examEditForm.hotelAttachment=imgUrl
        }
        
      }).catch(response => {
        console.log('图片上传失败')
       // param.onError()
       this.addExamLoading = false
      })
    },
    submitExamAddForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if(!this.projectFlag){
            //this.contractform.scanningCopyUrl = this.imageUrl
            const param = {
              scheduleDate:this.examEditForm.scheduleDate,
              scheduleInfo:this.examEditForm.scheduleInfo,
              flightTicket:this.examEditForm.flightTicket,
              hotel:this.examEditForm.hotel,
              flightAttachment:this.examEditForm.flightAttachment,
              hotelAttachment:this.examEditForm.hotelAttachment,
              projectId:this.examEditForm.projectId
              
            };
            console.log(param);
            this.examAddLoading = true;
            //const paramstr = JSON.stringify(param);
            getExamAdd(param).then(response => {
              this.examAddLoading = false
              this.closeDialog()
              this.getExamLIst()
              
            }).catch(response => {
              this.examAddLoading = false
            })
             
          }else{
            const param = {
              scheduleDate:this.examEditForm.scheduleDate,
              scheduleInfo:this.examEditForm.scheduleInfo,
              flightTicket:this.examEditForm.flightTicket,
              hotel:this.examEditForm.hotel,
              flightAttachment:this.examEditForm.flightAttachment,
              hotelAttachment:this.examEditForm.hotelAttachment,
              projectId:this.examEditForm.projectId,
              id:this.examEditForm.id
              
            };
            console.log(param);
            this.examAddLoading = true;
            //const paramstr = JSON.stringify(param);
            getExamUpdate(param).then(response => {
              this.examAddLoading = false
              this.closeDialog()
              this.getExamLIst()
              
            }).catch(response => {
              this.examAddLoading = false
            })
          }
        }
      })
    },
    fileChange(file){
      this.$refs.examUpload.clearFiles() //清除文件对象
      
    },
      beforeRemove(file, fileList) {
        //return this.$confirm(`确定移除 ${ file.name }？`);

      },
      handleSucess(response,file, fileList){
        console.dir(response);
        this.imageUrl = response.data.url
      },
      closeDialog(){
        //this.examForm = this.resetContractForm()
        //this.$refs.examForm.resetFields()
        
	      this.examFormVisible = false
    },
    openEmployeeList(val){
      this.projectDetailId= val 
      this.employListFormVisible = true
      this.listLoading = true
      employeeListByInterview(this.examId).then(response => {
        this.employeeList=response.data
         this.listLoading = false
      }).catch(response => {
          this.listLoading = false
        })
    },
    
    //  toggleSelectionList(rows) {
    //     if (rows) {
    //       rows.forEach(row => {
    //         this.$refs.employeeListTable.toggleRowSelection(row);
    //       });
    //     } else {
    //       this.$refs.employeeListTable.clearSelection();
    //     }
    //   },
      handleEmployeeListChange(val) {
        
        this.multipleSelection = val
        if(this.multipleSelection.length>0){
          this.addbtn = true
        }else{
          this.addbtn = false
        }
      },
      // toggleSelectionManager(rows) {
      //   if (rows) {
      //     rows.forEach(row => {
      //       this.$refs.employeeManagerTable.toggleRowSelection(row);
      //     });
      //   } else {
      //     this.$refs.employeeManagerTable.clearSelection();
      //   }
      // },
      openEmployeeManager(val){
        this.projectDetailId= val
        this.employManagerFormVisible = true
        this.managerLoading= true        
         const params = {'interviewId': this.examId,'projectDetailId':val}
        getInviewListDetails(params).then(response =>{
          this.managerLoading= false
          if(response.data.length>0){
            this.deleteBtn = true
            this.intViewEmployeeList=response.data
          }else{
            this.deleteBtn = false
            this.intViewEmployeeList=null
          }
           
          }).catch(response =>{               
              this.managerLoading= false
            })   
      
      },
       handleEmployeeManagerChange(val) {
        
        this.employeeManagerSelection = val        
      },
    toAddEmployee(){
      let selectEmployArr =[]
      if(this.multipleSelection.length>0){        
        this.multipleSelection.forEach((item,index) =>{
          selectEmployArr.push(item.code)
        })
      const params= {'interviewId':this.examId,'projectDetailId':this.projectDetailId,'employeeCodes':selectEmployArr}
      console.log(params)
       this.listLoading = true
      intViewAddEmployee(params).then(response =>{
        this.listLoading = false
        this.employListcloseDialog()
         this.getExamLIst()
      }).catch(response => {
          this.listLoading = false
        })
       }else{
         return false
       }
     
    },
    toIntViewDeleteEmployee(){
      if(this.employeeManagerSelection.length>0){
        let selectEmployArr =[]
       this.employeeManagerSelection.forEach((item,index) =>{
         selectEmployArr.push(item.id)
       })
         console.log(selectEmployArr)
          const params= {'interviewId':this.examId,'interviewDetailIds':selectEmployArr,'projectDetailId':this.projectDetailId}
          this.managerLoading = true
          intViewDeleteEmployee(params).then(response =>{
             this.managerLoading = false
             this.employManagercloseDialog()
              this.getExamLIst()
          }).catch(response => {
               this.managerLoading = false
            })       
      }else{
        return false
      }
      
       
    },
    employListcloseDialog(){
      this.employListFormVisible = false
      this.projectDetailId=''
      this.multipleSelection=[]
      this.employeeList =null
        
    },
    employManagercloseDialog(){
      this.employManagerFormVisible = false
      this.employeeManagerSelection=[]
      this.intViewEmployeeList=null
         this.deleteBtn = false
    },
    resetform(){
      this.examEditForm= {
        scheduleDate:'',
        scheduleInfo:'',
        flightTicket:'',
        hotel:'',
        flightAttachment:'',
        hotelAttachment:'',
        projectId:'',
        id:''
      }
    },
    enterInterView(id){
      if(id){
        this.$router.push({ path: '/live/index', query: { id: id }});
      }else{
        this.$message.error(this.$t('m.exam.rulemessage7'));
      }
    }
  }
}
</script>
<style>
 .contract-dl-left{
    padding:10px 20%;
    text-align: left;
    font-size: 14px;
  }
  .contract-dl-left .title{
    font-weight: bold;
  }
  .contract-dl-right{
    width: 25%;
    padding:10px;
  }
  .common-writeBtn{
    margin-right:10px;
  }
</style>