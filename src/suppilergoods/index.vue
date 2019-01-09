<template>
  <div>
    <SupGoodsAdd :show="show" :supId="supId"></SupGoodsAdd>
    <SupGoodsList :supgoods="supgoods" :show="show"></SupGoodsList>
  </div>
</template>
<script>
import axios from "axios";
import SupGoodsAdd from "./supGoodsAdd";
import SupGoodsList from "./supGoodsList";
export default {
  data() {
    return {
      supgoods: [],
      supId: ""
    };
  },
  created: function() {
    this.getSession();
    // this.show();
  },
  methods: {
    show(page, rows) {
      console.log(this.supId);
      axios({
        method: "get",
        url: "/supGods",
        params: {
          supId: this.supId,
          page: 1,
          rows: 5
        }
      }).then(({ data }) => {
        console.log(data);
        this.supgoods = data.rows;
      });
    },
    // 获取供应商ID
    getSession() {
      axios({
        method: "get",
        url: "/getSession"
      }).then(({ data }) => {
        console.log(data.user);
        this.supId = data.user._id;
        // console.log(this.supId);
        this.show();
      });
    }
  },
  components: {
    SupGoodsAdd,
    SupGoodsList
  }
};
</script>
<style>
</style>
