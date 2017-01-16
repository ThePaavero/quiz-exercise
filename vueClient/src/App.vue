<template>
  <div id='app'>
    <h1>Quiz</h1>
    <Question v-if='haveActiveQuestion()' :question='this.getActiveQuestion()' :onAnswer='this.onUserAnswer'/>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
  import Question from './components/Question.vue'
  import axios from 'axios'

  const apiUrl = 'http://localhost:666/get-random-question'

  const getQuestion = () => {
    return new Promise((resolve, reject) => {
      axios.get(apiUrl).then((response) => {
        resolve(response.data)
      }).catch((err) => {
        reject(err)
      })
    })
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

  export default {
    name: 'app',
    components: {
      Question
    },
    mounted() {
      this.$router.push('/')
      this.doRound()
    },
    methods: {
      doRound() {
        getQuestion().then((q) => {
          q.correctAnswer = q.answers.correctAnswer
          q.answers = formatChoices(q.answers)
          this.$store.commit('setActiveQuestion', q)
        })
      },
      haveActiveQuestion() {
        return this.$store.state.activeQuestion
      },
      getActiveQuestion() {
        return this.$store.state.activeQuestion
      },
      onUserAnswer(userAnswer) {
        if (this.validateUserAnswer(userAnswer)) {
          this.doOnCorrectAnswer()
        } else {
          this.doOnIncorrectAnswer()
        }
      },
      validateUserAnswer(userAnswer) {
        return userAnswer === this.$store.state.activeQuestion.correctAnswer
      },
      doOnCorrectAnswer() {
        console.log('Correct!')
        this.doRound()
      },
      doOnIncorrectAnswer() {
        console.log('Incorrect...')
        this.doRound()
      }
    }
  }

</script>

<style lang='scss' rel='stylesheet/scss'>
  #app {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #000;
    font-size: 2vw;
    padding: 5vh 5vw;

    @media screen and (max-width: 800px) {
      font-size: 16px;
    }
  }

  h1 {
    font-size: 4vw;
    margin-bottom: 4vh;

    @media screen and (max-width: 800px) {
      font-size: 30px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

</style>
