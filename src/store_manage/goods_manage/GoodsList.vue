<template>
  <el-table :data="goods" stripe style="width: 100%">
    <el-table-column prop="supp_gd_brand" label="名称" width="180"></el-table-column>
    <el-table-column prop="supp_gd_type" label="品类" width="180"></el-table-column>
    <el-table-column prop="supp_gd_install" label="包装规格" width="180"></el-table-column>
    <el-table-column prop="supp_gd_factor" label="生产日期" width="180"></el-table-column>
    <el-table-column prop="supp_gd_keepquality" label="保质期" width="180"></el-table-column>
    <el-table-column prop="getnumber" label="库存" width="180"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="update(scope.$index, scope.row)">修改</el-button>
        <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import axios from "axios";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "goodsModule"
);
export default {
  computed: {
    ...mapState(["goods"])
  },
  methods: {
    ...mapMutations(["setUpdateValidate", "setGoodsInfo"]),
    ...mapActions(["show"]),
    update(index, row) {
      this.setUpdateValidate(true);
      this.setGoodsInfo(row);
    },
    del(index, row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "delete",
            url: "/goods/" + row._id
          }).then(() => {
            this.show();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>
