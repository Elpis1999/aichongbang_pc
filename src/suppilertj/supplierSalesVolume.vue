<template>
  <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
</template>
<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/extension/bmap/bmap";
import axios from "axios";
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      supId: "",
      names: [],
      nums: []
    };
  },
  mounted() {
    this.drawLine();
  },
  created: function() {
    this.getSession();
  },
  methods: {
    getSession() {
      //获取到供应商的ID
      axios({
        method: "get",
        url: "/getSession"
      }).then(({ data }) => {
        let supId = data._id;
        // console.log(data.user);
        axios({
          method: "get",
          url: "/suppiler"
        }).then(({ data }) => {
          for (let i = 0; i < data.length; i++) {
            if (supId == data[i].supp_number) {
              this.supId = data[i]._id;
              console.log(data[i]._id);
              axios({
                method: "get",
                url: "/supGods",
                params: {
                  supId: data[i]._id
                }
              }).then(({ data }) => {
                console.log(data, "zxc");
              });
            }
          }
        });
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "各门店销量" },
        tooltip: {},
        xAxis: {
          data: ["11", "11122"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20]
          }
        ]
      });
    }
  }
};
</script>
<style>
</style>
