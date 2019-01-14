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
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
import GoodsList from "./GoodsList";
import AddGoods from "./AddGoods";
import UpdateGoods from "./UpdateGoods";
import GoodsPage from "./GoodsPage";
import SearchGoods from "./SearchGoods";
export default {
  computed: {
    ...mapState("commonModule", ["store", "user"])
  },
  methods: {
    ...mapActions("goodsModule", ["show"]),
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
          this.show(this.store._id);
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
          }
        });
      });
    }
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
