<template>
  <div>
    <SearchSuppiler/>
    <SuppilerList/>
    <SuppilerPage/>
    <GoodsList/>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapMutations, mapState } from "vuex";
import SuppilerList from "./SuppilerList";
import SearchSuppiler from "./SearchSuppiler";
import SuppilerPage from "./SuppilerPage";
import GoodsList from "./GoodsList";
export default {
  computed: {
    ...mapState("commonModule", ["store", "user"])
  },
  methods: {
    ...mapActions("suppilerModule", ["show"]),
    ...mapMutations("commonModule", ["setUser", "setStore"]),
    whetherApplyStore() {
      axios({
        method: "get",
        url: "/store",
        params: {
          userId: this.user._id
        }
      }).then(({ data }) => {
        if (data.length === 0 || data[0].store_status != "已审核") {
          this.$router.replace("/manage");
        } else {
          this.setStore(data[0]);
          this.show();
        }
      });
    }
  },
  created() {
    if (this.store._id) {
      this.show(this.store._id);
    } else {
      this.$nextTick(function() {
        axios({
          method: "get",
          url: "/getSession"
        }).then(({ data }) => {
          if (data) {
            this.setUser(data);
            this.whetherApplyStore();
          } else {
            this.$router.replace("/login");
          }
        });
      });
    }
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
