<template>
<div class="text" @click="click()">
  <span >Ответ: {{ currentProp.cell.answer }}</span>
</div>

</template>

<script>
export default {
  props: ["currentProp"],
  methods: {
    click() {
      this.$emit("event", { type: "showTable" });
    },
  },
};
</script>

<style scoped>
span{
  
}
</style>
