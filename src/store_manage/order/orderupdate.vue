<template>
    <span>
    <el-dialog title="修改信息" :visible.sync="updateOpen" width="420px" padding-right="40px" :show-close="false">
      <el-form status-icon ref="regFrom" label-width="100px" v-model="updateText">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="updateText.user"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input type="text" v-model="updateText.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="addr">
          <el-input type="text" v-model="updateText.addr" autocomplete="off"></el-input>
        </el-form-item>
      
        <el-form-item label="支付状态" prop="sur_date">
        <el-radio v-model="updateText.state" label="已完成" >已完成</el-radio>
        <el-radio v-model="updateText.state" label="未完成">未完成</el-radio>
        </el-form-item>
        
    
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updatekl">取 消</el-button>
        <el-button type="primary" @click="updateBtns">确 定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import axios from "axios";
export default {
    props:["show","updateText","updateOpen","close"],
    data(){
        return{
            
        }
    },
    methods:{
        updateBtns(){
        axios({
            method:"put",
            url:`/order/${this.updateText._id}`,
            data:{...this.updateText}
        }).then(()=>{
            this.close()
            this.show()
        })
        },
        updatekl(){
             this.close()
        }
    }

}
</script>

<style>

</style>
