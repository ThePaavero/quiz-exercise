import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  activeQuestion: null,
  points: 0,
  correctAnsweredCount: 0,
  incorrectAnsweredCount: 0,
  amountOfIncorrectAnswersBeforeGameOver: 5
}

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
  }
}

export default new Vuex.Store({
  state,
  mutations
})
