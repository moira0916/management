<template>
  <div class="app-container">
    <!-- <el-dialog
      v-loading="detailLoading"
      title="企业详情"
      :visible.sync="projectDialogVisible"      
      width="30%"
      center>
      <div class="contract-dl-left"><span class="title">合约编码：</span>{{ contractInfo.code }}</div>
      <div class="contract-dl-left"><span class="title">合约名称：</span>{{ contractInfo.name }}</div>
      
      <div class="contract-dl-left"><span class="title">甲方公司编码：</span>{{ contractInfo.firstPartyCode }}</div>
      <div class="contract-dl-left"><span class="title">甲方公司名称：</span>{{ contractInfo.firstParty }}</div>
      <div class="contract-dl-left"><span class="title">乙方公司编码：</span>{{ contractInfo.secondPartyCode }}</div>
      <div class="contract-dl-left"><span class="title">乙方公司名称：</span>{{ contractInfo.secondParty }}</div>
      <div class="contract-dl-left"><span class="title">合同扫描件链接：</span>{{ contractInfo.scanningCopyUrl }}</div>
      <div class="contract-dl-left"><span class="title">服务期限：</span>{{ contractInfo.expireDate }}</div>
      <div class="contract-dl-left"><span class="title">服务国别：</span>{{ contractInfo.nation }}</div>
      <div class="contract-dl-left"><span class="title">服务人数：</span>{{ contractInfo.employeeNumber }}</div>
      <div class="contract-dl-left"><span class="title">创建时间：</span>{{ contractInfo.createTime }}</div>
      <span></span>
      <span></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="contractDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
   <!--  <div style="height:100%"> 
     <el-dialog v-loading="detailLoading"
      title="用工详情"
      :visible.sync="projectDialogVisible"      
      width="30%"
      center>


    </el-dialog>
    <el-dialog  title="新增项目" :visible.sync="projectFormVisible" :before-close="closeDialog" :close-on-click-modal="false">
      <el-form v-loading="updateProjectLoading" ref="projectform" :model="projectform" :rules="rules" >
        <el-row>
          <el-col :span="24">
              <el-form-item v-if="idshow" label="项目编号" :label-width="formLabelWidth" prop="">
                <el-input v-model="projectform.id" autocomplete="off"></el-input>
              </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item  label="关联合约" :label-width="formLabelWidth" >
            <el-select
                v-model="projectform.contractCode"
                  clearable
                  placeholder="选择合约"
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
              <el-form-item label="项目名称" :label-width="formLabelWidth" prop="">
              <el-input v-model="projectform.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="项目国别" :label-width="formLabelWidth" prop="nation">
          <el-select
            v-model="projectform.nation"
            clearable
            placeholder="请选择国家"
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
            <el-form-item label="施工地点" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectform.position" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="计划面试日期" :label-width="formLabelWidth" required>
          
              <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" v-model="projectform.interviewPlanDate" style="width: 100%;"></el-date-picker>
           
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合约类型" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectform.contractType" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="中介公司" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectform.agencyCompany" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="合同公司" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectform.contractCompany" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同起始日期" :label-width="formLabelWidth" prop="">
          <el-date-picker type="date" placeholder="选择起始日期" format="yyyy-MM-dd" v-model="projectform.contractStartDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="	合同截止日期" :label-width="formLabelWidth" prop="">
          <el-date-picker type="date" placeholder="选择截至日期" format="yyyy-MM-dd" v-model="projectform.contractExpireDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
          </el-col>
          <el-col :span="12">
                <el-form-item label="合同年限" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectform.contractYearLimit" autocomplete="off"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
               <el-form-item label="项目状态" :label-width="formLabelWidth" prop="">
          <el-input v-model="projectform.status" autocomplete="off"></el-input>
        </el-form-item> 
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="projectFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitProjectForm('projectform')">确 定</el-button>
      </div>
    </el-dialog> 
    </div>
    <div style="padding:20px">
       
        <el-row>
         <el-col :span="20">
        <el-select
        v-model="contractBind.code"
          clearable
          placeholder="选择合约"
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
            <el-button type="primary" round @click.native.prevent="toProjectAdd()">新增项目</el-button>
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
    >
   
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="合约编号" align="center" >
        <template slot-scope="scope">
          {{ scope.row.project.contractCode }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目国别"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.nation }}
        </template>
      </el-table-column>
      <el-table-column label="施工地点"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.position }}
        </template>
      </el-table-column>     
      <el-table-column label="计划面试时间"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.interviewPlanDate }}
        </template>
      </el-table-column>
      <el-table-column label="合约类型"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.contractType }}
        </template>
      </el-table-column>
      <el-table-column label="中介公司"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.agencyCompany }}
        </template>
      </el-table-column>
       <el-table-column label="合同公司"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.contractCompany }}
        </template>
      </el-table-column>
      <el-table-column label="合同年限"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.contractYearLimit }}年
        </template>
      </el-table-column>
      <el-table-column label="合同起止日期"  align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.project.contractStartDate).format('YYYY-MM-DD') }}至{{ $moment(scope.row.project.contractExpireDate).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column label="项目状态"  align="center">
        <template slot-scope="scope">
          {{ scope.row.project.status }}
        </template>
      </el-table-column>
      
      <el-table-column align="center" prop="created_at" label="操作" width="150">
        <template slot-scope="scope">
          <el-link class="common-writeBtn" type="primary" @click.native.prevent="showProjectDetail(scope.row.id)">详情</el-link>
          <el-link class="common-writeBtn" type="primary" @click.native.prevent="toProjectDelete(scope.row.id)">删除</el-link>
          <el-link class="common-writeBtn" type="primary" @click.native.prevent="toProjectUpdate(scope.row.id)">修改</el-link>
          <el-link type="primary" class="common-writeBtn"  @click.native.prevent="toAddProjectDetail(scope.row.id)">添加用工关系</el-link>
        </template>
      </el-table-column>
    </el-table>  -->
  </div>
</template>

<script>
import { allContract } from '@/api/contract'
import { getProjectByCode,projectAdd,projectDelete,projectDetail,projectUpdate } from '@/api/project'
import { allCountries} from '@/api/allcompany'
import { commonUpload } from "@/api/uploadfile"
export default {
  
  data() {
    return {
      // projectList:null,      
      // projectDialogVisible: false,
      // projectFormVisible: false,
      // optcountry: [],
      // contractBind:{code:"",name:""},
      // contractOption:[],
      // fileList: [],
      // fileParam:{
      //   type:""
      // },
      // idshow:false,
      // projectform: {
      //     contractCode:'',
      //     name:'',
      //     nation:'',
      //     position:'',
      //     interviewPlanDate:'',
      //     contractType:'',
      //     agencyCompany:'',
      //     contractCompany:'',
      //     contractStartDate:'',
      //     contractExpireDate:'',
      //     contractYearLimit:'',
      //     status:'',
      //   },
      // formLabelWidth: '120px',
      // projectInfo:{
      //   code:'',
      //   name:'',
      //   firstPartyCode:'',
      //   secondPartyCode:'',
      //   scanningCopyUrl:'',
      //   expireDate:'',
      //   nation:'',
      //   employeeNumber:''
      // },
      // rules: {
      //     name: [
      //       { required: true, message: '请输入合约名称', trigger: 'blur' },
      //       { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
      //     ],
      //     firstPartyCode: [
      //       { required: true, message: '请选择甲方公司', trigger: 'change' }
      //     ],
      //     secondPartyCode: [
      //       { required: true, message: '请选择乙方公司', trigger: 'change' }
      //     ],
      //     expireDate: [
      //       { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
      //     ],
      //     nation: [
      //       { required: true, message: '请选择国家', trigger: 'change' }
      //     ],
      //     scanningCopyUrl: [
      //       { required: true, message: '请上传合约扫描件', trigger: 'blur' }
      //     ],
      //     employeeNumber: [
      //       { required: true, message: '请输入合约人数', trigger: 'blur' }
      //     ]
      //   },
      //   imageUrl: 'www.xn---xn--2yw-r93q.com',
      //   contractResponse:{"code":593,"err_msg":"tw4jdr","data":[{"name":"天磊.姜","code":"28655","firstParty":"d0uk2q","secondParty":"l66kl0","expireDate":"2020-11-26","nation":"jb7mac","createTime":"2020-11-26"},{"name":"天磊.姜2","code":"28657","firstParty":"d0uk2q","secondParty":"l66kl0","expireDate":"2020-11-26","nation":"jb7mac","createTime":"2020-11-26"},{"name":"天磊.姜3","code":"28659","firstParty":"d0uk2q","secondParty":"l66kl0","expireDate":"2020-11-26","nation":"jb7mac","createTime":"2020-11-26"}]},
      //   projectListResponse:{"code":0,"err_msg":"5xvgzf","data":[{"project":{"contractCode":"28655","name":"天磊.姜","nation":"aiiks9","position":"vqersi","interviewPlanDate":2020-11-26,"contractType":"8xnq2u","agencyCompany":"郑-卢","contractCompany":"郑-卢","contractStartDate":2020-11-26,"contractExpireDate":2020-11-26,"contractYearLimit":10,"status":"kb2li7"},"detail":[{"projectId":990,"employeeNum":388,"employeeNation":"rkrz3l","sourceCompany":"郑-卢","employeeType":"1wgv1q","employeeAge":"4oxoag","credential":"9tqkwd","wage":"s4ebdy","other":"d8uxup","arrivalDate":2020-11-26,"remark":"ilntfz"}]}]},
      //   projectlistLoading: false,
      //   detailLoading: false,
      //   updateProjectLoading:false
    }
  },
  created() {
    console.dir(this.$route.params)
    
      alert(this.$route.params.length)
      
  },
  methods: {
    
    
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