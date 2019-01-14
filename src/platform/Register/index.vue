<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>欢迎注册爱宠管理</span>
          </div>
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="80px"
            class="demo-ruleForm"
            :label-position="labelPosition"
          >
            <el-form-item label="账号:" prop="phone">
              <el-input v-model="ruleForm2.phone" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm2.pass"
                autocomplete="on"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm2.checkPass"
                autocomplete="off"
                placeholder="请确认密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="注册方式" prop="resource">
              <el-radio-group v-model="ruleForm2.resource">
                <el-radio label="供应商管理员"></el-radio>
                <el-radio label="门店管理员"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="btnBox">
              <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (this.ruleForm2.phone !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
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
      labelPosition: "right",
      ruleForm2: {
        phone: "",
        pass: "",
        checkPass: "",
        resource: ""
      },
      rules2: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        resource: [
          { required: true, message: "请选择注册方式", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm2);
          let userPhone = this.ruleForm2.phone;
          let pwd = this.ruleForm2.pass;
          let permissions = this.ruleForm2.resource;
          if (permissions == "供应商管理员") {
            permissions = 2;
          } else {
            permissions = 3;
          }
          axios({
            method: "post",
            url: "/users",
            data: {
              userPhone,
              pwd,
              permissions
            }
          }).then(res => {
            alert("注册成功");
              this.$router.push("/")
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.container {
  width: 600px;
  padding: 50px;
  margin: 0 auto;
  margin-top: 50px;
}

.btnBox {
  display: flex;
  justify-content: space-around;
  padding-right: 80px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>


