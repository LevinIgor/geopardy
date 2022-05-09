<template>
  <div class="test">
    <button @click="click()">click</button>
  </div>
</template>

<script>
import getScenarios from "../backend/getScenarios.js";
export default {
  methods: {
    async click() {
      getScenarios(this.$fire).then((res) =>
        this.$store.commit("SET_SCENARIOS", res)
      );
    },
  },
};
</script>

<style scoped></style>
