<template>
     <div>
        <OrderSearch :show="show"></OrderSearch>
        <el-table :data="orderContent" style="width: 100%">
        <el-table-column prop="store.store_name" label="商店名" width="100"></el-table-column>
        <el-table-column prop="_id" label="订单号" width="210"></el-table-column>
        <el-table-column prop="user" label="购买者" width="70"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120"></el-table-column>

         <el-table-column label="商品"  width="70">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
        </el-table-column>

        <el-table-column label="地址"  width="70">
            <template slot-scope="scope">
              <el-button @click="addrcont(scope.row)" type="text" size="small">查看</el-button>
            </template>
        </el-table-column>

        <el-table-column prop="time" label="购买日期" width="100"></el-table-column>
        <el-table-column prop="state" label="支付状态" width="120"></el-table-column>
      

        <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="updaeinfo(scope.row._id)">修改</el-button>
            </template>
        </el-table-column>
        </el-table>

   <!-- 商品信息 -->
   <Content :open="open" :text="text" :state="state" :cloass="cloass"></Content>
   
   <!-- 地址信息 -->
   <OrderAddr :addrClose="addrClose" :addrText="addrText" :addrOpen="addrOpen"></OrderAddr>

   <Orderupdate :updateText="updateText" :show="show" :updateOpen="updateOpen" :close="close"></Orderupdate>
   <Pages :show="show" :pagenation="pagenation"></Pages>
  </div>
</template>

<script>
import axios from "axios";
import Content from './content.vue'
import Orderupdate from './orderupdate.vue'
import OrderSearch from './orderSearch.vue'
import OrderAddr from './aoderAddr.vue'
import Pages from './pages.vue'
export default {
  data(){
      return{
          orderContent:[],
          pagenation:[],
          open:false,
          addrOpen:false,
          addrText:"",
          text:[],
          state:[],
          updateText:[],
          updateOpen:false
      }
  },
  mounted(){
      this.show()
  },
  methods:{
      show:function(page=1,typetext="",value=""){
          axios({
                method:"get",
                url:'/getSession'
            }).then(({data})=>{
                console.log("7897788",data)
                let id = data._id;
                axios({
                    method:"get",
                    url:'/store',
                    params:{
                    userId:id
                    }
                }).then(({data})=>{
                    console.log(data)
                    console.log("qwqwqwqwqw",data[0]._id)
                    this.storeid = data[0]._id
                            axios({
                        method: "get",
                        url: "/order",
                        params: {
                        page: page,
                        rows: 3,
                        sID:data[0]._id,
                        type:typetext,
                        value:value
                        }
                    }).then((res) => {
                        console.log(res)
                        this.orderContent = res.data.rows;
                        // console.log(res.data);
                        this.pagenation = res.data
                        // console.log(this.pagenation)
                    });
                        })
            })
       
      },
      handleClick(value){
          let arr = []
          let arrs = []
          for(let i = 0;i< value.order_goods.length;i++){
              arr.push(value.order_goods[i])
          }
          this.text =arr

          for(let j = 0;j<value.order_serve.length;j++){
             arrs.push(value.order_serve[j])
          }
          this.state = arrs
          this.open = true
      },
      addrcont(value){
        //   console.log(value)
          this.addrText=value.addr
          this.addrOpen = true
      },
      updaeinfo(id){
          axios({
              method:"get",
              url:`/order/${id}`
          }).then(({data})=>{
                console.log(data)
                this.updateText = data
                this.updateOpen = true
          })
      },
      close(){
          this.updateOpen = false
      },
      cloass(){
          this.open=false
      },
      addrClose(){
          this.addrOpen = false
      }
  },
  components: {
    Content,
    Orderupdate,
    Pages,
    OrderSearch,
    OrderAddr
  }
}
</script>

<style>

</style>
