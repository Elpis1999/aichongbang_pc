<template>
  <div class="num">
    <el-pagination background
      layout="prev, pager, next"
      :total="pages.total"
      class="yema"
      :page-size="pages.eachpage"
      @current-change="change"
    ></el-pagination>
  </div>
  
</template>

<script>
// import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props:["pages","show"],
  methods:{
    change(value){
      console.log(value)
      this.show(value)
    }
  }

};
</script>

<style scoped>
.yema {
  float: left;
}
.num {
  margin-top: 20px;
}
</style>