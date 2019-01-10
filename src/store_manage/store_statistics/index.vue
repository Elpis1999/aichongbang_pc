<template>
  <div style="margin-top: 20px">
    <el-radio-group v-model="type" size="medium">
      <el-radio-button label="销量统计"></el-radio-button>
      <el-radio-button label="销售额统计"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import MouthGoodsStatistics from "./MouthGoodsStatistics";
export default {
  data() {
    return {
      type: "销量统计"
    };
  },
  components: {
    MouthGoodsStatistics
  }
};
</script>

<style>
</style>
