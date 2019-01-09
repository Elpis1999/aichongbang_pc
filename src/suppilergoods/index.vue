<template>
  <div>
    <SupGoodsAdd></SupGoodsAdd>
    <SupGoodsList></SupGoodsList>
    <SupGoodsUpdate></SupGoodsUpdate>
  </div>
</template>
<script>
import axios from "axios";
import SupGoodsAdd from "./supGoodsAdd";
import SupGoodsList from "./supGoodsList";
import SupGoodsUpdate from "./supUpdate";

import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("studentsModule");
export default {
  data() {
    return {
      supgoods: [],
      supId: ""
    };
  },
  created: function() {
    this.setSupGoods();
  },
  methods: {
    ...mapActions(["setSupGoods"])
    // show(page, rows) {
    //   console.log(this.supId);
    //   axios({
    //     method: "get",
    //     url: "/supGods",
    //     params: {
    //       supId: this.id,
    //       page: 1,
    //       rows: 5
    //     }
    //   }).then(({ data }) => {
    //     console.log(data);
    //     this.supgoods = data.rows;
    //   });
    // }
  },
  components: {
    SupGoodsAdd,
    SupGoodsList
  }
};
</script>
<style>
</style>
