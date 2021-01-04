<template>
  <div class="app-container">
    <div style="height:100%">
    <el-dialog
      v-loading="employeedetailLoading"
      title="员工详情"
      :visible.sync="employeeDialogVisible"      
      width="30%"
      center>
      
      <span>这里是未展示的员工详情</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="employeeDialogVisible = false">{{ $t('m.common.okbtn') }}</el-button>
      </span>
    </el-dialog>
    
    </div>
    <div style="padding:20px">
          <el-button type="primary" round @click.native.prevent="toEmployeeAdd()">{{ $t('m.employee.employeeAddBtn') }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="employeeList"
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
      <el-table-column :label="$t('m.employee.passportname')" align="center" >
        <template slot-scope="scope">
          {{ scope.row.passportName }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.employee.passportid')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.passportId }}
        </template>
        </el-table-column>  
        <el-table-column :label="$t('m.employee.passportIssueDate')"  align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.passportIssueDate).format('YYYY-MM-DD') }}
        </template>
        </el-table-column>  
        <el-table-column :label="$t('m.employee.passportExpireDate')"  align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.passportExpireDate).format('YYYY-MM-DD') }}
        </template>
        </el-table-column>  
      <el-table-column :label="$t('m.employee.age')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.employee.nationality')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.nationality }}
        </template>
      </el-table-column>      
         
      <el-table-column :label="$t('m.employee.homePhone')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.homePhone }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.employee.startWorkDate')"  align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.startWorkDate).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" :label="$t('m.common.handle')" width="150">
        <template slot-scope="scope">
          <!-- <el-link class="common-writeBtn" type="primary" @click.native.prevent="confirmFunc(scope.row.code)">详情</el-link> -->
          <el-link class="common-writeBtn" type="primary" @click.native.prevent="toEmployUpdate(scope.row.code)">{{$t('m.common.updateBtn')}}</el-link>
          <el-link class="common-writeBtn" type="primary" @click.native.prevent="toEmployDelete(scope.row.code)">{{$t('m.common.deleteBtn')}}</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { employeeList,employeeDelete} from '@/api/company'
