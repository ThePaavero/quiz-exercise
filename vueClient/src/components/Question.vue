<template>
  <div>
    <h2>{{ question.question }} ({{ this.secondsLeft }} s.)</h2>
    <ol>
      <li v-for='answer in question.answers' @click.prevent='userAnswers(answer)'>
        {{ answer }}
      </li>
    </ol>
  </div>
</template>
<script>
  export default {
    props: ['question', 'onAnswer', 'secondsToAnswer', 'doOnTimeOut'],
    data() {
      return {
        secondsLeft: this.secondsToAnswer,
        timer: null
      }
    },
    mounted() {
      console.log('Question was mounted')
      this.startTimer()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    methods: {
      userAnswers(answer) {
        this.onAnswer(answer)
      },
      startTimer() {
        this.timer = setInterval(() => {
          this.secondsLeft--
          if (this.secondsLeft < 1) {
            this.doOnTimeOut()
          }
        }, 1000)
      }
    },
    components: {}
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  li {
    cursor: pointer;
    padding: 10px;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
</style>
