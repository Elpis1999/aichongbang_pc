<template>
  <div>
    <div id="myChart" :style="{width: '600px', height: '500px'}"></div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/extension/bmap/bmap");
// import echarts from "echarts/lib/echarts";
// 引入柱状图
// import "echarts/lib/chart/bar";
// import "echarts/lib/chart/pie";
// import "echarts/lib/chart/scatter";
// 引入提示框和标题组件
// import "echarts/lib/component/tooltip";
// import "echarts/lib/component/title";
// import "echarts/lib/component/legend";
// import "echarts/extension/bmap/bmap";
import axios from "axios";

export default {
  data() {
    return {
      useid: "",
      suppid: "",
      type: "各个店铺的进货量统计",
      classAxisData: [],
      classSeriesData: [],
      shuju: []
    };
  },
  mounted() {
    // this.showChart();
  },
  methods: {
    getSession() {
      axios({
        method: "get",
        url: "/getSession"
      }).then(({ data }) => {
        // console.log(data, "data000");
        this.useid = data._id;
      });
    },
    show() {
      axios({
        method: "get",
        url: "/suppiler"
      }).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          // console.log("qqq7", data[i].supp_number, this.useid);
          if (data[i].supp_number == this.useid) {
            this.suppid = data[i]._id;
            // console.log(this.suppid, "iddd8");
            axios({
              method: "get",
              url: "/suppjinghuo",
              params: {
                suppid: this.suppid
              }
            }).then(({ data }) => {
              // console.log(data, "通过id查到的数据tt");

              // console.log(this.shuju, "统计数据");
              let arr1 = [];
              let arr2 = [];
              for (let i = 0; i < data.length; i++) {
                arr1.push(data[i].name);
                arr2.push(data[i].number);
              }
              // console.log(arr1, "arr1");
              // console.log(arr2, "arr2");
              // console.log("chart");
              let myChart = echarts.init(document.getElementById("myChart"));
              myChart.setOption({
                title: { text: "各商品进货量统计" },
                tooltip: {},
                xAxis: {
                  data: arr1
                },
                yAxis: {},
                series: [
                  {
                    name: "销量",
                    type: "bar",
                    data: arr2
                  }
                ]
              });
            });
          }
        }
      });
    }
    // showChart() {
    //   console.log(this.shuju,"shujuaa")

    // }
  },
  created() {
    this.getSession();
    this.show();
    // this.showChart();
  },
  components: {}
};
</script>
<style scoped>
.total {
  width: 1000px;
  height: 500px;
}
</style>
