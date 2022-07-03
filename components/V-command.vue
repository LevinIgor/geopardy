<template>
  <div class="command">
    <span>{{ command.score }}</span>
    <input type="text" v-model="command.name" :disabled="disabled" placeholder="Введите имя " />
  </div>
</template>
<script>
export default {
  props: ["disabled","command"],
  data() {
    return {
      name: "jjjjjjj",
      score: 0,
    };
  },
  methods: {
    addScore(value) {
      this.score+=value;
    },
  },
};
</script>
<style scoped>
.command {
  padding: 40px 20px;
  background-color: rgba(207, 241, 250, 0.589);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
}
span{
    font-size: 44px;
}
input{
    font-size: 30px;
    text-align: center;
    margin-top: 40px;
    background-color: initial;
    color: var(--color-font-main);
}
</style>
