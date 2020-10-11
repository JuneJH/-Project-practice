<template>
  <div class="m-search-input">
    <input
      placeholder="搜索商家或地址"
      class="m-input"
      @blur="searchBlurHandle"
      @focus="searchInputHandle"
      v-model="searchWord"
      @input="searchWordHandle"
    />
    <el-button class="search-btn">
      <i class="el-icon-search"></i>
    </el-button>
    <div class="has-word" v-if="isHasWord">
      <dl>
        <dd v-for="(item,index) in hasWordList" :key="index">
           <router-link :to="{name:'goods',params:{name:item}}">{{item}}</router-link>
        </dd>
      </dl>
    </div>
    <div class="no-word" v-if="isNoWord">
      <dl>
        <dt>热门搜索</dt>
        <dd>
           <router-link :to="{name:'goods',params:{name:'火锅'}}">火锅</router-link>
        </dd>
      </dl>
    </div>
    <div class="hot-word">
      <ul>
        <li v-for="(item,index) in hotWord" :key="index">
           <router-link :to="{name:'goods',params:{name:item}}">{{item}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import getData from "@/service/api.js";
export default {
  data() {
    return {
      isFocus: false,  //保存input的状态
      searchWord: "",
      hotWord: [],
      hasWordList: [],
      // searchWord: ""
    };
  },
  mounted() {
    getData.searchHotWords().then(res => {
      this.hotWord = res.data.data;
    });
  },
  computed: {
    // 区分input框下方的显示框
    isHasWord() {
      return this.isFocus && this.searchWord.length != 0;
    },
    isNoWord() {
      return this.isFocus && this.searchWord.length == 0;
    }
  },
  methods: {
    searchBlurHandle() {
      // 放在异步中执行，以便选择，否则鼠标无法到达
      setTimeout(()=>{
        this.isFocus = false;
      },500)
    },
    searchInputHandle() {
      this.isFocus = true;
    },
    searchWordHandle() {
      // 做一个防抖
      clearTimeout(this.searchWordTimer);
      this.searchWordTimer = setTimeout(() => {
        getData.getSearchList().then(res => {
          this.hasWordList = res.data.data.list.filter(ele =>
            ele.includes(this.searchWord)
          );
        });
      }, 1000);
    }
  }
};
</script>