<template>
  <div style="margin-top: 20px">
    <el-radio-group v-model="type" size="medium">
      <el-radio-button label="销量统计"></el-radio-button>
      <el-radio-button label="销售额统计"></el-radio-button>
    </el-radio-group>
    <Statistics v-if="type === '销量统计'? true : false"/>
    <SalesVolume v-if="type === '销售额统计'? true : false"/>
  </div>
</template>

<script>
import Statistics from "./statistics/index";
import SalesVolume from "./sales_volume/index";
export default {
  data() {
    return {
      type: "销量统计"
    };
  },
  components: {
    Statistics,
    SalesVolume
  }
};
</script>

<style>
</style>
