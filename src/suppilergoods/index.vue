<template>
  <div>
    <SupGoodsAdd></SupGoodsAdd>
    <SupSearch></SupSearch>
    <SupUpdate></SupUpdate>
    <SupGoodsList></SupGoodsList>
    <SupPage></SupPage>
  </div>
</template>
<script>
import axios from "axios";
import SupGoodsAdd from "./supGoodsAdd";
import SupGoodsList from "./supGoodsList";
import SupUpdate from "./supUpdate";
import SupPage from "./supGoodsPage";
import SupSearch from "./supGoodsSearch";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapMutations } = createNamespacedHelpers("supgoodsModule");
export default {
  data() {
    return {
      supgoods: []
      // supId: ""
    };
  },
  created: function() {
    this.getSession();
  },
  methods: {
    ...mapMutations(["setId"]),
    ...mapActions(["setSupGoods", "setID"]),
    getSession() {
      axios({
        method: "get",
        url: "/getSession"
      }).then(({ data }) => {
        let supId = data._id;
<<<<<<< HEAD
        // console.log(data.user);
=======
        console.log(data.user);
>>>>>>> 144bc1703cf9240d6df0a7df5ecaea4f565af6de
        axios({
          method: "get",
          url: "/suppiler"
        }).then(({ data }) => {
          for (let i = 0; i < data.length; i++) {
            if (supId == data[i].supp_number) {
              // let ids = this.setId();
              this.setID(data[i]._id);
              this.setSupGoods();
            }
          }
        });
      });
    }
  },
  components: {
    SupGoodsAdd,
    SupGoodsList,
    SupUpdate,
    SupPage,
    SupSearch
  }
};
</script>
<style>
</style>
