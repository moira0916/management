<template>
  <div>
    <!-- 第一行 -->
    <el-row>
      <el-col :span="24" style="padding:10px;border-bottom:1px solid #ccc;">
        <el-button
          size="mini"
          type="primary"
          @click="listAdd"
        >添加用户</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="listDeleteMulti"
        >批量删除</el-button>
        <i
          class="el-icon-refresh-right"
          style="font-size:20px;float:right;cursor:pointer;margin-top:15px;margin-right:15px;line-height:0px;"
          @click="refreshList"
        />
      </el-col>
    </el-row>
    <!-- table -->
    <el-table
      v-loading="table.loading"
      :data="table.tableData.filter(data => !table.search || data.u_tel.includes(table.search) || data.u_realname.includes(table.search))"
      row-key="role_id"
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
        prop="u_tel"
        label="手机"
        width="150"
      />
      <el-table-column
        prop="u_realname"
        label="姓名"
        width="150"
      />
      <el-table-column
        prop="u_wxim"
        label="微信IM"
        width="150"
      />
      <el-table-column
        prop="is_deleted"
        label="停用"
        width="55"
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
            v-if="scope.row.is_deleted==0"
            size="mini"
            type="danger"
            @click="listDelete(scope.$index, scope.row)"
          >删除</el-button>
          <el-button
            v-if="scope.row.is_deleted==1"
            size="mini"
            type="success"
            @click="listRestore(scope.$index, scope.row)"
          >恢复</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="listResetPwd(scope.$index, scope.row)"
          >重设密码</el-button>
        </template>
      </el-table-column>
      <!-- 搜索 -->
      <el-table-column
        prop="roles"
        label="角色"
      />
      <el-table-column
        align="right"
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
            @click="rolesEditorOpen(scope.$index, scope.row)"
          >配置角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- edit -->
    <el-drawer
      ref="Editor"
      title="用户编辑"
      size="30%"
      :visible.sync="edit.show"
      :direction="edit.direction"
      :before-close="editorClose"
      :wrapper-closable="false"
    >
      <div class="demo-drawer__content" style="padding:10px;">
        <el-form :model="edit.data">
          <el-form-item label="手机" :label-width="edit.labelWidth">
            <el-input v-model="edit.data.u_tel" />
          </el-form-item>
          <el-form-item label="姓名" :label-width="edit.labelWidth">
            <el-input v-model="edit.data.u_realname" />
          </el-form-item>
          <el-form-item label="微信IM" :label-width="edit.labelWidth">
            <el-input v-model="edit.data.u_wxim" />
          </el-form-item>
          <el-form-item label="所属组" :label-width="edit.labelWidth">
            <el-cascader
              v-model="edit.groupSelected"
              style="width:100%"
              :options="groupData.data"
              @change="editUserGroup"
            />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer" style="text-align:right;">
          <el-button type="primary" :loading="edit.loading" @click="editCommit">{{ edit.loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>

    <!-- roleChecked -->
    <el-drawer
      ref="roleEditor"
      title="角色绑定"
      size="20%"
      :visible.sync="roles.show"
      :direction="roles.direction"
      :before-close="rolesEditorClose"
      :wrapper-closable="false"
    >
      <div class="demo-drawer__content" style="padding:10px;">
        <el-form>
          <el-form-item label="角色选择">
            <el-checkbox-group v-model="roles.checked">
              <el-checkbox v-for="item in roles.data" :key="item.role_id" :label="item.role_id" style="width:100%;margin:0;" border>{{ item.role_name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userRoleCommit">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { GetUserList, ModifyUser, DeleteUser, ResetPassword, GetRolesAndCheck, SetUserRoles, RestoreUser } from '@/api/system_user/index'
//import { GetCenterAndGroup } from '@/api/system_depart_center/index'
export default {
  data() {
    return {
      table: {
        tableData: [],
        multipleSelection: [],
        loading: true,
        search: ''
      },
      edit: {
        direction: 'rtl',
        show: false,
        labelWidth: '80px',
        loading: false,
        data: {},
        groupSelected: []
      },
      groupData: {
        data: []
      },
      roles: {
        direction: 'rtl',
        show: false,
        loading: false,
        user_id: 0,
        data: [],
        checked: []
      }
    }
  },
  mounted() {
    this.loadlist()
    this.loadCenter()
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    // 加载list
    loadlist() {
      this.table.loading = true
      GetUserList().then(response => {
        this.table.tableData = response.result
        this.table.loading = false
      })
    },
    // 刷新list
    refreshList() {
      this.loadlist()
    },
    // 添加list
    listAdd() {
      this.edit.data = {}
      this.edit.groupSelected = []
      this.edit.show = true
    },
    // 编辑list
    listEdit(index, row) {
      this.edit.data = JSON.parse(JSON.stringify(row))
      this.edit.groupSelected = [row.center_id, row.group_id]
      this.edit.show = true
      console.dir(this.edit)
    },
    // 批量选择list
    listSelectionChange(val) {
      this.table.multipleSelection = val
    },
    // 重设改用户的密码
    listResetPwd(index, row) {
      MessageBox.confirm('确定重置' + row.u_realname + '的密码么?', 'Confirm logout', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const post = {
          u_id: row.u_id
        }
        ResetPassword(post).then(response => {
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
            type: 'succ',
            duration: 5 * 1000
          })
        })
      })
    },
    // 删除list
    listDelete(index, row) {
      MessageBox.confirm('确定删除' + row.u_realname + '?', 'Confirm logout', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = [row.u_id]
        DeleteUser(ids).then(response => {
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
          row.is_deleted = 1
        })
      })
    },
    listDeleteMulti() {
      const ids = []
      for (var i in this.table.multipleSelection) {
        ids.push(this.table.multipleSelection[i].u_id)
      }
      MessageBox.confirm('确定删除' + ids.length + '个?', 'Confirm logout', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteUser(ids).then(response => {
          if (response.code !== 0) {
            Message({
              message: 'error:' + response.message,
              type: 'error',
              duration: 5 * 1000
            })
            return
          }
          this.refreshList()
        })
      })
    },
    listRestore(index, row) {
      MessageBox.confirm('确定恢复用户' + row.u_realname + '吗?', 'Confirm logout', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        RestoreUser({ user_id: row.u_id }).then(response => {
          if (response.code !== 0) {
            Message({
              message: 'error:' + response.message,
              type: 'error',
              duration: 5 * 1000
            })
            return
          }
          row.is_deleted = 0
        })
      })
    },
    // 编辑list 关闭
    editorClose() {
      this.edit.show = false
    },
    editCommit() {
      this.edit.loading = true
      ModifyUser(this.edit.data).then(response => {
        this.edit.loading = false
        if (response.code === 0) {
          Message({
            message: '成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.loadlist()
        } else {
          Message({
            message: '失败' + response.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    // rolesEditor
    rolesEditorClose() {
      this.roles.show = false
    },
    // 打开角色选择页面
    rolesEditorOpen(index, row) {
      this.roles.show = true
      this.roles.user_id = row.u_id
      this.roles.data = []
      this.roles.check = []
      // 拿到所有角色并标注用户是否checked
      GetRolesAndCheck({ user_id: row.u_id }).then(response => {
        this.roles.data = response.result
        const checked = []
        this.roles.data.forEach(function(item, index) {
          if (item.u_id) {
            checked.push(item.role_id)
          }
        })
        this.roles.checked = checked
      })
    },
    userRoleCommit() {
      // 1. 拿到
      const post = {
        user_id: this.roles.user_id,
        role_ids: this.roles.checked
      }

      SetUserRoles(post).then(response => {
        Message({
          message: response.message,
          type: 'success',
          duration: 5 * 1000
        })
      })
    },
    editUserGroup(val) {
      this.edit.data.group_id = val[1]
    },
    loadCenter() {
      GetCenterAndGroup().then(response => {
        var data = response.result
        var m1 = {}
        var m2 = {}

        for (var i in data) {
          m1[data[i].center_id] = data[i].center_name
          m2[data[i].center_id] = []
        }

        for (var x in data) {
          m2[data[x].center_id].push({
            value: data[x].group_id,
            label: data[x].group_name
          })
        }

        var result = []

        for (var center_id in m1) {
          result.push({
            value: center_id,
            label: m1[center_id],
            children: m2[center_id]
          })
        }
        this.groupData.data = result
      })
    }

  }
}
</script>

<style lang="less" scoped>
</style>
