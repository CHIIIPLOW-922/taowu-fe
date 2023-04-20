<template>
  <div class="particles-container">
    <vue-particles
      color="#1A5276"
      :particleOpacity="0.9"
      :particlesNumber="85"
      shapeType="snow"
      :particleSize="3.5"
      linesColor="#1A5276"
      :linesWidth="0.5"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="200"
      :moveSpeed="3.5"
      :hoverEffect="true"
      hoverMode="bubble"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>

    <div class="login-form">
      <h2 class="title">淘物商城后台管理系统</h2>
      <img :src="loginImg" class="loginImg" />
      <el-form
        ref="uform"
        :model="form"
        :rules="rules"
        label-width="10px"
        class="el-login"
      >
        <el-form-item prop="username" style="padding-top: 30px">
          <el-input
            prefix-icon="el-icon-user"
            v-model="form.username"
            style="width: 100%"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="form.password"
            type="password"
            style="width: 100%"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            prefix-icon="el-icon-finished"
            v-model="form.code"
            autocomplete="off"
            style="width: 100%"
            placeholder="请输入图形验证码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="canvasCaptcha">
          <canvas ref="canvas"></canvas>
          <el-button type="text" class="change" @click="changeCode"
            >换一张</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%; position: relative"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-login",
  data() {
    return {
      logining:false,
      loginImg: require("../assets/images/login.jpg"),
      form: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs["uform"].validate((valid) => {
        if (valid) {
          if (
            this.form.code.toLocaleLowerCase() !==
            this.canvasCaptcha.toLocaleLowerCase()
          ) {
            this.$notify.error("验证码错误，请重试");
            this.form.code = '';
            this.drawCode();
            return;
          }
          // 验证通过，执行登录操作
          this.$axios
            .post("/api/admin/login", {
              adminAccount: this.form.username,
              adminPassword: this.form.password,
            })
            .then((res) => {
              if (res.data.code === "922") {
                let user = JSON.stringify(res.data.data);
                localStorage.setItem("admin", user);
                this.form = {};
                this.$notify.success(res.data.msg);
                this.$router.push("/user");
              } else {
                this.$refs["uform"].resetFields();
                this.drawCode();
                this.$notify.error(res.data.msg);
              }
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        } else {
          // 验证失败，提示用户错误信息
          return false;
        }
      });
    },
    drawCode() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      canvas.width = 100;
      canvas.height = 30;
      const code = this.createCode();
      this.canvasCaptcha = code;
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText(code, canvas.width / 2, 23);
    },
    createCode() {
      const codeLength = 4;
      const codeChars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let code = "";
      for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * codeChars.length);
        code += codeChars.charAt(randomIndex);
      }
      return code;
    },
    changeCode() {
      this.drawCode();
    },
  },
  mounted() {
    this.drawCode();
  },
};
</script>

<style>
#particles-js {
  width: 100%;
  height: 100%;
  position: fixed;
}
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.login-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  width: 20%;
  height: 55%;
  /* Add your login form styles here */
}
.login-form::before {
  content: "";
  position: absolute;
  backdrop-filter: blur(2px);
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.title {
  text-align: center;
  padding: 10px;
  left: auto;
  z-index: 99;
}
.el-login {
  width: 80%;
  z-index: 99;
}

.loginImg {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 99;
}
/* .el-form-item__content:hover,
.el-form-item__inner:hover {
  border-color: #582858;
}
.el-form-item__content,
.el-form-item__inner {
  background-color: bisque;
} */
</style>
