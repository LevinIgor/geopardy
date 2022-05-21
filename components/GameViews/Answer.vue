<template>
  <div class="answer" @click="$emit('event', { type: 'showTable' })">
    <img v-if="questionType == 'special'" :src="src" alt="" />
    <span v-else>Ответ: {{ answerText }} </span>
  </div>
</template>

<script>
export default {
  props: ["property"],
  computed: {
    answerText() {
      return this.property.table[this.property.index[0]].cols[
        this.property.index[1]
      ].answer;
    },
    questionType() {
      return this.property.table[this.property.index[0]].cols[
        this.property.index[1]
      ].type;
    },
    src() {
      return this.property.table[this.property.index[0]].cols[
        this.property.index[1]
      ].src;
    },
  },
};
</script>

<style scoped>
.answer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 44px;
}
.answer img{
  height: 90%;
}
</style>
