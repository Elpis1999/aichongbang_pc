<template>
  <div>
    <UpdateSuppiler :show="show" :suppiler="suppiler"></UpdateSuppiler>
    <el-table :data="suppiler" style="width: 100%">
      <el-table-column prop="supp_name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="supp_add" label="地址" width="180"></el-table-column>
      <el-table-column prop="supp_phone" label="手机号" width="180"></el-table-column>
      <el-table-column prop="supp_web" label="网站" width="180"></el-table-column>
      <el-table-column prop="supp_bus_pic" label="营业执照图片" width="180"></el-table-column>
      <el-table-column prop="supp_note" label="备注" width="180"></el-table-column>
    </el-table>
  </div>
</template>
<script >
// let useid;
// let suppid;
let bool = 0;
import axios from "axios";
import UpdateSuppiler from "./UpdateSuppiler.vue";
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("supgoodsModule");
export default {
  data() {
    return {
      suppiler: [],
      suppid: "",
      useid: ""
    };
  },
  methods: {
    ...mapMutations(["setId", "setDisabled"]),
    getSession() {
      axios({
        method: "get",
        url: "/getSession"
      }).then(({ data }) => {
        console.log(data, "data119");
        this.useid = data._id;
      });
    },
    show() {
      axios({
        method: "get",
        url: "/suppiler"
      }).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].supp_number == this.useid) {
            this.suppid = data[i]._id;
            this.setId(this.suppid);
            console.log(this.suppid, "iddd");
            axios({
              method: "get",
              url: "/suppiler/" + this.suppid
            }).then(({ data }) => {
              // console.log(data, "通过id查到的数据");
              let arr = [];
              arr.push(data);
              this.suppiler = arr;
            });
          } else {
            bool++;
          }
        }
        if (bool == data.length) {
          console.log(this.useid, "增加时候的useid");
          axios({
            method: "post",
            url: "/suppiler",
            data: {
              supp_number: this.useid,
              supp_name: "",
              supp_add: "",
              supp_phone: "",
              supp_web: "",
              supp_note: "",
              supp_bus_pic: "",
              supp_status: "未审核"
            }
          }).then(({ data }) => {
            console.log(data, "data1114")
            let arr = [];
              arr.push(data);
              this.suppiler = arr;
          });
        }
      });
    }
  },
  created() {
    this.getSession();
    this.show();
  },
  components: {
    UpdateSuppiler
  }
};
</script>

<style>
</style>
