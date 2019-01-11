<template>
  <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="名称" value="supp_gd_brand"></el-option>
      <el-option label="品类" value="supp_gd_type"></el-option>
      <el-option label="包装规格" value="supp_gd_install"></el-option>
      <el-option label="生产日期" value="supp_gd_factor"></el-option>
      <el-option label="保质期" value="supp_gd_keepquality"></el-option>
      <el-option label="库存" value="getnumber"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
  </el-input>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapActions } = createNamespacedHelpers("goodsModule");
const commonModule = createNamespacedHelpers("commonModule");
const mapStateCommon = commonModule.mapState;
export default {
  data() {
    return {
      select: "",
      value: ""
    };
  },
  computed: {
    ...mapStateCommon(["store"])
  },
  methods: {
    ...mapMutations(["setType", "setValue"]),
    ...mapActions(["show"]),
    search() {
      this.setType(this.select);
      this.setValue(this.value);
      this.show(this.store._id);
    }
  }
};
</script>

<style scoped>
.el-select {
  width: 90px;
}
.el-input {
  width: 375px;
  margin-left: 10px;
}
</style>
