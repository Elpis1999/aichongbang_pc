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
import { mapActions, mapState } from "vuex";
import GoodsList from "./GoodsList";
import AddGoods from "./AddGoods";
import UpdateGoods from "./UpdateGoods";
import GoodsPage from "./GoodsPage";
import SearchGoods from "./SearchGoods";
export default {
  computed: {
    ...mapState("commonModule", ["store"])
  },
  methods: {
    ...mapActions("goodsModule", ["show"])
  },
  created() {
    this.show(this.store._id);
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
