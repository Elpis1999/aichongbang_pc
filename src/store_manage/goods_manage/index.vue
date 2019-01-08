<template>
  <div>
    <AddGoods/>
    <GoodsList/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import GoodsList from "./GoodsList";
import AddGoods from "./AddGoods";

export default {
  methods: {
    ...mapActions("goodsModule", ["show"])
  },
  created() {
    this.show();
  },
  components: {
    GoodsList,
    AddGoods
  }
};
</script>

<style>
</style>
