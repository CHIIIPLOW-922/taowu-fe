<template>
  <div>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin: 10px 0; margin-top: 20px">
      <el-button type="primary" @click="add" size="mini">新增</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" stripe border size="small">
      <el-table-column prop="category_id" label="类别ID" width="70">
      </el-table-column>
      <el-table-column prop="category_name" label="标题"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="editDialog(scope.row)">编辑</el-button>
          <el-popconfirm
            title="确认删除吗？"
            @confirm="handleDelete(scope.row.category_id)"
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
        :currentPage="categoryCurrentPage"
        :page-sizes="[5, 15, 30]"
        :page-size="categoryPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>

      <el-dialog :visible="addCategoryVisible" title="新增" width="30%">
        <el-form :model="addCategoryForm" label-width="120px">
          <el-form-item label="商品名称">
            <el-input
              v-model="addCategoryForm.categoryName"
              style="width: 80%"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="addCategoryVisible = false">取消</el-button>
            <el-button type="primary" @click="saveCategory">确定</el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog
        :visible="editCategoryVisible"
        title="编辑商品分类"
        width="30%"
      >
        <el-form :model="editCategoryForm" label-width="120px">
          <el-form-item label="分类ID">
            <el-input
              v-model="editCategoryForm.categoryId"
              style="width: 80%"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类名称">
            <el-input
              v-model="editCategoryForm.categoryName"
              style="width: 80%"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="editCategoryVisible = false">取消</el-button>
            <el-button type="primary" @click="editCategoryInfo">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "category-table",
  data() {
    return {
      total: 0,
      categoryCurrentPage: 1,
      categoryPageSize: 15,
      addCategoryVisible: false,
      editCategoryVisible: false,
      addCategoryForm: {},
      editCategoryForm: {},
      tableData: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    saveCategory() {
      this.$axios
        .post("/api/admin/category/save", {
          category_name: this.addCategoryForm.categoryName,
        })
        .then((res) => {
          this.$notify.success("添加商品分类成功！");
          console.log(res.data);
          this.addCategoryVisible = false;
          this.addCategoryForm = {};
          this.load();
        })
        .catch((err) => {
          this.$notify.error("添加商品分类失败！");
          console.log(err);
        });
    },
    editCategoryInfo() {
      this.$axios
        .post("/api/admin/category/update", {
          category_id: this.editCategoryForm.categoryId,
          category_name: this.editCategoryForm.categoryName,
        })
        .then((res) => {
          this.$notify.success("编辑商品分类成功！");
          console.log(res.data);
          this.editCategoryVisible = false;
          this.editCategoryForm = {};
          this.load();
        })
        .catch((err) => {
          this.$notify.error("编辑商品分类失败！");
          console.log(err);
        });
    },
    add() {
      (this.addCategoryVisible = true), (this.form = {});
    },
    load() {
      this.$axios
        .post("/api/admin/category/list", {
          currentPage: this.categoryCurrentPage,
          pageSize: this.categoryPageSize,
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
    handleSizeChange(pageSize) {
      //改变当前每页的个数触发
      this.categoryPageSize = pageSize;
      console.log(this.categoryPageSize); //赋值
      this.load();
    },

    handleCurrentChange(pageNum) {
      this.categoryCurrentPage = pageNum;
      //改变当前页码触发
      console.log(this.categoryCurrentPage);
      this.load();
    },
    editDialog(data) {
      this.editCategoryVisible = true;
      this.editCategoryForm = {
        categoryId: data.category_id,
        categoryName: data.category_name,
      };
    },
    handleDelete(id) {
      this.$axios
        .post("/api/admin/category/remove", {
          category_id: id,
        })
        .then((res) => {
          this.$notify.success("删除商品分类成功！");
          console.log(res.data);
          this.load();
        })
        .catch((err) => {
          this.$notify.error("删除商品分类失败！");
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>