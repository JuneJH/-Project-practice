<template>
  <div class="container">
    <div class="main">
      <!-- 栅格布局 -->
      <el-row>
        <el-col :span="5">
          <MainLeft />
        </el-col>
        <el-col :span="19">
          <MNav />
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <!-- 多次复用组件 -->
          <MItem :titleList="iStyle" />
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <MItem :titleList="copy" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import MainLeft from "@/components/index/left";
import MNav from "@/components/index/nav";
import MItem from "@/components/index/item";
import getData from "@/service/api";
export default {
  components: {
    MainLeft,
    MNav,
    MItem
  },
  data() {
    return {
      iStyle: {
        class: "istyle",
        title: "有格调",
        list: [
          {
            text: "全部",
            tab: "all"
          },
          {
            text: "约会聚餐",
            tab: "food"
          },
          {
            text: "丽人SPA",
            tab: "spa"
          },
          {
            text: "电影演出",
            tab: "movie"
          },
          {
            text: "品质出游",
            tab: "travel"
          }
        ]
      },
      copy: {
        class: "copy",
        title: "有格调",
        list: [
          {
            text: "全部",
            tab: "all"
          },
          {
            text: "约会聚餐",
            tab: "food"
          },
          {
            text: "丽人SPA",
            tab: "spa"
          },
          {
            text: "电影演出",
            tab: "movie"
          },
          {
            text: "品质出游",
            tab: "travel"
          }
        ]
      },
    }
    
  },
  created() {
    getData.resultsByKeywords().then(res => {
    });
  }
};
</script>
<style lang='scss'>
@import "@/assets/css/index/index.scss";
</style>