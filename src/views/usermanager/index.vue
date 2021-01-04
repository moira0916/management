<template>
  <div class="app-container">  
    <el-dialog  :title="$t('m.usermanager.updateUser')" :visible.sync="userUpdateFormVisible" :before-close="closeDialog" :close-on-click-modal="false">
      <el-form v-loading="userUpdateLoading" ref="userInfoform" :model="userInfoform" :rules="rules" >
        <el-row>
           <el-col :span="12">
            <el-form-item v-show="updateFlag" :label="$t('m.usermanager.username')" :label-width="formLabelWidth" >
              {{userInfoform.username}}
            </el-form-item>
            <el-form-item v-show="!updateFlag" :label="$t('m.usermanager.username')" :label-width="formLabelWidth" prop="username">
              <el-input v-model="userInfoform.username" autocomplete="off"  ></el-input>
            </el-form-item>
          </el-col>          
          <el-col :span="12">
            <el-form-item :label="$t('m.usermanager.name')" :label-width="formLabelWidth" prop="name">
              <el-input v-model="userInfoform.name" autocomplete="off" minlength="2" maxlength="15" width="30%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.usermanager.password')" :label-width="formLabelWidth" prop="password">
               <el-input
                    v-model.trim="userInfoform.password"
                    type="password"
                    :placeholder="$t('m.usermanager.passwordph')"
                    autocomplete="new-password"
                  >
                  </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.usermanager.email')" :label-width="formLabelWidth" prop="email">
               <el-input
                  v-model.trim="userInfoform.email"
                  type="text"
                  :placeholder="$t('m.usermanager.emailph')"
                  auto-complete="off"
                >
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.usermanager.phone')" :label-width="formLabelWidth" prop="phone">
              <el-input
                v-model.trim="userInfoform.phone"
                type="text"
                :placeholder="$t('m.usermanager.phoneph')"
                maxlength="11"
                show-word-limit
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item :label="$t('m.usermanager.companyCode')" :label-width="formLabelWidth" prop="companyCode">
              <el-input
                v-model.trim="userInfoform.companyCode"
                type="text"
                :placeholder="$t('m.usermanager.companyCodeph')"                
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.usermanager.role')" :label-width="formLabelWidth" prop="role">
              <el-select v-model="userInfoform.role" :placeholder="$t('m.usermanager.role')">
                <el-option :label="$t('m.usermanager.roleItem2')" value="-1"></el-option>
                <el-option :label="$t('m.usermanager.roleItem3')" value="1"></el-option>
                <el-option :label="$t('m.usermanager.roleItem4')" value="2"></el-option>
              </el-select>
            </el-form-item>
            
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.usermanager.status')" :label-width="formLabelWidth" prop="status">  
              <el-select v-model="userInfoform.status" :placeholder="$t('m.usermanager.status')">
                <el-option :label="$t('m.usermanager.statusitem2')" value="1"></el-option>
                <el-option :label="$t('m.usermanager.statusitem3')" value="2"></el-option>
                <el-option :label="$t('m.usermanager.statusitem4')" value="3"></el-option>
                <el-option :label="$t('m.usermanager.statusitem5')" value="4"></el-option>
                <el-option :label="$t('m.usermanager.statusitem6')" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
         
        </el-row>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">{{$t('m.common.cancelbtn')}}</el-button>
        <el-button type="primary" @click="submitUserForm()">{{$t('m.common.okbtn')}}</el-button>
      </div>
    </el-dialog>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" style="margin:20px 0">
      <el-form-item :label="$t('m.usermanager.name')">
        <el-input v-model="searchForm.name" :placeholder="$t('m.usermanager.name')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('m.usermanager.role')">
        <el-select v-model="searchForm.userType" :placeholder="$t('m.usermanager.role')">
          <el-option :label="$t('m.usermanager.roleItem1')" value=""></el-option>
          <el-option :label="$t('m.usermanager.roleItem2')" value="-1"></el-option>
          <el-option :label="$t('m.usermanager.roleItem3')" value="1"></el-option>
          <el-option :label="$t('m.usermanager.roleItem4')" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('m.usermanager.status')">
        <el-select v-model="searchForm.userStatus" :placeholder="$t('m.usermanager.status')">
          <el-option :label="$t('m.usermanager.statusitem1')" value=""></el-option>
          <el-option :label="$t('m.usermanager.statusitem2')" value="1"></el-option>
          <el-option :label="$t('m.usermanager.statusitem3')" value="2"></el-option>
          <el-option :label="$t('m.usermanager.statusitem4')" value="3"></el-option>
          <el-option :label="$t('m.usermanager.statusitem5')" value="4"></el-option>
          <el-option :label="$t('m.usermanager.statusitem6')" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('m.usermanager.companycode')">
        <el-input v-model="searchForm.companyCode" :placeholder="$t('m.usermanager.companycode')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('m.usermanager.phone')">
        <el-input v-model="searchForm.phone" :placeholder="$t('m.usermanager.phone')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="searchUserList()">{{ $t('m.usermanager.btn5') }}</el-button>
      </el-form-item>      
    </el-form>
    <el-row>
      <el-col :span="8" :push="16" align="right" style="margin:20px 0">
        <el-button type="primary" @click.native.prevent="openUpdateDialogFunc()" plain style="margin:0 10px">{{ $t('m.usermanager.btn3') }}</el-button>
        <el-button type="danger" @click.native.prevent="deleteUserList()" plain style="margin:0 10px">{{ $t('m.usermanager.btn4') }}</el-button>
      </el-col>

    </el-row>
    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      :data="userList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
   <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column align="center" :label="$t('m.common.tableindex')" >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.usermanager.name')"  align="center" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>     
      <el-table-column :label="$t('m.usermanager.phone')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.usermanager.role')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column> 
      <el-table-column :label="$t('m.usermanager.status')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>  
      <el-table-column :label="$t('m.usermanager.createTime')"  align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.createTime).format('YYYY-MM-DD HH:MM:SS') }}
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('m.usermanager.email')"  align="center" width="180">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>     
      <el-table-column :label="$t('m.usermanager.companyCode')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.companyCode }}
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('m.usermanager.role')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
       
      <el-table-column :label="$t('m.usermanager.updateTime')" align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.updateTime).format('YYYY-MM-DD HH:MM:SS') }}
        </template>
      </el-table-column> -->
         
      <el-table-column align="center" prop="created_at" :label="$t('m.usermanager.handle')" width="150">
        <template slot-scope="scope">
          <el-link type="primary" v-if="scope.row.status == '待审核'" @click.native.prevent="confirmFunc(scope.row.username)" style="margin:0 10px">{{ $t('m.usermanager.btn1') }}</el-link>
          <el-link type="primary" @click.native.prevent="openUpdateDialogFunc(scope.row.username)" style="margin:0 10px">{{ $t('m.usermanager.btn2') }}</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList, toUserPass,userAll,userdelete,userAdd,userUpdate,userDetail} from '@/api/user'
