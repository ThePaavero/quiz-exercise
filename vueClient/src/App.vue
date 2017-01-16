<template>
  <div id='app'>
    <h1>Quiz</h1>
    <div v-if='this.$store.activeQuestion'></div>
  </div>
</template>

<script>
  import ExampleComponent from './components/ExampleComponent.vue'
  import axios from 'axios'

  const apiUrl = 'http://localhost:666/get-random-question'

  const getQuestion = () => {
    return new Promise((resolve, reject) => {
      axios.get(apiUrl).then((data) => {
        resolve(data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  export default {
    name: 'app',
    components: {
      ExampleComponent
    },
    mounted() {
      this.$router.push('/')
      getQuestion().then((q) => {
        console.log(q)
        this.$store.commit('setActiveQuestion', q)
      })
    },
    methods: {
      goHome() {
        this.$router.push('/')
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
