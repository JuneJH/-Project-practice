<template>
    <div class="m-search">
       <div class="s-content">
            <el-row>
            <el-col :span="7">
                <logo/>
            </el-col>
            <el-col :span="17">
                <searchInput/>
            </el-col>
        </el-row>
       </div>
    </div>
</template>
<script>
import logo from './logo';
import searchInput from './input'
export default {
    components:{
        logo,
        searchInput

    }
}
</script>
<style lang='scss'>
        @import '@/assets/css/header/search'
</style>