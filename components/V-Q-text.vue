<template>
<div class="text" @click="click()">
  <span >Вопрос: {{ currentProp.cell.question }}</span>
</div>

</template>

<script>
export default {
  props: ["currentProp"],
  methods: {
    click() {
      this.$emit("event", { type: "showAnswer" });
    },
  },
};
</script>

<style scoped>

</style>
