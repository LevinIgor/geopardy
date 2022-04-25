<template>
  <div class="table">
    <span class="head">
      {{ scenario.name }}
    </span>
    <div class="line" v-for="(item, key) in scenario.table" :key="item.head">
      <span class="heading">{{ item.head }}</span>
      <div
        class="cell"
        v-for="(cell, key2) in item.body"
        @click="showQuestion(cell, key, key2)"
        :key=" key+key2"
        >{{ cell.score }}</div
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showQuestion(cell, key, key2) {
      if (cell.score !== 0) {
        this.$store.commit("SET_QUESTION", cell);
        this.$store.commit("SHOW_QUESTION");
        this.$store.commit("SET_ZERO_VALUE", { key: key, key2: key2 });
      }
    },
  },
  computed: {
    scenario() {
  
      return this.$store.state.selectScenario;
    },
  },
};
</script>

<style scoped>
.head{
  width: 100%;
  font-size: 44px;
  text-align: center;
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
  height: 100%;
  padding: 10px;
  margin-top: 10px;
}
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  width: 100%;
  
}
.heading{
  text-align: center;
  font-size: 28px;
  min-width: 20%;
}
</style>
