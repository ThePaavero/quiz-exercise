<template>
  <div>
    <div className='column'>
      Points: {{ this.$store.state.points }}
    </div><!-- column -->
    <div className='column'>
      Correct answers: {{ this.$store.state.correctAnsweredCount }}
      <br>
      Incorrect answers: {{ this.$store.state.incorrectAnsweredCount }} / {{ this.$store.state.amountOfIncorrectAnswersBeforeGameOver }}
    </div><!-- column -->
  </div>
</template>
<script>
  export default {
    props: [],
    data() {
      return {}
    },
    methods: {
      // ...
    },
    mounted() {
      // ...
    },
    components: {}
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>

</style>
