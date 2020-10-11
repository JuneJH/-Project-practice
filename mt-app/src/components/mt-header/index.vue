<template>
  <div class="header">
    <el-row >
         <topBar/>
    </el-row>
    <el-row >
        <search/>
    </el-row>
  </div>
</template>
<script>
import topBar from "./topBar.vue";
import search from './search'
export default {
  components: {
    topBar,search
  }
};
</script>
<style lang="scss">
   @import '@/assets/css/header/index.scss';

</style>
