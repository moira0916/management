<template>
  <el-form ref="form" :model="form" label-width="80px" style="padding:20px;">
    <el-form-item label="旧密码">
      <el-col :span="8">
        <el-input v-model="form.user_pass_old" show-password />
      </el-col>
    </el-form-item>
    <el-form-item label="新密码">
      <el-col :span="8">
        <el-input v-model="form.user_pass" show-password />
      </el-col>
    </el-form-item>
    <el-form-item label="重复密码">
      <el-col :span="8">
        <el-input v-model="form.user_pass_repect" show-password />
      </el-col>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">修改密码</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { MessageBox, Message } from 'element-ui'
import { passwordModify } from '@/api/user'
import store from '@/store'
export default {
  data() {
    return {
      form: {
        user_pass_old: '',
        user_pass: '',
        user_pass_repect: ''
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.form.user_pass !== this.form.user_pass_repect) {
        Message({
          message: '新密码重复不正确,请检查',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }

      passwordModify(this.form).then(response => {
        if (response.code === 0) {
          MessageBox.confirm('修改密码成功,请重新登录', '系统提示', {
            confirmButtonText: '重登录',
            // cancelButtonText: '',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/logout').then(() => {
              location.reload()
            })
          }).catch(() => {
            store.dispatch('user/logout').then(() => {
              location.reload()
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
