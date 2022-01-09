import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, payload){
      state.user = payload
    }
  },
  actions: {
    start_session(context, payload){
      window.localStorage.userLog = JSON.stringify({...payload, time: Date.now()})
      context.commit("SET_USER", payload)
    }
  },
  modules: {
  }
})
