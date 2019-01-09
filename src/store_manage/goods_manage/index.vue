<template>
  <div>
    <div style="display:flex;">
      <AddGoods/>
      <SearchGoods/>
    </div>
    <GoodsList/>
    <UpdateGoods/>
    <GoodsPage/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import GoodsList from "./GoodsList";
import AddGoods from "./AddGoods";
import UpdateGoods from "./UpdateGoods";
import GoodsPage from "./GoodsPage";
import SearchGoods from "./SearchGoods";
export default {
  methods: {
    ...mapActions("goodsModule", ["show"])
  },
  created() {
    this.show();
  },
  components: {
    GoodsList,
    AddGoods,
    UpdateGoods,
    GoodsPage,
    SearchGoods
  }
};
</script>

<style>
</style>
