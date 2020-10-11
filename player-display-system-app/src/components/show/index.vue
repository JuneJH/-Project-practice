<template>
  <div class="show-index">
    <el-row class="show-row">
      <el-col :span="17" class="show-col">
        <!-- 最近赛程表 -->
        <list />
      </el-col>
      <el-col :span="4" style="padding-top:100px">
        <!-- 雷达图 -->
        <radar />
        <!-- 能力图 -->
        <funnel />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import list from "./list";
import radar from "./radar";
import funnel from "./funnel";
export default {
  components: {
    radar,
    funnel,
    list
  }
};
</script>
<style lang="scss" scoped>
.show-col{
  overflow: hidden;
}

</style>
