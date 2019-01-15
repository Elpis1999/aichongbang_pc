<template>
   <el-container>
<el-table
   :data="gridData2.filter(data => !search || data.store_name.toLowerCase().includes(search.toLowerCase())||
      data.store_bus_number.toLowerCase().includes(search.toLowerCase())||
      data.store_bus_addr.toLowerCase().includes(search.toLowerCase())||
      data.store_person.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
     <el-table-column label="操作" width="300">
      <template slot-scope="scope">
        <el-button
          type="success"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">通过审核</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">拒绝通过</el-button>
         
      </template>
        </el-table-column>
    <el-table-column align="right" class="search">
       <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" style="500px"/>
        </template>
        
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.supp_name }}</p>
          <div slot="reference" class="store_name-wrapper">
            <el-tag size="medium">{{ scope.row.supp_name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
      label="地址"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>供货地址: {{ scope.row.supp_add }}</p>
          <div slot="reference" class="store_bus_number-wrapper">
            <el-tag size="medium">{{ scope.row.supp_add }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
<el-table-column
      label="执照图片"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>执照图片: 
<img :src="'http://localhost:3000/upload/'+scope.row.supp_bus_pic" class="showpic"><img>
          </p>
          <div slot="reference" class="status-wrapper">
<img :src="'http://localhost:3000/upload/'+scope.row.supp_bus_pic" class="showpic"><img>
          </div>
        </el-popover>
      </template>
    </el-table-column>

<el-table-column
      label="联系电话"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>联系电话: {{ scope.row.supp_phone }}</p>
          <div slot="reference" class="store_bus_addr-wrapper">
            <el-tag size="medium">{{ scope.row.supp_phone }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

<el-table-column
      label="官方网站"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>官方网站: {{ scope.row.supp_web }}</p>
          <div slot="reference" class="store_city-wrapper">
            <el-tag size="medium">{{ scope.row.supp_web }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

 <el-table-column
      label="信息介绍"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>信息介绍: {{ scope.row.supp_note }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.supp_note }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      label="审核状态"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>审核状态: {{ scope.row.supp_status }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.supp_status }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

   
    </el-table-column>
    
</el-table>

   </el-container>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.showExamine2();
  },
  data() {
    return {
      id:"",
      dialogImageUrl: "",
      dialogavatarUrl: "",
      uploadpic: false,
      uploadavatar: false,
      examineTableVisible: false,
      gridData: [],
      gridData2: [],
      dialogVisible: false,
      innerVisible: false,
      updateDialog:false,
      input10: "",
      input11: "",
      input12: "",
      input13: "",
      input14: "",
      input15: "",
      input16: "",
      input17: "",
      input18: "",
      input19: "",
      input20: "",
      input21: "",
      input22: "",
      input23: "",
      input24: "",
      input25: "",
      input26: "",
      input27: "",
      input28: "",
      input29: "",
      value7: 0,
      value8: 0,
      Mname: "",
      Mphone: "",
      Mlevel: "",
      search:"",
      // 初始化服务员信息
      clerk: [],
      clerk2: [],
      showdata:[]
    };
  },
  methods: {
    back(scope,row){
      let closeId = row._id
      axios({
        method:"put",
        url:"/platformStores/"+closeId,
        data:{
            store_status:"已审核"
        }
      }).then(data=>{
        if(data){
           this.$message({
            type: 'success',
            message: '店铺已恢复'
          });
           this.showExamine();
          this.showExamine2();
        }
      })
    },
    showclerk(row){
      console.log(row)
    },
    updateBtn(){
      console.log(this.input20)
      axios({
        method:"put",
        url:"/platformStores/"+this.id,
        data:{
           store_name: this.input20,
          store_bus_number: this.input21,
          store_bus_addr: this.input22,
          longitude: this.input23,
          latitude: this.input24,
          store_city: this.input25,
          store_person: this.input26,
          store_phone: this.input27,
          store_charactor: this.input28,
          store_money: this.input29,
          store_bus_pic: this.dialogImageUrl,
          store_status: "已审核",
          store_avatar: this.dialogavatarUrl,
          store_VIPlevel: this.value8,
          store_clerk:this.clerk2
        }
      }).then(data=>{
        console.log(data);
         this.$message({
            type: 'success',
            message: '修改成功！'
          });
       
       this.updateDialog=false;
          this.showExamine2();
       
       this.showExamine();
      })
    },
    handleDelete(scope,row){
      let closeId = row._id
      axios({
        method:"delete",
        url:"/suppiler/"+closeId,
       
      }).then(data=>{
        if(data){
           this.$message({
            type: 'warning',
            message: '已拒绝通过'
          });
           this.showExamine();
          this.showExamine2();
           
        }
      })
    },
    // 点击事件
    addW() {
      this.clerk.push({
        clerkname: "",
        clerkgrade: "",
        clerkphone: ""
      });
      // 每点击一次增加服务员都会往clerk里push一个对象，clerk的index就会+1,就会出现一个循环的DIV
      console.log(this.clerk)
    },
    updateW(){
 this.clerk2.push({
        clerkname: "",
        clerkgrade: "",
        clerkphone: ""
      });
    },
    cancleBtn(){
this.updateDialog=false;
  this.input20="",
  this.input21="",
  this.input22="",
  this.input23="",
  this.input24="",
  this.input25="",
  this.input26="",
  this.input27="",
  this.input28="",
  this.input29=""
  this.clerk2=[]
    },
handleEdit(scope,row){
  console.log(row)
  axios({
      method:"put",
      url:"/suppiler/"+row._id,
      data:{
          supp_status:"已审核"
      }
  }).then(data=>{
       this.$message({
            type: 'success',
            message: '审核通过'
          });
             this.showExamine();
          this.showExamine2();
  })
},
    sendpic(file, fileList) {
      this.dialogImageUrl = file;
      console.log(this.dialogImageUrl);
    },
    // 确定图片的函数，传参有一个file，file就是传的图片的url
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.uploadpic = true;
    },
    handleDeleterefuse(index, row) {
      axios({
        method: "delete",
        url: "/platformStores/refuse/" + row._id
      }).then(data => {
        if (data) {
           this.$message({
            type: 'success',
            message: '已拒绝用户的申请'
          });
          this.showExamine();
          this.showExamine2();
        }
      });
    },
    addBtn() {
      console.log(this);
      axios({
        method: "post",
        url: "/platformStores/unpass",
        data: {
          store_name: this.input10,
          store_bus_number: this.input11,
          store_bus_addr: this.input12,
          longitude: this.input13,
          latitude: this.input14,
          store_city: this.input15,
          store_person: this.input16,
          store_phone: this.input17,
          store_charactor: this.input18,
          store_money: this.input19,
          store_bus_pic: this.dialogImageUrl,
          store_status: "未审核",
          store_avatar: this.dialogavatarUrl,
          store_VIPlevel: this.value7,
          store_clerk:this.clerk
        }
      }).then(data => {
        if (data) {
            this.$message({
            type: 'success',
            message: '添加成功！'
          });
          this.dialogVisible = false;
           this.showExamine();
          this.showExamine2();
        } else {
           this.$message({
            type: 'error',
            message: '添加失败'
          });
          this.dialogVisible = false;
           this.showExamine();
          this.showExamine2();
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    sendavatar(file, fileList) {
      this.dialogavatarUrl = file;
      console.log(this.dialogavatarUrl);
    },
    handleEditpass(index, row) {
      axios({
        method: "post",
        url: "/platformStores/pass/",
        data: {
          store_name: row.store_name,
          store_bus_number: row.store_bus_number,
          store_bus_pic: row.store_bus_pic,
          store_bus_addr: row.store_bus_addr,
          longitude: row.longitude,
          latitude: row.latitude,
          store_city: row.store_city,
          store_person: row.store_person,
          store_phone: row.store_phone,
          store_avatar: row.store_avatar,
          store_charactor: row.store_charactor,
          store_VIPlevel: row.store_VIPlevel,
          store_money: row.store_money,
          store_clerk: row.store_clerk,
          store_status: "已审核",
          users: row.users
        }
      }).then(({ data }) => {
        axios({
          method: "delete",
          url: "/platformStores/refuse/" + row._id
        }).then(({ data }) => {
          this.showExamine();
          this.showExamine2();
           this.$message({
            type: 'success',
            message: '此用户已通过！'
          });
        });
      });
    },
    examineBtn() {
      (this.examineTableVisible = true), this.showExamine();
    },
    showExamine() {
      axios({
        method: "get",
        url: "/platformStores",
        data: {
          page: 1,
          rows: 5
        }
      }).then(({ data }) => {
        this.gridData = data;
      });
    },
    showExamine2() {
      axios({
        method: "get",
        url: "/suppiler",
        data: {
          page: 1,
          rows: 5
        }
      }).then(({ data }) => {
          console.log(data.length)
          for(let i = 0; i<data.length;i++){
              if(data[i].supp_status=="未审核"){
                  console.log(i)
                  this.showdata.push(data[i])
                  console.log(this.showdata)
              }
          }
        this.gridData2 = this.showdata;
        this.showdata=[]
      });
    }
  }
};
</script>

<style>
.clerk{
  border: 1px dashed gray;
  border-radius: 10px;
  padding: 5px
}
.showpic{
  width: 50px;
  height: 50px;
}
</style>
