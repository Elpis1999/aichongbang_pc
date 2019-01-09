<template>
  <el-table :data="supgoods" stripe style="width: 100%">
    <el-table-column prop="supp_gd_name.supp_gd_brand" label="商品品牌" width="100"></el-table-column>
    <el-table-column prop="supp_gd_name.supp_gd_title" label="推广标题" width="140"></el-table-column>
    <el-table-column prop="supp_gd_type" label="货品品类" width="90"></el-table-column>
    <el-table-column prop="supp_gd_made.supp_gd_material" label="材质" width="90"></el-table-column>
    <el-table-column prop="supp_gd_made.made" label="制作方法" width="90"></el-table-column>
    <el-table-column prop="supp_gd_appl" label="适用规格" width="90"></el-table-column>
    <el-table-column prop="supp_gd_exc" label="专属规格" width="90"></el-table-column>
    <el-table-column prop="supp_gd_install" label="包装规格" width="80"></el-table-column>
    <el-table-column prop="supp_gd_taste" label="口味" width="80"></el-table-column>
    <el-table-column prop="supp_gd_special" label="特殊功用" width="80"></el-table-column>
    <el-table-column prop="supp_gd_from" label="产地" width="80"></el-table-column>
    <el-table-column prop="supp_gd_factor" label="出厂日期" width="80"></el-table-column>
    <el-table-column prop="supp_gd_keepquality" label="保质期" width="80"></el-table-column>
    <el-table-column prop="supp_gd_specialinfo" label="特色说明" width="140"></el-table-column>
    <el-table-column prop="supp_gd_price" label="批发价格" width="80"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="showById(scope.row._id)">修改</el-button>
        <el-button size="mini" type="danger" @click="Delete( scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
import axios from "axios";
export default {
  props: ["supgoods", "show"],
  methods: {
    Delete(id) {
      axios({
        method: "delete",
        url: "/supGods/" + id
      }).then(() => {
        this.show();
      });
    }
  },

  components: {}
};
</script>

<style>
</style>