import { isPassword, isPhone, isEmail} from '@/utils/validate';
export default {
  
  data() {
    const validateusername = (rule, value, callback) => {
        if ('' === value) {
          callback(new Error("用户名不能为空"));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error("密码不能少于6位"));
        } else {
          callback();
        }
      };
      const validatePhone = (rule, value, callback) => {
        if (!isPhone(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      };
      const validateEmial = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error("请输入正确的邮箱地址"));
        } else {
          callback();
        }
      };
      const validateCompany = (rule, value, callback) => {
        if(this.userInfoform.role == "2"){
          callback();
        }else{
            if('' === value){
              callback(new Error("请输入正确的企业编码"));
            }else{
               callback();
            }
           
        }
        
      };
      
    return {
      list: null,
      userList:null,
      listLoading: false,
      value1: '',
      userInfoform:{},
      userUpdateLoading:false,
      userUpdateFormVisible:false,
      codeshow:false,
      updateFlag:false,
      userformName:'userInfoform',
      rules: {
        username: [
            { required: true, message: '请输入正确的用户名', trigger: 'blur' },
            {min: 2, max: 20, trigger: "blur", message: "最少不能少于2个字，最多不能超过20个字" },
            { validator: validateusername, trigger: "blur" },
          ],
          name: [
            { required: true, message: '请输入正确的姓名', trigger: 'blur' },
            { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }
          ],
          email:[
             { required: true, message: '请输入正确邮箱地址', trigger: 'blur' },
              { validator: validateEmial, trigger: "blur" }
          ],
          phone: [
            { required: true, message: '请输入正确的手机号码', trigger: 'blur' },
            { validator: validatePhone, trigger: "blur" },
          ],      
          password: [
            { required: true, message: '请输入不小于6位长度的密码', trigger: 'blur' },
             { validator: validatePassword, trigger: "blur" },
          ],          
          status: [
            { required: true, message: '请选择用户状态', trigger: 'change' }
          ],
          role: [
            { required: true, message: '请选择用户角色', trigger: 'change' },
          
          ],
          companyCode:[
            { validator: validateCompany, trigger: "blur" },
          ]
        },    
        dialogTableVisible: false,
        searchForm:{
          name:'',
          userType:'',
          phone:'',
          companyCode:'',
          userStatus:''
        },        
        formLabelWidth: '120px',
        multipleSelection:[]
    }
  },
  created() {
    //this.fetchData()
  },
  methods: {
    
    searchUserList(){
      const params = {
        name:this.searchForm.name,
        userType:this.searchForm.userType,
        phone:this.searchForm.phone,
        companyCode:this.searchForm.companyCode,
        userStatus:this.searchForm.userStatus
      }
      this.userList =null
       this.listLoading = true
      userAll(params).then(response =>{
        this.listLoading = false
        this.userList=response.data
      }).catch(response =>{
        this.listLoading = false
      })
    },
    deleteUserList(){
      let selectUserArr =[]
       if(this.multipleSelection.length>0){
        
        this.multipleSelection.forEach((item,index) =>{
          selectUserArr.push(item.username)
        })        
       }else{
         return false
       }
       this.listLoading = true
      userdelete(selectUserArr).then(response =>{
        this.listLoading = false        
         this.searchUserList()
      }).catch(response => {
          this.listLoading = false
        })
    },
    openUpdateDialogFunc(username){
      if(username){
         this.listLoading = true
        userDetail(username).then(response =>{
           this.listLoading = false
           let status = response.data.status
           let statusValue=''
           switch (status){
            case '激活':
              statusValue = '1'
              break;
             case '待审核':
              statusValue = '2'
              break;
            case '审核不通过':
              statusValue = '3'
              break;
             case '锁定':
              statusValue = '4'
              break;
             case '注销':
              statusValue = '5'
              break;             
            default:
              break;
        
          }
          let role = response.data.role
           let roleValue=''
           switch (role){
            case '超级管理员':
              roleValue = '-1'
              break;
             case '企业管理员':
              roleValue = '1'
              break;
            case '个人用户':
              roleValue = '2'
              break;            
            default:
              break;
        
          }
          this.userInfoform ={
            username:response.data.username,
            phone:response.data.phone,
            name:response.data.name,
            email:response.data.email,
            companyCode:response.data.companyCode,
            status:statusValue,
            role:roleValue
          }
          this.updateFlag = true
           this.userUpdateFormVisible = true
          }).catch(response => {
            this.listLoading = false
          })
     
      }else{
        this.userUpdateFormVisible = true
        this.updateFlag = false
      }
      
    },
    submitUserForm(){
      this.$refs.userInfoform.validate(async (valid) => {
        if (valid) {
          const param  = {
            username:this.userInfoform.username,        
            password:this.userInfoform.password,
            phone:this.userInfoform.phone,
            name:this.userInfoform.name,
            email:this.userInfoform.email,
            companyCode:this.userInfoform.companyCode,
            status:this.userInfoform.status,
            role:this.userInfoform.role
          }
          this.userUpdateLoading = true;
          console.log(param)
          if(!this.updateFlag){
            userAdd(param).then(response => {
              this.userUpdateLoading = false
              this.closeDialog()
              this.searchUserList()
            }).catch(response => {
              this.userUpdateLoading = false
            })
          }else{
            userUpdate(param).then(response => {
              this.userUpdateLoading = false    
              this.closeDialog()
              this.searchUserList()      
            }).catch(response => {
              this.userUpdateLoading = false
            })
          }
        }
      })
     
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
            this.listLoading = false
            this.$message({
              type: 'success',
              message: '审核成功!'
            });
            this.searchUserList()
          }).catch(response =>{
            this.listLoading = false
          })
          
          
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      },      
       handleSelectionChange(val) {
        this.multipleSelection = val;
      },     
      closeDialog(){
        this.resetUserInfoForm() 
        this.$refs.userInfoform.resetFields();     
	      this.userUpdateFormVisible = false
    },
    resetUserInfoForm(){
      this.userInfoform={
        username:'',
        password:'',
        phone:'',
        name:'',
        email:'',
        companyCode:'',
        status:'',
        role:'',
        createTime:'',
        updateTime:''
      }
    }
     
  }
}
</script>
