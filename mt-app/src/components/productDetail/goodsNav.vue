<template>
    <div class="goods-nav">
        <span>{{title}}</span>
        <span class="all active">全部</span>
        <ul class="clearfix">
            <li  v-for="ele in list" :key="ele.id" >
                {{ele.title}}
                <i class="el-icon-caret-bottom"></i>
                <dl class="show-selection">
                    <dt>{{ele.title}}</dt>
                    <dd v-for="item in ele.subList" :key="item.id">{{item.name}}</dd>
                </dl>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:['title','list'],
    data(){
        return {
            isShowSelect:false
        }
    },
    methods:{
        // showSelect(){
        //     this.isShowSelect = true;
        // }

    }
    
}
</script>