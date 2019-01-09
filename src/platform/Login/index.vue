<template>
  <div class="container">
    <el-row class="box">
      <el-col :span="24">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>欢迎登陆爱宠管理</span>
          </div>
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="50px"
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

            <el-form-item class="btnBox">
              <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
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
          // this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          // this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      labelPosition: "right",
      ruleForm2: {
        phone: "",
        pass: ""
      },
      rules2: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
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
          axios({
            method: "post",
            url: "/users/login",
            data: {
              userPhone,
              pwd
            }
          }).then(res => {
            if (res.data.status != 0) {
              alert("登陆成功");
              console.log("session", res);
            } else {
              alert("登陆失败");
            }
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
  width: 500px;
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


