<template>
  <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="供应商名称" value="supp_name"></el-option>
      <el-option label="供应商地址" value="supp_add"></el-option>
      <el-option label="联系方式" value="supp_phone"></el-option>
      <el-option label="网站" value="supp_web"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
  </el-input>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapActions } = createNamespacedHelpers("suppilerModule");
export default {
  data() {
    return {
      select: "",
      value: ""
    };
  },
  methods: {
    ...mapMutations(["setType", "setValue"]),
    ...mapActions(["show"]),
    search() {
      this.setType(this.select);
      this.setValue(this.value);
      this.show();
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
