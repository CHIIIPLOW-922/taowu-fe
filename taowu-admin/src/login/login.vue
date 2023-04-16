<template>
  <div class="particles-container">
    <vue-particles
      color="#585858"
      :particleOpacity="0.8"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#585858"
      :linesWidth="0.5"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="200"
      :moveSpeed="3.5"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="login-form">
      
      <form>
        <h2>淘物商城后台管理系统</h2>
        <label for="username">username:</label>
        <input type="text" id="username" name="username" />
        <label for="password">password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-login",
};
</script>

<style>
#particles-js {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
}
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.login-form {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  top: 50%;
  left: 50%;
  backdrop-filter: blur(2px);
  /* Add your login form styles here */
}
.login-form h2{
  position: relative;
  text-align: center;
  padding: 10px;
  top: 25%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
