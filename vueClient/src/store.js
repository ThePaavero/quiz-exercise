import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  something: null
}

const mutations = {
  setSomething(state, something) {
    state.something = something
  }
}

export default new Vuex.Store({
  state,
  mutations
})
