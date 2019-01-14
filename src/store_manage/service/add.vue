<template>
  <span>
    <el-button type="primary" class="add" @click="addBtn">增加服务</el-button>
    <el-dialog title="增加服务" :visible.sync="dialogVisible" width="420px" padding-right="40px">
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
          <el-slider v-model="value8" show-input :max="600"></el-slider>
        </el-form-item>
      </el-form>

  
 

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBtns">确 定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import axios from "axios";
export default {
  props:["show"],
 
  data: function() {
    return {
        value8: 0,
         value3: true,
         value4: true,

        startTime: '',//开始时间
        endTime: '',//结束时间

        dialogVisible: false,
        storeid: "" ,//门店id

        addFrom: {
        sur_name: "", //服务类型
        sur_date: "", //时间段
        sur_rules: "", //犬大小
        sur_time: "", //服务时间
        sur_level: "", //服务等级
        sur_price: "", //价格
        sur_weigh: "", //犬的重量
      },
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
  methods: {
    addBtn() {
      this.dialogVisible = true;
    },
    addBtns() {
        let datas = `${this.startTime+"-"+this.endTime}`
        // console.log(datas)
        let time;
        if(this.value3==false && this.value4==true){
            time = "1小时"
        }
        if(this.value3==true && this.value4==true){
            time = "2小时"
        }
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
                method:"post",
                url:"/service",
                data:{
                    storeid:data[0]._id,
                    sur_name:this.selectedOptions3[1],
                    sur_rules:this.selectedOptions3[0],
                    sur_weight:this.selectedOptions3[2],
                    sur_time:time,
                    sur_price:this.value8,
                    sur_date:datas,
                    sur_level:"1"
                }
              }).then(()=>{
                  this.show()
                  this.dialogVisible=false
              })
          })
      })
     
    }
  }
};
</script>

<style>
</style>
