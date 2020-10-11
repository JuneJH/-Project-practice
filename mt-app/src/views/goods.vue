<template>
  <div class="goods">
    <el-row>
      <Crumbs />
    </el-row>
    <el-row>
      <el-row class="nav">
        <el-row>
          <GooodsNav :list="classifyList" title="分类" />
        </el-row>
        <el-row>
          <GooodsNav :list="areaList" title="区域" />
        </el-row>
      </el-row>
      <el-row class="list">
          <GoodsList/>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import Crumbs from "@/components/productDetail/crumbs";
import GooodsNav from "@/components/productDetail/goodsNav";
import getData from "@/service/api";
import GoodsList from "@/components/productDetail/goodsList"
export default {
  data() {
    return {
      classifyList: [],
      areaList: [],
    }; //data
  },
  methods:{
    changeSortHandle(type){
      console.log(type)
    }
  },
  components: {
    Crumbs,
    GooodsNav,
    GoodsList
  },
  created() {
    getData.getclassify().then(res => {
      this.classifyList = res.data.data;
    });
    getData.getAreaList().then(res => {
      this.areaList = [{
    title: "推荐商圈",
    subList: [
      {
        name: "望京",
        id: 120000
      },
      {
        name: "昌平",
        id: 12222
      }
    ]
  },
  {
    title: "南岗区",
    subList: [
      {
        name: "中央大街",
        id: 123
      },
      {
        name: "西客站",
        id: 11
      },
      {
        name: "花园街",
        id: 222
      },
      {
        name: "通乡街/果园街",
        id: 21
      },
      {
        name: "爱建社区",
        id: 1
      },
      {
        name: "学府路",
        id: 34
      }
    ]
  }
];
    });
  }
};
</script>
<style lang='scss'>
@import "@/assets/css/productDetail/index";
</style>
