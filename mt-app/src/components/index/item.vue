<template>
  <div class="main-item">
    <dl class="title" :class="titleList.class" @mouseover="activeOverHandle">
      <dt>{{titleList.title}}</dt>
      <dd
        v-for="(item,index) in titleList.list"
        :key="index"
        :class="{active:isActive == item.tab}"
        :data-active="item.tab"
      >{{item.text}}</dd>
    </dl>
    <!-- 拿到数据渲染 -->
    <ul class="ibody">
      <li v-for="(item, index) in resultsData[isActive]" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.image" class="image" />
          <div class="cbody">
            <div class="title" :title="item.title">{{item.title}}</div>
            <div class="sub-title" :title="item.sub_title">{{item.sub_title}}</div>
            <div class="price-info">
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">¥</span>
                <span class="current-price numfont">{{item.price}}</span>
              </span>
              <span class="sold bottom-right-info">{{item.address}}</span>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>
<script>
import getData from "@/service/api";
export default {
  props: ["titleList"],
  data() {
    return {
      isActive: "all",
      resultsData: ""
    };
  },
  methods: {
    activeOverHandle(e) {
      if (e.target.dataset.active) {
        this.isActive = e.target.dataset.active;
      }
    }
  },
  created() {
    getData.resultsByKeywords().then(res => {
      this.resultsData = res.data.data;
    });
  }
};
</script>
