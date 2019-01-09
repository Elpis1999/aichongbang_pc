<template>
  <el-container class="container">
    <el-header height="90px">
      <h1 class="h1">爱宠邦后台管理系统</h1>
      <div class="cancellation">
        <span>{{userName}}欢迎您，</span>
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
            <el-submenu index="1" :disabled="platform">
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
            <el-submenu index="2" :disabled="suppiler">
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
            <el-submenu index="3" :disabled="store">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>供应商管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/manage/suppiler">补全信息</el-menu-item>
                <el-menu-item index="/manage/supgoods">供应商货品管理</el-menu-item>
                <el-menu-item index="3-3">统计</el-menu-item>
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
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("commonModule");
export default {
  data() {
    return {
      userName: ""
    };
  },
  computed: {
    ...mapState(["user"]),
    platform() {
      if (this.user.permissions == 1) {
        return false;
      } else {
        return true;
      }
    },
    suppiler() {
      if (this.user.permissions == 3) {
        return false;
      } else {
        return true;
      }
    },
    store() {
      if (this.user.permissions == 2) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapMutations(["setUser"])
  },
  created() {
    axios({
      method: "get",
      url: "/getSession"
    }).then(({ data }) => {
      if (data) {
        this.userName = data.userPhone;
        this.setUser(data);
      } else {
        this.$router.replace("/login");
      }
    });
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
