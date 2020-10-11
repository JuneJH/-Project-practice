<template>
  <div class="change-city">
    <el-row class="select-province">
      <span>按省份选择</span>
      <MSelect
        changeTitle="省份"
        changeType="province"
        :nowCity="nowCity"
        :showChangeType="showChangeType"
        @show-detail-click="showChangeTypeHandle"
        :list="provinceList"
        @getClickProvince="getClickProvinceHandle"
      />
      <span>城市</span>
      <MSelect
        changeTitle="城市"
        :nowCity="selectCity"
        changeType="city"
        :showChangeType="showChangeType"
        @show-detail-click="showChangeTypeHandle"
        :cityDisable="cityDisable"
        :list="cityList"
        @getClickProvince ='selectCityOver'
      />
      <span class="search">直接搜索:</span>
      <el-select
        v-model="searchWord"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="sendSearchWord"
        :loading="loading"
      >
        <el-option
          v-for="item in options"
          :key="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </el-row>
    <el-row>
        <ShowCity :list='hotCityList' title="热门城市:" @getClickProvince ='selectCityOver'/>
    </el-row>
    <el-row>
        <ShowCity :list='historySerchList' title="最近访问:" @getClickProvince ='selectCityOver'/>
    </el-row>
    <el-row>
        <AllCity :list='showAllCityList' @getClickProvince ='selectCityOver'/>
    </el-row>
  </div>
</template>
<script>
import MSelect from "@/components/changeCity/select";
import getData from "@/service/api";
import ShowCity from "@/components/changeCity/hotCity"
import AllCity from '@/components/changeCity/allCity'
export default {
  data() {
    return {
      showChangeType: false,
      provinceList: [],
      loading: true,
      searchWord: "",
      options: [],
      cityDisable: true,
      nowCity: "省份",
      selectCity:'城市',
      cityList: [],
      hotCityList:[],
      historySerchList:[],
      showAllCityList:[]
    };
  },
  components: {
    MSelect,
    ShowCity,
    AllCity
  },
  created() {
    getData.getProvinceList().then(res => {
      let col = Math.ceil(res.data.data.length / 12);
      res.data.data.map(ele=>ele.name = ele.provinceName)
      for (let i = 0; i < col; i++) {
        let newArr = res.data.data.slice(i * 12, i * 12 + 12);
        this.provinceList.push(newArr);
      }
      console.log(res.data.data,'================')
    });
    getData.getCityList().then(res => {
      this.cityList = res.data.data;
      let obj = {}
      res.data.data.forEach(ele=>{
        if(!obj[ele.firstChar.toUpperCase()]){
          obj[ele.firstChar.toUpperCase()] = [];
        }
        obj[ele.firstChar.toUpperCase()].push(ele)
      })
      this.showAllCityList = obj;
    });
    getData.getHotCity().then(res=>{
      this.hotCityList = res.data.data;
    });
    getData.getRecentCity().then(res=>{
      this.historySerchList = res.data.data
    })
  },
  methods: {
    showChangeTypeHandle(item) {
      this.showChangeType = item;
    },
    getClickProvinceHandle(payLoad) {
      this.nowCity = payLoad.provi;
      this.cityDisable = false;
      this.cityList.length = 0;
      let col = Math.ceil(payLoad.cityList.length / 12);
      for (let i = 0; i < col; i++) {
        let newArr = payLoad.cityList.slice(i * 12, i * 12 + 12);
        this.cityList.push(newArr);
      }
    },
    selectCityOver(payLoad){
      this.selectCity = payLoad.provi;
      console.log(this.selectCity)
      this.$store.dispatch('setTopBarPosition',this.selectCity);
      this.$router.push({name:'index'})
    },
    sendSearchWord(val) {
      this.options = this.cityList.filter(ele=>ele.name.includes(val))
      this.loading = false;
    },
  }
};
</script>
<style lang='scss'>
@import "@/assets/css/changeCity/index";
</style>