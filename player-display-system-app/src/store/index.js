import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:null,
    uid:'',
    // 当前编辑比赛数据
    currForm:'',
    // 该球队的信息
    teamTile:{title:"球队名称",descript:"这是一支球队"},
    teamPlayerList:[{id:"202001",name:"塞内",url:"http://127.0.0.1:12306/getHeader?path=headImg/86038ad0a602e91f59f4656a165c5100"}]
  },
  mutations: {
    setUserInfo(state,userInfo){
      state.userInfo = userInfo;
    },
    setCurrForm(state,currForm){
      state.currForm = currForm;
    },
    setUid(state,uid){
      state.uid=uid;
    },
    setTeam(state,team){
      state.teamTile = team.teamTile;
      state.teamPlayerList = team.teamPlayerList;
    }
  },
  actions: {
    
  },
  modules: {
  }
})
