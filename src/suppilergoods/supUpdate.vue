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
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "supgoodsModule"
);
export default {
  props: [],
  computed: {
    ...mapState(["SupGood"]),
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
    ...mapActions(["setStudents"]),
    ...mapMutations(["setSupGood"]),
    update() {
      let { name, age, gender } = this.student;
      axios({
        method: "put",
        url: "/students/" + this.student._id,
        data: {
          name,
          age,
          gender
        }
      }).then(() => {
        this.setStudents();
        this.UpdateVisible = false;
      });
    }
  },
  components: {
    // InputElement,
    // Radio
  }
};
</script>

<style>
</style>
