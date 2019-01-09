<template>
  <div>
    <el-button type="text" @click="dialogFormVisible = true">
      <el-button type="primary" icon="el-icon-plus" circle>增加</el-button>
    </el-button>

    <el-dialog title="添加商品" class="addBox" :visible.sync="dialogFormVisible">
      <el-form status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品品牌" prop="supp_gd_brand">
          <el-input type="text" v-model="supp_gd_brand" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="推广标题" prop="supp_gd_title">
          <el-input type="text" v-model="supp_gd_title" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="货品品类" prop="supp_gd_type">
          <el-input type="text" v-model="supp_gd_type" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="材质" prop="supp_gd_material">
          <el-input type="text" v-model="supp_gd_material" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="制作方法" prop="made">
          <el-input type="text" v-model="made" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="适用规格" prop="supp_gd_appl">
          <el-input type="text" v-model="supp_gd_appl" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专属规格" prop="supp_gd_exc">
          <el-input type="text" v-model="supp_gd_exc" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装规格" prop="supp_gd_install">
          <el-input type="text" v-model="supp_gd_install" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="口味" prop="supp_gd_taste">
          <el-input type="text" v-model="supp_gd_taste" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特殊功用" prop="supp_gd_special">
          <el-input type="text" v-model="supp_gd_special" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产地" prop="supp_gd_from">
          <el-input type="text" v-model="supp_gd_from" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出厂日期" prop="supp_gd_factor">
          <el-input type="text" v-model="supp_gd_factor" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="保质期" prop="supp_gd_keepquality">
          <el-input type="text" v-model="supp_gd_keepquality" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特色说明" prop="supp_gd_specialinfo">
          <el-input type="text" v-model="supp_gd_specialinfo" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="批发价格" prop="supp_gd_price">
          <el-input type="text" v-model="supp_gd_price" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品大图" prop="pigpic">
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
        <el-form-item label="商品缩略图" prop="smallpic">
          <el-input type="text" v-model="smallpic" class="input" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialogFormVisible: false,
      supp_gd_brand: "",
      supp_gd_title: "",
      supp_gd_type: "",
      supp_gd_material: "",
      made: "",
      supp_gd_appl: "",
      supp_gd_exc: "",
      supp_gd_install: "",
      supp_gd_taste: "",
      supp_gd_special: "",
      supp_gd_from: "",
      supp_gd_factor: "",
      supp_gd_keepquality: "",
      supp_gd_specialinfo: "",
      supp_gd_price: "",
      pigpic: "",
      smallpic: "",
      imageUrl: ""
    };
  },
  methods: {
    AddSupGoods() {
      axios({
        method: "post",
        url: "/supGods",
        data: {
          supp_gd_brand: this.supp_gd_brand,
          supp_gd_title: this.supp_gd_title,
          supp_gd_type: this.supp_gd_type,
          supp_gd_material: this.supp_gd_material,
          made: this.made,
          supp_gd_appl: this.supp_gd_appl,
          supp_gd_exc: this.supp_gd_exc,
          supp_gd_install: this.supp_gd_install,
          supp_gd_taste: this.supp_gd_taste,
          supp_gd_special: this.supp_gd_special,
          supp_gd_from: this.supp_gd_from,
          supp_gd_factor: this.supp_gd_factor,
          supp_gd_keepquality: this.supp_gd_keepquality,
          supp_gd_specialinfo: this.supp_gd_specialinfo,
          supp_gd_price: this.supp_gd_price
        }
      }).then(() => {});
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
  components: {}
};
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
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
