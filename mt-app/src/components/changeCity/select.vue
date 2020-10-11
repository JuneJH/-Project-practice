<template>
<!-- 自定义组件为dom绑定事件, -->
  <div
    :class="{'changeCity-select':true,'disable':cityDisable}"
    @click="showClickHandle"
    v-document-click="noShowChange" 
  > 
    <span>{{nowCity}}</span>
    <i class="el-icon-caret-bottom"></i>
    <div class="show-info" v-if="showChangeType == changeType">
      <h4>{{changeTitle}}</h4>
      <div class="col" v-for="(item,index) in list" :key="index">
        <span
          v-for="(city,i) in item"
          :key="i+index"
          @click="selectCityHandle($event,city.name,city.cityInfoList)"
        >{{city.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "list",
    "changeType",
    "changeTitle",
    "showChangeType",
    "nowCity",
    "cityDisable"
  ],
  methods: {
    // 显示选择框
    showClickHandle(e) {
      e.stopPropagation();
      if (!this.cityDisable) {
        this.$emit("show-detail-click", this.changeType);
      }
    },
    //关闭
    noShowChange() {
      this.$emit("show-detail-click", false);
    },
    //改变城市值
    selectCityHandle(e,provi,cityList) {
      e.stopPropagation()
      this.$emit('getClickProvince',{provi,cityList})
      this.$emit("show-detail-click", false);
    }
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/changeCity/select";
</style>