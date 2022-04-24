<template>
  <div class="table">
    <div class="line" v-for="(item, key) in table" :key="item.head">
      <span class="heading">{{ item.head }}</span>
      <span
        class="cell"
        @click="showQuestion(cell, key, key2)"
        v-for="(cell, key2) in item.body"
        :key="key2"
        >{{ cell.score }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showQuestion(cell, key, key2) {
      if (cell.isActive) {
        this.$store.commit("SET_QUESTION", cell);
        this.$store.commit("SHOW_QUESTION");
        this.$store.commit("SET_ZERO_VALUE", {key: key,key2: key2});
      }
    },
  },
  computed: {
    table() {
      return this.$store.state.table;
    },
  },
};
</script>

<style scored>
span {
  font-size: 24px;
  cursor: pointer;
}
.table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-table);
  width: 100%;
  height: 100%;
}
.line {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-top: 10px;
}
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blanchedalmond;
}
</style>
