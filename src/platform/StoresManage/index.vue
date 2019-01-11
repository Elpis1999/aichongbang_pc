<template>
   <el-container>
       <el-header>
            <el-button type="success" class="addbutton"  @click="dialogVisible = true">增加</el-button>

        <el-button type="primary" icon="el-icon-edit" @click="examineBtn" >审批</el-button>
        </el-header>
<el-dialog title="门店审核" :visible.sync="examineTableVisible">
 <el-table :data="gridData">
    <el-table-column label="操作" width="200">
      
      <template slot-scope="scope">
        <el-button
          size="mini" type="success"
          @click="handleEditpass(scope.$index, scope.row)">通过</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDeleterefuse(scope.$index, scope.row)">拒绝</el-button>
      </template>
      
    </el-table-column>
    <el-table-column property="store_name" label="申请账号" width="150"></el-table-column>
    <el-table-column property="store_bus_number" label="执照号码"></el-table-column>
    <el-table-column property="store_bus_pic" label="执照图片"></el-table-column>
    <el-table-column property="store_bus_addr" label="地址"></el-table-column>
    <el-table-column property="longitude" label="经度"></el-table-column>
    <el-table-column property="latitude" label="纬度"></el-table-column>
    <el-table-column property="store_city" label="城市"></el-table-column>
    <el-table-column property="store_person" label="法人"></el-table-column>
    <el-table-column property="store_phone" label="电话"></el-table-column>
    <el-table-column property="store_avatar" label="头像"></el-table-column>
    <el-table-column property="store_charactor" label="详情"></el-table-column>
    <el-table-column property="store_VIPlevel" label="等级"></el-table-column>
    <el-table-column property="store_money" label="佣金比例"></el-table-column>
    <el-table-column property="store_clerk" label="点击查看服务员"></el-table-column>
    <el-table-column property="store_status" label="状态"></el-table-column>
  </el-table>

</el-dialog>

<el-table :data="gridData2">
   
    <el-table-column property="store_name" label="申请账号" width="150"></el-table-column>
    <el-table-column property="store_bus_number" label="执照号码"></el-table-column>
    <el-table-column property="store_bus_pic" label="执照图片"></el-table-column>
    <el-table-column property="store_bus_addr" label="地址"></el-table-column>
    <el-table-column property="longitude" label="经度"></el-table-column>
    <el-table-column property="latitude" label="纬度"></el-table-column>
    <el-table-column property="store_city" label="城市"></el-table-column>
    <el-table-column property="store_person" label="法人"></el-table-column>
    <el-table-column property="store_phone" label="电话"></el-table-column>
    <el-table-column property="store_avatar" label="头像"></el-table-column>
    <el-table-column property="store_charactor" label="详情"></el-table-column>
    <el-table-column property="store_VIPlevel" label="等级"></el-table-column>
    <el-table-column property="store_money" label="佣金比例"></el-table-column>
    <el-table-column property="store_clerk" label="点击查看服务员"></el-table-column>
    <el-table-column property="store_status" label="状态"></el-table-column>
  </el-table>






<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose" class="tips">

<p>
  商店名字：<el-input
  placeholder="请输入商店名"
  v-model="input10" class="inputelement" 
  clearable>
</el-input>
</p>
<p>
   执照号码：<el-input
  placeholder="请输入营业执照号码" class="inputelement"
  v-model="input11"
  clearable>
</el-input>
</p>
<p>
  营业地址：<el-input
  placeholder="请输入营业地址" class="inputelement"
  v-model="input12"
  clearable>
</el-input>
</p>
<p>
  输入经度：<el-input
  placeholder="请输入经度" class="inputelement"
  v-model="input13"
  clearable>
</el-input>
</p>

<p>
  输入纬度：<el-input
  placeholder="请输入纬度" class="inputelement"
  v-model="input14"
  clearable>
</el-input>
</p>

<p>
  所在城市：<el-input
  placeholder="请输入城市" class="inputelement"
  v-model="input15"
  clearable>
</el-input>
</p>
<p>
  门店法人：<el-input
  placeholder="请输入法人姓名" class="inputelement"
  v-model="input16"
  clearable>
</el-input>
</p>
<p>
 手机号码：<el-input
  placeholder="请输入号码" class="inputelement"
  v-model="input17"
  clearable>
</el-input>
</p>
<p>
  详情描述：<el-input
  placeholder="请输入详情描述" class="inputelement"
  v-model="input18"
  clearable>
</el-input>
</p>
<p>
  佣金比例：<el-input
  placeholder="请输入佣金比例" class="inputelement"
  v-model="input19"
  clearable>
</el-input>
</p>




  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addBtn" >确 定</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
</el-dialog>










        






   </el-container>
</template>

<script>
import axios from "axios";
export default {
    created(){
     this.showExamine2()
    },
data(){
    return{
              examineTableVisible: false,
              gridData:[],
              gridData2:[],
              dialogVisible : false

    }
},
methods:{
     handleDeleterefuse(index, row) {
       
      axios({
        method:"delete",
        url:"/platformUsers/"+row._id
      }).then((data)=>{
        if(data){
          alert("已拒绝用户的申请")
      this.showExamine()
        }
      })
      
    },
    handleEditpass(index, row) {
     
      axios({
        method:"put",
        url:"/platformUsers/status/"+ row._id,
        data:{
          store_status:"已审核"
        }
      }).then(({data})=>{
      this.showExamine()
        
      })
      alert("此用户已通过！")
     
    },
     examineBtn(){
      this.examineTableVisible=true,
this.showExamine()
    },
    showExamine() {
      axios({
        method:"get",
        url:"/platformStores",
        data:{
          page:1,
          rows:5
        }
      }).then(({data})=>{
        this.gridData=data
      })
    },
     showExamine2() {
      axios({
        method:"get",
        url:"/platformStores/pass",
        data:{
          page:1,
          rows:5
        }
      }).then(({data})=>{
        this.gridData2=data
      })
    }
}
}
</script>

<style>

</style>
