<template>
  <div class="app-container">
    <el-dialog
      title="企业详情"
      :visible.sync="companyDialogVisible"      
      width="30%"
      center>
      <div class="company-dl-left"><span class="title">{{ $t('m.company.code')}}：</span>{{ companyInfo.code }}</div>
      <div class="company-dl-left"><span class="title">{{ $t('m.company.name')}}：</span>{{ companyInfo.name }}</div>
      
      <div class="company-dl-left"><span class="title">{{ $t('m.company.country')}}：</span>{{ companyInfo.country }}</div>
      <div class="company-dl-left"><span class="title">{{ $t('m.company.companyType')}}：</span>{{ companyInfo.companyType }}</div>
      <div class="company-dl-left"><span class="title">{{ $t('m.company.status')}}：</span>{{ companyInfo.status }}</div>
      <div class="company-dl-left"><span class="title">{{ $t('m.company.businessLicenseNumber')}}：</span>{{ companyInfo.businessLicenseNumber }}</div>
      <div class="company-dl-left"><span class="title">{{ $t('m.company.businessLicenseUrl')}}：</span>{{ companyInfo.businessLicenseUrl }}</div>
      <div class="company-dl-left"><span class="title">{{ $t('m.company.createTime')}}：</span>{{ companyInfo.createTime }}</div>
       <div class="company-dl-left"><span class="title">{{ $t('m.company.updateTime')}}：</span>{{ companyInfo.updateTime }}</div>
      <span></span>
      <span></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="companyDialogVisible = false">{{ $t('m.common.okbtn')}}</el-button>
      </span>
    </el-dialog>
    <div style="padding:20px ">
       
        <el-select
          v-model="statusValue.label"
          clearable
          :placeholder="$t('m.company.status')"
          @change="getStatusValue"
        >
          <el-option
            v-for="item in statusoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
           ></el-option>
        </el-select>
      </div>      
    <el-table
      v-loading="companylistLoading"
      :data="companyListObj"
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
      <el-table-column :label="$t('m.company.code')" align="center" >
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.company.name')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.company.businessLicenseNumber')" width="200"  align="center">
        <template slot-scope="scope">
          {{ scope.row.businessLicenseNumber }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="企业营业执照文件" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.businessLicenseUrl }}
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('m.company.country')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.country }}
        </template>
      </el-table-column>      <el-table-column :label="$t('m.company.companyType')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.companyType }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.company.createTime')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.company.updateTime')"  align="center">
        <template slot-scope="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('m.company.status')" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}

        </template>
      </el-table-column>      
      <el-table-column align="center" prop="created_at" :label="$t('m.common.handle')" width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.status === '待审核'">
            <el-link   size="small" icon="el-icon-check" type="success"  @click.native.prevent="confirmFunc(scope.row.code,true)"> {{$t('m.company.statusbtn1')}}</el-link>
            <el-link   size="small" icon="el-icon-close" type="danger"  @click.native.prevent="confirmFunc(scope.row.code,false)">{{$t('m.company.statusbtn2')}}</el-link>

          </div>
          <div v-else>
              <el-link @click.native.prevent="showDetail(scope.row.code)">{{$t('m.company.detailbtn')}}<i class="el-icon-view el-icon--right"></i> </el-link>
          </div>
          
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { companyList, companyPass, companyShow } from "@/api/company";
export default {
  
  data() {
    return {
      companyDialogVisible: false,
      statusValue:{value:'0',label:this.$t('m.company.statusitem1')},
      list: null,
      companyInfo:{
        code:'',
        name:'',
        businessLicenseNumber:'',
        status:'',
        companyType:'',
        businessLicenseUrl:'',
        createTime:'',
        updateTime:'',
        country:''

      },
      companyListObj:null,
      companylistLoading: false,
      companycommand:2,
      tipStr:'',
      value1: '',
      listObj:'{"code":20000,"data":{"total":30,"items":[{"id":"500000198306164820","company_name":"五粮液集团","name1":"这里是合约名称","parent_id":"2200198306164820","count":12},{"id":"500000198306164820","company_name":"五粮液集团","name1":"这里是合约名称","parent_id":"2200198306164820","count":25},{"id":"500000198306164820","company_name":"五粮液集团","name1":"这里是合约名称","parent_id":"2200198306164820","count":25},{"id":"500000198306164820","company_name":"五粮液集团","name1":"这里是合约名称","parent_id":"2200198306164820","count":12},{"id":"500000198306164820","company_name":"五粮液集团","name1":"这里是合约名称","parent_id":"2200198306164820","count":25},{"id":"500000198306164820","company_name":"五粮液集团","name1":"这里是合约名称","parent_id":"2200198306164820","count":25}]}}',
      statusoptions: [
          {
            value: "0",
            label: this.$t('m.company.statusitem1'),
          },
          {
            value: "1",
            label: this.$t('m.company.statusitem2'),
          },
          {
            value: "2",
            label: this.$t('m.company.statusitem3'),
          },
          {
            value: "3",
            label: this.$t('m.company.statusitem4'),
          }
        ],
        dialogTableVisible: false
    }
  },
  computed:{

  },
  created() {
    
    this.statusValue.label = this.statusoptions[0].label
    this.getStatusValue(this.statusoptions[0].value)
  },
  methods: {
    
     getStatusValue(value) {
       this.$forceUpdate()
        if(!value){
          value = ''
        }
        this.getCompanyData(value)
      },
    getCompanyData(value) {
      this.companylistLoading = true
      //this.list=JSON.parse(this.listObj).data.items;
     // this.listLoading = false
     const status =value;
      companyList(status).then(response => {
        this.companylistLoading = false
        this.companyListObj=response.data
      }).catch(response =>{
        this.companylistLoading = false
      })
      
    },
    confirmFunc(code,pass) {
      
      if(pass){
        this.tipStr="请确认是否将此企业审核通过?"

      }else{
        this.tipStr="请确认是否将此企业审核不通过?"
      }
        this.$confirm(this.tipStr, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          center: true
        }).then(() => {
          this.companylistLoading = true
          companyPass(code,pass).then(response => {
             this.companylistLoading = false
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getCompanyData()
          }).catch(response =>{
        this.companylistLoading = false
      })
         
          
        }).catch(() => {
          
        });
      },
      statusText(status){
        const statusStr=''
        switch(status){
          case 0:
            statusStr='未提交审核'
            break;
          case 1:
            statusStr='待审核'
            break;
          case 2:
            statusStr='审核通过'
            break;
          case 3:
            statusStr='审核不通过'
            break;
          default:break;
        }
        return statusStr;
      },
      
      showDetail(code){        
        this.companylistLoading = true
        this.companyDialogVisible=true;
          companyShow(code).then(response => {
            console.dir(response);
             this.companylistLoading = false
            //this.companyInfo.code=response.data.code
            this.companyInfo=response.data
            
          }).catch(response =>{
        this.companylistLoading = false
      })
         
      },
      toCompanyReg(){
        this.$router.push('/company/register')       
         
      },
      toDetailDialog(){
        this.dialogTableVisible = true;
      }
     
  }
}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .company-dl-left{
    padding:10px 20%;
    text-align: left;
    font-size: 14px;
  }
  .company-dl-left .title{
    font-weight: bold;
  }
  .company-dl-right{
    width: 25%;
    padding:10px;
  }
</style>