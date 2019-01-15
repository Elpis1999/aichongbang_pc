<template>
  <el-dialog title="商品列表" :visible.sync="close" style="width:1800px;">
    <el-table :data="goods">
      <el-table-column property="supp_gd_brand" label="名称"></el-table-column>
      <el-table-column property="supp_gd_type" label="品类"></el-table-column>
      <el-table-column property="supp_gd_install" label="包装规格"></el-table-column>
      <el-table-column property="supp_gd_factor" label="生产日期"></el-table-column>
      <el-table-column property="supp_gd_keepquality" label="保质期"></el-table-column>
      <el-table-column label="选择数量">
        <template slot-scope="scope">
          <el-input-number
            size="mini"
            style="width:100px;"
            v-model="num[scope.$index]"
            :min="0"
            :max="100"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="click(scope.$index,scope.row)">确定</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev,pager,next"
      :total="total"
      :page-size="5"
      @current-change="change"
    ></el-pagination>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState, mapActions } = createNamespacedHelpers(
  "suppilerModule"
);
const commonModule = createNamespacedHelpers("commonModule");
const mapStateCommon = commonModule.mapState;
const goodsModule = createNamespacedHelpers("goodsModule");
const mapStateGoods = goodsModule.mapState;
export default {
  data() {
    return {
      num: []
    };
  },
  computed: {
    ...mapState(["dialogTableVisible", "goods", "supId", "goodsPagination"]),
    ...mapStateCommon(["store"]),
    close: {
      get() {
        return this.dialogTableVisible;
      },
      set() {
        this.setDialogTableVisible(false);
      }
    },
    total() {
      if (this.goodsPagination.rows.length === 0) {
        return 0;
      } else {
        return this.goodsPagination.total;
      }
    }
  },
  methods: {
    ...mapMutations(["setDialogTableVisible", "setGoodsPage"]),
    ...mapActions(["stockPurchase"]),
    ...mapStateGoods(["show"]),
    change(value) {
      this.setGoodsPage(value);
      this.stockPurchase();
    },
    click(index, row) {
      let date = new Date().toLocaleDateString();
      let newDate = date.split("/");
      date = newDate[0] + "-" + newDate[1] + "-" + newDate[2];
      let obj = row;
      obj.getnumber = this.num[index];
      obj.time = date;
      obj.getprice = obj.supp_gd_price;
      delete obj.supp_gd_price;
      obj.storeId = this.store._id;
      obj.supId = obj.suppiler._id;
      delete obj._id;
      delete obj.suppiler;
      axios({
        method: "post",
        url: "/goods",
        data: obj
      }).then(() => {
        this.setDialogTableVisible(false);
      });
    }
  },
  watch: {
    goods: function(newQuestion, oldQuestion) {
      console.log("goods",newQuestion);
      for (let i = 0; i < newQuestion.length; i++) {
        this.num.push(0);
      }
    }
  }
};
</script>

<style>
</style>
