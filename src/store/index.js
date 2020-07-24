import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
  }
})
