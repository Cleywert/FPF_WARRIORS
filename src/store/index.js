import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    pokemon: null,
    adversario: null
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_POKEMON(state, payload) {
      state.pokemon = payload;
    },
    SET_ADVERSARIO(state, payload) {
      state.adversario = payload;
    }
  },
  actions: {
    start_session(context, payload) {
      window.localStorage.userLog = JSON.stringify(payload)
      context.commit("SET_USER", payload)
    },
    set_combate(context, payload) {
      context.commit("SET_POKEMON", payload.pokemon);
      context.commit("SET_ADVERSARIO", payload.adversario);
    }
  },
  modules: {
  }
})
