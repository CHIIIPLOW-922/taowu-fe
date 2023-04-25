<template>
  <div>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>图片管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin: 10px 0; margin-top: 20px">
      <el-button type="primary" @click="addPic" size="mini">新增</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" stripe border size="small">
      <el-table-column prop="picture_id" label="图片ID" width="150">
      </el-table-column>
      <el-table-column prop="product_id" label="商品ID" width="150">
      </el-table-column>
      <el-table-column prop="product_picture" label="图片地址">
      </el-table-column>
      <el-table-column prop="intro" label="详情"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-popconfirm
            title="确认删除吗？"
            @confirm="handleDelete(scope.row.picture_id)"
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
        :currentPage="picCurrentPage"
        :page-sizes="[5, 15, 30]"
        :page-size="picPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>

      <el-dialog :visible="picDialogVisible" title="新增详情页图片" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="商品">
            <el-select v-model="form.productId" :data="productList" filterable placeholder="请选择">
              <el-option
                v-for="item in productList"
                :key="item.product_id"
                :label="item.product_name"
                :value="item.product_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详情">
            <el-input
              type="textarea"
              v-model="form.intro"
              style="width: 80%"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品图片" v-model="form.url" size="mini">
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
            <el-button @click="picDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="savePic">确定</el-button>
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
      total: 0,
      picCurrentPage: 1,
      picPageSize: 15,
      picDialogVisible: false,
      form: {},
      tableData: [],
      productList: [],
    };
  },
  created() {
    this.load();
    this.productLoad();
  },
  methods: {
    savePic(){
      this.$axios
        .post("/api/admin/picture/add",{
          product_id:this.form.productId,
          product_picture:this.form.url,
          intro:this.form.intro
        })
        .then((res)=>{
          this.$notify.success("详情页图片添加成功！");
          console.log(res.data)
          this.picDialogVisible=false;
          this.form={}
          this.load();
        })
        .catch((err)=>{
          this.$notify.error("详情页图片删除失败！");
          console.log(err);
        })
    },
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
            this.form.url = response.data.data;
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
    addPic() {
      (this.picDialogVisible = true), (this.form = {});
    },
    handleDelete(id){
      this.$axios
        .post("/api/admin/picture/remove",{
          picture_id:id
        })
        .then((res)=>{
          this.$notify.success("删除详情页图片成功！");
          console.log(res.data);
          this.load();
        })
        .catch((err)=>{
          this.$notify.error("删除详情页图片失败！");
          console.log(err)
        })
    },
    productLoad(){
      this.$axios
        .post("/api/admin/product/list",{
          currentPage:1,
          pageSize:1000
        })
        .then((res)=>{
          this.productList = res.data.data;
          console.log(res.data);
        })
        .catch((err)=>{
          console.log(err)
          this.$notify.error("商品信息加载失败！")
        })
    },
    load() {
      this.$axios
        .get("/api/admin/pirture/list", {
          parmas: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
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
    handleSizeChange(pageSize) {
      //改变当前每页的个数触发
      this.pageSize = pageSize;
      console.log(this.pageSize); //赋值
      this.load();
    },

    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
      //改变当前页码触发
      console.log(this.currentPage);
      this.load();
    },
  },
};
</script>
  
  <style>
</style>