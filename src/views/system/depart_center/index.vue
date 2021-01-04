<template>
  <div>
    <!-- title -->
    <el-row>
      <el-col :span="24" style="padding:10px;border-bottom:1px solid #ccc;">
        <el-button
          size="mini"
          type="primary"
          @click="editorAdd"
        >添加中心</el-button>
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
      :data="table.data.filter(data => !table.search || data.center_name.includes(table.search) || data.center_code.includes(table.search))"
      row-key="center_id"
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
        width="200"
      />
      <el-table-column
        prop="center_code"
        label="中心编码"
        width="100"
      />
      <el-table-column
        align="left"
        label="编辑"
        width="200"
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
      <el-table-column
        prop="groups"
        label="组"
      />
      <el-table-column
        align="right"
        width="300"
      >
        <template slot="header">
          <el-input
            v-model="table.search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="pageToGroup(scope.$index, scope.row)"
          >配置组信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- edit -->
    <el-drawer
      ref="Editor"
      title="中心编辑"
      size="30%"
      :visible.sync="edit.show"
      :direction="edit.direction"
      :before-close="editorClose"
      :wrapper-closable="false"
    >
      <div class="demo-drawer__content" style="padding:10px;">
        <el-form :model="edit.data">
          <el-form-item label="中心名称" :label-width="edit.labelWidth">
            <el-input v-model="edit.data.center_name" />
          </el-form-item>
          <el-form-item label="中心编码" :label-width="edit.labelWidth">
            <el-input v-model="edit.data.center_code" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="editorClose">关 闭</el-button>
          <el-button type="primary" :loading="edit.loading" @click="editCommit">{{ edit.loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { GetDepartCenterList, ModifyDepartCenter, DeleteDepartCenter } from '@/api/system_depart_center/index'
export default {
  data() {
    return {
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
    this.loadList()
  },
  methods: {
    loadList() {
      GetDepartCenterList().then(response => {
        this.table.data = response.result
      })
    },
    indexMethod(index) {
      return index + 1
    },
    listSelectionChange(val) {
      this.table.multipleSelection = val
    },
    pageToGroup(index, row) {
      const centerID = row.center_id
      this.$router.push({
        name: 'DepartGroup',
        params: { 'center_id': centerID }
      })
    },
    editorClose() {
      this.edit.show = false
    },
    // 编辑器新增
    editorAdd() {
      this.edit.data = {}
      this.edit.show = true
    },
    editCommit() {
      this.edit.loading = true
      ModifyDepartCenter(this.edit.data).then(response => {
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
    },
    listEdit(index, row) {
      this.edit.data = JSON.parse(JSON.stringify(row))
      this.edit.show = true
    },
    listDelete(index, row) {
      MessageBox.confirm('确定删除' + row.center_name + '?', 'Confirm logout', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = [row.center_id]
        DeleteDepartCenter(ids).then(response => {
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
        ids.push(this.table.multipleSelection[i].center_id)
      }
      MessageBox.confirm('确定删除' + ids.length + '个?', 'Confirm logout', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteDepartCenter(ids).then(response => {
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
    }

  }
}
</script>
