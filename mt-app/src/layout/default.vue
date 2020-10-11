<template>
<!-- 模板页，用于统一相同的部分 -->
  <div class="layout">
    <el-container class='m-container'>
      <el-header height=''>
        <mHead />
      </el-header>
      <el-main>
        <!-- 路由跳转放置的位置 -->
           <router-view></router-view>
      </el-main>
      <el-footer height="">
         <mFooter/>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import mHead from "@/components/mt-header/index";
import mFooter from '@/components/mt-footer/index'
export default {
  components: {
    mHead,
    mFooter
  }
};
</script>

<style lang="scss">
@import "../assets/css/layout/layout.scss";
</style>