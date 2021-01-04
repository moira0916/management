<template>
  <div class="app-container">
    <!-- <el-dialog
      v-loading="detailLoading"
      title="项目详情"
      :visible.sync="projectDialogVisible"      
      width="30%"
      center>
      <el-form  ref="projectInfo" :model="projectInfo" >
      <el-row >
        <el-col :span="12">
          <el-form-item label="合约编码" :label-width="formLabelWidth" prop="">{{ projectInfo.project.contractCode }}</el-form-item>
          <span v-model="projectInfo.project.contractCode"></span>
        
        </el-col>
        <el-col :span="12">
        <div class="contract-dl-left"><span class="title">项目名称：</span>{{ projectInfo.project.name }}</div>
        </el-col>  
        <el-col :span="12">
          <div class="contract-dl-left"><span class="title">甲方公司编码：</span>{{ projectInfo.project.name }}</div>
      
        </el-col>  
        <el-col :span="12">
          <div class="contract-dl-left"><span class="title">甲方公司名称：</span>{{ projectInfo.project.name }}</div>
      
        </el-col>  
        <el-col :span="12">
          <div class="contract-dl-left"><span class="title">乙方公司编码：</span>{{ projectInfo.project.name }}</div>
     
        </el-col>  
        <el-col :span="12">
           <div class="contract-dl-left"><span class="title">乙方公司名称：</span>{{ projectInfo.project.name }}</div>
      
        </el-col>  
        <el-col :span="12">
          <div class="contract-dl-left"><span class="title">合同扫描件链接：</span>{{ projectInfo.project.name }}</div>
     
        </el-col>  
        <el-col :span="12">
           <div class="contract-dl-left"><span class="title">服务期限：</span>{{ projectInfo.project.name }}</div>
     
        </el-col>  
        <el-col :span="12">
           <div class="contract-dl-left"><span class="title">服务国别：</span>{{ projectInfo.project.name }}</div>
      
        </el-col>  
        <el-col :span="12">
          <div class="contract-dl-left"><span class="title">服务人数：</span>{{ projectInfo.project.name }}</div>
     
        </el-col>  
        <el-col :span="12">
           <div class="contract-dl-left"><span class="title">创建时间：</span>{{ projectInfo.project.name }}</div>
        </el-col>  
        <el-col :span="12">
        
        </el-col>  
        <el-col :span="12">
        
        </el-col>  
        <el-col :span="12">
        
        </el-col>  
        <el-col :span="12">
        
        </el-col>  
        <el-col :span="12">
        
        </el-col>  
      </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="contractDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>  -->
    <div style="height:100%"> 
    
    <el-dialog  :title="$t('m.project.projectAddBtn')" :visible.sync="projectFormVisible" :before-close="closeDialog" :close-on-click-modal="false">
      <el-form v-loading="updateProjectLoading" ref="projectform" :model="projectform" :rules="rules" >
        <el-row>
          <el-col :span="24">
              <el-form-item v-if="idshow" :label="$t('m.project.projectid')" :label-width="formLabelWidth" prop="">
                <el-input v-model="projectform.id" autocomplete="off"></el-input>
              </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item  :label="$t('m.project.contractCode')" :label-width="formLabelWidth" >
            <el-select
                v-model="projectform.contractCode"
                  clearable
                  :placeholder="$t('m.project.contractCodeplacehoder')"
                >
                  <el-option
                    v-for="(item,index) in contractOption"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item :label="$t('m.project.name')" :label-width="formLabelWidth" prop="">
              <el-input v-model="projectform.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item :label="$t('m.project.nation')" :label-width="formLabelWidth" prop="nation">
          <el-select
            v-model="projectform.nation"
            clearable
            :placeholder="$t('m.project.nationplacehoder')"
            style="width: 100%;"
          >
            <el-option
              v-for="item in optcountry"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.project.position')" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectform.position" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item :label="$t('m.project.interviewPlanDate')" :label-width="formLabelWidth" required>
          
              <el-date-picker type="date" :placeholder="$t('m.common.dateplacehoder')" format="yyyy-MM-dd" v-model="projectform.interviewPlanDate" style="width: 100%;"></el-date-picker>
           
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.project.contractType')" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectform.contractType" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item :label="$t('m.project.agencyCompany')" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectform.agencyCompany" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item :label="$t('m.project.contractCompany')" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectform.contractCompany" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.project.contractStartDate')" :label-width="formLabelWidth" prop="">
          <el-date-picker type="date" :placeholder="$t('m.project.startDateplaceHoder')" format="yyyy-MM-dd" v-model="projectform.contractStartDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item :label="$t('m.project.contractExpireDate')" :label-width="formLabelWidth" prop="">
          <el-date-picker type="date" :placeholder="$t('m.project.expireDateplaceHoder')" format="yyyy-MM-dd" v-model="projectform.contractExpireDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
          </el-col>
          <el-col :span="12">
                <el-form-item :label="$t('m.project.contractYearLimit')" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectform.contractYearLimit" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
               <el-form-item :label="$t('m.project.status')" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectform.status" autocomplete="off"></el-input>
        </el-form-item> 
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">{{$t('m.common.cancelbtn')}}</el-button>
        <el-button type="primary" @click="submitProjectForm('projectform')">{{$t('m.common.okbtn')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog  :title="$t('m.project.addprojectDetalbtn')" :visible.sync="projectdetailFormVisible" :before-close="projectDetailCloseDialog" :close-on-click-modal="false">
      <el-form v-loading="updateProjectDetailLoading" ref="projectdetailform" :model="projectdetailform" :rules="detailrules" >
        <el-row>
          <el-col :span="12">
              <el-form-item :label="$t('m.project.projectid')" :label-width="formLabelWidth" prop="">
                <el-input v-model="projectdetailform.projectId" autocomplete="off" disabled></el-input>
              </el-form-item>

          </el-col>
          <el-col :span="12">
              <el-form-item :label="$t('m.project.name')" :label-width="formLabelWidth" prop="">
                {{ projectName }}
              </el-form-item>

          </el-col>             
          <el-col :span="12">
              <el-form-item :label="$t('m.project.employeeNum')" :label-width="formLabelWidth" prop="">
              <el-input v-model="projectdetailform.employeeNum" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item :label="$t('m.project.employeeNation')" :label-width="formLabelWidth" prop="">
          <el-select
            v-model="projectdetailform.employeeNation"
            clearable
            :placeholder="$t('m.project.nationplacehoder')"
            style="width: 100%;"
          >
            <el-option
              v-for="item in optcountry"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.project.sourceCompany')" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectdetailform.sourceCompany" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item :label="$t('m.project.employeeType')" :label-width="formLabelWidth" prop="">
                <el-input v-model="projectdetailform.employeeType" autocomplete="off"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.project.employeeAge')" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectdetailform.employeeAge" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item :label="$t('m.project.credential')" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectdetailform.credential" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item :label="$t('m.project.wage')" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectdetailform.wage" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
           <el-col :span="12">
                <el-form-item :label="$t('m.project.other')" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectdetailform.other" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.project.arrivalDate')" :label-width="formLabelWidth" prop="">
          <el-date-picker type="date" :placeholder="$t('m.project.dateplacehoder')" format="yyyy-MM-dd" v-model="projectdetailform.arrivalDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
          </el-col>          
         
          <el-col :span="12">
            <el-form-item :label="$t('m.project.remark')" :label-width="formLabelWidth" prop="">
              <el-input v-model="projectdetailform.remark" autocomplete="off"></el-input>
            </el-form-item> 
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="projectDetailCloseDialog()">{{$t('m.common.cancelbtn')}}</el-button>
        <el-button type="primary" @click="submitProjectDetailForm('projectdetailform')">{{$t('m.common.okbtn')}}</el-button>
      </div>
    </el-dialog>
    </div>
    <div style="padding:20px">
       
       <el-row>
         <el-col :span="20">
        <el-select
        v-model="contractBind.code"
          clearable
          :placeholder="$t('m.project.contractCodeplacehoder')"
          @change="getStatusValue"
        >
          <el-option
            v-for="(item,index) in contractOption"
            :key="index"
            :label="item.name"
            :value="item.code"
           ></el-option>
        </el-select>
         </el-col>
         <el-col :span="4">
            <el-button type="primary" round @click.native.prevent="toProjectAdd()">{{$t('m.project.projectAddBtn')}}</el-button>
         </el-col>
       </el-row>
         
    </div>

    <el-table
      v-loading="projectlistLoading"
      :data="projectList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      default-expand-all
    >
      <el-table-column type="expand">
      <template slot-scope="pcope">
          <el-table 
            :data="pcope.row.detail"
            border
            fit
            highlight-current-row
          >
              <el-table-column align="center" :label="$t('m.common.tableindex')" >
                <template slot-scope="scope">
                  {{ scope.$index+1 }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.project.employeeNum')" align="center" >
                <template slot-scope="scope">
                  {{ scope.row.employeeNum }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.project.employeeNation')" align="center" >
                <template slot-scope="scope">
                  {{ scope.row.employeeNation }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.project.sourceCompany')" align="center" >
                <template slot-scope="scope">
                  {{ scope.row.sourceCompany }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.project.employeeType')" align="center" >
                <template slot-scope="scope">
                  {{ scope.row.employeeType }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.project.employeeAge')" align="center" >
                <template slot-scope="scope">
                  {{ scope.row.employeeAge }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.project.credential')" align="center" >
                <template slot-scope="scope">
                  {{ scope.row.credential }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.project.wage')" align="center" >
                <template slot-scope="scope">
                  {{ scope.row.wage }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.project.other')" align="center" >
                <template slot-scope="scope">
                  {{ scope.row.other }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.project.arrivalDate')" align="center" >
                <template slot-scope="scope">
                  {{ $moment(scope.row.arrivalDate).format('YYYY-MM-DD') }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.project.remark')" align="center" >
                <template slot-scope="scope">
                  {{ scope.row.remark }}
                </template>
              </el-table-column>
              
              
              <el-table-column align="center" prop="created_at" :label="$t('m.common.handle')" width="150">
                <template slot-scope="scope">
                  <el-link type="primary" class="common-writeBtn"  @click.native.prevent="toAddProjectDetail(pcope.row)">{{$t('m.common.updateBtn')}}</el-link>
                  <el-link type="primary" class="common-writeBtn"  @click.native.prevent="toDeleteProjectDetail(scope.row.id)">{{$t('m.common.deleteBtn')}}</el-link>
                  <!-- <el-link type="primary" class="common-writeBtn"  @click.native.prevent="toAddProjectDetail(scope.row)">添加项目员工</el-link> -->
                </template>
              </el-table-column>
          </el-table>
      </template>
    </el-table-column>
      <el-table-column align="center" :label="$t('m.common.tableindex')" >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.project.contractid')" align="center" >
        <template slot-scope="scope">
          {{ scope.row.project.contractCode }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.project.name')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.project.nation')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.nation }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.project.position')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.position }}
        </template>
      </el-table-column>     
      <el-table-column :label="$t('m.project.interviewPlanDate')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.interviewPlanDate }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.project.contractType')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.contractType }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.project.agencyCompany')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.agencyCompany }}
        </template>
      </el-table-column>
       <el-table-column :label="$t('m.project.contractCompany')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.contractCompany }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.project.contractYearLimit')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.contractYearLimit }}年
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.project.contractDate')"  align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.project.contractStartDate).format('YYYY-MM-DD') }}至{{ $moment(scope.row.project.contractExpireDate).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.project.status')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.status }}
        </template>
      </el-table-column>
      
      <el-table-column align="center" prop="created_at" :label="$t('m.common.handle')" width="150">
        <template slot-scope="scope">
          <el-link class="common-writeBtn" type="primary" @click.native.prevent="toProjectUpdate(scope.row.project)">{{$t('m.common.updateBtn')}}</el-link>
          <el-link class="common-writeBtn" type="primary" @click.native.prevent="toProjectDelete(scope.row.project.id)">{{$t('m.common.deleteBtn')}}</el-link>
          
          <el-link type="primary" class="common-writeBtn"  @click.native.prevent="toAddProjectDetail(scope.row)">{{$t('m.project.addprojectDetail')}}</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allContract } from '@/api/contract'
import { getProjectByCode,projectAdd,projectDelete,projectDetail,projectUpdate,projectDetailAdd,projectDetailUpdate,projectDetailDelete } from '@/api/project'
import { allCountries} from '@/api/allcompany'
import { commonUpload } from "@/api/uploadfile"
export default {
  
  data() {
    return {
      projectList:null,      
      projectName:'',
      projectId:'',
      projectDialogVisible: false,
      projectFormVisible: false,
      optcountry: [],
      contractBind:{code:"",name:""},
      contractOption:[],
      fileList: [],
      selectContractOption:'',
      fileParam:{
        type:""
      },
      idshow:false,
      projectform: {
          id:'',
          contractCode:'',
          name:'',
          nation:'',
          position:'',
          interviewPlanDate:'',
          contractType:'',
          agencyCompany:'',
          contractCompany:'',
          contractStartDate:'',
          contractExpireDate:'',
          contractYearLimit:'',
          status:'',
        },
        projectdetailform:{
          projectId:'',
          id:'',
          employeeNum:'',
          employeeNation:'',
          sourceCompany:'',
          employeeType:'',
          employeeAge:'',
          credential:'',
          wage:'',
          other:'',
          arrivalDate:'',
          remark:''
        },
      formLabelWidth: '120px',
      projectInfo:{        
          project:{
            contractCode:'',
            name:'',
            nation:'',
            position:'',
            interviewPlanDate:'',
            contractType:'',
            agencyCompany:'',
            contractCompany:'',
            contractStartDate:'',
            contractExpireDate:'',
            contractYearLimit:'',
            status:''
          },
          detail:[]
      },
      rules: {
          name: [
            { required: true, message: '请输入合约名称', trigger: 'blur' },
            { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
          ],
          firstPartyCode: [
            { required: true, message: '请选择甲方公司', trigger: 'change' }
          ],
          secondPartyCode: [
            { required: true, message: '请选择乙方公司', trigger: 'change' }
          ],
          expireDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          nation: [
            { required: true, message: '请选择国家', trigger: 'change' }
          ],
          scanningCopyUrl: [
            { required: true, message: '请上传合约扫描件', trigger: 'blur' }
          ],
          employeeNumber: [
            { required: true, message: '请输入合约人数', trigger: 'blur' }
          ]
        },
        detailrules: {
          name: [
            { required: true, message: '请输入合约名称', trigger: 'blur' },
            { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
          ],
          firstPartyCode: [
            { required: true, message: '请选择甲方公司', trigger: 'change' }
          ],
          secondPartyCode: [
            { required: true, message: '请选择乙方公司', trigger: 'change' }
          ],
          expireDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          nation: [
            { required: true, message: '请选择国家', trigger: 'change' }
          ],
          scanningCopyUrl: [
            { required: true, message: '请上传合约扫描件', trigger: 'blur' }
          ],
          employeeNumber: [
            { required: true, message: '请输入合约人数', trigger: 'blur' }
          ]
        },
        imageUrl: 'www.xn---xn--2yw-r93q.com',
        contractResponse:{"code":593,"err_msg":"tw4jdr","data":[{"name":"天磊.姜","code":"28655","firstParty":"d0uk2q","secondParty":"l66kl0","expireDate":"2020-11-26","nation":"jb7mac","createTime":"2020-11-26"},{"name":"天磊.姜2","code":"28657","firstParty":"d0uk2q","secondParty":"l66kl0","expireDate":"2020-11-26","nation":"jb7mac","createTime":"2020-11-26"},{"name":"天磊.姜3","code":"28659","firstParty":"d0uk2q","secondParty":"l66kl0","expireDate":"2020-11-26","nation":"jb7mac","createTime":"2020-11-26"}]},
        projectListResponse:{"code":0,"err_msg":"5xvgzf","data":[{"project":{"contractCode":"28655","name":"天磊.姜","nation":"aiiks9","position":"vqersi","interviewPlanDate":2020-11-26,"contractType":"8xnq2u","agencyCompany":"郑-卢","contractCompany":"郑-卢","contractStartDate":2020-11-26,"contractExpireDate":2020-11-26,"contractYearLimit":10,"status":"kb2li7"},"detail":[{"projectId":990,"employeeNum":388,"employeeNation":"rkrz3l","sourceCompany":"郑-卢","employeeType":"1wgv1q","employeeAge":"4oxoag","credential":"9tqkwd","wage":"s4ebdy","other":"d8uxup","arrivalDate":2020-11-26,"remark":"ilntfz"}]}]},
        projectlistLoading: false,
        detailLoading: false,
        updateProjectLoading:false,
        projectdetailFormVisible:false,
        updateProjectDetailLoading:false
        
    }
  },
  created() {
    this.allContractData()
    
  },
  methods: {
    
    allContractData(load) {
      if(load){
        this.updateProjectLoading = true
      }else{
         this.projectlistLoading = true
      }
      allContract().then(response => {
             
       if(load){
        this.updateProjectLoading = false
      }else{
        this.projectlistLoading = false
      }
      if(response.data.length>0){
        this.contractOption = response.data
        }
      }).catch(response =>{
         if(load){
            this.updateProjectLoading = false
          }else{
            this.projectlistLoading = false
          }
      })
      //临时数据
      // const response = this.contractResponse
      // return response;
      
     
    },
    getProjectList(code){
      this.projectlistLoading = true
      getProjectByCode(code).then(response => {
        
        this.projectList=response.data
        this.projectlistLoading = false
      }).catch(response => {
        this.projectlistLoading = false
      })
      //临时测试数据
      // const projectRsp = this.projectListResponse
      // if(projectRsp.data.length>0){
      //   this.projectList = projectRsp.data
      // }
      
    },
     getStatusValue(value) {
       this.$forceUpdate()
        if(!value){
          this.$message({
            type: 'warning',
            message: this.$t('m.project.message2')
          });
          return false;
        }else{
          this.selectContractOption = value
          this.getProjectList(value)
        }
      },
    showProjectDetail(params){        
      if(!params){
        this.$message({
          type: 'warning',
          message: this.$t('m.project.message1')
        });
        return false;
      }else{     
        this.projectInfo = params        
        this.projectDialogVisible=true
     }
      
    },
    getProjectDetail(code){
      this.detailLoading = true
        projectDetail(code).then(response => {                  
          this.detailLoading = false
        }).catch(response => {
        this.detailLoading = false
      })

     // const detailObj = this.responseObj.data
      //return detailObj
    },
    toProjectUpdate(params){
      
        this.idShow=true
        this.$nextTick(()=>{
          this.projectform =params
        })
        
        this.showProjectForm()
       
    },
    toProjectDelete(code){
      if(!code){
        this.$message({
          type: 'warning',
          message: this.$t('m.project.message1')
        });
        return false;
      }else{
        this.$confirm('此操作将删除项目, 是否继续?', this.$t('m.common.confirmtip'), {
          confirmButtonText: this.$t('m.common.okbtn'),
          cancelButtonText: this.$t('m.common.cancelbtn'),
          type: 'warning',
          center: true
        }).then(() => {
          this.contractlistLoading = true
            projectDelete(code).then(response => {
              if(response.code=== 0){
                this.$message({
                  type: 'success',
                  message: this.$t('m.project.message3')
                });

              }
              this.contractlistLoading = false
               this.getProjectList(this.selectContractOption)
            }).catch(response =>{
              this.contractlistLoading = false
               this.getProjectList(this.selectContractOption)
            })
        }).catch(() => {
          
        });
        
        
      }
    },
    showProjectForm(){
      this.allContractData('add')
     this.getAllCompany()
      this.projectFormVisible = true;
      
    },
    toProjectAdd(){
     this.idshow = false
     this.showProjectForm()
    },
    submitProjectDetailForm(formName){
      this.$refs.projectdetailform.validate(async (valid) => {
        if (valid) {
          if(!this.projectdetailform.id){
            const param = {
                projectId:this.projectdetailform.projectId,
                employeeNum:this.projectdetailform.employeeNum,
                employeeNation:this.projectdetailform.employeeNation,
                sourceCompany:this.projectdetailform.sourceCompany,
                employeeType:this.projectdetailform.employeeType,
                employeeAge:this.projectdetailform.employeeAge,
                credential:this.projectdetailform.credential,
                wage:this.projectdetailform.wage,
                other:this.projectdetailform.other,
                arrivalDate:this.projectdetailform.arrivalDate,
                remark:this.projectdetailform.remark             
              
            };
            this.updateProjectDetailLoading = true;
            projectDetailAdd(param).then(response => {
              this.updateProjectDetailLoading = false              
              this.projectDetailCloseDialog()
            }).catch(response => {
              this.updateProjectDetailLoading = false
            })
           }else{  
            const param = {
              projectId:this.projectdetailform.projectId,
                employeeNum:this.projectdetailform.employeeNum,
                employeeNation:this.projectdetailform.employeeNation,
                sourceCompany:this.projectdetailform.sourceCompany,
                employeeType:this.projectdetailform.employeeType,
                employeeAge:this.projectdetailform.employeeAge,
                credential:this.projectdetailform.credential,
                wage:this.projectdetailform.wage,
                other:this.projectdetailform.other,
                arrivalDate:this.projectdetailform.arrivalDate,
                remark:this.projectdetailform.remark,         
                id:this.projectdetailform.id
              
            };
            this.updateProjectDetailLoading = true;
            projectDetailUpdate(param).then(response => {
              this.updateProjectDetailLoading = false
              this.projectDetailCloseDialog()        
              
            }).catch(response => {
              this.updateProjectDetailLoading = false
            })
          }
            
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitProjectForm(formName) {
            this.$refs.projectform.validate(async (valid) => {
        if (valid) {
          if(!this.projectform.id){
            const param = {
              contractCode:this.projectform.contractCode,
              name: this.projectform.name || "",
              nation:this.projectform.nation || "",
              position:this.projectform.position || "",
              interviewPlanDate:this.projectform.interviewPlanDate || "",
              contractType:this.projectform.contractType || "",
              agencyCompany:this.projectform.agencyCompany || "",
              contractCompany:this.projectform.contractCompany || "",
              contractStartDate:this.projectform.contractStartDate || "",
              contractExpireDate:this.projectform.contractExpireDate || "",
              contractYearLimit:this.projectform.contractYearLimit || "",
              status:this.projectform.status || ""
              
            };
            this.updateProjectLoading = true;
            projectAdd(param).then(response => {
              this.updateProjectLoading = false
              this.projectFormVisible =false
              
            }).catch(response => {
              this.updateProjectLoading = false
            })
             
          }else{
            const param = {
              contractCode:this.projectform.contractCode,
              name: this.projectform.name || "",
              nation:this.projectform.nation || "",
              position:this.projectform.position || "",
              interviewPlanDate:this.projectform.interviewPlanDate || "",
              contractType:this.projectform.contractType || "",
              agencyCompany:this.projectform.agencyCompany || "",
              contractCompany:this.projectform.contractCompany || "",
              contractCompany:this.projectform.contractStartDate || "",
              contractCompany:this.projectform.contractExpireDate || "",
              contractCompany:this.projectform.contractYearLimit || "",
              contractCompany:this.projectform.status || "",
              id:this.projectform.id
              
            };
            this.updateProjectLoading = true;
            //const paramstr = JSON.stringify(param);
            projectUpdate(param).then(response => {
              this.updateProjectLoading = false
              this.closeDialog()             
              
            }).catch(response => {
              this.updateProjectLoading = false
            })
          }
            
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //添加用工关系
    toAddProjectDetail(obj){

      if(obj){
        this.projectName = obj.project.name
        this.projectdetailform.projectId = obj.project.id
      }else{
        this.projectName = ''
        this.projectdetailform.projectId=''
      }
      this.getAllCompany()
      this.projectdetailFormVisible =true
    },
    toDeleteProjectDetail(id){
      this.projectlistLoading = true
      projectDetailDelete(id).then(response => {
        this.projectlistLoading = false
        this.getProjectList(this.selectContractOption)
      }).catch(response => {
        this.projectlistLoading = false
      })
    },
     getAllCompany(){
        this.projectlistLoading = true
      allCountries().then(response => {
     
        this.optcountry = response.data;
        this.projectlistLoading = false
      }).catch(response => {
        this.projectlistLoading = false
      })
      },
      resetprojectForm () {
          return {
            id:'',
            contractCode:'',
            name:'',
            nation:'',
            position:'',
            interviewPlanDate:'',
            contractType:'',
            agencyCompany:'',
            contractCompany:'',
            contractStartDate:'',
            contractExpireDate:'',
            contractYearLimit:'',
            status:'',
          }
      },
      resetprojectDetailForm () {
          return {
             projectId:'',
          id:'',
          employeeNum:'',
          employeeNation:'',
          sourceCompany:'',
          employeeType:'',
          employeeAge:'',
          credential:'',
          wage:'',
          other:'',
          arrivalDate:'',
          remark:''
          }
      },
      closeDialog(){
        this.projectform = this.resetprojectForm()
	      this.$refs.projectform.resetFields()
        this.projectFormVisible = false
        this.getProjectList(this.selectContractOption)
    },
    projectDetailCloseDialog(){
        this.projectdetailform = this.resetprojectDetailForm()
      this.$refs.projectdetailform.resetFields()
        this.projectdetailFormVisible = false
        this.getProjectList(this.selectContractOption)
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