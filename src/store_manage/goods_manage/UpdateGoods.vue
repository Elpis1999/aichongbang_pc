<template>
  <el-dialog title="修改商品信息：" :visible.sync="close" width="30%">
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
        <el-input v-model="goods.supp_gd_from" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="生产日期：" prop="supp_gd_factor">
        <el-input v-model="goods.supp_gd_factor" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="保质期：" prop="supp_gd_keepquality">
        <el-input v-model="goods.supp_gd_keepquality" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="特色说明：" prop="supp_gd_specialinfo">
        <el-input v-model="goods.supp_gd_specialinfo"></el-input>
      </el-form-item>
      <el-form-item label="售价：" prop="saleprice">
        <el-input v-model="goods.saleprice"></el-input>
      </el-form-item>
      <el-form-item label="进价：" prop="getprice">
        <el-input v-model="goods.getprice" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="进货数量：" prop="getnumber">
        <el-input v-model="goods.getnumber" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="上传大图：">
        <el-upload action="/upload" :show-file-list="false" :on-success="pigpic">
          <img v-if="goods.pigpic" :src="pigpicImg" class="avatar">
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
        <el-date-picker v-model="goods.time" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "goodsModule"
);
export default {
  data() {
    return {
      goods: {},
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
        supp_gd_specialinfo: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        saleprice: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["updateValidate", "goodsInfo"]),
    close: {
      get() {
        return this.updateValidate;
      },
      set() {
        this.setUpdateValidate(false);
      }
    },
    pigpicImg() {
      return `http://127.0.0.1:3001/upload/${this.goods.pigpic}`;
    },
    smallpicImg() {
      return `http://127.0.0.1:3001/upload/${this.goods.smallpic}`;
    }
  },
  methods: {
    ...mapActions(["show"]),
    ...mapMutations(["setUpdateValidate"]),
    pigpic(response) {
      this.goods = { ...this.goods, pigpic: response };
    },
    smallpic(response) {
      this.goods.smallpic = response;
    },
    confirm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          axios({
            method: "put",
            url: "/goods/" + this.goods._id,
            data: this.goods
          }).then(() => {
            this.setUpdateValidate(false);
            this.show();
          });
        }
      });
    },
    cancel() {
      this.setUpdateValidate(false);
    }
  },
  watch: {
    // 如果 `goodsInfo` 发生改变，这个函数就会运行
    goodsInfo: function(newQuestion, oldQuestion) {
      this.goods = { ...newQuestion };
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
