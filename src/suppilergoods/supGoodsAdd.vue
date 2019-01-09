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
        <el-form-item label="商品大图" prop>
          <el-upload
            action="/upload"
            list-type="picture-card"
            :on-preview="bigHandlePictureCardPreview"
            :on-remove="bigHandleRemove"
            :on-success="bigHandleupload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="bigdialogVisible">
            <img width="100%" :src="bigdialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品小图" prop>
          <el-upload
            action="/upload"
            list-type="picture-card"
            :on-preview="smallHandlePictureCardPreview"
            :on-remove="smallHandleRemove"
            :on-success="smallHandleupload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="smalldialogVisible">
            <img width="100%" :src="smalldialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddSupGoods">确 定</el-button>
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
      bigpic: [],
      smallpic: [],
      bigdialogImageUrl: "",
      bigdialogVisible: false,
      smalldialogImageUrl: "",
      smalldialogVisible: false
    };
  },
  methods: {
    // 添加商品
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
          supp_gd_price: this.supp_gd_price,
          bigpic: this.bigpic,
          smallpic: this.smallpic
        }
      }).then(() => {
        this.dialogFormVisible = false;
        // console.log(data.status);
      });
    },
    // 上传商品大图
    bigHandleRemove(file) {
      let imgurl = file.response;
      // console.log(file.response);
      for (let i = 0; i < this.bigpic.length; i++) {
        if (this.bigpic[i] == imgurl) {
          this.bigpic.splice(i, 1);
          // console.log(this.bigpic);
          break;
        }
      }
    },
    bigHandlePictureCardPreview(file) {
      this.bigdialogImageUrl = file.url;
      this.bigdialogVisible = true;
    },
    bigHandleupload(response, file) {
      let url = file.response;
      this.bigpic.push(url);
      // console.log(this.bigpic, "22");
    },
    // 上传商品小图
    smallHandleRemove(file) {
      // console.log(file, fileList);
      let imgurl = file.response;
      // console.log(file.response);
      for (let i = 0; i < this.smallpic.length; i++) {
        if (this.smallpic[i] == imgurl) {
          this.smallpic.splice(i, 1);
          // console.log(this.smallpic);
          break;
        }
      }
    },
    smallHandlePictureCardPreview(file) {
      this.smalldialogImageUrl = file.url;
      this.smalldialogVisible = true;
    },
    smallHandleupload(response, file) {
      let url = file.response;
      this.small.push(url);
      // console.log(this.small, "22");
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
