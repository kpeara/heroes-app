import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    jwt: null
  },
  mutations: {
    setJWT(state, token) {
      state.jwt = token["accessToken"];
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getJWT(state) {
      return state.jwt;
    }
  }
})
