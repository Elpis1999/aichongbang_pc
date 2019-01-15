<template>
  <div class="box-card">
    <h1 v-if="examine">审核中。。。</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="165px"
      class="demo-ruleForm"
      v-if="!examine"
    >
      <el-form-item label="店名(营业执照上的)：" prop="shopName">
        <el-input type="text" v-model="ruleForm.shopName" autocomplete="off" class="input"></el-input>
      </el-form-item>
      <el-form-item label="营业执照号码：" prop="licenseNumber">
        <el-input type="text" v-model="ruleForm.licenseNumber" autocomplete="off" class="input"></el-input>
      </el-form-item>
      <el-form-item label="上传营业执照：">
        <el-upload action="/upload" :show-file-list="false" :on-success="onSuccess">
          <img v-if="ruleForm.licenseImgUrl" :src="imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="营业地址：" prop="licenseAddres">
        <el-input type="text" v-model="ruleForm.licenseAddres" autocomplete="off" class="input"></el-input>
      </el-form-item>
      <el-form-item label="所在城市：" prop="city">
        <el-input type="text" v-model="ruleForm.city" autocomplete="off" class="input"></el-input>
      </el-form-item>
      <el-form-item label="法人：" prop="legalPerson">
        <el-input type="text" v-model="ruleForm.legalPerson" autocomplete="off" class="input"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-input type="text" v-model="ruleForm.phone" autocomplete="off" class="input"></el-input>
      </el-form-item>
      <el-form-item label="上传头像：">
        <el-upload action="/upload" :show-file-list="false" :on-success="onHeadImgSuccess">
          <img v-if="ruleForm.HeadImgUrl" :src="headImgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="门店特色：" prop="characteristic">
        <el-input type="text" v-model="ruleForm.characteristic" autocomplete="off" class="input"></el-input>
      </el-form-item>
      <el-form-item label="添加店员：">
        <div class="clerk-item" v-for="(item,index) in clerk" :key="index">
          <el-input
            type="text"
            placeholder="姓名"
            autocomplete="off"
            class="input"
            @input="changeClerkname($event,index)"
          ></el-input>
          <el-input
            type="text"
            placeholder="职级"
            autocomplete="off"
            class="input"
            style="margin-top:7px;"
            @input="changeClerkgrade($event,index)"
          ></el-input>
          <el-input
            type="text"
            placeholder="联系电话"
            autocomplete="off"
            class="input"
            style="margin-top:7px;"
            @input="changeClerkphone($event,index)"
          ></el-input>
        </div>
        <i class="el-icon-plus avatar-uploader-icon add-clerk" @click="addClerk"></i>
      </el-form-item>
      <p class="tishi">注意：一旦申请不可更改</p>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
