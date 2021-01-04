<template>
  <div class="register-container">
    <el-alert
      v-if="nodeEnv !== 'development'"
      title=""
      type="success"
      :closable="false"
      style="position: fixed;"
    ></el-alert>
    <el-form
      ref="registerForm"
      :model="form"
      class="register-form"
      :rules="registerRules"
      size="mini"
    >
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="企业用户注册" name="COMPANY"></el-tab-pane>
        <el-tab-pane label="个人用户注册" name="PERSONAL"></el-tab-pane>
      </el-tabs>
      <el-form-item prop="username">
        <el-input
          v-model.trim="form.username"
          style="margin-top: 20px;"
          type="text"
          placeholder="请输入用户名"
          auto-complete="off"
        >
          <vab-icon slot="prefix" :icon="['fas', 'user-alt']"></vab-icon>
        </el-input>
      </el-form-item>
       <el-form-item prop="name">
        <el-input
          v-model.trim="form.name"
          style="margin-top: 20px;"
          type="text"
          placeholder="请输入姓名"
          auto-complete="off"
        >
          <vab-icon slot="prefix" :icon="['fas', 'user-alt']"></vab-icon>
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model.trim="form.phone"
          type="text"
          placeholder="请输入手机号"
          maxlength="11"
          show-word-limit
          autocomplete="off"
        >
          <vab-icon slot="prefix" :icon="['fas', 'mobile-alt']"></vab-icon>
        </el-input>
      </el-form-item>
      <el-form-item prop="useremail">
        <el-input
          v-model.trim="form.useremail"
          style="margin-top: 20px;"
          type="text"
          placeholder="请输入邮箱地址"
          auto-complete="off"
        >
          <vab-icon slot="prefix" :icon="['fas', 'envelope-open']"></vab-icon>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model.trim="form.password"
          type="password"
          placeholder="设置密码"
          autocomplete="new-password"
        >
          <vab-icon slot="prefix" :icon="['fas', 'unlock']"></vab-icon>
        </el-input>
      </el-form-item>
      <el-form-item v-if="isCompany" prop="companyselect">
        <el-radio-group v-model="radio2" @change="radioClick">
          <el-radio :label="1" >已有企业</el-radio>
          <el-radio :label="2" >我要创建企业</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="iscompanyCode" prop="companycode">
        <el-input
          v-model.trim="form.companycode"
          style="margin-top: 20px;"
          type="text"
          placeholder="请输入企业邀请码"
          auto-complete="off"
        >
          <vab-icon slot="prefix" :icon="['fas', 'user-alt']"></vab-icon>
        </el-input>
      </el-form-item>
      <el-form-item v-if="showCompanyInfo" prop="companyname">
        <el-input
          v-model.trim="form.companyname"
          style="margin-top: 20px;"
          type="text"
          placeholder="请输入企业名称"
          auto-complete="off"
        >
          <vab-icon slot="prefix" :icon="['fas', 'user-alt']"></vab-icon>
        </el-input>
      </el-form-item>
      <el-form-item v-if="showCompanyInfo" prop="licensenum">
        <el-input
          v-model.trim="form.licensenum"
          style="margin-top: 20px;"
          type="text"
          placeholder="请输入公司营业执照编码"
          auto-complete="off"
        >
          <vab-icon slot="prefix" :icon="['fas', 'user-alt']"></vab-icon>
        </el-input>
      </el-form-item>
      <el-form-item v-if="showCompanyInfo" prop="companytype">
        <el-select
          v-model="form.companytype"
          clearable
          placeholder="请选择公司类型"
          style="width: 100%;"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
           ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="showCompanyInfo" prop="countrytype">
        <el-select
          v-model="form.country"
          clearable
          placeholder="请选择国家"
          style="width: 100%;"
        >
          <el-option
            v-for="item in optcountry"
            :key="item"
            :label="item"
            :value="item"
           ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="register-btn"
          type="primary"
          @click.native.prevent="handleReister"
        >
          注册
        </el-button>        
      </el-form-item>
      <div style="width:100%;text-align:center;"> <el-link type="primary" @click.native.prevent='rouToLogin'>已有账号，立即登录</el-link> </div>
    </el-form>
  </div>
