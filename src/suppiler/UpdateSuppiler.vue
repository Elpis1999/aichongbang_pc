<template>
    <div>
  <el-button class="add-btn" type="primary" icon="el-icon-edit" circle  @click="updata"></el-button>
  <el-dialog
  title="供应商详情"
  :visible.sync="dialogVisible"
  width="30%">
   <el-form status-icon  ref="addForm" label-width="100px">
  <el-form-item label="供应商名称" prop="supp_name">
    <el-input v-model="addForm.supp_name"  autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="供应商地址" prop="supp_add">
    <el-input v-model="addForm.supp_add" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="供应商电话" prop="supp_phone">
    <el-input v-model="addForm.supp_phone" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="供应商网站" prop="supp_web">
    <el-input v-model="addForm.supp_web" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="供应商备注" prop="supp_note">
    <el-input v-model="addForm.supp_note" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="供应商上传图片" prop="supp_note">
 <el-upload
          class="avatar-uploader"
          action="/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
   </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script >
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("supgoodsModule");
export default {
  props: ["show", "suppiler"],

  data() {
    return {
      dialogVisible: false,
      addForm: {
        supp_name: "",
        supp_add: "",
        supp_phone: "",
        supp_web: "",
        supp_note: "",
        supp_bus_pic: ""
      },
      imageUrl: ""
    };
  },

  methods: {
     ...mapMutations(["setDisable"]),
    add() {
      axios({
        method: "put",
        url: "/suppiler/" + this.suppiler[0]._id,
        data: this.addForm
      }).then(({ data }) => {
        console.log(data, "data");
        this.show();
        if (
          this.addForm.supp_add == "" ||
          this.addForm.supp_bus_pic == "" ||
          this.addForm.supp_name == "" ||
          this.addForm.supp_note == "" ||
          this.addForm.supp_phone == "" ||
          this.addForm.supp_web == ""
        ) {
           this.setDisable(true);
           alert("请完善供应商详情");
        } else {
          this.setDisable(false);
        }
        this.dialogVisible = false;
          // (this.addForm.supp_name = ""),
          // (this.addForm.supp_add = ""),
          // (this.addForm.supp_phone = ""),
          // (this.addForm.supp_web = ""),
          // (this.addForm.supp_note = ""),
          // (this.addForm.supp_bus_pic = ""),
          // (this.imageUrl = "");
      });
      // location.reload()
      // this.$router.push("../manage/suppiler")
    },
    updata() {
      this.dialogVisible = true;
      console.log(this, "qqq");
      axios({
        method: "get",
        url: "/suppiler/" + this.suppiler[0]._id
      }).then(({ data }) => {
        console.log(data, "111通过id查到的数据");
        this.addForm.supp_name = data.supp_name;
        this.addForm.supp_add = data.supp_add;
        this.addForm.supp_phone = data.supp_phone;
        this.addForm.supp_web = data.supp_web;
        this.addForm.supp_note = data.supp_note;
        this.addForm.supp_bus_pic = data.supp_bus_pic;
        this.imageUrl = "/upload/" + data.supp_bus_pic;
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(file.response, "878");
      let url = file.response;
      this.addForm.supp_bus_pic = url;
      // this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    console.log(this.suppiler, "774");
    this.add();
  }
};
</script>
<style scoped>
.add-btn {
  font-size: 25px;
}
a {
  text-decoration: none;
  cursor: pointer;
  color: #666;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.picture {
  border: 1px dashed #8c939d;
}
.avatar-uploader {
  margin-top: 10px;
}
</style>
