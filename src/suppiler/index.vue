<template>
    <div>
<UpdateSuppiler :show="show" :suppiler="suppiler"></UpdateSuppiler>
    <el-table
      :data="suppiler"
      style="width: 100%">
      <el-table-column
        prop="supp_name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="supp_add"
        label="地址"
        width="180">
      </el-table-column>
   <el-table-column
        prop="supp_phone"
        label="手机号"
        width="180">
      </el-table-column>
          <el-table-column
        prop="supp_web"
        label="网站"
        width="180">
      </el-table-column>
      
                <el-table-column
        prop="supp_note"
        label="备注"
        width="180">
      </el-table-column>
    </el-table>
  
    </div>
</template>
<script >
import axios from "axios";
import UpdateSuppiler from "./UpdateSuppiler.vue"; 
export default {
data(){
    return{
        suppiler:[],
    };
},
  methods: {  
    show() {
      axios({
        method: "get",
        url: "/suppiler",
      }).then(({ data }) => {
        console.log(data,'wwwwq')
        this.suppiler = data;
        
      });
    },
  },
  created() {
    this.show();
  },
components: {
    UpdateSuppiler
  }
};
  
</script>

<style>
</style>
