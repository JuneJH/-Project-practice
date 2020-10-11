<template>
  <div class="home">
    <el-row :gutter="10" class="container">
      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="23" class="left-container">
         <router-view/>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="1" class="right-container">
        <mNav />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import mNav from "@/components/Nav.vue";
export default {
  components: {
    mNav
  },

  created() {
    // 如果用户刷新会让vuex中的数据销毁，所以与session共享
    if (!this.$store.state.userInfo) {
      this.$store.state.userInfo = JSON.parse(
        window.sessionStorage.getItem("userInfo")
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #868f96 0%, #596164 100%);
  .container{
    height: 100%;
  }
  .right-container {
    height: 100%;
    padding-top: 20px;
    // background-color: #fff;
  }
  .left-container {
    height: 100%;
    // background-color: red;
  }
}
</style>