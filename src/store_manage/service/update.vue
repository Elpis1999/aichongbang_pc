<template>
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
       {{updateContent}}
  
 

      <span slot="footer" class="dialog-footer">
        <el-button @click="updatedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBtns">确 定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import axios from "axios";
export default {
  props:["show","updatedialogVisible","updateContent"],
  data: function() {
    return {
        value8: this.updateContent.sur_price,
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
      console.log("vhjhbvdshkldhb")
    this.content()
  },
  methods: {
    content(){
        
          console.log("121212121",this.updateContent)
      
       
       let str = this.updateContent.sur_date.split("-")
       console.log(str)
        this.selectedOptions3=[this.updateContent.sur_rules,this.updateContent.sur_nam,this.updateContent.sur_nam]
        console.log(this.selectedOptions3)
        // this.selectedOptions3[1]=this.updateContent.sur_name;
        // this.selectedOptions3[2]=this.updateContent.sur_nam;
        this.storeid=this.updateContent._id;
        this.value8 = this.updateContent.sur_price
    },
    addBtns(){
       console.log("121212121",this.updateContent)
    }
  }
};
</script>

<style>
</style>
