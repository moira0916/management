<template>
  <div class="app-container">
    <div style="width:100%;padding:20px">
      <el-button type="primary" round  @click="openPersionPane('new')">新增员工</el-button>
      <el-upload style="display:inline-block;margin:0 20px"
        class="upload-demo"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :show-file-list="false"
        >
        <el-button type="primary" round>批量导入</el-button>
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload> 
   <!-- <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload> -->
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="企业工号" :label-width="formLabelWidth">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="护照号" :label-width="formLabelWidth">
          <el-input v-model="form.idNum" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="姓" :label-width="formLabelWidth">
          <el-input v-model="form.name1" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="名" :label-width="formLabelWidth">
          <el-input v-model="form.name2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="项目" :label-width="formLabelWidth">
          <el-input v-model="form.progarm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="岗位" :label-width="formLabelWidth">
          <el-input v-model="form.gangwei" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入职日期" :label-width="formLabelWidth">
          <el-date-picker
          v-model="form.enter_date"
          type="date"
          placeholder="选择日期" >
        </el-date-picker>
        </el-form-item>
        <el-form-item label="在职状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择在职状态">
            <el-option label="在职" value="draft"></el-option>
            <el-option label="离职" value="deleted"></el-option>
            <el-option label="休假" value="published"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitPerson">提交</el-button>
      </div>
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
    <el-table-column type="selection" align="center"  width="50">
        
      </el-table-column>
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="入职日期" align="center" sortable width="150">
        <template slot-scope="scope">
          {{ scope.row.enter_date }}
        </template>
      </el-table-column>
      <el-table-column label="企业工号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="护照号"  align="center">
        <template slot-scope="scope">
          {{ scope.row.idnum }}
        </template>
      </el-table-column>
      <el-table-column label="姓" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.name1 }}
        </template>
      </el-table-column>
      <el-table-column label="名" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.name2 }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" sortable width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column label="项目"  align="center">
        <template slot-scope="scope">
          {{ scope.row.progarm }}
        </template>
      </el-table-column>
      <el-table-column label="岗位" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.gangwei }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="80" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status_name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="openPersionPane('edit',scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      value1: '',
      listObj:'{"code":20000,"data":{"total":30,"items":[{"id":"500000198306164820","enter_date":"2019-09-01","status":"draft","author":"五粮液集团","display_time":"2007-07-16 21:11:37","name1":"王","name2":"老三","age":25,"progarm":"这是项目名称","idnum":"ZG0001","gangwei":"技术工人","status_name":"在职"},{"id":"500000198306164820","enter_date":"2009-09-01","status":"draft","author":"木工建材有限公司","display_time":"2007-07-16 21:11:37","name1":"王","name2":"狗蛋","age":32,"progarm":"这是项目名2称","idnum":"ZG0001","gangwei":"销售经理","status_name":"在职"},{"id":"500000198306164820","enter_date":"2020-09-01","status":"deleted","author":"五粮液集团","display_time":"2007-07-16 21:11:37","name1":"王","name2":"建国","age":22,"progarm":"这是项目名3称","idnum":"ZG0001","gangwei":"技术工人","status_name":"离职"},{"id":"500000198306164820","enter_date":"2019-01-01","status":"published","author":"五粮液集团","display_time":"2007-07-16 21:11:37","name1":"刘","name2":"大漂亮","age":20,"progarm":"这是项目名4称","idnum":"ZG0001","gangwei":"酒鬼","status_name":"休假"},{"id":"500000198306164820","enter_date":"2019-02-01","status":"draft","author":"五粮液集团","display_time":"2007-07-16 21:11:37","name1":"李","name2":"二牛","age":28,"progarm":"这是项目名5称","idnum":"ZG0001","gangwei":"秃头程序猿","status_name":"在职"},{"id":"500000198306164820","enter_date":"2017-09-01","status":"draft","author":"五粮液集团","display_time":"2007-07-16 21:11:37","name1":"沈","name2":"TOM","age":44,"progarm":"这是项目名7称","idnum":"ZG0001","gangwei":"高级主管","status_name":"在职"},{"id":"500000198306164820","enter_date":"2019-09-01","status":"draft","author":"五粮液集团","display_time":"2007-07-16 21:11:37","name1":"王","name2":"老三","age":25,"progarm":"这是项目名称","idnum":"ZG0001","gangwei":"技术工人","status_name":"在职"},{"id":"500000198306164820","enter_date":"2009-09-01","status":"draft","author":"木工建材有限公司","display_time":"2007-07-16 21:11:37","name1":"王","name2":"狗蛋","age":32,"progarm":"这是项目名2称","idnum":"ZG0001","gangwei":"销售经理","status_name":"在职"},{"id":"500000198306164820","enter_date":"2020-09-01","status":"deleted","author":"五粮液集团","display_time":"2007-07-16 21:11:37","name1":"王","name2":"建国","age":22,"progarm":"这是项目名3称","idnum":"ZG0001","gangwei":"技术工人","status_name":"离职"},{"id":"500000198306164820","enter_date":"2019-01-01","status":"published","author":"五粮液集团","display_time":"2007-07-16 21:11:37","name1":"刘","name2":"大漂亮","age":20,"progarm":"这是项目名4称","idnum":"ZG0001","gangwei":"酒鬼","status_name":"休假"},{"id":"500000198306164820","enter_date":"2019-02-01","status":"draft","author":"五粮液集团","display_time":"2007-07-16 21:11:37","name1":"李","name2":"二牛","age":28,"progarm":"这是项目名5称","idnum":"ZG0001","gangwei":"秃头程序猿","status_name":"在职"},{"id":"500000198306164820","enter_date":"2017-09-01","status":"draft","author":"五粮液集团","display_time":"2007-07-16 21:11:37","name1":"沈","name2":"TOM","age":44,"progarm":"这是项目名7称","idnum":"ZG0001","gangwei":"高级主管","status_name":"在职"}]}}',
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      dialogFormVisible: false,
        form: {
          author: '',
          idNum: '',
          name1: '',
          name2: '',
          enter_date:'',
          gangwei: '',
          age: '',
          status: '',
          progarm:""
        },
        formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.list=JSON.parse(this.listObj).data.items;
      this.listLoading = false
     /* getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
      */
    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      openPersionPane(param,obj){
        this.dialogFormVisible = true;
        this.$alert(param);
        if(param="edit"){
          
        }else{

        }       
      },
      commitPerson(){
        this.dialogFormVisible = false        
      }
  }
}
</script>
