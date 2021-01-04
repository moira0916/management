<template>
  <div>
    <!-- 第一行 -->
    <el-row>
      <el-col :span="24" style="padding:10px;border-bottom:1px solid #ccc;">
        <el-button
          size="mini"
          type="primary"
          @click="addRole"
        >添加角色</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteRoleMulti"
        >批量删除</el-button>
        <i
          class="el-icon-refresh-right"
          style="font-size:20px;float:right;cursor:pointer;margin-top:15px;margin-right:15px;line-height:0px;"
          @click="refreshData"
        />
      </el-col>
    </el-row>
    <!-- table -->
    <el-table
      v-loading="table.loading"
      :data="table.tableData"
      row-key="role_id"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
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
        prop="role_name"
        label="角色名称"
        width="300"
      />
      <el-table-column
        prop="role_desc"
        label="角色说明"
      />
      <el-table-column
        align="left"
        label="编辑"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        label="配置"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleRoleUser(scope.$index, scope.row)"
          >配置用户</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- edit -->
    <el-drawer
      ref="roleEditr"
      title="角色编辑"
      size="40%"
      :visible.sync="edit.show"
      :direction="edit.direction"
      :before-close="handleClose"
      :wrapper-closable="false"
    >
      <div class="demo-drawer__content" style="padding:10px;">
        <el-form :model="edit.data">
          <el-form-item label="角色名称">
            <el-input v-model="edit.data.role_name" />
          </el-form-item>
          <el-form-item label="角色说明">
            <el-input v-model="edit.data.role_desc" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelEditForm">关 闭</el-button>
          <el-button type="primary" :loading="edit.loading" @click="editFromCommit">{{ edit.loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>

    <!-- drawer userConfig -->
    <el-drawer
      ref="roleUser"
      title="角色用户配置"
      size="35%"
      :visible.sync="users.show"
      :direction="users.direction"
      :before-close="handleRoleUserClose"
      :wrapper-closable="false"
    >
      <div class="demo-drawer__content" style="padding:10px;">
        <el-transfer v-model="users.value" :titles="['所有用户', '已选用户']" :data="users.data" @change="handleRoleUserChange" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { GetRolesList, ModifyRoleList, DeleteRoleList, GetRoleUsers, RoleAddUser, RoleDelUser } from '@/api/system_roles/index'
export default {
  data() {
    return {
      table: {
        tableData: [],
        multipleSelection: [],
        loading: true
      },
      edit: {
        direction: 'rtl',
        show: false,
        loading: false,
        data: {
        }
      },
      users: {
        direction: 'rtl',
        show: false,
        loading: false,
        current: 0,
        data: [],
        value: []
      }
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.table.loading = true
      GetRolesList().then(response => {
        this.table.tableData = response.result
        this.table.loading = false
      })
    },
    indexMethod(index) {
      return index + 1
    },
    addRole() {
      this.edit.data = {}
      this.edit.show = true
    },
    refreshData() {
      this.loadData()
    },
    handleSelectionChange(val) {
      this.table.multipleSelection = val
    },
    handleEdit(index, row) {
      this.edit.data = JSON.parse(JSON.stringify(row))
      this.edit.show = true
    },
    handleDelete(index, row) {
      MessageBox.confirm('确定删除' + row.role_name + '?', 'Confirm logout', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = [row.role_id]
        DeleteRoleList(ids).then(response => {
          if (response.code !== 0) {
            Message({
              message: 'error:' + response.message,
              type: 'error',
              duration: 5 * 1000
            })
            return
          }
          this.refreshData()
        })
      })
    },
    deleteRoleMulti() {
      const ids = []
      for (var i in this.table.multipleSelection) {
        ids.push(this.table.multipleSelection[i].role_id)
      }

      MessageBox.confirm('确定删除' + ids.length + '个?', 'Confirm logout', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteRoleList(ids).then(response => {
          if (response.code !== 0) {
            Message({
              message: 'error:' + response.message,
              type: 'error',
              duration: 5 * 1000
            })
            return
          }
          this.refreshData()
        })
      })
    },
    handleClose() {
      this.edit.show = false
    },
    handleRoleUserClose() {
      this.users.show = false
    },
    editFromCommit() {
      this.edit.loading = true
      ModifyRoleList(this.edit.data).then(response => {
        this.edit.loading = false
        if (response.code === 0) {
          Message({
            message: '成功',
            type: 'info',
            duration: 5 * 1000
          })
          this.refreshData()
        } else {
          Message({
            message: '失败' + response.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    cancelEditForm() {
      this.edit.data = {}
      this.edit.show = false
    },
    handleRoleUser(index, row) {
      this.users.show = true
      // 读取当前角色的用户信息
      const post = {
        role_id: row.role_id
      }
      this.users.current = row.role_id
      this.users.data = []
      this.users.value = []
      GetRoleUsers(post).then(response => {
        for (var i in response.result) {
          this.$set(this.users.data, i, {
            key: response.result[i].u_id,
            label: response.result[i].u_realname
          })
          if (response.result[i].role_id !== null) {
            this.$set(this.users.value, i, response.result[i].u_id)
          }
        }
      })
    },
    handleRoleUserChange(value, direction, movedKeys) {
      var post = {
        role_id: this.users.current,
        user_ids: movedKeys
      }

      if (direction === 'right') {
        RoleAddUser(post).then(response => {
          if (response.code !== 0) {
            Message(response.message)
            return
          }
          Message({
            message: '成功',
            type: 'success'
          })
        })
      } else if (direction === 'left') {
        RoleDelUser(post).then(response => {
          if (response.code !== 0) {
            Message(response.message)
            return
          }
          Message({
            message: '成功',
            type: 'success'
          })
        })
      }
    }

  }
}
</script>

<style lang="less" scoped>

</style>
