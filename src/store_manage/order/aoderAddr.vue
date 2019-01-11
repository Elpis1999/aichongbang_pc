<template>
     <!-- 商品弹出框 -->
   <span>
    <el-dialog title="地址信息" :visible.sync="addrOpen" width="420px" padding-right="40px" :show-close="false" >
           
                <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div class="text item">
                    {{"地址："+addrText}}
                </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="btn">确 定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
export default {
props:["addrClose","addrText","addrOpen"],
methods:{
  btn(){
    this.addrClose()
  }
}
}
</script>

<style>

</style>
