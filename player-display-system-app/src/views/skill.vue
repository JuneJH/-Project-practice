<template>
  <div class="show-index">
    <el-row class="show-row">
      <el-col :span="24" class="show-col">
        <!-- 最近赛程表 -->
        <list />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <!-- 雷达图 -->
        <mLine />
      </el-col>
       <el-col :span="12">
        <!-- 能力图 -->
        <mBar />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import list from "../components/skill/Table";
import mLine from "../components/skill/Line";
import mBar from "../components/skill/Bar";
export default {
  components: {
    mLine,
    mBar,
    list
  }
};
</script>
<style lang="scss" scoped>
.show-col {
  overflow: hidden;
}
</style>
