<template>
  <el-container class="container">
    <el-header height="90px">
      <h1 class="h1">爱宠邦后台管理系统</h1>
      <div class="cancellation">
        <span>欢迎您，</span>
        <a class="cancellation-btn">注销</a>
      </div>
    </el-header>
    <el-container class="container">
      <el-aside width="200px" class="container-aside">
        <el-col width="200px" height="100%">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>平台管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">用户管理</el-menu-item>
                <el-menu-item index="1-2">宠主管理</el-menu-item>
                <el-menu-item index="1-3">门店管理</el-menu-item>
                <el-menu-item index="1-4">统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>门店管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/manage/storeapplication">门店申请</el-menu-item>
                <el-menu-item index="/manage/storegoods">商品管理</el-menu-item>
                <el-menu-item index="/manage/suppilergoods">供应商货品</el-menu-item>
                <el-menu-item index="2-4">服务管理</el-menu-item>
                <el-menu-item index="2-5">订单管理</el-menu-item>
                <el-menu-item index="2-6">统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>供应商管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/manage/suppiler">补全信息</el-menu-item>
                <el-menu-item :disabled="disabled"  index="/manage/supgoods">供应商货品管理</el-menu-item>
                <el-menu-item  :disabled="disabled" index="3-3">统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main class="container-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
let useid;
let suppid;
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("supgoodsModule");
export default {
  data() {
    return {
      // disabled: false
    };
  },
  computed: {
    ...mapState(["disabled"])
  },
  methods: {
    getSession() {
      axios({
        method: "get",
        url: "/getSession"
      }).then(({ data }) => {
        console.log(data, "data11");
        useid = data.user._id;
      });
    },
    panduan() {
      axios({
        method: "get",
        url: "/suppiler"
      }).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].supp_number == useid) {
            suppid = data[i]._id;
            axios({
              method: "get",
              url: "/suppiler/" + suppid
            }).then(({ data }) => {
              console.log(data, "通过id查到的数据");
              if (
                data.supp_add == "" ||
                data.supp_bus_pic == "" ||
                data.supp_name == "" ||
                data.supp_note == "" ||
                data.supp_phone == "" ||
                data.supp_web == ""
              ) {
                alert("请完善供应商详情");
                //  this.disabled=true;
                this.setDisable(true);
                  this.disabled=true;
              } else {
                //  location.reload()
                // this.disabled = false;
                this.setDisable(false);
                this.disabled = false;
              }
            });
          }
        }
      });
    }
  },

  created() {
    this.getSession(), this.panduan();
  }
};
</script>

<style scoped>
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-header {
  background-color: skyblue;
  text-align: left;
  display: flex;
  justify-content: space-between;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: white;
  color: #333;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.container,
.container-aside,
.container-main {
  height: 100%;
}
.h1 {
  color: white;
  margin: 0;
  padding: 0;
  line-height: 90px;
}
.el-menu,
.el-col {
  height: 100%;
}
.cancellation {
  line-height: 90px;
  margin-right: 10px;
  color: rgb(226, 139, 25);
}
.cancellation-btn {
  cursor: pointer;
  color: rgb(16, 121, 121);
}
.cancellation-btn:hover {
  text-decoration: underline;
}
</style>
