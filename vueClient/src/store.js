import Vue from 'vue'
import Vuex from 'vuex'
import Helpers from './Helpers'

Vue.use(Vuex)

const getInitialState = () => {
  return {
    gameIsOn: true,
    activeQuestion: null,
    points: 0,
    roundsPlayed: 0,
    correctAnsweredCount: 0,
    incorrectAnsweredCount: 0,
    amountOfIncorrectAnswersBeforeGameOver: 15,
    secondsToAnswer: 40
  }
}

const saveStateToDisk = (state) => {
  window.localStorage.setItem('quizState', JSON.stringify(state))
  console.log('Saved state to localStorage')
}

const getStateFromDisk = () => {
  const onDisk = window.localStorage.getItem('quizState')
  return onDisk ? JSON.parse(onDisk) : null
}

const state = getStateFromDisk() || getInitialState()

const mutations = {
  setActiveQuestion(state, q) {
    q.correctAnswer = q.answers.correctAnswer
    q.answers = Helpers.formatChoices(q.answers)
    q.question = Helpers.unescapeCrap(q.question)
    state.activeQuestion = q
    saveStateToDisk(state)
  },
  addPoints(state, pointsToAdd) {
    state.points += pointsToAdd
    saveStateToDisk(state)
  },
  addIncorrectAnswer(state) {
    state.incorrectAnsweredCount++
    state.activeQuestion = null
    saveStateToDisk(state)
  },
  addCorrectAnswer(state) {
    state.correctAnsweredCount++
    state.activeQuestion = null
    saveStateToDisk(state)
  },
  gameOver(state, msg) {
    state.gameIsOn = false
    saveStateToDisk(state)
  },
  removeActiveQuestion(state) {
    state.activeQuestion = null
    saveStateToDisk(state)
  },
  resetState(state) {
    window.localStorage.removeItem('quizSecondsLeft')
    Object.assign(state, getInitialState())
    saveStateToDisk(state)
  },
  adjustSecondsToAnswer(state) {
    state.secondsToAnswer -= state.correctAnsweredCount
  },
  saveSecondsLeftToDisk(state, seconds) {
    window.localStorage.setItem('quizSecondsLeft', seconds)
  }
}

const getters = {
  getSecondsLeftFromDisk() {
    return window.localStorage.getItem('quizSecondsLeft') || null
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
