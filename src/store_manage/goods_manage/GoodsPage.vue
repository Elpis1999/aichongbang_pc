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
export default {
  data() {
    return {
      rows: 5
    };
  },
  computed: {
    ...mapState(["pagination"])
  },
  methods: {
    ...mapActions(["show"]),
    change(value) {
      let { rows } = this;
      this.show({ page: value, rows });
    },
    sizeChange(value) {
      this.show({ page: 1, rows: value });
      this.rows = value;
    }
  }
};
</script>

<style>
</style>
