<template>
  <el-table :data="suppiler" stripe style="width: 100%">
    <el-table-column prop="supp_name" label="供应商名称" width="280"></el-table-column>
    <el-table-column prop="supp_add" label="供应商地址" width="280"></el-table-column>
    <el-table-column prop="supp_phone" label="联系方式" width="280"></el-table-column>
    <el-table-column prop="supp_web" label="网站" width="180"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="click(scope.$index, scope.row)">进货</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "suppilerModule"
);
export default {
  computed: {
    ...mapState(["suppiler"])
  },
  methods: {
    ...mapActions(["show", "stockPurchase"]),
    ...mapMutations(["setDialogTableVisible", "setSupId"]),
    click(index, row) {
      this.setSupId(row._id);
      this.stockPurchase();
      this.setDialogTableVisible(true);
    }
  }
};
</script>

<style>
</style>
