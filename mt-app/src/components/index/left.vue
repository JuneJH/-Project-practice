<template>
    <div class="main-left">
        <dl class="nav" >
            <dt>全部分类</dt>
            <dd @mouseenter="overHandle(item)" @mouseleave="outHandle" v-for="(item,index) in menuList" :key="index">
                <i :class="item.type"></i>
                {{item.name}}
                <span class="arrow"></span>
            </dd>
        </dl>
        <div class="detail clearfix"  v-if="isShowDetail" @mouseenter="detailOverHandle" @mouseleave="detailOutHandle">
              <dl>
                  <dt>{{detailList.title}}</dt>
                  <dd v-for="(item,index) in detailList.items" :key="index">
                      {{item}}
                  </dd>
              </dl>
        </div>
    </div>
</template>
<script>
import getData from '@/service/api'
export default {
    data(){
        return{
            menuList:'',
            isShowDetail:false,
            detailList:''
        }
    },
    mounted(){
        getData.getMenuList().then(res=>{
            this.menuList = res.data.data;
        })
    },
    methods:{
        overHandle(item){
            clearTimeout(this.isShowDetailTimer)
            this.isShowDetail = true;
            this.detailList = item.items[0]
            console.log(this.detailList)

        },
        outHandle(){
            this.isShowDetailTimer = setTimeout(()=>{
                this.isShowDetail = false;
            },1000)
        },
        detailOverHandle(){
            clearTimeout(this.isShowDetailTimer)
        },
        detailOutHandle(){
             this.isShowDetail = false;
        }
    }
}
</script>