<template>
  <el-container class="container">
    <el-header height="90px">
      <h1 class="h1">爱宠邦后台管理系统</h1>
      <div class="cancellation">
        <span>{{userName}}欢迎您，</span>
        <a class="cancellation-btn" @click="cancellation">注销</a>
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
            <template v-if="platform">
              <el-menu-item index="1-1">用户管理</el-menu-item>
              <el-menu-item index="1-2">宠主管理</el-menu-item>
              <el-menu-item index="1-3">门店管理</el-menu-item>
              <el-menu-item index="1-4">统计</el-menu-item>
            </template>
            <template v-if="storeDisabled">
              <el-menu-item index="/manage/storeapplication" :disabled="!storeStatus">门店申请</el-menu-item>
              <el-menu-item index="/manage/storegoods" :disabled="storeStatus">商品管理</el-menu-item>
              <el-menu-item index="/manage/suppilergoods" :disabled="storeStatus">供应商货品</el-menu-item>
              <el-menu-item index="2-4" :disabled="storeStatus">服务管理</el-menu-item>
              <el-menu-item index="2-5" :disabled="storeStatus">订单管理</el-menu-item>
              <el-menu-item index="2-6" :disabled="storeStatus">统计</el-menu-item>
            </template>
            <template v-if="suppiler">
              <el-menu-item index="/manage/suppiler">补全信息</el-menu-item>
              <el-menu-item :disabled="disabled" index="/manage/supgoods">供应商货品管理</el-menu-item>
              <el-menu-item :disabled="disabled" index="3-3">统计</el-menu-item>
            </template>
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
const obj = createNamespacedHelpers("commonModule");
const commonMapState = obj.mapState;
const{mapMutations}= createNamespacedHelpers("commonModule");
export default {
  data() {
    return {
      userName: "",
      storeStatus: true
    };
  },
  // beforeRouteLeave(to, from, next) {
  //   if (confirm("确定离开吗？") == true) {
  //     next(); //跳转到另一个路由
  //   } else {
  //     next(false); //不跳转
  //   }
  // },
  computed: {
     ...mapState(["disabled"]),
    ...commonMapState(["user", "store"]),
    platform() {
      if (this.user.permissions == 1) {
        return true;
      } else {
        return false;
      }
    },
    suppiler() {
      if (this.user.permissions == 3) {
        return true;
      } else {
        return false;
      }
    },
    storeDisabled() {
      if (this.user.permissions == 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapMutations(["setUser", "setStore", "setSuppiler"]),
    cancellation() {
      axios({
        method: "post",
        url: "/removeSession"
      }).then(() => {
        this.$router.replace("/login");
      });
    },
    whetherApplyStore() {
      axios({
        method: "get",
        url: "/store",
        params: {
          userId: this.user._id
        }
      }).then(({ data }) => {
        this.setStore(data[0]);
        if (data.length > 0) {
          this.storeStatus = false;
        }
      });
    },
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
    
  })
      },
  

  created() {
     this.getSession(), this.panduan();
    axios({
      method: "get",
      url: "/getSession"
    }).then(({ data }) => {
      if (data) {
        this.userName = data.userPhone;
        this.setUser(data);
        this.whetherApplyStore();
      } else {
        this.$router.replace("/login");
      }
    });
  }
  //   ,watch: {
  //   // 监听路由跳转。
  //   $route(newRoute, oldRoute) {
  //     console.log('watch', newRoute, oldRoute)
  //     this.$router.replace("/login");
  //   },
  // },
}
}
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
