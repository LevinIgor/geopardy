<template>
  <div class="questions" @click="$emit('event', { type: 'showAnswer' })">
    <div class="text question" v-if="questionType == 'text'">
      Вопрос: {{ questionText }}
    </div>
    <div class="audio question" v-if="questionType == 'audio'">
      Вопрос: {{ questionText }}
      <audio controls :src="src"></audio>
    </div>
    <div class="special question" v-if="questionType == 'special'">
      Специальный вопрос: {{ questionText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Questions",
  props: ["property"],
  data() {
    return {
      active: true,
    };
  },
  computed: {
    questionType() {
      return this.property.table[this.property.index[0]].cols[
        this.property.index[1]
      ].type;
    },
    questionText() {
      return this.property.table[this.property.index[0]].cols[
        this.property.index[1]
      ].question;
    },
    src() {
      if (this.questionType == "audio") {
        return this.property.table[this.property.index[0]].cols[
          this.property.index[1]
        ].src;
      }
    }
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
.question {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 44px;
  text-align: center;
}

.question audio {
  margin-top: 30px;
}
.special{
  color: rgb(255, 151, 151);
  animation: font-anim 1s infinite;
}
@keyframes font-anim {
  0% {
    color: white;
  }
  50%{
    color: rgb(255, 128, 128);
  }
  100%{
    color: white;
  }
  
}
</style>
