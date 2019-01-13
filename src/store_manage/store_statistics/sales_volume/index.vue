<template>
  <div style="width:100%">
    <el-switch v-model="value3" active-text="服务近6个月的月销售额" inactive-text="商品近6个月的月销售额" style="margin-top:30px;margin-bottom:30px" @change="num" ></el-switch>
    <div class="total"  style="width:1000px;height:460px" id="myChart" ref="myChart" v-show="open"></div>
    <div class="totals" style="width:1000px;height:460px" id="myCharts" ref="myCharts" v-show="opens"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import axios from "axios";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
import "echarts/lib/component/title";
export default {
  data() {
    return {
      value3: true,
      open: false,
      opens: true,
      option: {
        title: {
          text: "商品销售统计图"
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "mm",
            data: [],
            type: "bar"
          }
        ]
      },
      options :{
               title:{
                 text:"服务销售统计图"
               },
            xAxis: {
            
                data: []
            },
            yAxis: {
                
            },
            series: [{
                name:"mm",
                data: [],
                type: 'bar'
            }]
   }
    };
  },
  mounted() {
      this.$nextTick(function(){
        this.shows();
      })
         
  },
  methods: {
    show() {
      this.open = true;
      this.opens = false;
      let myChart = echarts.init(this.$refs.myChart);
      axios({
        method: "get",
        url: "/getSession"
      }).then(({ data }) => {
        let id = data._id;
        axios({
          method: "get",
          url: "/store",
          params: {
            userId: id
          }
        }).then(({ data }) => {
          this.storeid = data[0]._id;

          axios({
            url: `/count/${data[0]._id}`,
            method: "get"
          }).then(({ data }) => {
            this.option.xAxis.data=data.monthNum
            this.option.series[0].data=data.monthgoods
            myChart.setOption(this.option,true);
          });
        });
      });
    },
    shows() {
      this.opens = true
      this.open = false
      let myChart = echarts.init(this.$refs.myCharts);
      axios({
        method: "get",
        url: "/getSession"
      }).then(({ data }) => {
        let id = data._id;
        axios({
          method: "get",
          url: "/store",
          params: {
            userId: id
          }
        }).then(({ data }) => {
          this.storeid = data[0]._id;

          axios({
            url: `/count/${data[0]._id}`,
            method: "get"
          }).then(({ data }) => {
            this.options.xAxis.data=data.monthNum
            this.options.series[0].data=data.monthserve
            myChart.setOption(this.options,true);
          });
        });
      });
    },
    num() {
      console.log(this.value3);
      if (this.value3 == false) {
        this.show()
      }else if (this.value3 == true) {
        this.shows()
      }
    }
  }
};
</script>

<style scoped>
</style>
