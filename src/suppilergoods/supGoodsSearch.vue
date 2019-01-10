<template>
  <div>
    <el-input
      placeholder="请输入查询条件"
      v-model="inputValue"
      style="width:500px"
      class="input-with-select"
    >
      <el-select
        v-model="type"
        @change="selectValue"
        class="sel"
        slot="prepend"
        :placeholder="type?type:'请选择'"
      >
        <el-option label="商品品牌名" value="supp_gd_brand"></el-option>
        <el-option label="货品品类" value="supp_gd_type"></el-option>
        <el-option label="口味" value="supp_gd_taste"></el-option>
        <el-option label="包装规格" value="supp_gd_install"></el-option>
        <el-option label="专属规格" value="supp_gd_exc"></el-option>
        <el-option label="适用规格" value="supp_gd_appl"></el-option>
        <el-option label="产地" value="supp_gd_from"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "supgoodsModule"
);
export default {
  computed: {
    ...mapState(["type", "value"]),
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.setValue(value);
      }
    }
  },
  methods: {
    ...mapMutations(["setType", "setValue"]),
    ...mapActions(["setSupGoods"]),
    search() {
      this.setSupGoods();
      // console.log(type,value)
    },
    selectValue(value) {
      this.setType(value);
    }
  }
};
</script>

<style>
.sel {
  width: 100px;
}
</style>
