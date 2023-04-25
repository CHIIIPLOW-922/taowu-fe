<template>
  <div>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin: 10px 0; margin-top: 20px">
      <el-button type="primary" @click="addUser" size="mini">新增</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" stripe border size="small">
      <el-table-column prop="user_id" label="用户ID"> </el-table-column>
      <el-table-column prop="userName" label="账号"> </el-table-column>
      <el-table-column prop="userPassword" label="用户密码"> </el-table-column>
      <el-table-column prop="userPhone" label="用户电话"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="editUser(scope.row)">编辑</el-button>
          <el-popconfirm
            title="确认删除吗？"
            @confirm="handleDelete(scope.row.user_id)"
          >
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 10px 0">
      <el-pagination
        :currentPage="userCurrentPage"
        :page-sizes="[5, 15, 30]"
        :page-size="userPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>

      <el-dialog :visible="userDialogVisible" title="新增商城用户" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户账号">
            <el-input v-model="form.userName" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input v-model="form.userPassword" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="用户电话">
            <el-input v-model="form.userPhone" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="userDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveUser">确定</el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog :visible="userEditVisible" title="编辑商城用户" width="30%">
        <el-form :model="editform" label-width="120px">
          <el-form-item label="用户ID">
            <el-input v-model="editform.userId" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="用户账号">
            <el-input v-model="editform.userName" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input
              v-model="editform.userPassword"
              style="width: 80%"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户电话">
            <el-input
              v-model="editform.userPhone"
              style="width: 80%"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="userEditVisible = false">取消</el-button>
            <el-button type="primary" @click="editUserInfo">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-table",
  data() {
    return {
      total: 0,
      userCurrentPage: 1,
      userPageSize: 15,
      userEditVisible: false,
      userDialogVisible: false,
      form: {},
      editform: {},
      tableData: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    editUser(data) {
      this.userEditVisible = true;
      this.editform = {
        userId: data.user_id,
        userName: data.userName,
        userPassword: data.userPassword,
        userPhone: data.userPhone,
      };
    },
    handleDelete(id) {
      this.$axios
        .post("/api/admin/user/remove", {
          user_id: id,
        })
        .then((res) => {
          this.$notify.success("用户删除成功！");
          console.log(res.data);
          this.load();
        })
        .catch((err) => {
          this.$notify.error("用户删除失败！");
          console.log(err);
        });
    },
    addUser() {
      (this.userDialogVisible = true), (this.form = {});
    },
    load() {
      this.$axios
        .get("/api/admin/user/list", {
          parmas: {
            currentPage: this.userCurrentPage,
            pageSize: this.userPageSize,
          },
        })
        .then((res) => {
          this.tableData = res.data.data;
          this.total = res.data.total;
          console.log(res.data);
        })
        .catch((err) => {
          this.$notify.error("数据加载错误", err);
        });
    },
    editUserInfo() {
      this.$axios
        .post("/api/admin/user/update", {
          user_id: this.editform.userId,
          userName: this.editform.userName,
          userPassword: this.editform.userPassword,
          userPhone: this.editform.userPhone,
        })
        .then((res) => {
          this.$notify.success("用户编辑成功！");
          console.log(res.data);
          this.userEditVisible = false;
          (this.editform = {}), this.load();
        })
        .catch((err) => {
          this.$notify.error("用户编辑失败！");
          console.log(err);
        });
    },
    saveUser() {
      this.$axios
        .post("/api/admin/user/save", {
          userName: this.form.userName,
          userPassword: this.form.userPassword,
          userPhone: this.form.userPhone,
        })
        .then((res) => {
          this.$notify.success("用户添加成功！");
          console.log(res.data);
          this.userDialogVisible = false;
          (this.form = {}), this.load();
        })
        .catch((err) => {
          this.$notify.error("用户添加失败！");
          console.log(err);
        });
    },
    handleSizeChange(pageSize) {
      //改变当前每页的个数触发
      this.userPageSize = pageSize;
      console.log(this.userPageSize); //赋值
      this.load();
    },

    handleCurrentChange(pageNum) {
      this.userCurrentPage = pageNum;
      //改变当前页码触发
      console.log(this.userCurrentPage);
      this.load();
    },
  },
};
</script>

<style>
</style>