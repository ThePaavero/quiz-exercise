import Vue from 'vue'
import Vuex from 'vuex'
import Helpers from './Helpers'
import Disk from './lib/StateOnDisk'

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

const state = Disk.getStateFromDisk() || getInitialState()

const mutations = {
  setActiveQuestion(state, q) {
    q.correctAnswer = q.answers.correctAnswer
    q.answers = Helpers.formatChoices(q.answers)
    q.question = Helpers.unescapeCrap(q.question)
    state.activeQuestion = q
    Disk.saveStateToDisk(state)
  },
  addPoints(state, pointsToAdd) {
    state.points += pointsToAdd
    Disk.saveStateToDisk(state)
  },
  addIncorrectAnswer(state) {
    state.incorrectAnsweredCount++
    state.activeQuestion = null
    Disk.saveStateToDisk(state)
  },
  addCorrectAnswer(state) {
    state.correctAnsweredCount++
    state.activeQuestion = null
    Disk.saveStateToDisk(state)
  },
  gameOver(state, msg) {
    state.gameIsOn = false
    Disk.saveStateToDisk(state)
  },
  removeActiveQuestion(state) {
    state.activeQuestion = null
    Disk.saveStateToDisk(state)
  },
  resetState(state) {
    const initial = getInitialState()
    Object.assign(state, initial)
    Disk.saveStateToDisk(state)
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
    // return window.localStorage.getItem('quizSecondsLeft') || null
    return null
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
