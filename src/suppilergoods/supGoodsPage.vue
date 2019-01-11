<template>
  <el-pagination
    @size-change="changeSize"
    @current-change="changePage"
    :page-sizes="[5, 10, 20]"
    :page-size="pagination.eachpage"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pagination.total"
  ></el-pagination>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("supgoodsModule");
export default {
  methods: {
    ...mapActions(["setSupGoods"]),
    changePage(page) {
      this.setSupGoods({ page, rows: this.pagination.eachpage });
    },
    changeSize(size) {
      this.setSupGoods({ page: 1, rows: size });
    }
  },
  computed: {
    ...mapState(["pagination"])
  }
};
</script>
<style>
</style>
