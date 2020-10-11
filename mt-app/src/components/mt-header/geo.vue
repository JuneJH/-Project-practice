<template>
  <div class="geo">
    <!-- 通过vuex中存储的城市进行切换 -->
    <i class="el-icon-location" />{{$store.state.topBarPosition}}
    <router-link to="/changeCity" class="change-city">切换城市</router-link>
     
     <div class="near-city">
        [
         <router-link to="" v-for="ele in nearCity" :key="ele.id">{{ele.name}}</router-link>
        ]
     </div>
     <!-- 判断是否登录 -->
    <div class="m-lgoin" v-if=" !$store.state.userName">
      <router-link :to="{path:'/login'}">立即登录</router-link>
      <router-link :to="{name:'register'}">注册</router-link>
    </div>
  </div>
</template>

<script>
import getData from '@/service/api'
export default {
  data(){
    return {
      nearCity:[]//附近的城市，后台不支持
    }
  },
   watch: {
    //  监听选择城市改变，从vuex更新本组件的显示信息
        "$store.state.position": function () {
            this.nearCity = this.$store.state.position.nearCity;
        }
    },
  created(){
    getData.getCurPosition().then(res=>{
      this.nearCity = res.data.data.nearCity
      // 后端请求获得当前位置，并保存在vuex中，供后续使用
      this.$store.dispatch('setTopBarPosition',res.data.data.name)
    })
  }
}
</script>
