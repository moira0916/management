<template>
  <div>
    <!-- title -->
    <el-row>
      <el-col :span="24" style="padding:10px;border-bottom:1px solid #ccc;">
        <i
          class="el-icon-back"
          style="font-size:20px;float:left;cursor:pointer;margin-top:15px;margin-right:15px;line-height:0px;"
          @click="pageToDepartCenter"
        />
        <el-button
          size="mini"
          type="primary"
          @click="listAdd"
        >添加组</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="listDeleteMulti"
        >批量删除</el-button>
        <i
          class="el-icon-refresh-right"
          style="font-size:20px;float:right;cursor:pointer;margin-top:15px;margin-right:15px;line-height:0px;"
          @click="loadList"
        />
      </el-col>
    </el-row>

    <!-- table -->
    <el-table
      v-loading="table.loading"
      :data="table.data.filter(data => !table.search || data.group_name.includes(table.search) || data.group_code.includes(table.search))"
      row-key="group_id"
      style="width: 100%;"
      @selection-change="listSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        type="index"
        label="序号"
        width="55"
        :index="indexMethod"
      />
      <el-table-column
        prop="center_name"
        label="中心名称"
      />
      <el-table-column
        prop="group_name"
        label="组名称"
      />
      <el-table-column
        prop="group_code"
        label="组编码"
      />
      <el-table-column
        align="left"
        label="编辑"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="listEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="listDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- edit -->
    <el-drawer
      ref="Editor"
      title="组编辑"
      size="30%"
      :visible.sync="edit.show"
      :direction="edit.direction"
      :before-close="editClose"
      :wrapper-closable="false"
    >
      <div class="demo-drawer__content" style="padding:10px;">
        <el-form :model="edit.data">
          <el-form-item label="组名称" :label-width="edit.labelWidth">
            <el-input v-model="edit.data.group_name" />
          </el-form-item>
          <el-form-item label="组编码" :label-width="edit.labelWidth">
            <el-input v-model="edit.data.group_code" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="editClose">关 闭</el-button>
          <el-button type="primary" :loading="edit.loading" @click="editCommit">{{ edit.loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import { MessageBox, Message } from 'element-ui'
import { GetDepartGroupList, ModifyDepartGroupList, DeleteDepartGroupList } from '@/api/system_depart_group/index'
export default {
  data() {
    return {
      center_id: this.$route.params.center_id,
      table: {
        data: [],
        multipleSelection: [],
        loading: false,
        search: ''
      },
      edit: {
        direction: 'rtl',
        show: false,
        labelWidth: '80px',
        loading: false,
        data: {
        }
      }
    }
  },
  mounted() {
    // 如果没有center_id 返回center页面
    if (!/^[\d]+$/.test(this.center_id)) {
      MessageBox.confirm('请求错误', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.pageToDepartCenter()
      }).catch(action => {
        this.pageToDepartCenter()
      })
    }

    this.loadList()
  },
  methods: {
    // 返回中心配置页面
    pageToDepartCenter() {
      this.$router.push({
        name: 'DepartCenter'
      })
    },
    indexMethod(index) {
      return index + 1
    },
    listSelectionChange(val) {
      this.table.multipleSelection = val
    },
    loadList() {
      this.table.data = []
      GetDepartGroupList({ center_id: this.center_id }).then(response => {
        this.table.data = response.result
      })
    },
    // 编辑器新增
    listAdd() {
      this.edit.data = {}
      this.edit.show = true
    },
    listEdit(index, row) {
      this.edit.data = JSON.parse(JSON.stringify(row))
      this.edit.show = true
    },
    listDelete(index, row) {
      MessageBox.confirm('确定删除' + row.group_name + '?', 'Confirm logout', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = [row.group_id]
        DeleteDepartGroupList(ids).then(response => {
          if (response.code !== 0) {
            Message({
              message: 'error:' + response.message,
              type: 'error',
              duration: 5 * 1000
            })
            return
          }
          Message({
            message: 'Succ',
            type: 'success',
            duration: 5 * 1000
          })
          this.loadList()
        })
      })
    },
    listDeleteMulti() {
      const ids = []
      for (var i in this.table.multipleSelection) {
        ids.push(this.table.multipleSelection[i].group_id)
      }
      MessageBox.confirm('确定删除' + ids.length + '个?', 'Confirm logout', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteDepartGroupList(ids).then(response => {
          if (response.code !== 0) {
            Message({
              message: 'error:' + response.message,
              type: 'error',
              duration: 5 * 1000
            })
            return
          }
          Message({
            message: 'Succ',
            type: 'success',
            duration: 5 * 1000
          })
          this.loadList()
        })
      })
    },
    editClose() {
      this.edit.show = false
    },
    editCommit() {
      this.edit.loading = true
      this.edit.data.center_id = this.center_id
      ModifyDepartGroupList(this.edit.data).then(response => {
        this.edit.loading = false
        if (response.code === 0) {
          Message({
            message: '成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.loadList()
        } else {
          Message({
            message: '失败' + response.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    }

  }
}
</script>

