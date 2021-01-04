<template>
  <div class="app-container" style="width:75%;margin-bottom:30px">
    <el-form v-loading="updateEmployeeLoading" ref="employeeform" :model="employeeform" :rules="rules" >
        <el-row>
           <el-col :span="24">
            <el-form-item v-if="employeeform.code" :label="$t('m.employee.code')" :label-width="formLabelWidth" >
              <el-input v-model="employeeform.code" autocomplete="off" disabled></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">

          </el-col> -->
          <el-col :span="12">
            <el-form-item :label="$t('m.employee.passportname')" :label-width="formLabelWidth" prop="passportName">
              <el-input v-model="employeeform.passportName" autocomplete="off" minlength="2" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.employee.passportid')" :label-width="formLabelWidth" prop="passportId">
              <el-input v-model="employeeform.passportId" autocomplete="off" minlength="2" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('m.employee.passportIssueDate')" :label-width="formLabelWidth" prop="issuedate">
              <el-date-picker type="date" :placeholder="$t('m.common.dateplacehoder')"  v-model="employeeform.passportIssueDate" style="width: 100%;"></el-date-picker>
              
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
              <el-form-item :label="$t('m.employee.passportExpireDate')" :label-width="formLabelWidth"  prop="expiredate">
                <el-date-picker type="date" :placeholder="$t('m.common.dateplacehoder')"  v-model="employeeform.passportExpireDate" style="width: 100%;"></el-date-picker>
                
               
              </el-form-item>
              
          </el-col>
          <el-col :span="12">
              <el-form-item :label="$t('m.employee.papersType')" :label-width="formLabelWidth" prop="paperstype">
                <el-input v-model="employeeform.papersType" autocomplete="off"></el-input>
              </el-form-item>
              
          </el-col>
          <el-col :span="12">
              <el-form-item :label="$t('m.employee.papersId')" :label-width="formLabelWidth" prop="">
                <el-input v-model="employeeform.papersId" autocomplete="off" maxlength="100"></el-input>
              </el-form-item>
              
          </el-col>
          
          <el-col :span="12">
              <el-form-item :label="$t('m.employee.birthday')" :label-width="formLabelWidth" prop="">
                <el-date-picker type="date" :placeholder="$t('m.common.dateplacehoder')"  v-model="employeeform.birthday" style="width: 100%;"></el-date-picker>               
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item :label="$t('m.employee.religion')" :label-width="formLabelWidth" prop="">
                <el-input v-model="employeeform.religion" autocomplete="off"></el-input>
              </el-form-item>
              
          </el-col>
          <el-col :span="6">
              <el-form-item :label="$t('m.employee.age')" :label-width="formLabelWidth" prop="">
                <el-input v-model="employeeform.age" autocomplete="off" class="employee-input" maxlength="3" ></el-input>
                <span>岁</span>
              </el-form-item>
              
          </el-col>
          <el-col :span="6">
              <el-form-item :label="$t('m.employee.height')" :label-width="formLabelWidth" prop="">
                <el-input v-model="employeeform.height" autocomplete="off" class="employee-input" maxlength="4" ></el-input><span>CM</span>
              </el-form-item>
              
          </el-col>
          <el-col :span="6">
              <el-form-item :label="$t('m.employee.weight')" :label-width="formLabelWidth" prop="">
                <el-input v-model="employeeform.weight" autocomplete="off" class="employee-input" maxlength="4" ></el-input><span>KG</span>
              </el-form-item>
              
          </el-col>
          <el-col :span="6">
              <el-form-item :label="$t('m.employee.clothesSize')" :label-width="formLabelWidth" prop="">
                <el-input v-model="employeeform.clothesSize" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                  <el-form-item :label="$t('m.employee.shoesSize')" :label-width="formLabelWidth" prop="">
                    <el-input v-model="employeeform.shoesSize" autocomplete="off"></el-input>
                  </el-form-item>
                  
          </el-col>
          <el-col :span="6">
                  <el-form-item :label="$t('m.employee.nationality')" :label-width="formLabelWidth" prop="">
                    <el-input v-model="employeeform.nationality" autocomplete="off"></el-input>
                  </el-form-item>
                  
          </el-col>
          
          <el-col :span="24">
              <el-form-item :label="$t('m.employee.homeAddress')" :label-width="formLabelWidth" prop="">
                <el-input v-model="employeeform.homeAddress" autocomplete="off" ></el-input>
              </el-form-item>
              
          </el-col>
          <el-col :span="8">
               <el-form-item :label="$t('m.employee.maritalStatus')" :label-width="formLabelWidth" prop="">
                  <el-select v-model="employeeform.maritalStatus" :placeholder="$t('m.employee.maritalStatusPh')" >
                    <el-option :label="$t('m.employee.maritalStatusitem1')" value="1"></el-option>
                    <el-option :label="$t('m.employee.maritalStatusitem2')" value="2"></el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="8">
               <el-form-item :label="$t('m.employee.homePhone')" :label-width="formLabelWidth"  prop="">
                <el-input v-model="employeeform.homePhone" maxlength="11"  autocomplete="off"></el-input>
              </el-form-item>
          </el-col>
           <el-col :span="8">
                <el-form-item :label="$t('m.employee.startWorkDate')" :label-width="formLabelWidth" prop="">
                  <el-date-picker type="date" :placeholder="$t('m.common.dateplacehoder')"  v-model="employeeform.startWorkDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                
          </el-col>
          <el-col :span="18">
            <el-form-item :label="$t('m.employee.educationInformation')" :label-width="formLabelWidth" prop=""></el-form-item>  
          </el-col>   
          <el-col :span="6" style="text-align:right">
                  <el-form-item>
                    <el-button type="primary" size="small" @click="addEducationInformation">{{$t('m.employee.addEducationBtn')}}</el-button>
                  </el-form-item>
                </el-col>   
          <el-col :span="24">             
              <el-row v-for="(item,index) in employeeform.educationInformation" :key="index">
                <el-col :span="20">
                  <el-row>
                      <el-col :span="12">
                        <el-form-item :label="$t('m.employee.educationLevel')" :label-width="formLabelWidth" prop="">
                            <el-input v-model="item.educationLevel" autocomplete="off"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item :label="$t('m.employee.graduateSchool')" :label-width="formLabelWidth" prop="">
                            <el-input v-model="item.graduateSchool" autocomplete="off"></el-input>
                          </el-form-item>
                      </el-col>
                      
                      <el-col :span="12">
                            <el-form-item :label="$t('m.employee.graduateDate')" :label-width="formLabelWidth" prop="">
                              <el-date-picker type="date" :placeholder="$t('m.common.dateplacehoder')"  v-model="item.graduateDate" style="width: 100%;"></el-date-picker>                        
                            </el-form-item>
                      </el-col>
                      <el-col :span="12">
                            <el-form-item :label="$t('m.employee.major')" :label-width="formLabelWidth" prop="">
                              <el-input v-model="item.major" autocomplete="off"></el-input>
                            </el-form-item>
                            
                      </el-col>
                  </el-row>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label-width="formLabelWidth" >                        
                              <el-button  type="danger" size="small" v-if="employeeform.educationInformation.length >1" @click="removeEducationRow(index)">{{$t('m.common.deleteBtn')}}</el-button>
                            </el-form-item>
                </el-col>               
                
              </el-row>

          </el-col>
          <el-col :span="18">
              <el-form-item :label="$t('m.employee.emergencyContacts')" :label-width="formLabelWidth" prop=""></el-form-item>
          </el-col>
          <el-col :span="6" style="text-align:right">
                  <el-form-item>
                    <el-button type="primary" size="small" @click="addEmergencyContacts">{{$t('m.employee.addEmergencyBtn')}}</el-button>
                  </el-form-item>
                </el-col>   
              <el-col :span="24">             
                <el-row v-for="(contact,index) in employeeform.emergencyContacts" :key="index">
                  <el-col :span="20">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item :label="$t('m.employee.emergencyname')" :label-width="formLabelWidth" prop="">
                          <el-input v-model="contact.name" autocomplete="off"></el-input>
                        </el-form-item>
                        
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label="$t('m.employee.emergencyrelationship')" :label-width="formLabelWidth" prop="">
                          <el-input v-model="contact.relationship" autocomplete="off"></el-input>
                        </el-form-item>
                        
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label="$t('m.employee.emergencysex')" :label-width="formLabelWidth" prop="">
                          <el-input v-model="contact.sex" autocomplete="off"></el-input>
                        </el-form-item>
                        
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label="$t('m.employee.emergencyphone')" :label-width="formLabelWidth" prop="">
                          <el-input v-model="contact.phone" autocomplete="off" maxlength="11"></el-input>
                        </el-form-item>                        
                      </el-col>
                    </el-row>
                  </el-col>
                    <el-col :span="4">
                      <el-form-item :label-width="formLabelWidth" >                        
                        <el-button  type="danger" size="small" v-if="employeeform.emergencyContacts.length >1" @click="removeEmergencyContactsRow(index)">{{$t('m.common.deleteBtn')}}</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
              </el-col>
          </el-col>
         <el-col :span="18">
              <el-form-item :label="$t('m.employee.familyMembers')" :label-width="formLabelWidth" prop=""></el-form-item>
          </el-col>
          <el-col :span="6" style="text-align:right">
                  <el-form-item>
                    <el-button type="primary" size="small" @click="addfamilyMembers">{{$t('m.employee.addFamilyBtn')}}</el-button>
                  </el-form-item>
                </el-col>   
              <el-col :span="24">         
                <el-row v-for="(contact,index) in employeeform.familyMembers" :key="index">
                    <el-col :span="20">
                    <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('m.employee.familyname')" :label-width="formLabelWidth" prop="">
                            <el-input v-model="contact.name" autocomplete="off"></el-input>
                          </el-form-item>
                          
                    </el-col>
                    <el-col :span="12">
                          <el-form-item :label="$t('m.employee.familyrelationship')" :label-width="formLabelWidth" prop="">
                            <el-input v-model="contact.relationship" autocomplete="off"></el-input>
                          </el-form-item>
                          
                    </el-col>
                    <el-col :span="12">
                          <el-form-item :label="$t('m.employee.familysex')" :label-width="formLabelWidth" prop="">
                            <el-input v-model="contact.sex" autocomplete="off"></el-input>
                          </el-form-item>
                          
                    </el-col>
                    <el-col :span="12">
                          <el-form-item :label="$t('m.employee.familyphone')" :label-width="formLabelWidth" prop="">
                            <el-input v-model="contact.phone" autocomplete="off" maxlength="11"></el-input>
                          </el-form-item>
                          
                    </el-col>
                  </el-row>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item :label-width="formLabelWidth" >                        
                        <el-button  type="danger" size="small" v-if="employeeform.familyMembers.length >1" @click="removefamilyMembersRow(index)">{{$t('m.common.deleteBtn')}}</el-button>
                      </el-form-item>
                    </el-col>
                </el-row>
          </el-col>
           <el-col :span="18">
              <el-form-item :label="$t('m.employee.jobResumes')" :label-width="formLabelWidth" prop=""></el-form-item>
            </el-col>
          <el-col :span="6" style="text-align:right">
                  <el-form-item>
                    <el-button type="primary" size="small" @click="addjobResumes">{{$t('m.employee.addjobBtn')}}</el-button>
                  </el-form-item>
                </el-col>   
              <el-col :span="24"> 
                <el-row v-for="(jobResumes,index) in employeeform.jobResumes" :key="index">
                      <el-col :span="20">
                    <el-row>
                        <el-col :span="12">
              
                          <el-form-item :label="$t('m.employee.companyName')" :label-width="formLabelWidth" prop="">
                            <el-input v-model="jobResumes.companyName" autocomplete="off"></el-input>
                          </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        
                          <el-form-item :label="$t('m.employee.job')" :label-width="formLabelWidth" prop="">
                            <el-input v-model="jobResumes.job" autocomplete="off"></el-input>
                          </el-form-item>
                          
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="$t('m.employee.workingTime')" :label-width="formLabelWidth" prop="">
                            <el-date-picker type="date" :placeholder="$t('m.common.dateplacehoder')"  v-model="jobResumes.workingTime" style="width: 100%;"></el-date-picker>
                          </el-form-item>
                          
                    </el-col>
                    <el-col :span="8">
                        
                          <el-form-item :label="$t('m.employee.nation')" :label-width="formLabelWidth" prop="">
                            <!-- <el-input v-model="jobResumes.nation" autocomplete="off"></el-input> -->
                            <el-select
                                v-model="jobResumes.nation"
                                clearable
                                :placeholder="$t('m.employee.nationPh')"
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
                          
                    </el-col>
                    <el-col :span="8">
                          <el-form-item :label="$t('m.employee.score')" :label-width="formLabelWidth" prop="">
                            <el-input v-model="jobResumes.score" autocomplete="off"></el-input>
                          </el-form-item>
                          
                    </el-col>
                    <el-col :span="12">
                          <el-form-item :label="$t('m.employee.scoreAttachment')" :label-width="formLabelWidth" prop="">
                            <el-input v-model="jobResumes.scoreAttachment" autocomplete="off"></el-input>
                            <!-- <el-upload
                              ref="certificateAttupload"
                              class="upload-demo"
                              action="string"
                              accept="image/jpeg,image/png,image/jpg"
                              :on-preview="handlePreview"
                              :on-remove="handleRemove"
                              :limit="1"
                              :on-exceed="handleExceed"
                              :before-upload="beforeUpload"
                              :file-list="fileList"
                              :http-request="uploadScoreAtt"
                              list-type="picture"
                              v-model="jobResumes.scoreAttachment"
                              >
                              <el-button size="small" type="primary">{{$t('m.common.uploadbtn')}}</el-button>
                              <div slot="tip" class="el-upload__tip">{{$t('m.common.uploadtip')}}</div>
                            </el-upload> -->
                          </el-form-item>
                          
                    </el-col>
                    <el-col :span="12">
                          <el-form-item :label="$t('m.employee.certificateAttachment')" :label-width="formLabelWidth" prop="">
                            <el-input v-model="jobResumes.certificateAttachment" autocomplete="off"></el-input>
                            <!-- <el-upload
                              ref="certificateAttupload"
                              class="upload-demo"
                              action="string"
                              accept="image/jpeg,image/png,image/jpg"
                              :on-preview="handlePreview"
                              :on-remove="handleRemove"
                              :limit="1"
                              :on-exceed="handleExceed"
                              :before-upload="beforeUpload"
                              :file-list="fileList"
                              :http-request="uploadCertificateAtt"
                              list-type="picture"
                              v-model="jobResumes.certificateAttachment"
                              >
                              <el-button size="small" type="primary">{{$t('m.common.uploadbtn')}}</el-button>
                              <div slot="tip" class="el-upload__tip">{{$t('m.common.uploadtip')}}</div>
                            </el-upload> -->
                          </el-form-item>
                        
                    </el-col>
                    </el-row>
                      </el-col>
                      <el-col :span="4">
                      <el-form-item :label-width="formLabelWidth" >                        
                        <el-button  type="danger" size="small" v-if="employeeform.jobResumes.length >1" @click="removejobResumesRow(index)">{{$t('m.common.deleteBtn')}}</el-button>
                      </el-form-item>
                    </el-col>
                </el-row>
           </el-col>
           <el-col :span="10">
                  <el-form-item :label="$t('m.employee.papersPhotoUrl')" :label-width="formLabelWidth" prop="">
                  <!-- <el-input v-model="employeeform.papersPhotoUrl" autocomplete="off"></el-input> -->
                  
                  <el-upload
                    ref="papersPhototupload"
                    class="upload-demo"
                    action="string"
                    accept="image/jpeg,image/png,image/jpg"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                    :http-request="uploadPapersPhoto"
                    list-type="picture"
                    v-model="employeeform.papersPhotoUrl"
                    >
                    <el-button size="small" type="primary">{{$t('m.common.uploadbtn')}}</el-button>
                    <div slot="tip" class="el-upload__tip">{{$t('m.common.uploadtip')}}</div>
                    <!-- <el-progress style="width: 200px;margin-top: 8px" :text-inside="true" :stroke-width="20" :percentage="progressPercent" /> -->
                  </el-upload>
                </el-form-item>

               </el-col>
          </el-col>
          <el-col :span="10">
                 <el-form-item :label="$t('m.employee.drivingLicenseUrl')" :label-width="formLabelWidth" prop="">
                  <!-- <el-input v-model="employeeform.drivingLicenseUrl" autocomplete="off"></el-input> -->
                  <el-upload
                    ref="drivingupload"
                    class="upload-demo"
                    action="string"
                    accept="image/jpeg,image/png,image/jpg"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                    :http-request="uploadDrivingLicense"
                    list-type="picture"
                    v-model="employeeform.drivingLicenseUrl"
                    >
                    <el-button size="small" type="primary">{{$t('m.common.uploadbtn')}}</el-button>
                    <div slot="tip" class="el-upload__tip">{{$t('m.common.uploadtip')}}</div>
                    <!-- <el-progress style="width: 200px;margin-top: 8px" :text-inside="true" :stroke-width="20" :percentage="progressPercent" /> -->
                  </el-upload>
                </el-form-item>
               
          </el-col>
          <el-col :span="24">
                <el-form-item :label="$t('m.employee.credentialsUrl')" :label-width="formLabelWidth" prop="">
                  <!-- <el-input v-model="employeeform.credentialsUrl" autocomplete="off"></el-input> -->
                  <el-upload
                    ref="credentialupload"
                    class="upload-demo"
                    action="string"
                    accept="image/jpeg,image/png,image/jpg"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                    :http-request="uploadCredentials"
                    list-type="picture"
                    v-model="employeeform.credentialsUrl"
                    >
                    <el-button size="small" type="primary">{{$t('m.common.uploadbtn')}}</el-button>
                    <div slot="tip" class="el-upload__tip">{{$t('m.common.uploadtip')}}</div>
                    <!-- <el-progress style="width: 200px;margin-top: 8px" :text-inside="true" :stroke-width="20" :percentage="progressPercent" /> -->
                  </el-upload>
                </el-form-item>
                
          </el-col>
          <el-col :span="12">
                <el-form-item :label="$t('m.employee.jobTypes')" :label-width="formLabelWidth" prop="">
                  <el-input v-model="employeeform.jobTypes" autocomplete="off"></el-input>
                  <div>{{$t('m.employee.jobtypestip')}}</div>
                </el-form-item>
          </el-col>
        </el-row>
      </el-form>
     <el-row>
       <el-col :span="24" style="text-align:center">
              <el-button  @click="routeTo()" style="width:20%">{{ $t('m.common.cancelbtn') }}</el-button>
             <el-button type="primary" @click="submitEmployeeForm()" style="width:20%">{{ $t('m.common.okbtn') }}</el-button>

       </el-col>

     </el-row>
    
  </div>
