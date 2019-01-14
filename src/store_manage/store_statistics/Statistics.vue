<template>
  <div class="view-comtainer">
    <el-select v-model="select" slot="prepend" @change="change" style="width:150px;">
      <el-option label="商品销量" value="mgoodsSalesVolume"></el-option>
      <el-option label="服务订单量" value="mserviceSalesVolume"></el-option>
    </el-select>
    <el-select
      v-model="year"
      slot="prepend"
      @change="yearChange"
      style="width:150px;margin-left:25px;"
    >
      <el-option label="2019" value="2019"></el-option>
      <el-option label="2018" value="2018"></el-option>
      <el-option label="2017" value="2017"></el-option>
      <el-option label="2016" value="2016"></el-option>
      <el-option label="2015" value="2015"></el-option>
    </el-select>
    <el-button type="text" @click="click" style="margin-left:15px;">查看季度对比图</el-button>
    <div class="total" id="myChart" ref="myChart"></div>
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/line";
import "echarts/lib/chart/scatter";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
import { mapState, mapMutations } from "vuex";
let myChart;
export default {
  data() {
    return {
      axisData: [],
      seriesData: [],
      select: "mgoodsSalesVolume",
      value: "商品销量",
      year: 2018,
      source: [],
      series: []
    };
  },
  computed: {
    ...mapState("commonModule", ["store", "user"]),
    goodsOptions() {
      return {
        title: {
          text: this.value
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.axisData
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: this.seriesData
      };
    },
    quarterOptions() {
      return {
        legend: {},
        tooltip: {},
        dataset: {
          source: this.source
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: this.series
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.store._id) {
      } else {
        axios({
          method: "get",
          url: "/getSession"
        }).then(({ data }) => {
          if (data) {
            this.setUser(data);
            this.whetherApplyStore();
          } else {
            this.$router.replace("/login");
          }
        });
      }
      this.showChart();
    });
  },
  methods: {
    ...mapMutations("commonModule", ["setUser", "setStore"]),
    click() {
      if (this.select === "mgoodsSalesVolume") {
        axios({
          url: "/goods/qgoodsSalesVolume",
          method: "get",
          params: {
            storeId: this.store._id,
            year: this.year
          }
        }).then(res => {
          this.source = res.data.source;
          this.series = res.data.series;
          myChart.setOption(this.quarterOptions, true);
        });
      } else {
        axios({
          url: "/goods/qserviceSalesVolume",
          method: "get",
          params: {
            storeId: this.store._id,
            year: this.year
          }
        }).then(res => {
          this.source = res.data.source;
          this.series = res.data.series;
          myChart.setOption(this.quarterOptions, true);
        });
      }
    },
    whetherApplyStore() {
      axios({
        method: "get",
        url: "/store",
        params: {
          userId: this.user._id
        }
      }).then(({ data }) => {
        if (data.length === 0 || data[0].store_status != "已审核") {
          this.$router.replace("/manage");
        } else {
          this.setStore(data[0]);
          this.showChart();
        }
      });
    },
    showChart() {
      myChart = echarts.init(this.$refs.myChart);
      axios({
        url: "/goods/mgoodsSalesVolume",
        method: "get",
        params: {
          storeId: this.store._id,
          year: this.year
        }
      }).then(res => {
        this.axisData = res.data.axisData;
        this.seriesData = res.data.seriesData;
        myChart.setOption(this.goodsOptions, true);
      });
    },
    change(e) {
      myChart = echarts.init(this.$refs.myChart);
      this.select = e;
      this.value = "服务订单量";
      axios({
        url: "/goods/" + this.select,
        method: "get",
        params: {
          storeId: this.store._id,
          year: this.year
        }
      }).then(res => {
        this.axisData = res.data.axisData;
        this.seriesData = res.data.seriesData;
        myChart.setOption(this.goodsOptions, true);
      });
    },
    yearChange(e) {
      this.year = parseInt(e);
      axios({
        url: "/goods/" + this.select,
        method: "get",
        params: {
          storeId: this.store._id,
          year: this.year
        }
      }).then(res => {
        this.axisData = res.data.axisData;
        this.seriesData = res.data.seriesData;
        myChart.setOption(this.goodsOptions, true);
      });
    }
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
  margin-top: 15px;
}
</style>
