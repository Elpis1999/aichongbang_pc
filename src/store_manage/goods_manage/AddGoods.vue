<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    <el-dialog title="添加商品：" :visible.sync="dialogVisible" width="30%">
      <el-form :model="goods" status-icon :rules="rules" ref="addForm" label-width="100px">
        <el-form-item label="名称：" prop="supp_gd_brand">
          <el-input v-model="goods.supp_gd_brand"></el-input>
        </el-form-item>
        <el-form-item label="推广标题：" prop="supp_gd_title">
          <el-input v-model="goods.supp_gd_title"></el-input>
        </el-form-item>
        <el-form-item label="材料：" prop="supp_gd_material">
          <el-input v-model="goods.supp_gd_material"></el-input>
        </el-form-item>
        <el-form-item label="制作方法：" prop="made">
          <el-input v-model="goods.made"></el-input>
        </el-form-item>
        <el-form-item label="适用规格：" prop="supp_gd_appl">
          <el-input v-model="goods.supp_gd_appl"></el-input>
        </el-form-item>
        <el-form-item label="专属规格：" prop="supp_gd_exc">
          <el-input v-model="goods.supp_gd_exc"></el-input>
        </el-form-item>
        <el-form-item label="包装规格：" prop="supp_gd_install">
          <el-input v-model="goods.supp_gd_install"></el-input>
        </el-form-item>
        <el-form-item label="口味：" prop="supp_gd_taste">
          <el-input v-model="goods.supp_gd_taste"></el-input>
        </el-form-item>
        <el-form-item label="特殊功用：" prop="supp_gd_special">
          <el-input v-model="goods.supp_gd_special"></el-input>
        </el-form-item>
        <el-form-item label="产地：" prop="supp_gd_from">
          <el-input v-model="goods.supp_gd_from"></el-input>
        </el-form-item>
        <el-form-item label="生产日期：" prop="supp_gd_factor">
          <el-input v-model="goods.supp_gd_factor"></el-input>
        </el-form-item>
        <el-form-item label="保质期：" prop="supp_gd_keepquality">
          <el-input v-model="goods.supp_gd_keepquality"></el-input>
        </el-form-item>
        <el-form-item label="特色说明：" prop="supp_gd_specialinfo">
          <el-input v-model="goods.supp_gd_specialinfo"></el-input>
        </el-form-item>
        <el-form-item label="售价：" prop="saleprice">
          <el-input v-model="goods.saleprice"></el-input>
        </el-form-item>
        <el-form-item label="进价：" prop="getprice">
          <el-input v-model="goods.getprice"></el-input>
        </el-form-item>
        <el-form-item label="进货数量：" prop="getnumber">
          <el-input v-model="goods.getnumber"></el-input>
        </el-form-item>
        <el-form-item label="上传大图：">
          <el-upload action="/upload" :show-file-list="false" :on-success="bigpic">
            <img v-if="goods.bigpic" :src="bigpicImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传小图：">
          <el-upload action="/upload" :show-file-list="false" :on-success="smallpic">
            <img v-if="goods.smallpic" :src="smallpicImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="选择时间：">
          <el-date-picker v-model="goods.time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import axios from "axios";
const { mapActions } = createNamespacedHelpers("goodsModule");
const commonModule = createNamespacedHelpers("commonModule");
const mapStateCommon = commonModule.mapState;
export default {
  data() {
    return {
      dialogVisible: false,
      goods: {
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
        bigpic: "",
        smallpic: "",
        getprice: "",
        saleprice: "",
        getnumber: "",
        time: ""
      },
      rules: {
        supp_gd_brand: [{ required: true, message: "必填", trigger: "blur" }],
        supp_gd_title: [{ required: true, message: "必填", trigger: "blur" }],
        supp_gd_type: [{ required: true, message: "必填", trigger: "blur" }],
        supp_gd_material: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        made: [{ required: true, message: "必填", trigger: "blur" }],
        supp_gd_appl: [{ required: true, message: "必填", trigger: "blur" }],
        supp_gd_exc: [{ required: true, message: "必填", trigger: "blur" }],
        supp_gd_install: [{ required: true, message: "必填", trigger: "blur" }],
        supp_gd_taste: [{ required: true, message: "必填", trigger: "blur" }],
        supp_gd_special: [{ required: true, message: "必填", trigger: "blur" }],
        supp_gd_from: [{ required: true, message: "必填", trigger: "blur" }],
        supp_gd_factor: [{ required: true, message: "必填", trigger: "blur" }],
        supp_gd_keepquality: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        supp_gd_specialinfo: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        getprice: [{ required: true, message: "必填", trigger: "blur" }],
        saleprice: [{ required: true, message: "必填", trigger: "blur" }],
        getnumber: [{ required: true, message: "必填", trigger: "blur" }],
        time: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapStateCommon(["store"]),
    bigpicImg() {
      return `http://127.0.0.1:3001/upload/${this.goods.bigpic}`;
    },
    smallpicImg() {
      return `http://127.0.0.1:3001/upload/${this.goods.smallpic}`;
    }
  },
  methods: {
    ...mapActions(["show"]),
    bigpic(response) {
      console.log("40", response);
      this.goods.bigpic = response;
    },
    smallpic(response) {
      this.goods.smallpic = response;
    },
    confirm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
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
            bigpic,
            smallpic,
            getprice,
            saleprice,
            getnumber,
            time
          } = this.goods;
          time = JSON.stringify(time)
            .split("T")[0]
            .split('"')[1];
          axios({
            method: "post",
            url: "/goods",
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
              bigpic,
              smallpic,
              getprice,
              saleprice,
              getnumber,
              time,
              storeId: this.store._id
            }
          }).then(() => {
            this.show(this.store._id);
            this.dialogVisible = false;
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 178px;
  height: 200px;
  display: block;
}
</style>
