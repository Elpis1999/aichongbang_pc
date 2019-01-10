<template>
  <div class="block">
    <table>
      <tr>
        <td>{{data.pm_phone}}</td>
        <td>{{data.pm_phone}}</td>
        <td>{{data.pm_phone}}</td>
      </tr>
    </table>
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data:[],
      page:1,
      rows:3
    };
  },
  created() {
    console.log("1231");
    axios({
      method: "get",
      url: "/petmaster",
      data: {
        page: page,
        rows: rows
      }
    }).then(res => {
      console.log(res);
      this.data = res.data[0];
      console.log("this.data:",this.data)
    });
  },
  methods:{
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      check(){
        alert("1111111111111111111")
      }
  },
  watch:{
    
  }
};
</script>
<style>
</style>

