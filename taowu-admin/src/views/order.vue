<template>
  <div>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="tableData" style="width: 100%;margin-top:50px" stripe border size="small">
      <el-table-column prop="order_id" label="订单ID" width="190">
      </el-table-column>
      <el-table-column prop="user_id" label="用户ID"  width="190"> </el-table-column>
      <el-table-column prop="product_num" label="商品种类" width="190"> </el-table-column>
      <el-table-column prop="order_num" label="订单商品数量" width="190"> </el-table-column>
      <el-table-column prop="order_price" label="订单金额" width="190">
      </el-table-column>
      <el-table-column prop="order_time" label="订单时间"> </el-table-column>
    </el-table>
    <div style="margin: 10px 0">
      <el-pagination
        :currentPage="orderCurrentPage"
        :page-sizes="[5, 15, 30]"
        :page-size="orderPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-table",
  data() {
    return {
      total: 0,
      orderCurrentPage: 1,
      orderPageSize: 15,
      tableData: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$axios
        .post("/api/admin/order/list", {
            currentPage: this.orderCurrentPage,
            pageSize: this.orderPageSize,
        })
        .then((res) => {
          this.tableData = res.data.data;
          this.total = this.tableData.length;
          console.log(res.data);
        })
        .catch((err) => {
          this.$notify.error("数据加载错误", err);
        });
    },
    handleSizeChange(pageSize) {
      //改变当前每页的个数触发
      this.orderPageSize = pageSize;
      console.log(this.orderPageSize); //赋值
      this.load();
    },

    handleCurrentChange(pageNum) {
      this.orderCurrentPage = pageNum;
      //改变当前页码触发
      console.log(this.orderCurrentPage);
      this.load();
    },
  },
};
</script>

<style>
</style>