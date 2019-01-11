<template>
 <el-container>
   <el-header>
 <el-button type="success" class="addbutton"  @click="dialogVisible = true">增加</el-button>
         <el-button type="primary" icon="el-icon-edit" @click="examineBtn" >审批</el-button>

   </el-header>


<el-dialog title="用户审核" :visible.sync="examineTableVisible">
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
    <el-table-column property="userPhone" label="用户电话" width="150"></el-table-column>
    <el-table-column property="permissions" label="权限"></el-table-column>
    <el-table-column property="name" label="姓名"></el-table-column>
    <el-table-column property="status" label="状态"></el-table-column>
  </el-table>
</el-dialog>



    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose" class="tips">

<p>
  手机号码：<el-input
  placeholder="请输入手机号码"
  v-model="input10" class="inputelement" 
  clearable>
</el-input>
</p>
<p>
   输入密码：<el-input
  placeholder="请输入密码" class="inputelement"
  v-model="input11"
  clearable>
</el-input>
</p>
<p>
  输入姓名：<el-input
  placeholder="请输入用户姓名" class="inputelement"
  v-model="input12"
  clearable>
</el-input>
</p>
<p>
  电子邮箱：<el-input
  placeholder="请输入电子邮箱" class="inputelement"
  v-model="input13"
  clearable>
</el-input>
</p>
<p>
  
<el-select v-model="value" placeholder="请选择管理类型" class="selectelement">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</p>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addBtn" >确 定</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
</el-dialog>




 <el-dialog
  title="提示"
  :visible.sync="dialog2Visible"
  width="30%"
  :before-close="handleClose" class="tips">

<p>
  <el-input
  placeholder="请输入手机号码"
  v-model="input14" 
  clearable>
</el-input>
</p>
<p>
   <el-input
  placeholder="请输入密码"
  v-model="input15"
  clearable>
</el-input>
</p>
<p>
  <el-input
  placeholder="请输入用户姓名"
  v-model="input16"
  clearable>
</el-input>
</p>
<p>
  <el-input
  placeholder="请输入电子邮箱"
  v-model="input17"
  clearable>
</el-input>
</p>
<p>
<el-select v-model="value2" placeholder="请选择管理类型" class="selectelement">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</p>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="updateBtn" >确 定</el-button>
    <el-button @click="dialog2Visible = false">取 消</el-button>
  </span>
</el-dialog>


<el-dialog
  title="确认删除？"
  :visible.sync="dialog3Visible"
  width="30%"
  :before-close="handleClose">
  <span>确定删除此条数据吗？（删除后无法恢复）</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="deleteBtn">确 定</el-button>
    <el-button @click="dialog3Visible = false">取 消</el-button>
  </span>
</el-dialog>

