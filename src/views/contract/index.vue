<template>
  <div class="app-container">
    <el-dialog
      v-loading="detailLoading"
      title="合约详情"
      :visible.sync="contractDialogVisible"      
      width="30%"
      center>
      <div class="contract-dl-left"><span class="title">{{$t('m.contract.code')}}：</span>{{ contractInfo.code }}</div>
      <div class="contract-dl-left"><span class="title">{{$t('m.contract.name')}}：</span>{{ contractInfo.name }}</div>
      
      <div class="contract-dl-left"><span class="title">{{$t('m.contract.firstPartyCode')}}：</span>{{ contractInfo.firstPartyCode }}</div>
      <div class="contract-dl-left"><span class="title">{{$t('m.contract.firstParty')}}：</span>{{ contractInfo.firstParty }}</div>
      <div class="contract-dl-left"><span class="title">{{$t('m.contract.secondPartyCode')}}：</span>{{ contractInfo.secondPartyCode }}</div>
      <div class="contract-dl-left"><span class="title">{{$t('m.contract.secondParty')}}：</span>{{ contractInfo.secondParty }}</div>
      <div class="contract-dl-left"><span class="title">{{$t('m.contract.scanningCopyUrl')}}：</span>{{ contractInfo.scanningCopyUrl }}</div>
      <div class="contract-dl-left"><span class="title">{{$t('m.contract.expireDate')}}：</span>{{ $moment(contractInfo.expireDate).format('YYYY-MM-DD') }}</div>
      <div class="contract-dl-left"><span class="title">{{$t('m.contract.nation')}}：</span>{{ contractInfo.nation }}</div>
      <div class="contract-dl-left"><span class="title">{{$t('m.contract.employeeNumber')}}：</span>{{ contractInfo.employeeNumber }}</div>
      <div class="contract-dl-left"><span class="title">{{$t('m.contract.createTime')}}：</span>{{ $moment(contractInfo.createTime).format('YYYY-MM-DD') }}</div>
      <span></span>
      <span></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="contractDialogVisible = false">{{$t('m.common.okbtn')}}</el-button>
      </span>
    </el-dialog>
    <div style="height:100%"> 
    <el-dialog  :title="$t('m.contract.addcontract')" :visible.sync="contractFormVisible" :before-close="closeDialog" :close-on-click-modal="false">
      <el-form v-loading="updateContractLoading" ref="contractform" :model="contractform" :rules="rules" >
        <el-form-item v-if="codeshow" :label="$t('m.contract.code')" :label-width="formLabelWidth" >
          <el-input v-model="contractform.code" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.contract.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model="contractform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.contract.firstParty')" :label-width="formLabelWidth" prop="">
          <span v-model="contractform.firstPartyCode">{{ firstcompanyInfo.name }}</span>
          
        </el-form-item>
        <el-form-item :label="$t('m.contract.secondParty')" :label-width="formLabelWidth" prop="secondPartyCode">
            <el-input v-model="contractform.secondPartyCode" autocomplete="off"></el-input>            
        </el-form-item>
        <el-form-item :label="$t('m.contract.expireDate')" :label-width="formLabelWidth" required>
          <el-col :span="11">
            <el-form-item prop="expireDate">
              <el-date-picker type="date" :placeholder="$t('m.common.dateplacehoder')" v-model="contractform.expireDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>          
        </el-form-item>
        <el-form-item :label="$t('m.contract.scanningCopyUrl')" :label-width="formLabelWidth" prop="">
            <el-upload
            ref="contractupload"
            class="upload-demo"
            action="string"
            accept="image/jpeg,image/png,image/jpg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSucess"
            :limit="1"
            :on-exceed="handleExceed"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :http-request="UploadImage"
            :on-change="fileChange"
            >
            <el-button size="small" type="primary">{{$t('m.common.uploadbtn')}}</el-button>
            <div slot="tip" class="el-upload__tip">{{$t('m.common.uploadtip')}}</div>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('m.contract.nation')" :label-width="formLabelWidth" prop="nation">
          <el-select
            v-model="contractform.nation"
            clearable
            :placeholder="$t('m.contract.nationplacehoder')"
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
        <el-form-item :label="$t('m.contract.employeeNumber')" :label-width="formLabelWidth" prop="employeeNumber">
          <el-input v-model="contractform.employeeNumber" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">{{$t('m.common.cancelbtn')}}</el-button>
        <el-button type="primary" @click="submitContractForm('contractform')">{{$t('m.common.okbtn')}}</el-button>
      </div>
    </el-dialog>
    </div>
    <div style="padding:20px">
          <el-button type="primary" round @click.native.prevent="toContractAdd()">{{$t('m.contract.addcontract')}}</el-button>
           <!-- <el-button type="primary" round @click.native.prevent="showContractDetail()">新增合约</el-button> -->
    </div>
    <el-table
      v-loading="contractlistLoading"
      :data="contractList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
   
      <el-table-column align="center" :label="$t('m.common.tableindex')" >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.contract.code')" align="center" >
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.contract.name')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.contract.firstParty')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.firstParty }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.contract.secondParty')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.secondParty }}
        </template>
      </el-table-column>     
      <el-table-column :label="$t('m.contract.expireDate')"  align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.expireDate).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('m.contract.nation')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.nation }}
        </template>
      </el-table-column>
       <el-table-column :label="$t('m.contract.createTime')"  align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.createTime).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      
      <el-table-column align="center" prop="created_at" :label="$t('m.common.handle')" width="150">
        <template slot-scope="scope">
          <el-link type="primary" class="common-writeBtn"  @click.native.prevent="showContractDetail(scope.row.code)">{{$t('m.common.detailBtn')}}</el-link>
          <el-link type="primary" class="common-writeBtn"  @click.native.prevent="toContractDelete(scope.row.code)">{{$t('m.common.deleteBtn')}}</el-link>
          <el-link type="primary" class="common-writeBtn"  @click.native.prevent="toContractUpdate(scope.row.code)">{{$t('m.common.updateBtn')}}</el-link>
          
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { isPassword, isPhone, isEmail} from '@/utils/validate'
import { allContract, contractDetail, contractDelete, contractAdd, contractUpdate } from '@/api/contract'
import { allCountries} from '@/api/allcompany'
import { commonUpload } from "@/api/uploadfile"
import { companyShow } from "@/api/company";
export default {
  
  data() {
    return {
      contractList:null,      
      contractDialogVisible: false,
      contractFormVisible: false,
      formName: 'contractform',
      firstcompanyInfo:{code:'',name:''},
      optcountry: [],
      fileList: [],
      fileParam:{
        type:""
      },
      codeshow:false,
      contractform: {
        code:'',
        name:'',
        firstPartyCode:'',
        secondPartyCode:'',
        scanningCopyUrl:'',
        expireDate:'',
        nation:'',
        employeeNumber:''
      },
      formLabelWidth: '150px',
      contractInfo:{
        code:'',
        name:'',
        firstPartyCode:'',
        secondPartyCode:'',
        scanningCopyUrl:'',
        expireDate:'',
        nation:'',
        employeeNumber:''
      },
      rules: {
          name: [
            { required: true, message: this.$t('m.contract.rulemessage1'), trigger: 'blur' },
            { min: 3, max: 40, message: this.$t('m.contract.rulemessage2'), trigger: 'blur' }
          ],
          // firstPartyCode: [
          //   { required: true, message: '请选择甲方公司', trigger: 'change' }
          // ],          
          expireDate: [
            { type: 'date', required: true, message:this.$t('m.contract.rulemessage3'), trigger: 'change' }
          ],
          nation: [
            { required: true, message: this.$t('m.contract.rulemessage4'), trigger: 'change' }
          ],
          scanningCopyUrl: [
            { required: true, message: this.$t('m.contract.rulemessage5'), trigger: 'blur' }
          ],
          employeeNumber: [
            { required: true, message: this.$t('m.contract.rulemessage6'), trigger: 'blur' }
          ]
        },
        imageUrl: 'www.xn---xn--2yw-r93q.com',
        responseObj:{"code":0,"err_msg":"","data":{"name":"天磊.姜","code":"28655","firstPartyCode":"28655","firstParty":"z6t5ts","secondPartyCode":"28655","secondParty":"33yhuu","scanningCopyUrl":"www.xn---xn--2yw-r93q.com","expireDate":"2020-11-26","nation":"xu488x","employeeNumber":527,"createTime":"2020-11-26"}},
        contractlistLoading: false,
        detailLoading: false,
        updateContractLoading:false
    }
  },
  created() {
    this.allContractData()
  },
  methods: {
    allContractData() {
      this.contractlistLoading = true
      allContract().then(response => {
        this.contractList=response.data
        this.contractlistLoading = false
      })
      
     
    },
     getCompanyDetailShow(){
      this.updateContractLoading = true
      companyShow().then(response => {
        console.dir(response);
        this.firstcompanyInfo.code=response.data.code
        this.firstcompanyInfo.name = response.data.name
        this.contractform.firstPartyCode = this.firstcompanyInfo.code
        this.updateContractLoading = false
         this.getAllCompany();
      }).catch(response => {
         this.getAllCompany();
        this.updateContractLoading = false
      })
      
    },
    showContractDetail(code){  
      if(!code){
        this.$message({
          type: 'warning',
          message: this.$t('m.contract.rulemessage7')
        });
        return false;
      }else{
        
        
        this.getContractDetail(code)
        this.contractDialogVisible=true
     }
      
    },
    getContractDetail(code){
      this.contractlistLoading = true
        contractDetail(code).then( response => {
          console.dir(response);
          //this.contractInfo.code=response.data.code
          //return response.data
          this.contractform = response.data
          this.contractInfo = response.data
          this.contractlistLoading = false
        }).catch(response => {
          this.contractlistLoading = false
        })

     // const detailObj = this.responseObj.data
      //return detailObj
    },
    toContractUpdate(code){
      if(!code){
        this.$message({
          type: 'warning',
          message: this.$t('m.contract.rulemessage7')
        });
        return false;
      }else{
        this.codeshow=true
        this.showcontractForm()
        this.getContractDetail(code)
        
      }
    },
    toContractDelete(code){
      if(!code){
        this.$message({
          type: 'warning',
          message: this.$t('m.contract.rulemessage7')
        });
        return false;
      }else{
        this.contractlistLoading = true
         contractDelete(code).then(response => {
          if(response.code==='0'){
            this.$message({
              type: 'success',
              message: this.$t('m.contract.rulemessage8')
            });

          }
          this.contractlistLoading = false
          this.allContractData()
        }).catch(response => {
          this.contractlistLoading = false
        })
        
      }
    },
    showcontractForm(){
      this.getCompanyDetailShow();      
      this.contractFormVisible = true;
      
    },
    toContractAdd(){
     this.codeshow = false
     this.showcontractForm()
    },
    submitContractForm(formName) {
            this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if(!this.codeshow){
            //this.contractform.scanningCopyUrl = this.imageUrl
            const param = {
              name: this.contractform.name || "",
              firstPartyCode:this.contractform.firstPartyCode || "",
              secondPartyCode:this.contractform.secondPartyCode || "",
              scanningCopyUrl:this.contractform.scanningCopyUrl || "",
              expireDate:this.contractform.expireDate || "",
              nation:this.contractform.nation || "",
              employeeNumber:this.contractform.employeeNumber || ""
              
            };
            console.log(param);
            this.updateContractLoading = true;
            //const paramstr = JSON.stringify(param);
            contractAdd(param).then(response => {
              this.updateContractLoading = false
              this.closeDialog()
              this.allContractData()
              
            }).catch(response => {
              this.updateContractLoading = false
            })
             
          }else{
            const param = {
              code:this.contractform.code,
              name: this.contractform.name || "",
              firstPartyCode:this.contractform.firstPartyCode || "",
              secondPartyCode:this.contractform.secondPartyCode || "",
              scanningCopyUrl:this.contractform.scanningCopyUrl || "",
              expireDate:this.contractform.expireDate || "",
              nation:this.contractform.nation || "",
              employeeNumber:this.contractform.employeeNumber || ""
              
            };
            console.log(param);
            this.updateContractLoading = true;
            //const paramstr = JSON.stringify(param);
            contractUpdate(param).then(response => {
              this.updateContractLoading = false
              this.closeDialog()
              this.allContractData()
              
            }).catch(response => {
              this.updateContractLoading = false
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
     getAllCompany(){
        this.updateContractLoading = true
      allCountries().then(response => {
      // const xsrftoke=this.getCookie("XSRF-TOKEN");
       // console.log(xsrftoke);
        this.optcountry = response.data;
        this.updateContractLoading = false
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
      UploadImage(param){
      const formData = new FormData()
      console.dir(formData.type)
      formData.append('file', param.file)
      formData.append('type', param.file.type)
      
      
      this.updateContractLoading = true
      commonUpload(formData).then(response => {
      	console.log('上传图片成功')        
        this.contractform.scanningCopyUrl = response.data.url
        this.updateContractLoading = false
      }).catch(response => {
        console.log('图片上传失败')
       // param.onError()
       this.updateContractLoading = false
      })
    },
    fileChange(file){
      this.$refs.contractupload.clearFiles() //清除文件对象
      //this.logo = file.raw // 取出上传文件的对象，在其它地方也可以使用
      //this.fileList = [{name: file.name, url: file.url}] // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
    },
      beforeRemove(file, fileList) {
        //return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSucess(response,file, fileList){
        console.dir(response);
        this.imageUrl = response.data.url
      },
      closeDialog(){
        this.contractform = this.resetContractForm()
        this.$refs.contractform.resetFields()
        
	      this.contractFormVisible = false
    },
    resetContractForm () {
          return {
              code:'',
        name:'',
        firstPartyCode:'',
        secondPartyCode:'',
        scanningCopyUrl:'',
        expireDate:'',
        nation:'',
        employeeNumber:''
          }
      },
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