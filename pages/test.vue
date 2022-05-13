<template>
  <div class="test">
    <button @click="click()">click</button>
  </div>
</template>

<script>
import getCollection from "../backend/getCollection.js";
import setDocument from "../backend/setDocument.js";
import deleteDocument from "../backend/deleteDocument.js";

export default {
  methods: {
    async click() {
     this.$store.dispatch('get_scenarios',this.$fire)
    },
  },
};
</script>

<style scoped></style>
