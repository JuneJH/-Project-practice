<template>
  <div class="topbar">
    <div class="top-content">
      <el-col :span="16">
        <geo />
      </el-col>
      <el-col :span="8" class="top-nav">
        <m-nav />
      </el-col>
    </div>
  </div>
</template>
<script>
import geo from "./geo";
import mNav from "./nav";
export default {
  components: {
    geo,
    mNav
  }
};
</script>

<style lang="scss">
@import "@/assets/css/header/topbar.scss";
</style>