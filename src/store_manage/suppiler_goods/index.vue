<template>
  <div>
    <SearchSuppiler/>
    <SuppilerList/>
    <SuppilerPage/>
    <GoodsList/>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("suppilerModule");
import SuppilerList from "./SuppilerList";
import SearchSuppiler from "./SearchSuppiler";
import SuppilerPage from "./SuppilerPage";
import GoodsList from "./GoodsList";
export default {
  computed: {},
  methods: {
    ...mapActions(["show"])
  },
  created() {
    this.show();
  },
  components: {
    SuppilerList,
    SearchSuppiler,
    SuppilerPage,
    GoodsList
  }
};
</script>

<style>
</style>
