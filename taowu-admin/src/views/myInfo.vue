<template>
  <el-form :data="adminList">
    <el-input>1</el-input>
  </el-form>
</template>

<script>
export default {
  name: "my-info",
  data() {
    return {
      adminList: {},
    };
  },
  method: {
    load() {
      console.log(localStorage.getItem("admin"));
    },
  },
  created() {
    this.loadAdmin();
  },
};
</script>

<style>
</style>