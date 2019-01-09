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
  "suppilerModule"
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
    ...mapMutations(["setPage", "setRows"]),
    change(value) {
      console.log(value);
      this.setPage(value);
      
      this.show();
    },
    sizeChange(value) {
      this.setRows(value);
      this.show();
    }
  }
};
</script>

<style>
</style>
