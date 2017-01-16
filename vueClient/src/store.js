import Vue from 'vue'
import Vuex from 'vuex'

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

const formatChoices = (q) => {
  const choices = q.incorrectAnswers
  choices.push(q.correctAnswer)
  return shuffleArray(choices)
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const mutations = {
  setActiveQuestion(state, q) {
    q.correctAnswer = q.answers.correctAnswer
    q.answers = formatChoices(q.answers)
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
