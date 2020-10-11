<template>
    <div class="all-city">
        <dl class="show-case">
            <dt>按拼音首字母选择：</dt>
            <dd v-for="ele in showCase" :key="ele">
                <!-- 设置锚点，进行移动，字母查找 -->
                <a :href="'#city'+ ele">{{ele}}</a>
            </dd>
        </dl>
        <div class="show-all-city">
            <dl v-for="(item,index) in list" :key="index" :id="'city'+index">
                <dt>{{index}}</dt>
                <dd v-for="(ele) in item" :key="ele.id" @click="selectCityHandle(ele.name)">
                    {{ele.name}}
                </dd>
            </dl>
        </div>
    </div>
</template>
<script>
export default {
    props:['list'],
    data(){
        return {
            showCase:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),  //渲染字母排序
        }
    },
    methods:{
        selectCityHandle(provi){
           this.$emit('getClickProvince',{provi})
        }
    }
}
</script>