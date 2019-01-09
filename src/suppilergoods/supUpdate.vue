<template>
  <div>
    <el-dialog title="修改学生" :visible.sync="UpdateVisible">
      <el-form status-icon ref="updateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="student.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="text" v-model="student.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="gender">
          <el-radio v-model="student.gender" label="男">男</el-radio>
          <el-radio v-model="student.gender" label="女">女</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "studentsModule"
);
export default {
  computed: {
    ...mapState(["student"]),
    UpdateVisible: {
      get() {
        return this.$store.state.studentsModule.UpdateVisible;
      },
      set(UpdateVisible) {
        this.$store.commit("studentsModule/setUpdateVisible", UpdateVisible);
      }
    }
  },
  methods: {
    ...mapActions(["setStudents"]),
    ...mapMutations(["setUpdateVisible"]),
    update() {
      let { name, age, gender } = this.student;
      axios({
        method: "put",
        url: "/students/" + this.student._id,
        data: {
          name,
          age,
          gender
        }
      }).then(() => {
        this.setStudents();
        this.UpdateVisible = false;
      });
    }
  },
  components: {
    // InputElement,
    // Radio
  }
};
</script>

<style>
</style>