export default {
  
  data() {
    return {
      list: null,
      employeeList:null,
      employeeFormVisible: false,
      employeeDialogVisible:false,    
      employeedetailLoading:false,  
      codeshow:false,
      employeeform: {
          passportName: "",
          passportId: "",
          passportIssueDate: '',
          passportExpireDate: '',
          papersId: '',
          papersType: '',
          birthday: '',
          age: '',
          height:'',
          weight: '',
          clothesSize:'',
          shoesSize: '',
          nationality:'',
          religion: '',
          homeAddress: '',
          maritalStatus: '',
          homePhone: '',
          educationInformation: [
            {
              educationLevel: '',
              graduateSchool: '',
              graduateDate: '',
              major: ''
            }
          ],
          emergencyContacts: [
            {
              name: '',
              relationship: '',
              sex: '',
              phone: ''
            }
          ],
          familyMembers: [
            {
              name: '',
              relationship: '',
              sex: '',
              phone: ''
            }
          ],
          startWorkDate: '',
          jobResumes: [
            {
              nation: '',
              companyName: '',
              workingTime:'',
              job: '',
              score: '',
              scoreAttachment: '',
              certificateAttachment: ''
            }
          ],
          papersPhotoUrl:'',
          drivingLicenseUrl:'',
          credentialsUrl: '',
          jobTypes:''
          
          
        },
        employeeInfo:{
          // passportName: "天磊.姜",
          // passportId: "116",
          // passportIssueDate: 2020-11-26,
          // passportExpireDate: 2020-11-26,
          // papersId: "116",
          // papersType: "q4dsk6",
          // birthday: "2020-11-26",
          // age: 35,
          // height: 495,
          // weight: 379,
          // clothesSize: "kx3sfk",
          // shoesSize: "aq6tfj",
          // nationality: "7qmbd2",
          // religion: "bgexgx",
          // homeAddress: "Suite 825 贾侬22号， 泰州， 黑 292786",
          // maritalStatus: "wwuf4w",
          // homePhone: "15808953765",
          // educationInformation: [
          //   {
          //     educationLevel: "st7lz5",
          //     graduateSchool: "s2sevw",
          //     graduateDate: 2020-11-26,
          //     major: "otw9dh"
          //   }
          // ],
          // emergencyContacts: [
          //   {
          //     name: "天磊.姜",
          //     relationship: "91.153.246.229",
          //     sex: "zs33hm",
          //     phone: "15808953765"
          //   }
          // ],
          // familyMembers: [
          //   {
          //     name: "天磊.姜",
          //     relationship: "91.153.246.229",
          //     sex: "66pfkg",
          //     phone: "15808953765"
          //   }
          // ],
          // startWorkDate: 2020-11-26,
          // jobResumes: [
          //   {
          //     nation: "cor7e5",
          //     companyName: "天磊.姜",
          //     workingTime: "2020-11-26 23:11:41",
          //     job: "s3lkvh",
          //     score: 31.29,
          //     scoreAttachment: "3cjvvn",
          //     certificateAttachment: "sje0x5"
          //   }
          // ],
          // papersPhotoUrl: "www.xn---xn--2yw-r93q.com",
          // drivingLicenseUrl: "www.xn---xn--2yw-r93q.com",
          // credentialsUrl: "www.xn---xn--2yw-r93q.com",
          // jobTypes: "",
          // createTime: "",
          // updateTime: "",
          // companyCode: "",
          // code: ""
        },
        employeerequest:{
          "passportName": "天磊.姜",
          "passportId": "116",
          "passportIssueDate": 2020-11-26,
          "passportExpireDate": 2020-11-26,
          "papersId": "116",
          "papersType": "q4dsk6",
          "birthday": "2020-11-26",
          "age": 35,
          "height": 495,
          "weight": 379,
          "clothesSize": "kx3sfk",
          "shoesSize": "aq6tfj",
          "nationality": "7qmbd2",
          "religion": "bgexgx",
          "homeAddress": "Suite 825 贾侬22号， 泰州， 黑 292786",
          "maritalStatus": "wwuf4w",
          "homePhone": "15808953765",
          "educationInformation": [
            {
              "educationLevel": "st7lz5",
              "graduateSchool": "s2sevw",
              "graduateDate": 2020-11-26,
              "major": "otw9dh"
            }
          ],
          "emergencyContacts": [
            {
              "name": "天磊.姜",
              "relationship": "91.153.246.229",
              "sex": "zs33hm",
              "phone": "15808953765"
            }
          ],
          "familyMembers": [
            {
              "name": "天磊.姜",
              "relationship": "91.153.246.229",
              "sex": "66pfkg",
              "phone": "15808953765"
            }
          ],
          "startWorkDate": 2020-11-26,
          "jobResumes": [
            {
              "nation": "cor7e5",
              "companyName": "天磊.姜",
              "workingTime": "2020-11-26 23:11:41",
              "job": "s3lkvh",
              "score": 31.29,
              "scoreAttachment": "3cjvvn",
              "certificateAttachment": "sje0x5"
            }
          ],
          "papersPhotoUrl": "www.xn---xn--2yw-r93q.com",
          "drivingLicenseUrl": "www.xn---xn--2yw-r93q.com",
          "credentialsUrl": "www.xn---xn--2yw-r93q.com",
          "jobTypes": "41x2ii",
          "createTime": "2020-11-26",
          "updateTime": "2020-11-26",
          "companyCode": "28655",
          "code": "28655"
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
      formLabelWidth: '180px',
      listLoading: false,
      updateEmployeeLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      employeeList().then(response => {
        this.employeeList=response.data
         this.listLoading = false
      }).catch(response => {
          this.listLoading = false
        })
     
     
    },
    showEmployeeForm(){
       //this.getAllCompany();
      this.employeeFormVisible = true;
      
    },
    routeTo(code){
      if(code){
        this.$router.push({ path: '/company/employee/add', query: { code: code }});
      }else{
        this.$router.push({ path: '/company/employee/add'});
      }
    },
    toEmployeeAdd(){
      this.routeTo()
      //this.codeshow = false
      //this.employeeFormVisible = true
    },
    toEmployDelete(code){
      if(!code){
        this.$message({
          type: 'warning',
          message: '员工编号不能为空'
        });
        return false;
      }else{
        this.listLoading = true
        employeeDelete(code).then(response => {
          this.$message({
          type: 'success',
          message: '删除成功！'
        });
          this.listLoading = false
          this.fetchData()
        }).catch(response => {
            this.listLoading = false
            this.fetchData()
          })
        }
    },
    toEmployUpdate(code){
      if(!code){
        this.$message({
          type: 'warning',
          message: '员工编号不能为空'
        });
        return false;
      }else{
        this.routeTo(code)
      }
    },
    showEmployeeDetail(code){        
      if(!code){
        this.$message({
          type: 'warning',
          message: '员工编号不能为空'
        });
        return false;
      }else{     
        
        this.getEmployeeDetail(code)
        this.employeeDialogVisible=true
     }
      
    },
    getEmployeeDetail(code){
      this.updateEmployeeLoading = true
        employeeDetail(code).then(response => {
           this.employeeInfo =response.data
          this.employeeform=response.data
          this.updateEmployeeLoading = false
        }).catch(response =>{
          this.updateEmployeeLoading = false
        })

     // const detailObj = this.responseObj.data
      //return detailObj
    },
     confirmFunc(username) {
        this.$confirm('此操作将激活用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          center: true
        }).then(() => {
          this.listLoading = true
          toUserPass(username).then(response => {
            
            this.$message({
              type: 'success',
              message: '审核成功!'
            });
            this.fetchData()
          })
          this.listLoading = false
          
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      },
      submitEmployeeForm(formName) {
            this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if(!this.codeshow){
            //this.contractform.scanningCopyUrl = this.imageUrl
             let index = this.employeeform.educationInformation.length

               let domains = this.employeeform.educationInformation
                console.dir(domains)
            const param = {

              // name: this.contractform.name || "",
              // firstPartyCode:this.contractform.firstPartyCode || "",
              // secondPartyCode:this.contractform.secondPartyCode || "",
              // scanningCopyUrl:this.contractform.scanningCopyUrl || "",
              // expireDate:this.contractform.expireDate || "",
              // nation:this.contractform.nation || "",
              // employeeNumber:this.contractform.employeeNumber || ""
              passportName: this.employeeform.passportName,
              passportId: this.employeeform.passportId,
              passportIssueDate: this.employeeform.passportIssueDate,
              passportExpireDate: this.employeeform.passportExpireDate,
              papersId: this.employeeform.papersId,
              papersType: this.employeeform.papersType,
              birthday: this.employeeform.birthday,
              age: this.employeeform.age,
              height: this.employeeform.height,
              weight: this.employeeform.weight,
              clothesSize: this.employeeform.clothesSize,
              shoesSize: this.employeeform.shoesSize,
              nationality: this.employeeform.nationality,
              religion: this.employeeform.religion,
              homeAddress: this.employeeform.homeAddress,
              maritalStatus: this.employeeform.maritalStatus,
              homePhone: this.employeeform.homePhone,
              educationInformation: this.employeeform.educationInformation,
              emergencyContacts: this.employeeform.emergencyContacts,
              familyMembers: this.employeeform.familyMembers,
              startWorkDate: this.employeeform.startWorkDate,
              jobResumes: this.employeeform.jobResumes,
              papersPhotoUrl: this.employeeform.papersPhotoUrl,
              drivingLicenseUrl: this.employeeform.drivingLicenseUrl,
              credentialsUrl: this.employeeform.credentialsUrl,
              jobTypes: this.employeeform.jobTypes
            };
            console.log(param);
            this.updateEmployeeLoading = true;
            employeeAdd(param).then(response => {
              this.updateEmployeeLoading = false
              this.closeDialog()
              
              
            }).catch(response => {
              this.updateEmployeeLoading = false
              
            })
             
          }else{
            const param = {
              passportName: this.employeeform.passportName,
              passportId: this.employeeform.passportId,
              passportIssueDate: this.employeeform.passportIssueDate,
              passportExpireDate: this.employeeform.passportExpireDate,
              papersId: this.employeeform.papersId,
              papersType: this.employeeform.papersType,
              birthday: this.employeeform.birthday,
              age: this.employeeform.age,
              height: this.employeeform.height,
              weight: this.employeeform.weight,
              clothesSize: this.employeeform.clothesSize,
              shoesSize: this.employeeform.shoesSize,
              nationality: this.employeeform.nationality,
              religion: this.employeeform.religion,
              homeAddress: this.employeeform.homeAddress,
              maritalStatus: this.employeeform.maritalStatus,
              homePhone: this.employeeform.homePhone,
              educationInformation: this.employeeform.educationInformation,
              emergencyContacts: this.employeeform.emergencyContacts,
              familyMembers: this.employeeform.familyMembers,
              startWorkDate: this.employeeform.startWorkDate,
              jobResumes: this.employeeform.jobResumes,
              papersPhotoUrl: this.employeeform.papersPhotoUrl,
              drivingLicenseUrl: this.employeeform.drivingLicenseUrl,
              credentialsUrl: this.employeeform.credentialsUrl,
              jobTypes: this.employeeform.jobTypes,
              code:this.employeeform.code
              
            };
            console.log(param);
            this.updateEmployeeLoading = true;
            //const paramstr = JSON.stringify(param);
            employeeUpdate(param).then(response => {
              this.updateEmployeeLoading = false
              this.closeDialog()
              
            }).catch(response => {
              this.updateEmployeeLoading = false
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
      showDetail(){
      },      
      
      closeDialog(){
	      this.$refs.employeeform.resetFields()
        this.employeeFormVisible = false
        this.fetchData()
    }
     
  }
}
</script>
<style>
.employee-input{
  width:80%;
  padding-right:10px
}
.common-writeBtn{
    margin-right:10px;
  }
</style>
