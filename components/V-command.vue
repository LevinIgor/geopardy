<template>
  <div class="command">
    <button v-on:dblclick="unlockInputScore()">
      <input
        type="number"
        class="score"
        score
        :disabled="disabledScore"
        v-model.number="score"
        @blur="lockInputScore()"
        @keyup.enter="lockInputScore()"
      />
    </button>
    <div class="name">
      <input
        type="text"
        v-model.trim="command.name"
        :disabled="disabled"
        placeholder="Введите имя"
        class="name-input"
      />
      <img src="../static/icons/random.png" @click="$emit('setRandomName',command.id)" alt="" v-if="!disabled">
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["disabled", "command"],
  data() {
    return {
      name: "jjjjjjj",
      score: 0,
      disabledScore: true,
    };
  },
  methods: {
    addScore(value) {
      this.score += value;
    },
    unlockInputScore() {
      this.disabledScore = false;
    },
    lockInputScore() {
      this.disabledScore = true;
    },
  },
};
</script>
<style scoped>
button {
  background-color: initial;
  border: none;
  outline: none;
}
span {
  font-size: 44px;
}
input {
  text-align: center;
  background-color: initial;
  color: var(--color-font-main);
  cursor: pointer;
  user-select: none;
}
.command {
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-height: 200px;
  padding: 20px 0;
  border-radius: 10px;
  box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  background-color: rgba(207, 241, 250, 0.477);
}
.score {
  font-size: 90px;
  width: 300px;
}
.name{
  display: flex;
  align-items: center;
}
.name img{
  box-sizing: content-box;
  cursor: pointer;
  width: 30px;
  height: 30px;
  padding:20px;
}
.name-input{
  font-size: 40px;
  width: 350px;
}
</style>
