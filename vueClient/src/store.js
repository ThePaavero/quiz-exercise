import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  activeQuestion: null
}

const mutations = {
  setActiveQuestion(state, q) {
    state.activeQuestion = q
  }
}

export default new Vuex.Store({
  state,
  mutations
})
