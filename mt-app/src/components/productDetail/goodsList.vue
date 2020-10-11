<template>
  <div class="goods-list">
    <ul class="list-nav clearfix">
      <li v-for="item in navSort" :key="item.key" @click="classifyHandle(item.key)">{{item.name}}</li>
    </ul>
    <el-row class="item-detail">
      <Detail v-for="(item, index) in productList" :key="index" :meta="item" />
    </el-row>
  </div>
</template>
<script>
import Detail from "@/components/productDetail/detail";
import getData from "@/service/api";
export default {
  data() {
    return {
      navSort: [
        {
          key: "default",
          name: "智能排序",
          active: true
        },
        {
          key: "avgPrice-a",
          name: "价格最低",
          active: false,
          isChange:true
        },
        {
          key: "score-d",
          name: "人气最高",
          active: false
        },
        {
          key: "commentNum-d",
          name: "评价最高",
          active: false
        }
      ],
      productList: []
    };
  },
  created() {
    getData.getProductsList().then(res => {
      this.productList = res.data.data;
    });
  },
  components: {
    Detail
  },
  methods: {
    classifyHandle(type) {
      if (type == "default") {
        getData.getProductsList().then(res => {
          this.productList = res.data.data;
        });
      }
      let order = type.split("-");
      type = order[0];
      order = order[1];
      console.log(type, order);

      if (order == "a") {
        this.productList = this.productList.sort((a, b) => a[type] - b[type]);
      } else if (order == "d") {
        this.productList = this.productList.sort((a, b) => b[type] - a[type]);
      }
      if(type == 'avgPrice'){
        this.navSort.map(ele=>{
          if(ele.isChange){
            ele.key = order == 'a' ? 'avgPrice-d' : 'avgPrice-a'
            ele.name = order == 'a' ? '价格最高' : '价格最低'
          }
        })
      }
    }
  }
};
</script>