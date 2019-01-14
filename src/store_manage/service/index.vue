<template>
  <div>
    <add :show="show"></add>
    <!-- <update :updatedialogVisible="updatedialogVisible" :show="show" :updateContent="updateContent"></update> -->
    <el-table :data="service" style="width: 100%">
      <el-table-column prop="store.store_name" label="商店名" width="100"></el-table-column>
      <el-table-column prop="sur_name" label="服务项目" width="140"></el-table-column>
      <el-table-column prop="sur_date" label="时间" width="140"></el-table-column>
      <el-table-column prop="sur_rules" label="服务对象" width="140"></el-table-column>
      <el-table-column prop="sur_time" label="所需时间" width="140"></el-table-column>
      <el-table-column prop="sur_price" label="价格" width="140"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="updateBtn(scope.row._id)">修改</el-button>
          <el-button size="mini" type="danger" @click="btnRemove(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <span>
    <el-dialog title="修改服务" :visible.sync="updatedialogVisible" width="420px" padding-right="40px">
      <el-form status-icon ref="regFrom" label-width="100px">

        
        <el-form-item label="服务项目" prop="sur_name">
          <el-cascader :options="options" v-model="selectedOptions3"></el-cascader>
        </el-form-item>

        <el-form-item label="服务时间" prop="sur_time">
          <el-time-select placeholder="起始"  v-model="startTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"  style="width:100px"></el-time-select> --
          <el-time-select placeholder="结束" v-model="endTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30',minTime: startTime}" style="width:100px"></el-time-select>
        </el-form-item>


        <el-form-item label="服务耗时" prop="sur_date">
          <el-switch v-model="value3" active-text="2小时" inactive-text="1小时"></el-switch>
        </el-form-item>

         <el-form-item label="服务价格" prop="sur_date">
          <el-slider v-model="value8" show-input></el-slider>
        </el-form-item>
      </el-form>
  
 

      <span slot="footer" class="dialog-footer">
        <el-button @click="updatedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBtnss">确 定</el-button>
      </span>
    </el-dialog>
  </span>
   <page :pages="pages" :show="show"></page>
  </div>

  
</template>

<script>
import axios from "axios";
import add from "./add.vue";
import page from './page.vue'
// import update from './update.vue'
// import { createNamespacedHelpers } from "vuex";
// const { mapMutations, mapState } = createNamespacedHelpers("commonModule");
export default {
  //   computed: {
  //   ...mapState(["user", "store"])
  // },
  data() {
    return {
      pages:[],
      service: [],
      updatedialogVisible:false,
      updateContent:[],


         value8: 0,
         value3: true,
         value4: true,

        startTime: '',//开始时间
        endTime: '',//结束时间

        // updatedialogVisibles: this.updatedialogVisible,
        storeid: "" ,//门店id

      options: [
        {
          value: "大型犬",
          label: "大型犬",
          children: [
            {
              value: "剪毛",
              label: "剪毛",
              children: [
                {
                  value: "25公斤以上35公斤以下",
                  label: "15公斤以上25公斤以下"
                }
              ]
            },
            {
              value: "洗澡",
              label: "洗澡",
              children: [
                {
                  value: "25公斤以上35公斤以下",
                  label: "25公斤以上35公斤以下"
                }
              ]
            }
          ]
        },
        {
          value: "中型犬",
          label: "中型犬",
          children: [
            {
              value: "剪毛",
              label: "剪毛",
              children: [
                {
                  value: "15公斤以上25公斤以下",
                  label: "15公斤以上25公斤以下"
                }
              ]
            },
            {
              value: "洗澡",
              label: "洗澡",
              children: [
                {
                  value: "15公斤以上25公斤以下",
                  label: "15公斤以上25公斤以下"
                }
              ]
            }
          ]
        }
      ],
      selectedOptions3: ["zujian", "data", "tag"]
    };
  },
  mounted() {
     this.show();
     
  },
  methods: {
    //列表
    show: function(page=1) {
      axios({
        method:"get",
        url:'/getSession'
      }).then(({data})=>{
        let id = data._id;
          axios({
            method:"get",
            url:'/store',
            params:{
              userId:id
            }
          }).then(({data})=>{
            this.storeid = data[0]._id
             axios({
              method: "get",
              url: "/service",
              params: {
                page: page,
                rows: 3,
                sID: data[0]._id
              }
            }).then((res) => {
              this.service = res.data.rows;
              this.pages = res.data
            });
          })
      })
     
    },
    btnRemove(id) {//删除
      let rem = confirm("确认删除？");
      if (rem) {
        axios({
          method: "delete",
          url: `/service/${id}`
        }).then(() => {
          this.show();
        });
      }
    },
    // 修改
    updateBtn(id){
        axios({
            method:"get",
            url:`/service/${id}`
        }).then(({data})=>{
            console.log(data)
            this.updateContent=data     
            this.updatedialogVisible = true
            // 修改的数据
            this.storeid=this.updateContent._id;
            this.value8 = this.updateContent.sur_price
            this.selectedOptions3=[this.updateContent.sur_rules,this.updateContent.sur_name,this.updateContent.sur_weight]
            // 时间
            if(this.updateContent.sur_time=="1小时"){
               this.value3=false 
               this.value4==true
            }else if(this.updateContent.sur_time=="2小时"){
               this.value3=true 
               this.value4==true
            }
            let str = this.updateContent.sur_date.split("-")
            this.startTime = str[0],
            this.endTime = str[1]  
        })
    },
  addBtnss(){
     let datas = `${this.startTime+"-"+this.endTime}`
        let time;
        if(this.value3==false && this.value4==true){
            time = "1小时"
        }
        if(this.value3==true && this.value4==true){
            time = "2小时"
        }
     axios({
       method:"put",
       url:`/service/${this.storeid}`,
       data:{
            sur_name:this.selectedOptions3[1],
            sur_rules:this.selectedOptions3[0],
            sur_weight:this.selectedOptions3[2],
            sur_time:time,
            sur_price:this.value8,
            sur_date:datas,
            sur_level:"1"
       }
     }).then(()=>{
       this.updatedialogVisible=false
       this.show()
     })
  }
  },
  components: {
    add,
    page
  }
};
</script>

<style>
</style>
