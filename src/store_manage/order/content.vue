<template>
     <!-- 商品弹出框 -->
   <span>
    <el-dialog title="商品信息" :visible.sync="open" width="420px" padding-right="40px" :show-close="false" >
                <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div v-for="i in text" :key="i" class="text item">
                    {{'购买商品: ' + i.goodsName }}<br/>
                    {{"价格：" + i.price+"美元"}}
                </div>
                <br/>
                 <div v-for="j in state" :key="j" class="text item">
                    {{'购买服务: ' + j.serveName }}<br/>
                    {{"价格：" + j.price}}
                </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="btn">确 定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
export default {
props:["open","text","state","cloass"],
methods:{
  btn(){
    this.cloass()
  }
}
}
</script>

<style>

</style>
