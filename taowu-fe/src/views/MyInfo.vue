<template>
  <div class="myInfo">
    <!-- Add a static page for my favorite module -->
    <div class="myInfo-header">
      <div class="myInfo-title">
        <i class="el-icon-user-solid" style="color: #ff6700"></i>
        个人中心
      </div>
    </div>
    <div class="content">
      <div class="myInfo-list">
        <el-form :model="form" label-width="10px" style="width:50%;text-align:center">
          <el-form-item prop="userName" style="padding-top: 30px">
            <el-input
              prefix-icon="el-icon-user"
              v-model="form.userName"
              style="width: 100%"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="form.userPassword"
              type="password"
              style="width: 100%"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPhone">
            <el-input
              prefix-icon="el-icon-user"
              v-model="form.userPhone"
              style="width: 100%"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%; position: relative;background-color: #ff6700"
              @click="update"
              >修改</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
  <script>
export default {

  data() {
    return {
      form: {
        userName: "",
        userPassword: "",
        userPhone:"",
      },
    };
  },
  methods: {
    update(){
        this.$axios
        .post("/api/user/admin/update",{
            user_id:this.$store.getters.getUser.user_id,
            userName:this.form.userName,
            userPassword:this.form.userPassword,
            userPhone:this.form.userPhone
        })
        .then((res)=>{
            if(res.data.code === "922"){
                localStorage.setItem("user", "");
                location.reload();
            }else{
                this.notifyError(res.data.msg);
            }
        })
        .catch((err)=>{
            this.notifyError("用户修改失败",err)
        })
    },
    load() {
      this.$axios
        .post("/api/user/load?userId=" + this.$store.getters.getUser.user_id)
        .then((res) => {
          if (res.data.code === "922") {
            this.form = res.data.data;
          }else{
            this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
            this.notifyError("用户信息加载失败！",err);
        });
    },
    // 获取收藏数据
  },
  created() {
    this.load();
  },
};
</script>
  <style>
.myInfo {
  background-color: #f5f5f5;
}
.myInfo .myInfo-header {
  height: 64px;
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
}
.myInfo .myInfo-header .myInfo-title {
  width: 1225px;
  margin: 0 auto;
  height: 64px;
  line-height: 58px;
  font-size: 28px;
}
.myInfo .content {
  padding: 20px 0;
  width: 1225px;
  margin: 0 auto;
}
.myInfo .content .goods-list {
  margin-left: -13.7px;
  overflow: hidden;
}
/* 收藏列表为空的时候显示的内容CSS */
.myInfo .collect-empty {
  width: 1225px;
  margin: 0 auto;
}
.myInfo .collect-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.myInfo .collect-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 收藏列表为空的时候显示的内容CSS END */
</style>