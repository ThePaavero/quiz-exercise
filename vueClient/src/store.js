import Vue from 'vue'
import Vuex from 'vuex'
import Helpers from './Helpers'

Vue.use(Vuex)

const getInitialState = () => {
  return {
    gameIsOn: true,
    activeQuestion: null,
    points: 0,
    correctAnsweredCount: 0,
    incorrectAnsweredCount: 0,
    amountOfIncorrectAnswersBeforeGameOver: 5
  }
}

const state = getInitialState()

const mutations = {
  setActiveQuestion(state, q) {
    q.correctAnswer = q.answers.correctAnswer
    q.answers = Helpers.formatChoices(q.answers)
    q.question = Helpers.unescapeCrap(q.question)
    state.activeQuestion = q
  },
  addPoints(state, pointsToAdd) {
    state.points += pointsToAdd
  },
  addIncorrectAnswer(state) {
    state.incorrectAnsweredCount++
  },
  addCorrectAnswer(state) {
    state.correctAnsweredCount++
  },
  gameOver(state, msg) {
    state.gameIsOn = false
  },
  resetState(state) {
    Object.assign(state, getInitialState())
  }
}

export default new Vuex.Store({
  state,
  mutations
})
