<template>
  <div>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form
      class="search-part"
      style="padding-top: 40px; display: flex"
      size="mini"
    >
      <el-form-item prop="search" style="width: 30%">
        <el-input
          v-model="search"
          prefix-icon="el-icon-search"
          style="width: 95%"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="search-button">
        <el-button type="primary" class="search-button" @click="searchProduct"
          >搜索</el-button
        >
      </el-form-item>
    </el-form>
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add" size="mini">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      style="
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      "
      stripe
      border
      size="small"
    >
      <el-table-column prop="product_id" label="ID" width="50">
      </el-table-column>
      <el-table-column
        prop="product_name"
        label="商品名称"
        width="150"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="category_id" label="类别ID" width="60">
      </el-table-column>
      <el-table-column
        prop="product_title"
        label="标题"
        width="150"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="product_picture"
        label="图片地址"
        width="150"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="product_price" label="商品价格" width="90">
      </el-table-column>
      <el-table-column prop="product_sellprice" label="商城价格" width="90">
      </el-table-column>
      <el-table-column prop="product_num" label="销售数量" width="80">
      </el-table-column>
      <el-table-column prop="product_sales" label="商品库存" width="80">
      </el-table-column>
      <el-table-column
        prop="product_intro"
        label="商品描述"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button size="mini" @click="editProduct(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确认删除吗？"
            @confirm="handleDelete(scope.row.product_id)"
            >//el里面的confirm方法，根据id删除
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 10px 0">
      <el-pagination
        :currentPage="currentPage"
        :page-sizes="[5, 15, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>

      <el-dialog
        :visible="dialogVisible"
        title="新增"
        :show-close="false"
        width="40%"
        size="mini"
      >
        <el-form :model="form" label-width="90px" size="mini">
          <el-form-item label="商品名称">
            <el-input v-model="form.name" style="width: 85%"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-select
              :data="categoryList"
              v-model="form.categoryId"
              placeholder="请选择"
              style="width: 85%"
            >
              <el-option
                v-for="item in categoryList"
                :key="item.category_id"
                :label="item.category_name"
                :value="item.category_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title" style="width: 85%"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input
              v-model="form.price"
              style="width: 85%"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="商城价格">
            <el-input
              v-model="form.sellprice"
              style="width: 85%"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售数量">
            <el-input
              type="number"
              v-model="form.sales"
              style="width: 85%"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input
              type="number"
              v-model="form.num"
              style="width: 85%"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input
              size="mini"
              type="textarea"
              v-model="form.intro"
              style="width: 85%"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品图片" v-model="form.pictureUrl">
            <el-upload
              action=""
              :http-request="upload"
              :limit="1"
              list-type="picture-card"
            >
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog
        :visible="editVisible"
        title="编辑"
        :show-close="false"
        width="40%"
      >
        <el-form :model="editform" label-width="120px" size="mini">
          <el-form-item label="ID">
            <el-input
              v-model="editform.id"
              style="width: 85%"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="editform.name" style="width: 85%"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-select
              :data="categoryList"
              v-model="editform.categoryId"
              placeholder="请选择"
              style="width: 85%"
            >
              <el-option
                v-for="item in categoryList"
                :key="item.category_id"
                :label="item.category_name"
                :value="item.category_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="editform.title" style="width: 85%"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input
              v-model="editform.price"
              style="width: 85%"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="商城价格">
            <el-input
              v-model="editform.sellprice"
              style="width: 85%"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售数量">
            <el-input
              type="number"
              v-model="editform.sales"
              style="width: 85%"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input
              type="number"
              v-model="editform.num"
              style="width: 85%"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input
              type="textarea"
              size="mini"
              v-model="editform.intro"
              style="width: 85%"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品图片"
            v-model="editform.pictureUrl"
            size="mini"
          >
            <el-upload
              action=""
              :http-request="upload"
              :limit="1"
              list-type="picture-card"
              size="mini"
            >
              <el-button type="primary" size="mini">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="editVisible = false" size="mini">取消</el-button>
            <el-button type="primary" @click="edit" size="mini">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-table",
  data() {
    return {
      categoryId: "",
      categoryList: [],
      search: "",
      total: 0,
      currentPage: 1,
      pageSize: 15,
      editVisible: false,
      dialogVisible: false,
      form: {},
      editform: {},
      tableData: [],
    };
  },
  created() {
    this.load();
    this.categoryLoad();
  },
  methods: {
    upload(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      console.log(formData);
      this.$axios
        .post("/api/admin/files/upload", formData)
        .then((response) => {
          //根据返回值进行判断是否上传成功
          console.log(response);
          if (response.data.code === "922") {
            this.form.pictureUrl = response.data.data;
            this.$notify.success("图片上传成功,路径为" + this.form.url);
            //上传成功
            console.log("上传图片成功");
          } else {
            //上传失败
            this.$notify.error("图片上传失败");
            console.log("图片上传失败");
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("异常处理");
        });
    },
    add() {
      (this.dialogVisible = true), (this.form = {});
    },
    editProduct(data) {
      this.editVisible = true;
      console.log(data);
      this.editform = {
        id: data.product_id,
        name: data.product_name,
        title: data.product_title,
        categoryId: data.category_id,
        price: data.product_price,
        sellprice: data.product_sellprice,
        num: data.product_num,
        sales: data.product_sales,
        intro: data.product_intro,
        pictureUrl: data.product_picture,
      };
      console.log(this.editform);
    },
    edit() {
      this.$axios
        .post("/api/admin/product/update", {
          product_id: this.editform.id,
          product_name: this.editform.name,
          category_id: this.editform.categoryId,
          product_title: this.editform.title,
          product_intro: this.editform.intro,
          product_picture: this.editform.pictureUrl,
          product_price: this.editform.price,
          product_sellprice: this.editform.sellprice,
          product_num: this.editform.num,
          product_sales: this.editform.sales,
        })
        .then((res) => {
          this.$notify.success("商品编辑成功！");
          console.log(res.data);
          this.editVisible = false;
          this.editform = {};
          this.load();
        })
        .catch((err) => {
          this.$notify.error("商品编辑失败!");
          console.log(err);
          this.editVisible = false;
          this.load();
        });
    },
    load() {
      this.$axios
        .get("/api/admin/product/list", {
          params: {
            search: this.search,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          this.tableData = res.data.data;
          this.total = res.data.total;
          console.log(res.data);
          this.search = "";
        })
        .catch((err) => {
          this.$notify.error("数据加载错误", err);
        });
    },
    categoryLoad() {
      this.$axios
        .get("/api/admin/category/list", {
          params: {
            currentPage: 1,
            pageSize: 30,
          },
        })
        .then((res) => {
          this.categoryList = res.data.data;
          console.log(this.categoryList);
          console.log(res.data);
        })
        .catch((err) => {
          this.$notify.error("数据加载失败", err);
        });
    },
    save() {
      console.log(this.form.categoryId);
      this.$axios
        .post("/api/admin/product/save", {
          product_name: this.form.name,
          category_id: this.form.categoryId,
          product_title: this.form.title,
          product_intro: this.form.intro,
          product_picture: this.form.pictureUrl,
          product_price: this.form.price,
          product_sellprice: this.form.sellprice,
          product_num: this.form.num,
          product_sales: this.form.sales,
        })
        .then((res) => {
          console.log(res.data);
          this.$notify.success("添加商品成功！");
          this.dialogVisible = false;
          this.form = {};
          location.reload();
        })
        .catch((err) => {
          console.log(err);
          this.$notify.error("添加失败，请重试");
        });
    },
    handleSizeChange(pageSize) {
      //改变当前每页的个数触发
      this.pageSize = pageSize;
      console.log(this.pageSize); //赋值
      this.load();
    },
    searchProduct() {
      this.load();
    },

    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
      //改变当前页码触发
      console.log(this.currentPage);
      this.load();
    },
    handleDelete(id) {
      console.log(id);
      this.$axios
        .post("/api/admin/product/remove", {
          product_id: id,
        })
        .then((res) => {
          console.log(res.data);
          this.$notify.success("删除成功");
          this.load();
        })
        .catch((err) => {
          console.log(err);
          this.$notify.error("删除失败");
        });
    },
  },
};
</script>

<style>
</style>