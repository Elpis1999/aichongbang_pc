<template>
      <el-table
      :data="students"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="180">
      </el-table-column>
   
       
    </el-table>
  
</template>

<script >
// import axios from "axios";
// import { createNamespacedHelpers } from "vuex";
// const { mapState, mapMutations, mapActions } = createNamespacedHelpers("studentsModule");
// export default {
//   computed: {
//     ...mapState(["students"])
//   },
//   methods: {
//       ...mapMutations(["setUpdateVisible"]),
//       ...mapActions(["setStudent","setStudents"]),
//     showById(id) {
//         this.setStudent(id);
//         this.setUpdateVisible(true)
//     },
//     del(id) {
//      axios({
//                 method:"delete",
//                 url:"/students/"+id
//             }).then(()=>{
//                 this.setStudents();
//             })
//     }
//   }
// };
</script>
<style>
</style>
