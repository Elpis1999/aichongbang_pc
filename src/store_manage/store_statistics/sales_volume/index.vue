<template>
  <div class="view-comtainer">
    <el-select v-model="select" slot="prepend" style="width:150px;">
      <el-option label="商品月销量" value="m_goods"></el-option>
      <el-option label="商品季销量" value="q_goods"></el-option>
      <el-option label="商品年销量" value="y_goods"></el-option>
      <el-option label="服务月预约量" value="m_service"></el-option>
      <el-option label="服务季预约量" value="q_service"></el-option>
      <el-option label="服务年预约量" value="y_service"></el-option>
    </el-select>
    <div class="total" id="myChart" ref="myChart"></div>
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
import "echarts/lib/component/title";
import { mapState } from "vuex";
export default {
  data() {
    return {
      axisData: [],
      seriesData: [],
      select: "m_goods"
    };
  },
  mounted() {
    let myChart = echarts.init(this.$refs.myChart);
    myChart.setOption(
      {
        title: {
          text: "门店销售服务额统计图"
        },
        xAxis: {
          data: ["商品", "服务"]
        },
        yAxis: {},
        series: [
          {
            name: "mm",
            data: [1, 2],
            type: "bar"
          }
        ]
      },
      true
    );
  },
  methods: {
    show(){
      
    }
  },
  computed: {
    ...mapState("commonModule", ["store"])
  }
};
</script>

<style scoped>
.view-comtainer {
  margin-top: 25px;
}
.total {
  width: 100%;
  height: 500px;
}
</style>
