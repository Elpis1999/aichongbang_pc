<template>
  <span class="search">
    <el-input placeholder="请输入内容" v-model="inputValue" class="input-with-select">
      <el-select @change="selectType" slot="prepend" placeholder="请选择" style="width:120px">
        <el-option label="全部" value=""></el-option>
        <el-option label="订单号" value="_id"></el-option>
        <el-option label="姓名" value="user"></el-option>
        <el-option label="电话" value="phone"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="btn"></el-button>
    </el-input>
  </span>
</template>

<script>
import axios from 'axios'
export default {
    props:["show"],
  data:function(){
      return {
        inputValue:"",
        type:""
      }
  },
  methods: {
  // 点击搜索
    btn() {
     this.show(1,this.type,this.inputValue)
    },
    selectType(value) {
    this.type=value
    // console.log(value)
    }
  }
};
</script>

<style scoped>
.search{
    display: block;
    width: 400px;
}
</style>
