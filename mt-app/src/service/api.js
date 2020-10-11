import axios from 'axios';
axios.defaults.baseURL = 'http://api.duyiedu.com';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.params = {
        ...config.params,
        appkey: 'June_1576998801438'
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

const getData = {
     searchHotWords (params) {
        return axios.get('/api/meituan/header/searchHotWords.json', params)
      },
      getSearchList () {
        return axios.get('/api/meituan/header/search.json')
      },
      getMenuList () {
        return axios.get('/api/meituan/index/nav.json')
      },
      resultsByKeywords () {
        return axios.get('/api/meituan/index/resultsByKeywords.json')
      },
      getProductsList () {
        return axios.get('/api/meituan/list/goodsList.json')
      },
      getHotCity () {
        return axios.get('/api/meituan/city/hot.json')
      },
      getRecentCity () {
        return axios.get('/api/meituan/city/recents.json')
      },
      getProvinceList () {
        return axios.get('/api/meituan/city/province.json')
      },
      getCurPosition () {
        return axios.get('/api/meituan/city/getPosition.json')
      },
      getCityList () {
        return axios.get('/api/meituan/city/cityList.json')
      },
      login (params) {
        return axios.get('/api/meituan/login', params)
      },
      register (params) {
        return axios.get('/api/meituan/register', params)
      },
      getclassify(){
        return axios.get('/api/meituan/list/classify.json')
      },
      getAreaList(){
        return axios.get('/api/meituan/list/areaList.json')
      }
}
export default getData;