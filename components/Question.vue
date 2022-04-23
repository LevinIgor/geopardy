<template>
  <div class="question" @click="showAnswer()">
    <h1 v-if="selectText == 'question'">{{ question.text }}</h1>
    <h1 v-else>{{ question.answer }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectText: "question",
    };
  },
  methods: {
    showAnswer() {
      if(this.selectText == "question") {
        this.selectText = "answer";
      } else {
        this.$store.commit("SHOW_TABLE")
      }
      
    },
  },
  computed: {
    question() {
      return this.$store.state.question;
    },
  },
};
</script>

<style scoped>
.question {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
