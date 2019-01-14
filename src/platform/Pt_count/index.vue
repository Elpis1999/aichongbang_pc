<template>
  <div>
    <el-radio-group v-model="type" @change="showChart">
      <el-radio-button label="销售额统计"></el-radio-button>
      <el-radio-button label="销售额占比统计"></el-radio-button>
      <el-radio-button label="门店分布图"></el-radio-button>
    </el-radio-group>
    <div class="total" id="myChart" ref="myChart"></div>
  </div>
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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      type: "销售额统计",
      month: [
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
      ],
      shopAddr: [],
      goodsData: [],
      serveData: [],
      proportion:[]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showChart();
    });
  },
  methods: {
    showChart() {
      console.log("abc");
      let myChart = echarts.init(document.getElementById("myChart"));
      console.log("统计：", this.type);
      if (this.type == "销售额统计") {
        axios({
          method: "get",
          url: "/goodsAndServe/goodsAndServe"
        }).then(res => {
          myChart.setOption(this.countOption, { notMerge: true });
          this.goodsData = res.data[0];
          this.serveData = res.data[1];
          console.log("返回数据:", res);
          console.log("返回数据:", this.goodsData);
        });
      } else if (this.type == "销售额占比统计") {
        console.log("点占比：", this.goodsData);
         this.proportion=[];
        let a,b;
        a =eval(this.goodsData.join('+'))
        b =eval(this.serveData.join('+'))
        this.proportion.push(a,b)
        console.log("a",this.proportion);
        myChart.setOption(this.propOption, { notMerge: true });
      } else if (this.type == "门店分布图") {
        axios({
          method: "get",
          url: "/users/shop"
        }).then(res => {
          this.shopAddr = res.data;
          myChart.setOption(this.shopOption, { notMerge: true });
        });
      }
    }
  },
  computed: {
    countOption() {
      return {
        backgroundColor: "'rgba(128, 128, 128, 0.5)",
        title: {
          text: "销售额统计"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["2019年1月"]
        },
        yAxis: {},
        series: [
          {
            name: "商品",
            type: "bar",
            data: this.goodsData,
            barWidth:200,
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                color: function(params) {
                  var colorList = [
                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#00e6ff"
                      },
                      {
                        offset: 1,
                        color: "#018dff"
                      }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#00fcae"
                      },
                      {
                        offset: 1,
                        color: "#006388"
                      }
                    ])
                  ];
                  return colorList[params.dataIndex];
                },
                opacity: 1
              }
            }
          },
          {
            name: "服务",
            type: "bar",
            barWidth:100,
            data: this.serveData,
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                color: function(params) {
                  var colorList = [
                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#00e6ff"
                      },
                      {
                        offset: 1,
                        color: "#018dff"
                      }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#00fcae"
                      },
                      {
                        offset: 1,
                        color: "#005388"
                      }
                    ])
                  ];
                  return colorList[params.dataIndex];
                },
                opacity: 8
              }
            }
          }
        ]
      };
    },
    propOption() {
      return {
        backgroundColor: "'rgba(128, 128, 128, 0.5)",
        title: {
          text: "2018销售额占比",
          subtext: "数据非常真实",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.proportion,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(30, 144, 255，0.5)"
              },
              normal: {
                color: "rgb(255,192,0)",
                shadowBlur: "90",
                shadowColor: "rgba(0,0,0,0.8)",
                shadowOffsetY: "30"
              }
            }
          }
        ]
      };
    },
    shopOption() {
      return {
        title: {
          text: "全国门店统计",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item"
        },
        bmap: {
          center: [104.072259, 30.663403],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#044161"
                }
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry",
                stylers: {
                  color: "#064f85"
                }
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#005b96",
                  lightness: 1
                }
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#00508b"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  color: "#056197",
                  visibility: "off"
                }
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  visibility: "on"
                }
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  visibility: "on"
                }
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "on"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry.fill",
                stylers: {
                  color: "#029fd4"
                }
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#1a5787"
                }
              },
              {
                featureType: "city",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "district",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "town",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              }
            ]
          }
        },
        series: [
          {
            name: "门店数",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.shopAddr,
            symbolSize: function(val) {
              return 10;
            },
            itemStyle: {
              normal: {
                color: "#ddb926"
              }
            },
            tooltip: {
              formatter: function(params, ticket, callback) {
                return (
                  "城市：" + params.data[3] + "<br>门店数：" + params.data[2]
                );
              }
            }
          },
          {
            name: "门店位置",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.shopAddr,
            symbol: "pin",
            symbolSize: 20,
            itemStyle: {
              normal: {
                color: "red"
              }
            },
            tooltip: {
              formatter: function(params, ticket, callback) {
                return (
                  "店铺名称：" + params.data[3] + "<br>地址：" + params.data[2]
                );
              }
            }
          }
        ]
      };
    }
  }
};
</script>

<style sscoped>
.total {
  width: 100%;
  height: 500px;
}
</style>
