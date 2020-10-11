<template>
    <div class="show-city">
        <dl>
            <dt>{{title}}</dt>
            <dd v-for="(item,index) in list" :key="index" @click="selectCityHandle(item.name)">{{item.name}}</dd>
        </dl>
        
    </div>
</template>
<script>
export default {
    props:['list','title'],
      methods:{
        selectCityHandle(provi){
           this.$emit('getClickProvince',{provi})
        }
    }
}
</script>