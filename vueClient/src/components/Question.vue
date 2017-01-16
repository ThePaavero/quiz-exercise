<template>
  <div>
    <h2>{{ question.question }}</h2>
    <ol>
      <li v-for='answer in question.answers' @click.prevent='userAnswers(answer)'>
        {{ answer }}
      </li>
    </ol>
  </div>
</template>
<script>
  export default {
    props: ['question', 'onAnswer'],
    data() {
      return {}
    },
    methods: {
      userAnswers(answer) {
        this.onAnswer(answer)
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