<el-table
   :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())||
      data.permissions.toLowerCase().includes(search.toLowerCase())||
      data.userPhone.toLowerCase().includes(search.toLowerCase())||
      data.email.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column align="right" class="search">
       <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" style="500px"/>
        </template>
        <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
      label="权限"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>权限: {{ scope.row.permissions }}</p>
          <div slot="reference" class="permissions-wrapper">
            <el-tag size="medium">{{ scope.row.permissions }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>


<el-table-column
      label="状态"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>状态: {{ scope.row.status }}</p>
          <div slot="reference" class="status-wrapper">
            <el-tag size="medium">{{ scope.row.status }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

<el-table-column
      label="手机号"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>手机号码: {{ scope.row.userPhone }}</p>
          <div slot="reference" class="userPhone-wrapper">
            <el-tag size="medium">{{ scope.row.userPhone }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

<el-table-column
      label="电子邮箱"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>电子邮箱: {{ scope.row.email }}</p>
          <div slot="reference" class="email-wrapper">
            <el-tag size="medium">{{ scope.row.email }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>


    <el-table-column label="操作">
      
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
        </el-table-column>
    </el-table-column>
    
  </el-table>
  
  
</el-container>

</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      input10: "",
      input11: "",
      input12: "",
      input13: "",
      input14: "",
      input15: "",
      input16: "",
      input17: "",
      id: "",
      deleteId: "",
      options: [
        {
          value: "2",
          label: "门店管理"
        },
        {
          value: "3",
          label: "供货管理"
        }
      ],
      options2: [
        {
          value: "2",
          label: "门店管理"
        },
        {
          value: "3",
          label: "供货管理"
        }
      ],
      index:'',
      value: "",
      value2: "",
      dialogVisible: false,
      dialog2Visible: false,
      dialog3Visible: false,
      examineTableVisible: false,
       form: {
          store_name: '',
          store_bus_number: '',
          store_bus_pic: '',
          store_bus_addr: '',
          longitude: 0,
          latitude:0,
          store_city: '',
          store_person: '',
          store_phone:'',
          store_avatar:"",
          store_charactor:'',
          store_VIPlevel:'',
          store_money:'',
          store_clerk:{},
          store_status:''

        },
        gridData:[],
      tableData: [
        {
          permissions: "112312312111",
          name: "12312312",
          status: "123123",
          userPhone: "123123",
          email: ""
        }
      ]
    };
  },
  created: function() {
    this.show();
  },
  methods: {
     handleDeleterefuse(index, row) {
       
      axios({
        method:"delete",
        url:"/platformUsers/refuse/"+row._id
      }).then((data)=>{
        if(data){
          alert("已拒绝用户的申请")
      this.showExamine()
        }
      })
      
    },
    handleEdit(index, row) {
      this.input14 = row.userPhone;
      this.input15 = row.pwd;
      this.input16 = row.name;
      this.input17 = row.email;
      this.id = row._id;
      this.dialog2Visible = true;
      if(index==0){
        alert("无法编辑管理员账号！")
      this.dialog2Visible = false;
        
      }
    },
    
    handleDelete(index, row) {
      this.dialog3Visible = true;
      this.deleteId = row._id;
      this.index = index
    },
       handleEditpass(index, row) {
      axios({
        method:"post",
        url:"/platformUsers/pass/",
        data:{
          userPhone:row.userPhone,
          pwd:row.pwd,
          permissions:row.permissions,
          name:row.name,
          email:row.email,
          status:"已审核"
        }
      }).then(()=>{
      axios({
        method:"delete",
        url:"/platformUsers/"+row._id
      }).then((data)=>{
        if(data){
      this.showExamine()
        }
      })
      })
      alert("此用户已通过！");
      this.show()
      this.examineTableVisible=false;
     
    },
    showExamine() {
      axios({
        method:"get",
        url:"/platformUsers/platform",
        data:{
          page:1,
          rows:5
        }
      }).then(({data})=>{
        this.gridData=data
      })
    },
    show() {
      axios({
        method: "get",
        url: "/platformUsers"
      }).then(({ data }) => {
        this.tableData = data;
      });
    },
    examineBtn(){
      this.examineTableVisible=true,
this.showExamine()
    },
    addBtn() {
      if (this.value == "") {
        alert("请选择您的管理类型！");
      } else {
        axios({
          method: "post",
          url: "/users",
          data: {
            userPhone: this.input10,
            pwd: this.input11,
            name: this.input12,
            email: this.input13,
            permissions: this.value,
            status: "未审核"
          }
        }).then(data => {
          if (data) {
            alert("添加成功！");
            this.dialogVisible = false;
            this.show();
          } else {
            alert("添加失败");
            this.dialogVisible = false;
            this.show();
          }
        });
      }
    },
    updateBtn() {
      if (this.value2 == "") {
        alert("请选择管理类型！");
      } else {
        axios({
          method: "put",
          url: "/platformUsers/" + this.id,
          data: {
            userPhone: this.input14,
            pwd: this.input15,
            name: this.input16,
            email: this.input17,
            permissions: this.value2,
            status: "unuseable"
          }
        }).then(data => {
          if (data) {
            alert("修改成功");
            this.dialog2Visible = false;
            this.show();
          } else {
            alert("修改失败");
            this.dialog2Visible = false;
            this.show();
          }
        });
      }
    },
    deleteBtn() {
      if(this.index==0){
        alert("管理员账号无法删除！")
      }
      else{
         axios({
        method: "delete",
        url: "/platformUsers/" + this.deleteId
      }).then(data => {
        if (data.data.status) {
          alert("删除成功！");
          this.dialog3Visible = false;
          this.show();
        } else {
          alert("删除失败");
          this.dialog3Visible = false;
          this.show();
        }
      });
      }
     
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.tips {
  text-align: center;
}
.inputelement {
  width: 80%;
}
.selectelement {
  width: 30%;
}
</style>
