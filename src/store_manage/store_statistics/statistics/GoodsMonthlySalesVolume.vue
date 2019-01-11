<template>
  <div class="total" id="myChart" ref="myChart"></div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
export default {
  data() {
    return {
      monthAxisData: [],
      monthSeriesData: []
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    showChart() {
      let myChart = echarts.init(this.$refs.myChart);
      axios({
        url: "/goods/classesTotal",
        method: "get"
      }).then(res => {
        this.monthAxisData = res.data.axisData;
        this.monthSeriesData = res.data.seriesData;
        myChart.setOption(this.classesOptions, true);
      });
    }
  },
  computed: {
    classesOptions() {
      return {
        title: {
          text: "商品月销量统计图"
        },
        xAxis: {
          data: this.monthAxisData
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.monthSeriesData
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.total {
  width: 100%;
  height: 500px;
}
</style>