</template>
<script>
  import { isPassword, isPhone, isEmail} from '@/utils/validate';
  import { register} from '@/api/user';
  import { allCountries, myRegister} from '@/api/allcompany'

  export default {
    username: "register",
    directives: {
      focus: {
        inserted(el) {
          el.querySelector("input").focus();
        },
      },
    },
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
      return {
        activeName2: "COMPANY",
        showRegister: false,
        nodeEnv: process.env.NODE_ENV,
        title: this.$baseTitle,
        radio2: 1,
        isCompany: true,
        iscompanyCode: true,
        showCompanyInfo: false,
        form: {},
        registerRules: {
          username: [
            { required: true, trigger: "blur", message: "请输入用户名" },
            { max: 20, trigger: "blur", message: "最多不能超过20个字" },
            { validator: validateusername, trigger: "blur" },
          ],
          name: [
            { required: true, trigger: "blur", message: "请输入姓名" },
            { max: 20, trigger: "blur", message: "最多不能超过20个字" }
          ],
          phone: [
            { required: true, trigger: "blur", message: "请输入手机号码" },
            { validator: validatePhone, trigger: "blur" },
          ],
          password: [
            { required: true, trigger: "blur", message: "请输入密码" },
            { validator: validatePassword, trigger: "blur" },
          ],
          useremail: [
            { required: true, trigger: "blur", message: "请输入正确的邮箱" },
            { validator: validateEmial, trigger: "blur" },
          ],
        },
        options: [
          {
            value: "1",
            label: "公司类型1",
          },
          {
            value: "2",
            label: "公司类型2",
          },
          {
            value: "3",
            label: "公司类型3",
          },
          {
            value: "4",
            label: "公司类型4",
          },
          {
            value: "5",
            label: "公司类型5",
          },
        ],
        value: "",
        valcountry: "",
        optcountry: [],
        loading: false,
        passwordType: "password",
      };
    },
    created() {
      //document.body.style.overflow = "hidden";
      
      this.getAllCompany()
    },
    beforeDestroy() {
      document.body.style.overflow = "auto";
      this.getPhoneIntval = null;
      clearInterval(this.getPhoneIntval);
    },
    methods: {
      handleClick(tab, event) {
        let n = tab.name;
        if (n) {
          if (n === "COMPANY") {            
            this.isCompany = true;
            this.iscompanyCode = true;
            this.radio2=1;
          } else  {
            this.isCompany = false;
            this.iscompanyCode = false;
          }
          this.activeName2=n;
          this.showCompanyInfo=false;
          }
      },
      radioClick(radval) {
        let r = radval;
        if (r === 2) {
          this.showCompanyInfo = true;
          this.iscompanyCode = false;
        } else {
          this.showCompanyInfo = false;
          this.iscompanyCode = true;
        }
      },
      
      handleReister() {
        this.$refs["registerForm"].validate(async (valid) => {
          if (valid) {
            let param={}
            if(this.showCompanyInfo){
              param = {
              username: this.form.username || "",
              phone: this.form.phone || "",
              password: this.form.password || "",
              email: this.form.useremail || "",
              name: this.form.name || "",
              company_code: this.form.companycode || "",
              user_type: this.activeName2 || "",
              company: {
                name: this.form.companyname || "",
                license_num: this.form.licensenum || "",
                type: this.form.companytype || "",
                country: this.form.country || ""
              }
            };
            }else if(this.iscompanyCode){
            param = {
              username: this.form.username || "",
              phone: this.form.phone || "",
              password: this.form.password || "",
              email: this.form.useremail || "",
              name: this.form.name || "",
              company_code: this.form.companycode || "",
              user_type: this.activeName2 || ""
            };
            }else{
              param = {
              username: this.form.username || "",
              phone: this.form.phone || "",
              password: this.form.password || "",
              email: this.form.useremail || "",
              name: this.form.name || "",
              user_type: this.activeName2 || ""
            };
            }            
            console.log(param);
            this.listLoading = true;
            const paramstr = JSON.stringify(param);
            const { msg } = await myRegister(param);
            this.listLoading = false;
             this.$message({
                type: 'success',
                message: '注册成功'
              });
              setTimeout(() => {
                this.rouToLogin();
              }, 5000);
            
            // this.$baseMessage(msg, 'success');
            
          }
        });
      },
      rouToLogin() {
        this.$router.push("/login");
      },
      getAllCompany(){
        this.listLoading = true
      allCountries().then(response => {
      // const xsrftoke=this.getCookie("XSRF-TOKEN");
       // console.log(xsrftoke);
        this.optcountry = response.data;
        this.listLoading = false
      })
      },
      // 获取cookie
      getCookie: function (cname) {
        // alert(cname);
        var name = cname + "=";
        var ca = document.cookie.split(';');
        console.log("获取cookie,现在循环")
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          console.log(c)
          while (c.charAt(0) === ' ') c = c.substring(1);
          if (c.indexOf(name) !== -1){
            return c.substring(name.length, c.length);
          }
        }
        return '';
      },
    },
  };
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
  .register-container {
    min-height: 100%;
    width: 100%;
    background-color: #fff;
    .title {
      font-size: 54px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }

    .title-tips {
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: rgba(14, 18, 26, 1);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .register-btn {
      width: 100%;
      height: 60px;
      margin-top: 5px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }
    .tologin-btn {
      width: 45%;
      height: 60px;
      margin-top: 5px;
      margin-left: 5%;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }

    .register-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 100px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-password {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }

      .per-code {
        width: 100px;
        height: 36px;
        font-size: 20px;
        line-height: 36px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        background: #bbc1ce;
      }

      .phone-code {
        width: 120px;
        height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 3px;
      }
    }

    .tips {
      margin-bottom: 10px;
      font-size: 14px;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        color: $base-color-blue;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-pwd {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: $base-font-color;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        .el-input__count {
          .el-input__count-inner {
            background: transparent;
          }
        }

        .el-input__prefix {
          left: 15px;
          line-height: 56px;

          .svg-inline--fa {
            width: 20px;
          }
        }

        input {
          height: 58px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          line-height: 58px;
          color: $base-font-color;
          background: #f9f9fb;
          border: 0;
          caret-color: $base-font-color;
        }
      }
    }
  }
</style>
