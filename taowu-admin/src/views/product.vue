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
      style="padding-top: 40px; padding-left: 50px; display: flex"
    >
      <el-form-item prop="search" style="width: 30%">
        <el-input
          prefix-icon="el-icon-search"
          style="width: 95%"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="search">
        <el-button type="primary" class="search-button">搜索</el-button>
      </el-form-item>
    </el-form>
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add" size="mini">新增</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" stripe border size="small">
      <el-table-column prop="product_id" label="ID" style="width: 5">
      </el-table-column>
      <el-table-column prop="product_name" label="商品名称"> </el-table-column>
      <el-table-column prop="category_idd" label="类别ID"> </el-table-column>
      <el-table-column prop="product_title" label="标题"> </el-table-column>
      <el-table-column prop="product_picture" label="图片地址">
      </el-table-column>
      <el-table-column prop="product_price" label="商品价格"> </el-table-column>
      <el-table-column prop="product_sellprice" label="商城价格">
      </el-table-column>
      <el-table-column prop="product_num" label="销售数量"> </el-table-column>
      <el-table-column prop="product_sales" label="商品库存"> </el-table-column>
      <el-table-column prop="product_intro" label="商品描述"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini">编辑</el-button>
          <el-popconfirm
            title="确认删除吗？"
            @confirm="handleDelete(scope.row.id)"
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

      <el-dialog :visible="dialogVisible" title="提示" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="商品名称">
            <el-input v-model="form.shopName" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" v-model="form.url">
            <el-upload
              action=""
              :http-request="upload"
              :limit="1"
              list-type="picture-card"
            >
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="卖点">
            <el-input v-model="form.shopPoint" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.price" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input
              type="textarea"
              v-model="form.num"
              style="width: 80%"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input
              type="textarea"
              v-model="form.describes"
              style="width: 80%"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
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
      search: "",
      total: 0,
      currentPage: 1,
      pageSize: 15,
      dialogVisible: false,
      form: {},
      tableData: [],
    };
  },
  created() {
    this.load();
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
          if (response.data.code === '922') {
            this.form.url=response.data.data;
            //上传成功
            console.log("上传图片成功");
          } else {
            //上传失败
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
    load() {
      this.$axios
        .get("/api/admin/product/list", {
          productSearchParam: {
            search:this.search,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          console.log(this.currentPage,this.pageSize)
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
      this.pageSize = pageSize; 
      console.log(this.pageSize)//赋值
      this.load();
    },

    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      //改变当前页码触发
      console.log(this.currentPage)
      this.load();
    },
  },
};
</script>

<style>
</style>