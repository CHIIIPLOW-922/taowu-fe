<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#334157"
    text-color="#fff"
    active-text-color="#fff"
  >
    <button class="buttonimg">
      <img
        class="showimg"
        :src="collapsed ? imgsq : imgshow"
        @click="toggle(collapsed)"
      />
    </button>
    <el-submenu index="2" class="submenu">
      <template slot="title">{{ user.adminName }}</template>
      <el-menu-item @click="toInfo()" index="2-2">个人中心</el-menu-item>
      <el-menu-item @click="exit()" index="2-3">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "header-component",
  data() {
    return {
      collapsed: true,
      imgshow: require("@/assets/images/show.png"),
      imgsq: require("@/assets/images/sq.png"),
      user: {},
    };
  },
  methods: {
    // 切换显示
    toggle(showtype) {
      this.collapsed = !showtype;
      this.$root.Bus.$emit("toggle", this.collapsed);
    },
    toInfo(){
      this.$router.push('/myInfo')
    },
    exit() {
      this.$confirm("是否确认登出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          setTimeout(() => {
            localStorage.removeItem("admin");
            this.$router.push({ path: "/login" });
            this.$notify.success("已成功登出！");
          }, 500);
        })
        .catch(() => {
          this.$notify.info({
            message: "已取消",
          });
        });
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("admin"));
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
}
.submenu {
  float: right !important;
}
.buttonimg {
  height: 60px;
  background-color: transparent;
  border: none;
}
.showimg {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 17px;
  left: 17px;
}
.showimg:active {
  border: none;
}
.el-menu-demo {
  justify-content: space-between;
}
</style>