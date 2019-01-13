<template>
   <suppjinghuo></suppjinghuo>
</template>
<script>
import axios from "axios"
import suppjinghuo from "./suppjinghuo.vue"
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar"
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/extension/bmap/bmap";
export default {
  data() {
    return {
      
    };
  },

  methods: {

  },
  components: {
      suppjinghuo,
  }
};
</script>
<style>
</style>
