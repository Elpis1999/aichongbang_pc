<template>
  <div>
    <SupGoodsAdd :show="show"></SupGoodsAdd>
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
      supgoods: []
    };
  },
  created: function() {
    this.show();
  },
  methods: {
    show() {
      axios({
        method: "get",
        url: "/supGods"
      }).then(({ data }) => {
        // console.log(data);
        this.supgoods = data;
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
