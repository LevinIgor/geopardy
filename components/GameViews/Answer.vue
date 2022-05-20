<template>
  <div class="answer" @click="$emit('event', { type: 'showTable' })">
    Ответ: {{ answerText }}
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
  },
};
</script>

<style scoped>
.answer{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 44px;
}</style>
