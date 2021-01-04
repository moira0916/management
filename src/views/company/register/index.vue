<template>
  <div class="app-container">
    <el-form :model="companyform">
        <el-form-item :label="$t('m.company.code')" :label-width="formLabelWidth">
          {{ companyform.code }}
        </el-form-item>
        <el-form-item :label="$t('m.company.name')" :label-width="formLabelWidth">
          {{ companyform.name }}
        </el-form-item>
        
        <el-form-item :label="$t('m.company.country')" :label-width="formLabelWidth">
          {{ companyform.country }}
        </el-form-item>
         <el-form-item :label="$t('m.company.companyType')" :label-width="formLabelWidth">
           {{ companyform.companyType }}
        </el-form-item>
        <el-form-item :label="$t('m.company.status')" :label-width="formLabelWidth">
           {{ companyform.status }}
        </el-form-item>
        <el-form-item :label="$t('m.company.createTime')" :label-width="formLabelWidth">
          {{ companyform.createTime }}
        </el-form-item>
        <el-form-item :label="$t('m.company.updateTime')" :label-width="formLabelWidth">
          {{ companyform.updateTime }}
        </el-form-item>
        <el-form-item :label="$t('m.company.businessLicenseNumber')" :label-width="formLabelWidth">
          {{ companyform.businessLicenseNumber }}
        </el-form-item>
        <el-form-item v-if="companyform.status==='未提交审核'" :label="$t('m.company.businessLicenseUrl')" :label-width="formLabelWidth">
         <el-upload
            ref="companyupload"
            class="upload-demo"
            action="string"
            accept="image/jpeg,image/png,image/jpg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSucess"
            :limit="1"
            :on-exceed="handleExceed"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :http-request="UploadImage"
            :on-change="fileChange"
            >
            <el-button size="small" type="primary">{{ $t('m.common.uploadbtn')}}</el-button>
            <div slot="tip" class="el-upload__tip">{{ $t('m.common.uploadtip')}}</div>
          </el-upload>
          <!-- <el-progress :text-inside="true" :stroke-width="20" :percentage="70" style="width:450px"></el-progress> -->
        </el-form-item>
        <el-form-item v-else :label="$t('m.company.businessLicenseUrl')" :label-width="formLabelWidth">
          <div class="demo-image__preview">
              <el-image 
                style="width: 100px; height: 100px"
                :src="getImgUrl(companyform.businessLicenseUrl)">
              </el-image>
            </div>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" v-if="companyform.status==='未提交审核'"  @click="onSubmit()" style="width:200px;margin-left:350px;margin-top:40px">{{ $t('m.company.companyregiserbtn') }}</el-button>
      </el-form-item>        
      </el-form>
    
  </div>
</template>

<script>
import { companyShow, companycommit } from "@/api/company";
import { commonUpload } from "@/api/uploadfile";
export default {
  data() {
    return {
      fileList: [],
      fileParam:{
        type:""
      },
      companyform: {
          code: '',
          name: '',
          businessLicenseNumber: '',
          status: '',
          companyType: '',
          businessLicenseUrl:'',
          createTime:'',
          updateTime: '',
          country: ''
        },
        formLabelWidth: '350px',
        imabaseUrl:'https://junxi-hr-manager.herokuapp.com',
         imageUrl: ''
    }
  },
  created() {
    this.getCompanyShow();
  },
  methods: {
    getCompanyShow(){
      this.listLoading = true
      companyShow().then(response => {
        this.listLoading = false
        console.dir(response);
        this.companyform=response.data
      }).catch(response =>{
        this.listLoading = false
      })
      
    },
        //获取图片地址
getImgUrl(icon){
  const fullUrl = this.imabaseUrl+icon
  this.srcList = fullUrl
   return fullUrl;
},
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`文件上传限制选择 1 个文件`);
      },
      beforeUpload(file) {
        console.log("文件类型"+file.type)
        this.fileParam.type = file.type
        const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        console.log("isJPG"+isJPG)
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG格式!');
        }        
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG || isPNG && isLt2M;
      },
      UploadImage(param){
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('type', param.file.type)
      commonUpload(formData).then(response => {
      	console.log('上传图片成功')
        
      }).catch(response => {
        console.log('图片上传失败')
      })
    },
    fileChange(file){
      this.$refs.companyupload.clearFiles() //清除文件对象
      //this.fileList = [{name: file.name, url: file.url}] // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
    },
      beforeRemove(file, fileList) {
        //return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSucess(response,file, fileList){
        console.dir(response);
        this.imageUrl = response.data.url
      },
      onSubmit(){
        companycommit({ businessLicenseUrl:this.imageUrl ||'' }).then(response => {
        console.dir("submit"+response);
        //this.submitInfo=response.data
        this.getCompanyShow();
      })
      }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>