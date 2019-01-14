<template>
  <div id="myChart1" :style="{width: '500px', height: '500px'}"></div>
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
      supId: ""
    };
  },
  mounted() {},
  created() {
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
              // console.log(data[i]._id, "zxc");
              axios({
                method: "get",
                url: "/supGods/SVTJ",
                params: {
                  supID: data[i]._id
                }
              }).then(({ data }) => {
                // console.log(data.newArr, "zxcc");
                let nameArr = [];
                let numsArr = [];
                for (let i = 0; i < data.newArr.length; i++) {
                  nameArr.push(data.newArr[i].name);
                  numsArr.push(data.newArr[i].nums);
                }
                let myChart1 = echarts.init(document.getElementById("myChart1"));
                myChart1.setOption({
                  title: { text: "各商品销量统计" },
                  tooltip: {},
                  xAxis: {
                    data: nameArr
                  },
                  yAxis: {},
                  series: [
                    {
                      name: "销量",
                      type: "bar",
                      data: numsArr
                    }
                  ]
                });
              });
            }
          }
        });
      });
    }
  }
};
</script>
<style>
</style>
