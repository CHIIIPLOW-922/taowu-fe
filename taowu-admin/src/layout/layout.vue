<template>
    <div>
      <!--    头部-->
      <Headerform :user="user"/>
  
      <!--    主体-->
      <div style="display: flex">
        <!--      侧边栏-->
        <Asideform />
        <!--      内容区域-->
        <router-view style="flex: 1" @userInfo="refreshUser"/>
      </div>
    </div>
  </template>
  
  <script>
  import Headerform from "../components/header.vue";
  import Asideform from "../components/aside.vue";
  
  export default {
    name: "Layout-form",
    components: {
      Headerform,
      Asideform
    },
    data() {
      return {
        user: {}
      }
    },
    created() {
      this.refreshUser()
    },
    methods: {
      refreshUser() {
        let userJson = sessionStorage.getItem("user");
        if (!userJson) {
          return
        }
        // let userId = JSON.parse(userJson).id
        // 从后台取出更新后的最新用户信息
        // request.get("/user/" + userId).then(res => {
        //   this.user = res.data
        // })
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  