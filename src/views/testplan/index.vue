<template>
  <div class="app-container">
    
    <el-table
      v-loading="listLoading"
      :data="list"
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
      <el-table-column label="时间" align="center" sortable width="200">
        <template slot-scope="scope">
          {{ scope.row.test_time }}
        </template>
      </el-table-column>
      <el-table-column label="派出公司" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.company_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合约名称"  align="center">
        <template slot-scope="scope">
          {{ scope.row.name1 }}
        </template>
      </el-table-column>
      <el-table-column label="招工人数" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.count }}
        </template>
      </el-table-column>
      <el-table-column label="国家" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.country }}
        </template>
      </el-table-column>      
      <el-table-column align="center" prop="created_at" label="详情" width="250">
        <template slot-scope="scope">
          <el-button  type="text"  @click="jumpDetail">点击进入</el-button>
         
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      list: null,
      listLoading: true,
      value1: '',
      listObj:'{"code":20000,"data":{"total":30,"items":[{"id":"500000198306164820","company_name":"五粮液集团","test_time":"2020-07-16 21:11:37","name1":"这里是合约名称","country":"中国","count":25},{"id":"500000198306164820","company_name":"五粮液集团2","test_time":"2020-07-16 21:11:37","name1":"这里是合约名称2","country":"中国","count":25},{"id":"500000198306164820","company_name":"五粮液集团3","test_time":"2020-07-16 21:11:37","name1":"这里是合约名称3","country":"中国","count":25}]}}',
      
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
      
      jumpDetail(){
        this.$router.push('/nested/menu1')       
         
      }
     
  }
}
</script>
