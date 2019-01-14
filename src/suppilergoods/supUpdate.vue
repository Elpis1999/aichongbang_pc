<template>
  <div>
    <el-dialog title="修改商品信息" class="addBox" :visible.sync="UpdateVisible">
      <el-form status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品品牌" prop="supp_gd_brand">
          <el-input type="text" v-model="SupGood.supp_gd_brand" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="推广标题" prop="supp_gd_title">
          <el-input type="text" v-model="SupGood.supp_gd_title" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="货品品类" prop="supp_gd_type">
          <el-input type="text" v-model="SupGood.supp_gd_type" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="材质" prop="supp_gd_material">
          <el-input type="text" v-model="SupGood.supp_gd_material" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="制作方法" prop="made">
          <el-input type="text" v-model="SupGood.made" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="适用规格" prop="supp_gd_appl">
          <el-input type="text" v-model="SupGood.supp_gd_appl" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专属规格" prop="supp_gd_exc">
          <el-input type="text" v-model="SupGood.supp_gd_exc" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装规格" prop="supp_gd_install">
          <el-input type="text" v-model="SupGood.supp_gd_install" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="口味" prop="supp_gd_taste">
          <el-input type="text" v-model="SupGood.supp_gd_taste" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特殊功用" prop="supp_gd_special">
          <el-input type="text" v-model="SupGood.supp_gd_special" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产地" prop="supp_gd_from">
          <el-input type="text" v-model="SupGood.supp_gd_from" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出厂日期" prop="supp_gd_factor">
          <el-input type="text" v-model="SupGood.supp_gd_factor" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="保质期" prop="supp_gd_keepquality">
          <el-input
            type="text"
            v-model="SupGood.supp_gd_keepquality"
            class="input"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="特色说明" prop="supp_gd_specialinfo">
          <el-input
            type="text"
            v-model="SupGood.supp_gd_specialinfo"
            class="input"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="批发价格" prop="supp_gd_price">
          <el-input type="text" v-model="SupGood.supp_gd_price" class="input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品大图">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-preview="bigHandlePictureCardPreview"
            :on-remove="bigHandleRemove"
            :on-success="bigHandleupload"
            :file-list="bigimgs"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品小图">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-preview="smallHandlePictureCardPreview"
            :on-remove="smallHandleRemove"
            :on-success="smallHandleupload"
            :file-list="smallimgs"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSupGood">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "supgoodsModule"
);
export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "SupGood",
      "id",
      "UpdateVisible",
      "bigimgs",
      "smallimgs",
      "bigpic",
      "smallpic"
    ]),
    UpdateVisible: {
      get() {
        return this.$store.state.supgoodsModule.UpdateVisible;
      },
      set(UpdateVisible) {
        this.$store.commit("supgoodsModule/setUpdateVisible", UpdateVisible);
      }
    }
  },
  methods: {
    ...mapActions(["setSupGoods"]),
    ...mapMutations([
      "setSupGood",
      "setUpdateVisible",
      "setBigpic",
      "setSmallpic"
    ]),
    //上传修改信息
    updateSupGood() {
      let {
        supp_gd_brand,
        supp_gd_title,
        supp_gd_type,
        supp_gd_material,
        made,
        supp_gd_appl,
        supp_gd_exc,
        supp_gd_install,
        supp_gd_taste,
        supp_gd_special,
        supp_gd_from,
        supp_gd_factor,
        supp_gd_keepquality,
        supp_gd_specialinfo,
        supp_gd_price
      } = this.SupGood;
      axios({
        method: "put",
        url: "/supGods/" + this.SupGood._id,
        data: {
          supp_gd_brand,
          supp_gd_title,
          supp_gd_type,
          supp_gd_material,
          made,
          supp_gd_appl,
          supp_gd_exc,
          supp_gd_install,
          supp_gd_taste,
          supp_gd_special,
          supp_gd_from,
          supp_gd_factor,
          supp_gd_keepquality,
          supp_gd_specialinfo,
          supp_gd_price,
          bigpic: this.bigpic,
          smallpic: this.smallpic,
          supId: this.id
        }
      }).then(() => {
        this.setSupGoods();
        this.UpdateVisible = false;
      });
    },
    // 商品大图
    bigHandleRemove(file) {
      let imgurl = file.url;
      let url = imgurl.split("/");
      // console.log(file);
      // console.log(imgurl);
      // console.log(url[4]);
      this.setBigpic(url[4]);
    },
    bigHandlePictureCardPreview(file) {
      // console.log(file);
    },
    bigHandleupload(response, file) {
      let url = file.response;
      this.bigpic.push(url);
      // console.log(response, file, "22");
    },
    // 商品小图
    smallHandleRemove(file) {
      let imgurl = file.url;
      let url = imgurl.split("/");
      // console.log(file);
      // console.log(imgurl);
      // console.log(url[4]);
      this.setSmallpic(url[4]);
    },
    smallHandlePictureCardPreview(file) {
      // console.log(file);
    },
    smallHandleupload(response, file) {
      let url = file.response;
      this.smallpic.push(url);
      // console.log(this.small, "22");
    }
  },
  components: {}
};
</script>

<style>
</style>
