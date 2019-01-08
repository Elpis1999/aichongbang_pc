<template>
  <el-form
    :model="ruleForm2"
    status-icon
    :rules="rules2"
    ref="ruleForm2"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="店名(营业执照上的)：" prop="shopName">
      <el-input type="text" v-model="ruleForm2.shopName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="营业执照号码：" prop="licenseNumber">
      <el-input type="text" v-model="ruleForm2.licenseNumber" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="上传头像：">
      <el-upload action="/upload" :show-file-list="false" :on-success="onSuccess">
        <img v-if="addForm.imageUrl" :src="imgUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">提交</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        shopName: "",
        licenseNumber: "",
        licenseImgUrl: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSuccess(response) {
      this.ruleForm2.licenseImgUrl = response;
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
