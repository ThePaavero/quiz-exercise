<template>
  <div id='app'>
    <h1>Quiz</h1>
    <div v-if='this.$store.state.gameIsOn'>
      <StatsDisplay/>
      <Question
        v-if='haveActiveQuestion()'
        :question='this.getActiveQuestion()'
        :secondsToAnswer='this.$store.state.secondsToAnswer'
        :doOnTimeOut='this.onQuestionTimeOut'
        :onAnswer='this.onUserAnswer'/>
      <div v-else>Loading...</div>
    </div>
    <div v-else>
      <h2>Game over!</h2>
      <a href="#" @click.prevent='resetGame'>Play again?</a>
    </div>
    <a href="#" @click.prevent='resetGame'>Clear session</a>
  </div>
</template>

<script>
  import Question from './components/Question.vue'
  import StatsDisplay from './components/StatsDisplay.vue'
  import Helpers from './Helpers'
  import axios from 'axios'

  const apiUrl = 'http://paavero.com:666/get-random-question'

  const getQuestion = () => {
    return new Promise((resolve, reject) => {
      axios.get(apiUrl).then((response) => {
        resolve(response.data)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  export default {
    name: 'app',
    components: {
      Question,
      StatsDisplay
    },
    mounted() {
      this.$router.push('/')
      this.doRound()
    },
    methods: {
      doRound() {
        getQuestion().then((q) => {
          this.$store.commit('setActiveQuestion', q)
        }).catch((err) => {
          window.alert(err)
        })
      },
      haveActiveQuestion() {
        return this.$store.state.activeQuestion
      },
      getActiveQuestion() {
        return this.$store.state.activeQuestion
      },
      onUserAnswer(userAnswer) {
        this.$store.state.roundsPlayed++
        this.adjustSecondsToAnswer()
        if (this.validateUserAnswer(userAnswer)) {
          this.doOnCorrectAnswer()
        } else {
          this.doOnIncorrectAnswer()
        }
        this.resetActiveQuestion()
      },
      adjustSecondsToAnswer() {
        this.$store.commit('adjustSecondsToAnswer')
      },
      resetActiveQuestion() {
        this.$store.commit('removeActiveQuestion')
      },
      validateUserAnswer(userAnswer) {
        return userAnswer === this.$store.state.activeQuestion.correctAnswer
      },
      doOnCorrectAnswer() {
        this.flashBodyClass('correct')
        console.log('Correct!')
        this.$store.commit('addPoints', 1)
        this.$store.commit('addCorrectAnswer')
        this.doRound()
      },
      doOnIncorrectAnswer() {
        this.flashBodyClass('incorrect')
        console.log('Incorrect...')
        this.$store.commit('addIncorrectAnswer')
        if (this.$store.state.incorrectAnsweredCount > this.$store.state.amountOfIncorrectAnswersBeforeGameOver) {
          this.doGameOver('You ran out of incorrect answers!')
        } else {
          this.doRound()
        }
      },
      flashBodyClass(className) {
        document.body.classList.add(className)
        setTimeout(() => {
          document.body.classList.remove(className)
        }, 300)
      },
      doGameOver(msg) {
        this.$store.commit('gameOver', msg)
      },
      resetGame() {
        console.log('Reset game!')
        this.$store.commit('resetState')
        this.doRound()
      },
      onQuestionTimeOut() {
        console.log('Question timed out!')
        this.doOnIncorrectAnswer()
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

  body {
    &.correct {
      background-color: greenyellow;
    }
    &.incorrect {
      background-color: orangered;
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
