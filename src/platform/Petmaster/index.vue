<template>
  <el-row>
    <el-button type="primary" icon="el-icon-circle-plus" @click="dialogVisible = true">添加</el-button>
    <el-dialog title="修改" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="50px" :model="formLabelAlign1">
        <el-form-item label="电话" prop="pm_phone">
          <el-input v-model="formLabelAlign1.pm_phone"></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="pm_name">
          <el-input v-model="formLabelAlign1.pm_name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="pm_nickname">
          <el-input v-model="formLabelAlign1.pm_nickname"></el-input>
        </el-form-item>
        <el-form-item label="vip卡" prop="pm_vipcard">
          <el-input v-model="formLabelAlign1.pm_vipcard"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="pm_pic">
          <el-input v-model="formLabelAlign1.pm_pic"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="pm_address">
          <el-input v-model="formLabelAlign1.pm_address"></el-input>
        </el-form-item>
        <el-form-item label="区域" prop="pm_area">
          <el-input v-model="formLabelAlign1.pm_area"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="pm_integral">
          <el-input v-model="formLabelAlign1.pm_integral"></el-input>
        </el-form-item>
        <el-form-item label="宠物" prop="pm_ownpet">
          <el-input v-model="formLabelAlign1.pm_ownpet"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false,handleUpdata()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="50px" :model="formLabelAlign">
        <el-form-item label="电话" prop="pm_phone">
          <el-input v-model="formLabelAlign.pm_phone"></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="pm_name">
          <el-input v-model="formLabelAlign.pm_name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="pm_nickname">
          <el-input v-model="formLabelAlign.pm_nickname"></el-input>
        </el-form-item>
        <el-form-item label="vip卡" prop="pm_vipcard">
          <el-input v-model="formLabelAlign.pm_vipcard"></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="pm_address">
          <el-input v-model="formLabelAlign.pm_address"></el-input>
        </el-form-item>
        <el-form-item label="区域" prop="pm_area">
          <el-input v-model="formLabelAlign.pm_area"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="pm_integral">
          <el-input v-model="formLabelAlign.pm_integral"></el-input>
        </el-form-item>
        <el-form-item label="宠物" prop="pm_ownpet">
          <el-input v-model="formLabelAlign.pm_ownpet"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="pm_pic">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible2">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,handleAdd()">确 定</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="tableData.filter(data => !search || data.pm_name.toLowerCase().includes(search.toLowerCase())||
      data.pm_phone.toLowerCase().includes(search.toLowerCase())||
      data.pm_address.toLowerCase().includes(search.toLowerCase())||
      data.pm_nickname.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column align="right" class="search">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" style="500px"/>
        </template>
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column label="电话" width="150">
          <template slot-scope="scope">
            <el-popover placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.pm_phone }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="100">
          <template slot-scope="scope">
            <el-popover placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.pm_name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="昵称" width="100">
          <template slot-scope="scope">
            <el-popover placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.pm_nickname}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="vip卡" width="100">
          <template slot-scope="scope">
            <el-popover placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.pm_vipcard }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="地址" width="150">
          <template slot-scope="scope">
            <el-popover placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.pm_address }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="区域" width="80">
          <template slot-scope="scope">
            <el-popover placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.pm_area }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="积分" width="100">
          <template slot-scope="scope">
            <el-popover placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.pm_integral }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="宠物" width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>品类: {{ scope.row.name }}</p>
              <p>种类: {{ scope.row.address }}</p>
              <p>颜色: {{ scope.row.address }}</p>
              <p>出生日期: {{ scope.row.address }}</p>
              <p>性格: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{scope.row.pm_ownpet}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <!-- <el-table-column label="图片" width="150">
          <template slot-scope="scope">
            <el-popover placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ dialogImageUrl}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column> -->

        <el-form :label-position="labelPosition" label-width="50px" :model="formLabelAlign">
          <el-form-item label="电话" prop="pm_phone">
            <el-input v-model="formLabelAlign.pm_phone"></el-input>
          </el-form-item>
          <el-form-item label="名字" prop="pm_name">
            <el-input v-model="formLabelAlign.pm_name"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="pm_nickname">
            <el-input v-model="formLabelAlign.pm_nickname"></el-input>
          </el-form-item>
          <el-form-item label="vip卡" prop="pm_vipcard">
            <el-input v-model="formLabelAlign.pm_vipcard"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="pm_pic">
            <el-input v-model="formLabelAlign.pm_pic"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="pm_address">
            <el-input v-model="formLabelAlign.pm_address"></el-input>
          </el-form-item>
          <el-form-item label="区域" prop="pm_area">
            <el-input v-model="formLabelAlign.pm_area"></el-input>
          </el-form-item>
          <el-form-item label="积分" prop="pm_integral">
            <el-input v-model="formLabelAlign.pm_integral"></el-input>
          </el-form-item>
          <el-form-item label="宠物" prop="pm_ownpet">
            <el-input v-model="formLabelAlign.pm_ownpet"></el-input>
          </el-form-item>
        </el-form>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row),open2"
            >停用</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialogImageUrl:"",
      dialogVisible2: false,
      search: "",
      restaurants: [],
      state4: "",
      timeout: null,
      deleteId: "",
      dialogVisible: false,
      dialogVisible1: false,
      input: "",
      labelPosition: "left",
      formLabelAlign: {
        pm_phone: "",
        pm_name: "",
        pm_nickname: "",
        pm_vipcard: "",
        pm_pic: "",
        pm_address: "",
        pm_area: "",
        pm_integral: "",
        pm_ownpet: {
          pet_name: "",
          pet_category: "",
          pet_type: "",
          pet_color: "",
          pet_birth: "",
          pet_character: ""
        }
      },
      formLabelAlign1: {
        pm_phone: "",
        pm_name: "",
        pm_nickname: "",
        pm_vipcard: "",
        pm_pic: "",
        pm_address: "",
        pm_area: "",
        pm_integral: "",
        pm_ownpet: [
          {
            pet_name: "",
            pet_category: "",
            pet_type: "",
            pet_color: "",
            pet_birth: "",
            pet_character: ""
          }
        ]
      },
      tableData: [
      ]
    };
  },
  created: function() {
    this.show();
    console.log("开始渲染：");
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(
        "file:",
        file.url,
        "fileList:",
        fileList,
        "失败：",
        this.formLabelAlign
      );
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log("上传成功：", this.dialogImageUrl);
      this.formLabelAlign.pm_pic = this.dialogImageUrl;
      this.dialogVisible = true;
    },
    open2() {
      this.$confirm("此操作将永久删除该宠主, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "delete",
            url: "/petmaster/" + this.deleteId,
            data: {
              id: this.deleteId
            }
          }).then(() => {
            this.show();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    show() {
      axios({
        method: "get",
        url: "/petmaster"
      }).then(res => {
        this.tableData = res.data;
      });
    },
    handleEdit(index, row) {
      this.dialogVisible1 = true;
      console.log("index:", index, "row:", row);
      this.formLabelAlign1 = row;
    },
    handleDelete(index, row) {
      this.deleteId = row._id;
      this.open2();
    },
    handleAdd() {
      let pm_phone = this.formLabelAlign.pm_phone;
      let pm_name = this.formLabelAlign.pm_name;
      let pm_nickname = this.formLabelAlign.pm_nickname;
      let pm_vipcard = this.formLabelAlign.pm_vipcard;
      let pm_pic = this.formLabelAlign.pm_pic;
      let pm_address = this.formLabelAlign.pm_address;
      let pm_area = this.formLabelAlign.pm_area;
      let pm_integral = this.formLabelAlign.pm_integral;
      axios({
        method: "post",
        url: "/petmaster",
        data: {
          pm_phone,
          pm_name,
          pm_nickname,
          pm_vipcard,
          pm_pic,
          pm_address,
          pm_area,
          pm_integral
        }
      }).then(({ data }) => {
        this.show();
      });
    },
    handleUpdata() {
      axios({
        method: "put",
        url: "/petmaster/" + formLabelAlign1._id,
        data: {
          id: formLabelAlign1._id
        }
      }).then(() => {
        this.show();
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    loadAll() {
      //   console.log("搜索:", this);
      return [
        { value: this.tableData[0].pm_name },
        { value: this.tableData[1].pm_name }
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log("aa:", item);
    }
  },
  mounted() {
    console.log("adfa");

    this.restaurants = this.loadAll();
  }
};
</script>
<style scoped>
</style>