</template>

<script>
import { employeeAdd,employeeUpdate,employeeDetail } from '@/api/company'
import { allCountries} from '@/api/allcompany'
import { commonUpload } from "@/api/uploadfile"
export default {
  
  data() {
    return {
      updateEmployeeLoading:false,
      eployeecodeshow:false,
      employeecode:'',
      fileList: [],
      scoreAttachment:'',//综合评价得分表
      certificateAttachment:'',//工作证明
      papersPhotoUrl:'',//个人证件照
      drivingLicenseUrl:'',//驾驶证
      formLabelWidth: '180px',
      optcountry:[],
      progressPercent: 0, // 进度条默认为0
      credentialsUrl:'',//资格证书
      employeeform:{
          passportName: "",
          passportId: "",
          passportIssueDate: '',
          passportExpireDate: '',
          papersId: '',
          papersType: '',
          birthday: '',
          age: '',
          height:'',
          weight: '',
          clothesSize:'',
          shoesSize: '',
          nationality:'',
          religion: '',
          homeAddress: '',
          maritalStatus: '',
          homePhone: '',
          educationInformation: [
            {
              educationLevel: '',
              graduateSchool: '',
              graduateDate: '',
              major: ''
            }
          ],
          emergencyContacts: [
            {
              name: '',
              relationship: '',
              sex: '',
              phone: ''
            }
          ],
          familyMembers: [
            {
              name: '',
              relationship: '',
              sex: '',
              phone: ''
            }
          ],
          startWorkDate: '',
          jobResumes: [
            {
              nation: '',
              companyName: '',
              workingTime:'',
              job: '',
              score: '',
              scoreAttachment: '',
              certificateAttachment: ''
            }
          ],
          papersPhotoUrl:'',
          drivingLicenseUrl:'',
          credentialsUrl: '',
          jobTypes:'',
          companyCode:'',
          code:''       
          
        },
        rules: {
          name: [
            { required: true, message: '请输入合约名称', trigger: 'blur' },
            { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
          ],
          firstPartyCode: [
            { required: true, message: '请选择甲方公司', trigger: 'change' }
          ],
          secondPartyCode: [
            { required: true, message: '请选择乙方公司', trigger: 'change' }
          ],
          expireDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          nation: [
            { required: true, message: '请选择国家', trigger: 'change' }
          ],
          scanningCopyUrl: [
            { required: true, message: '请上传合约扫描件', trigger: 'blur' }
          ],
          employeeNumber: [
            { required: true, message: '请输入合约人数', trigger: 'blur' }
          ]
        }
    }
     
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() { 
      this.getAllCompany()   
      const code = this.$route.query.code
      if(code){
        this.employeecode = code
         this.getEmployeeDetail(this.employeecode)     
      }
      
      
    },
    getEmployeeDetail(code){
      this.updateEmployeeLoading = true
      employeeDetail(code).then(response => {
      
        this.employeeform = response.data;
        this.updateEmployeeLoading = false
      }).catch(response =>{
        this.updateEmployeeLoading = false
      })
      
    },
    //查询国家列表
    getAllCompany(){
        this.updateEmployeeLoading = true
      allCountries().then(response => {
      // const xsrftoke=this.getCookie("XSRF-TOKEN");
       // console.log(xsrftoke);
        this.optcountry = response.data;
        this.updateEmployeeLoading = false
      }).catch(response =>{
        this.updateEmployeeLoading = false
      })
      },
    //新增购房人基本信息
    addEducationInformation() {
      const that = this;
      that.employeeform.educationInformation.push({});
    },
    removeEducationRow(index) {
      if (index >= 0) {
        this.employeeform.educationInformation.splice(index, 1);
      }
    },
    addEmergencyContacts(){
      const that = this;
      that.employeeform.emergencyContacts.push({});
    },
    removeEmergencyContactsRow(index) {
      if (index >= 0) {
        this.employeeform.emergencyContacts.splice(index, 1);
      }
    },
    addfamilyMembers(){
      const that = this;
      that.employeeform.familyMembers.push({});
    },
    removefamilyMembersRow(index) {
      if (index >= 0) {
        this.employeeform.familyMembers.splice(index, 1);
      }
    },
    addjobResumes(){
      const that = this;
      that.employeeform.jobResumes.push({});
    },
    removejobResumesRow(index) {
      if (index >= 0) {
        this.employeeform.jobResumes.splice(index, 1);
      }
    },
    handleRemove(file, fileList) {
      this.progressPercent = 0
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`文件上传限制选择 1 个文件`);
      },
      beforeUpload(file) {
        //this.fileParam.type = file.type
        const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        console.log("isJPG"+isJPG)
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/PNG格式!');
        }        
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG || isPNG && isLt2M;
      },
      uploadScoreAtt(param){
        this.UploadImage(param,'score')
      },
      uploadCertificateAtt(param){       
        this.UploadImage(param,'certificate')
      },
      uploadPapersPhoto(param){
        this.UploadImage(param,'papersPhoto')
      },
      uploadDrivingLicense(param){
        this.UploadImage(param,'drivingLicense')
      },
      uploadCredentials(param){
        this.UploadImage(param,'credentials')
      },
      UploadImage(param,type){
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append('type', param.file.type)  
      // 上传新文件时，将进度条值置为零
this.progressPercent = 0
const uploadProgressEvent = progressEvent => {
this.progressPercent = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
}
     // this.updateEmployeeLoading = true
      commonUpload(formData,uploadProgressEvent).then(response => {
         //this.updateEmployeeLoading = false
         this.$message({
          message: '上传成功',
          type: 'success'
        });
               
        const imgUrl = response.data.url   
        //this.contractform.scanningCopyUrl = response.data.url
        if(type==='score'){
          this.scoreAttachment=imgUrl     
        }
        if(type==='certificate'){
          this.certificateAttachment=imgUrl
        }
        if(type==='papersPhoto'){
         // this.papersPhotoUrl=imgUrl
          this.employeeform.papersPhotoUrl= imgUrl
        }
        if(type==='drivingLicense'){
          this.drivingLicenseUrl=imgUrl
          this.employeeform.drivingLicenseUrl= imgUrl
        }
        if(type==='credentials'){
          this.credentialsUrl=imgUrl
          this.employeeform.credentialsUrl= imgUrl
        }
       
      }).catch(response => {
        console.log('图片上传失败')
      // this.updateEmployeeLoading = false
      })
    },
    fileChange(file){
      this.$refs.papersPhototupload.clearFiles() //清除文件对象
      //this.logo = file.raw // 取出上传文件的对象，在其它地方也可以使用
      //this.fileList = [{name: file.name, url: file.url}] // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
    },
      beforeRemove(file, fileList) {
        //return this.$confirm(`确定移除 ${ file.name }？`);
        //this.progressPercent=0
      },
    submitEmployeeForm(){
      console.dir(this.employeeform)
      // console.dir(this.employeeform.educationInformation)
      // for(let i= 0;i<this.employeeform.educationInformation.length;i++){
      //    alert(this.employeeform.educationInformation[i].educationLevel)
      // }
            if(!this.employeeform.code ){

            
            const param = {
              passportName: this.employeeform.passportName,
              passportId: this.employeeform.passportId,
              passportIssueDate: this.employeeform.passportIssueDate,
              passportExpireDate: this.employeeform.passportExpireDate,
              papersId: this.employeeform.papersId,
              papersType: this.employeeform.papersType,
              birthday: this.employeeform.birthday,
              age: this.employeeform.age,
              height:this.employeeform.height,
              weight: this.employeeform.weight,
              clothesSize:this.employeeform.clothesSize,
              shoesSize: this.employeeform.shoesSize,
              nationality:this.employeeform.nationality,
              religion: this.employeeform.religion,
              homeAddress: this.employeeform.homeAddress,
              maritalStatus: this.employeeform.maritalStatus,
              homePhone: this.employeeform.homePhone,
              educationInformation: this.employeeform.educationInformation,
              emergencyContacts: this.employeeform.emergencyContacts,
              familyMembers: this.employeeform.familyMembers,
              startWorkDate: this.employeeform.startWorkDate,
              jobResumes: this.employeeform.jobResumes,
              papersPhotoUrl:this.employeeform.papersPhotoUrl,
              drivingLicenseUrl:this.employeeform.drivingLicenseUrl,
              credentialsUrl: this.employeeform.credentialsUrl,
              jobTypes:this.employeeform.jobTypes  
              
            };
            console.log(param);
            this.updateEmployeeLoading = true;
            employeeAdd(param).then(response => {
              this.updateEmployeeLoading = false
              //this.allContractData()
              this.routeTo()
            }).catch(response => {
              this.updateEmployeeLoading = false
            })
        }else{
            
            const param = {
              passportName: this.employeeform.passportName,
              passportId: this.employeeform.passportId,
              passportIssueDate: this.employeeform.passportIssueDate,
              passportExpireDate: this.employeeform.passportExpireDate,
              papersId: this.employeeform.papersId,
              papersType: this.employeeform.papersType,
              birthday: this.employeeform.birthday,
              age: this.employeeform.age,
              height:this.employeeform.height,
              weight: this.employeeform.weight,
              clothesSize:this.employeeform.clothesSize,
              shoesSize: this.employeeform.shoesSize,
              nationality:this.employeeform.nationality,
              religion: this.employeeform.religion,
              homeAddress: this.employeeform.homeAddress,
              maritalStatus: this.employeeform.maritalStatus,
              homePhone: this.employeeform.homePhone,
              educationInformation: this.employeeform.educationInformation,
              emergencyContacts: this.employeeform.emergencyContacts,
              familyMembers: this.employeeform.familyMembers,
              startWorkDate: this.employeeform.startWorkDate,
              jobResumes: this.employeeform.jobResumes,
              papersPhotoUrl:this.employeeform.papersPhotoUrl,
              drivingLicenseUrl:this.employeeform.drivingLicenseUrl,
              credentialsUrl: this.employeeform.credentialsUrl,
              jobTypes:this.employeeform.jobTypes,
              code:this.employeeform.code
              
            };
            console.log(param);
            this.updateEmployeeLoading = true;
            employeeUpdate(param).then(response => {
              this.updateEmployeeLoading = false
              //this.allContractData()
              this.routeTo()
            }).catch(response => {
              this.updateEmployeeLoading = false
            })
        }
    },
    routeTo(){
      this.$router.push({ path: '/company/employee/index'});
    },
     
        
  }
}
</script>
<style>
.employee-input{
  width:80%;
  padding-right:10px
}

.el-col{
    min-height: 1px;
}
.el-col{
    border: 1px solid transparent;
}
</style>
