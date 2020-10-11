import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topBarPosition:{},
    userName:'',
    registerUserName:''
  },
  mutations: {
    setTopBarPosition(context,payload){
      context.topBarPosition = payload;
    },
    setUserName(context,payload){
      context.userName = payload;
    },
    setRegisterUserName(context,payload){
      context.registerUserName = payload;
    }
  },
  actions: {
    setTopBarPosition({commit},payload){
      commit('setTopBarPosition',payload)
    }
  },
  modules: {
  }
})
