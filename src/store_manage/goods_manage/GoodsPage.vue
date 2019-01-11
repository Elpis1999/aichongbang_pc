<template>
  <div>
    <el-pagination
      background
      layout="total,sizes,prev,pager,next,jumper"
      :total="pagination.total"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      @size-change="sizeChange"
      @current-change="change"
    ></el-pagination>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "goodsModule"
);
const commonModule = createNamespacedHelpers("commonModule");
const mapStateCommon = commonModule.mapState;
export default {
  computed: {
    ...mapState(["pagination"]),
    ...mapStateCommon(["store"])
  },
  methods: {
    ...mapActions(["show"]),
    ...mapMutations(["setPage", "setRows"]),
    change(value) {
      this.setPage(value);

      this.show(this.store._id);
    },
    sizeChange(value) {
      this.setRows(value);
      this.show(this.store._id);
    }
  }
};
</script>

<style>
</style>
