<template>
  <div class="table">
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
  padding-top: 10px;
}
.table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.line {
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding: 10px;
}
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  transition: .15s;
  font-size: 28px;
  font-weight: 600;
  width: 100%;
  margin-left: 10px;
  
}
.cell:hover{
  background-color: rgba(0, 0, 0, 0.198);
}
.heading{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 28px;
  min-width: 20%;
}
</style>
