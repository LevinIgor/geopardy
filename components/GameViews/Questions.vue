<template>
  <div class="questions" @click="$emit('event', { type: 'showAnswer' })">
    <div class="text block" v-if="questionType == 'text'">
      Вопрос: {{ questionText }}
    </div>
    <div class="audio block" v-if="questionType == 'audio'">
      Вопрос: {{ questionText }}
      <audio controls :src="audioSrc"></audio>
    </div>
    <div class="special block" v-if="questionType == 'special'">
      Вопрос: {{ questionText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Questions",
  props: ["property"],
  computed: {
    questionType() {
      return this.property.table[this.property.index[0]].cols[
        this.property.index[1]
      ].type;
    },
    questionText() {
      return this.property.table[this.property.index[0]].cols[
        this.property.index[1]
      ].answer;
    },
    audioSrc() {
      if (this.questionType == "audio") {
        return this.property.table[this.property.index[0]].cols[
          this.property.index[1]
        ].src;
      }
    },
  },
};
</script>

<style scoped>
.questions {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.block {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 44px;
}

.block audio {
  margin-top: 30px;
}
</style>
