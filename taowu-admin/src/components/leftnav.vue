<template>
  <el-menu
    :collapse="collapsed"
    collapse-transition
    router
    unique-opened
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#273746"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <div class="logobox">
      <img class="logoimg" src="../assets/images/login.jpg" alt="" />
    </div>
    <el-submenu v-for="menu in menu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{ menu.menuname }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="chmenu in menu.menus"
          :index="'/' + chmenu.url"
          :key="chmenu.menuid"
        >
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{ chmenu.menuname }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "leftnav-component",
  data() {
    return {
      collapsed: false,
      menu: [
        {
          menuid: 1,
          icon: "el-icon-s-custom",
          menuname: "用户管理",
          url: null,
          menus: [
            {
              menuid: 2,
              icon: "el-icon-user",
              menuname: "用户列表",
              hasThird: "N",
              url: "user",
              menus: null,
            },
          ],
        },
        {
          menuid: 3,
          icon: "el-icon-s-grid",
          menuname: "分类管理",
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 4,
              icon: "el-icon-s-grid",
              menuname: "分类列表",
              hasThird: "N",
              url: "category",
              menus: null,
            },
          ],
        },
        {
          menuid: 5,
          icon: "el-icon-s-goods",
          menuname: "商品管理",
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 6,
              icon: "el-icon-goods",
              menuname: "商品列表",
              hasThird: "N",
              url: "product",
              menus: null,
            },
            {
              menuid: 7,
              icon: "el-icon-picture",
              menuname: "图片列表",
              hasThird: "N",
              url: "picture",
              menus: null,
            },
          ],
        },
        {
          menuid: 8,
          icon: "el-icon-s-order",
          menuname: "订单展示",
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 9,
              icon: "el-icon-document-checked",
              menuname: "订单列表",
              hasThird: "N",
              url: "order",
              menus: null,
            },
          ],
        },
      ],
    };
  },
  created() {
    // 监听
    this.$root.Bus.$on("toggle", (value) => {
      this.collapsed = !value;
    });
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #273746 !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>