let map = new BMap.Map("allmap"); // 创建Map实例
let localSearch = new BMap.LocalSearch(map);
export default {
  data() {
    return {
      examine: false,
      ruleForm: {
        shopName: "",
        licenseNumber: "",
        licenseImgUrl: "",
        licenseAddres: "",
        legalPerson: "",
        phone: "",
        longitude: "",
        latitude: "",
        city: "",
        HeadImgUrl: "",
        characteristic: ""
      },
      centerDialogVisible: false,
      clerk: [],
      rules: {
        shopName: [{ required: true, message: "必填", trigger: "blur" }],
        licenseNumber: [{ required: true, message: "必填", trigger: "blur" }],
        licenseAddres: [{ required: true, message: "必填", trigger: "blur" }],
        city: [{ required: true, message: "必填", trigger: "blur" }],
        legalPerson: [{ required: true, message: "必填", trigger: "blur" }],
        phone: [
          { required: true, message: "必填", trigger: "blur" },
          {
            pattern: /^1[35789]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        characteristic: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState("commonModule", ["store", "user"]),
    imgUrl() {
      return `http://127.0.0.1:3001/upload/${this.ruleForm.licenseImgUrl}`;
    },
    headImgUrl() {
      return `http://127.0.0.1:3001/upload/${this.ruleForm.HeadImgUrl}`;
    }
  },
  methods: {
    ...mapMutations("commonModule", ["setUser", "setStore"]),
    changeClerkname(e, index) {
      this.clerk[index].clerkname = e;
    },
    changeClerkphone(e, index) {
      this.clerk[index].clerkphone = e;
    },
    changeClerkgrade(e, index) {
      this.clerk[index].clerkgrade = e;
    },
    addClerk() {
      this.clerk.push({ clerkname: "", clerkgrade: "", clerkphone: "" });
    },
    onSuccess(response) {
      this.ruleForm.licenseImgUrl = response;
    },
    onHeadImgSuccess(response) {
      this.ruleForm.HeadImgUrl = response;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        let keyword = this.ruleForm.licenseAddres;
        localSearch.search(keyword);
        await localSearch.setSearchCompleteCallback(searchResult => {
          if (searchResult) {
            let poi = searchResult.getPoi(0);
            this.ruleForm.longitude = poi.point.lng;
            this.ruleForm.latitude = poi.point.lat;
          }
          let newArr = [];
          for (let i = 0; i < this.clerk.length; i++) {
            newArr.push({ ...this.clerk[i] });
          }
          if (valid) {
            let {
              shopName,
              licenseNumber,
              licenseImgUrl,
              licenseAddres,
              legalPerson,
              phone,
              longitude,
              latitude,
              HeadImgUrl,
              characteristic,
              city
            } = this.ruleForm;
            axios({
              method: "post",
              url: "/store",
              data: {
                store_name: shopName,
                store_bus_number: licenseNumber,
                store_bus_pic: licenseImgUrl,
                store_bus_addr: licenseAddres,
                longitude,
                latitude,
                store_city: city,
                store_person: legalPerson,
                store_phone: phone,
                store_avatar: HeadImgUrl,
                store_charactor: characteristic,
                store_VIPlevel: "0",
                store_money: "1",
                store_clerk: JSON.stringify(newArr),
                store_status: "未审核",
                userId: this.user._id
              }
            }).then(() => {
              console.log(this.user)
              this.examine = true;
            });
          }
        });
      });
    }
  },
  created() {
    this.$nextTick(function() {
      if (this.store._id) {
        axios({
          method: "get",
          url: "/store",
          params: {
            userId: this.user._id
          }
        }).then(({ data }) => {
          this.setStore(data[0]);
          if (data.length > 0 && data[0].store_status === "已审核") {
            this.$router.replace("/manage");
          } else if (data.length > 0 && data[0].store_status === "未审核") {
            this.examine = true;
          }
        });
      } else {
        this.$nextTick(function() {
          axios({
            method: "get",
            url: "/getSession"
          }).then(({ data }) => {
            if (data) {
              this.setUser(data);
              axios({
                method: "get",
                url: "/store",
                params: {
                  userId: this.user._id
                }
              }).then(({ data }) => {
                this.setStore(data[0]);
                if (data.length > 0 && data[0].store_status === "已审核") {
                  this.$router.replace("/manage");
                } else if (
                  data.length > 0 &&
                  data[0].store_status === "未审核"
                ) {
                  this.examine = true;
                }
              });
            }
          });
        });
      }
    });
  }
};
</script>

<style scoped>
.avatar {
  width: 178px;
  height: 200px;
  display: block;
}

.box-card {
  margin: 0 auto 0 auto;
  width: 500px;
  height: 400px;
  display: flex;
  align-content: center;
  justify-content: center;
}
.input {
  width: 250px;
}

.add-clerk {
  cursor: pointer;
}
.add-clerk:active {
  color: skyblue;
}

.clerk-item {
  border: 1px solid rgb(226, 226, 226);
  border-radius: 7px;
  text-align: center;
  padding: 20px 0;
  margin-bottom: 30px;
}

.tishi {
  box-sizing: border-box;
  padding-left: 320px;
  color: rgb(192, 190, 190);
  font-size: 14px;
}
</style>
