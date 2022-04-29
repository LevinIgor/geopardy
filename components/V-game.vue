<template>
  <div class="game">
    <div class="popup" v-if="isPopup" @click="isPopup = false"></div>
    <div class="container">
      <div class="scenes">
        <div class="table">
          <div
            class="line"
            v-for="(item, key) in scenario.table"
            :key="item.head"
          >
            <span class="heading">{{ item.head }}</span>
            <div
              class="cell"
              v-for="(cell, key2) in item.body"
              @click="showQuestion(cell, key, key2)"
              :key="key + key2"
            >
              {{ cell.score }}
            </div>
          </div>
        </div>

        <div
          class="question text"
          v-if="$store.state.activeScene == 'question'"
          @click="$store.commit('SHOW_ANSWER')"
        >
          {{ question.question }}
        </div>

        <div
          class="answer text"
          v-if="$store.state.activeScene == 'answer'"
          @click="$store.commit('SHOW_TABLE')"
        >
          {{ question.answer }}
        </div>
      </div>
      <div class="commands">
        <div
          class="command"
          v-for="(command, key) in $store.state.commands"
          :key="key"
          :class="{ active: activeKey == key }"
          @click="getAnswer(key)"
        >
          <div class="img">
            <img :src="command.img" alt="" />
            <div class="answer-control" v-if="isPopup">
              <button class="yes" @click="correct(key)">Правильно</button>
              <button class="no" @click="incorrect(key)">Не правильно</button>
            </div>
          </div>
          <span>{{ command.name }}</span>
          <span>{{ command.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: "",
      isPopup: false,
    };
  },
  methods: {
    getAnswer(key) {
      if (this.$store.state.activeScene == "question") {
        this.activeKey = key;
        this.isPopup = true;
      }
    },
    correct(key) {
      this.$store.commit("CORRECT", { key: key, value: this.question.score });
      this.isPopup = false;
      this.$store.commit("SHOW_ANSWER");
    },
    incorrect(key) {
      this.$store.commit("INCORRECT", { key: key, value: this.question.score });
      this.isPopup = false;
    },
  },
  computed: {
    scenario(){
        return this.$store.state.selectScenario;
    }
  },
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
span {
  text-align: center;
  font-size: 24px;
}
button {
  width: 100px;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 10px;
  font-size: 16px;
  padding: 10px;
  height: 60px;
  cursor: pointer;
}
.game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.container {
  box-sizing: border-box;
  overflow: hidden;
  width: 95%;
  height: 95%;
}
.scenes {
  box-sizing: border-box;
  height: 65%;
}
.text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 44px;
}
.commands {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
  padding-bottom: 20px;
  height: 35%;
}
.command {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #ffffff5d;
  backdrop-filter: blur(12px);
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;
}
.command img {
  width: 100%;
  object-fit: cover;
}
.active {
  z-index: 11;
}
.active .answer-control {
  opacity: 1;
}
.img {
  position: relative;
}
.answer-control {
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #3e1f47;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.yes {
  background-color: #347450;
  color: rgb(255, 255, 255);
}
.no {
  background-color: rgb(131, 54, 54);
  color: #ffffff;
}
button:hover {
  background-color: #3e1f47;
}
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
