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


































<el-table
   :data="gridData2.filter(data => !search || data.store_name.toLowerCase().includes(search.toLowerCase())||
      data.store_bus_number.toLowerCase().includes(search.toLowerCase())||
      data.store_bus_addr.toLowerCase().includes(search.toLowerCase())||
      data.store_person.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column align="right" class="search">
       <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" style="500px"/>
        </template>
        <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column
      label="申请账号"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.store_name }}</p>
          <div slot="reference" class="store_name-wrapper">
            <el-tag size="medium">{{ scope.row.store_name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
      label="权限"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>执照号码: {{ scope.row.store_bus_number }}</p>
          <div slot="reference" class="store_bus_number-wrapper">
            <el-tag size="medium">{{ scope.row.store_bus_number }}</el-tag>
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
<img :src="'http://localhost:3000/upload/'+scope.row.store_bus_pic" class="showpic"><img>
          </p>
          <div slot="reference" class="status-wrapper">
<img :src="'http://localhost:3000/upload/'+scope.row.store_bus_pic" class="showpic"><img>
            
          </div>
        </el-popover>
      </template>
    </el-table-column>

<el-table-column
      label="营业地址"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>营业号码: {{ scope.row.store_bus_addr }}</p>
          <div slot="reference" class="store_bus_addr-wrapper">
            <el-tag size="medium">{{ scope.row.store_bus_addr }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

<el-table-column
      label="所在城市"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>电子邮箱: {{ scope.row.store_city }}</p>
          <div slot="reference" class="store_city-wrapper">
            <el-tag size="medium">{{ scope.row.store_city }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

 <el-table-column
      label="法人姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.store_person }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.store_person }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      label="联系电话"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.store_phone }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.store_phone }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      label="法人头像"
      width="180">
      <template slot-scope="scope">
       <el-popover trigger="hover" placement="top">
          <p>法人头像: 
<img :src="'http://localhost:3000/upload/'+scope.row.store_avatar" class="showpic"><img>
          </p>
          <div slot="reference" class="status-wrapper">
<img :src="'http://localhost:3000/upload/'+scope.row.store_avatar" class="showpic"><img>
            
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      label="详细介绍"
      width="300">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>详细介绍: {{ scope.row.store_charactor }}</p>
          <div slot="reference" class="store_charactor-wrapper">
            <el-tag size="medium">{{ scope.row.store_charactor }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      label="VIP等级"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>VIP等级: {{ scope.row.store_VIPlevel }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.store_VIPlevel }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      label="佣金比例"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>比例: {{ scope.row.store_money }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.store_money }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      label="门店状态"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>状态: {{ scope.row.store_status }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.store_status }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      label="服务员"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p v-for="(item, index) in scope.row.store_clerk" :key="index">姓名: {{ scope.row.store_clerk[index].clerkname }}</p>
          <div slot="reference" class="name-wrapper">
          <p v-for="(item, index) in scope.row.store_clerk" :key="index">姓名: {{ scope.row.store_clerk[index].clerkname }}</p>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">关闭</el-button>
      </template>
        </el-table-column>
    </el-table-column>
    
  </el-table>
















<!-- <el-table :data="gridData2">
   <template slot-scope="scope">
    <el-table-column property="store_name" label="申请账号" width="150"></el-table-column>
   </template>
   <template slot-scope="scope">
    <el-table-column property="store_bus_number" label="执照号码"></el-table-column>
     
   </template>
   <template slot-scope="scope">
    <el-table-column property="store_bus_pic" label="执照图片"></el-table-column>
     
   </template>
   <template slot-scope="scope">
    <el-table-column property="store_bus_addr" label="地址"></el-table-column>
     
   </template>
   <template slot-scope="scope">
    <el-table-column property="longitude" label="经度"></el-table-column>
     
   </template>
   <template slot-scope="scope">
    <el-table-column property="latitude" label="纬度"></el-table-column>
     
   </template>
   <template slot-scope="scope">
    <el-table-column property="store_city" label="城市"></el-table-column>
     
   </template>
   <template slot-scope="scope">
    <el-table-column property="store_person" label="法人"></el-table-column>
     
   </template>
   <template slot-scope="scope">
    <el-table-column property="store_phone" label="电话"></el-table-column>
     
   </template>
   <template slot-scope="scope">
    <el-table-column property="store_avatar" label="头像"></el-table-column>
     
   </template>
   <template slot-scope="scope">
    <el-table-column property="store_charactor" label="详情"></el-table-column>
     
   </template>
   <template slot-scope="scope">
    <el-table-column property="store_VIPlevel" label="等级"></el-table-column>
     
   </template> <template slot-scope="scope">
    <p>佣金比例</p>
     
   </template> <template slot-scope="scope">
    <el-table-column property="store_status" label="状态"></el-table-column>
     
   </template>
  
  </el-table> -->






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
  
  <div class="block">
    <span class="demonstration">选择VIP等级：</span>
    <el-slider
      v-model="value7"
      :step="1" :max="5"
      show-stops>
    </el-slider>
  </div>
上传营业执照图片：
<el-upload
  action="/upload"
  list-type="picture-card"
  :on-success="sendpic"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove" title="上传营业执照图片">
  <i class="el-icon-plus"></i>
</el-upload>
上传头像：
<el-upload
  action="/upload"
  list-type="picture-card"
  :on-success="sendavatar" title="上传法人头像">
  <i class="el-icon-plus"></i>
</el-upload>
<p>
<el-button type="primary" icon="el-icon-edit"  @click="addW">增加服务员信息</el-button>
</p>

<!-- 循环div -->
<div  class="clerk">
  <div v-for="(item, index) in clerk" :key="index">
    当前服务员编号：{{index+1}}
<p>
  服务员姓名：<el-input
  placeholder="请输入服务员名"
  v-model="clerk[index].clerkname" class="inputelement" 
  clearable>
</el-input>
</p>
 <p>
  服务员等级：<el-input
  placeholder="请输入服务员等级"
  v-model="clerk[index].clerkgrade" class="inputelement" 
  clearable>
</el-input>
</p>
 <p>
  服务员手机号：<el-input
  placeholder="请输入服务员手机号"
  v-model="clerk[index].clerkphone" class="inputelement" 
  clearable>
</el-input>
</p>
  </div>
</div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addBtn" >确 定</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
</el-dialog>
<el-dialog :visible.sync="uploadpic">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<el-dialog :visible.sync="uploadavatar">
  <img width="100%" :src="dialogavatarUrl" alt="">
</el-dialog>
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
      dialogImageUrl: "",
      dialogavatarUrl: "",
      uploadpic: false,
      uploadavatar: false,
      examineTableVisible: false,
      gridData: [],
      gridData2: [],
      dialogVisible: false,
      innerVisible: false,
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
      value7: 0,
      Mname: "",
      Mphone: "",
      Mlevel: "",
      search:"",
      // 初始化服务员信息
      clerk: []
    };
  },
  methods: {
    showclerk(row){
      console.log(row)
    },
    // 点击事件
    addW() {
      this.clerk.push({
        clerkname: "",
        clerkgrade: "",
        clerkphone: ""
      });
      console.log(this.clerk)
    },
    sendpic(file, fileList) {
      this.dialogImageUrl = file;
      console.log(this.dialogImageUrl);
    },
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
          alert("已拒绝用户的申请");
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
          alert("添加成功！");
          this.dialogVisible = false;
           this.showExamine();
          this.showExamine2();
        } else {
          alert("添加失败");
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
          alert("此用户已通过！");
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
        url: "/platformStores/pass",
        data: {
          page: 1,
          rows: 5
        }
      }).then(({ data }) => {
        this.gridData2 = data;
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
