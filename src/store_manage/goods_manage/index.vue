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
        this.setStore(data[0]);
        this.show(this.store._id);
      });
    }
  },
  created() {
    if (this.store._id) {
      this.show(this.store._id);
    } else {
      console.log(123);
      this.$nextTick(function() {
        axios({
          method: "get",
          url: "/getSession"
        }).then(({ data }) => {
          console.log(data);
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
