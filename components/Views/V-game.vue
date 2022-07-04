<template>
  <div class="game">
    <div class="scenes">
      <V-table
        ref="table"
        :table="scenario.table"
        @tableClick="showQuestion($event)"
        v-if="mode == 'table'"
        key="table"
      />

      <span
        key="question"
        v-if="mode == 'question'"
        @click="changeMode('answer')"
        class="game-text"
        >Вопрос: {{ question }}</span
      >
      <span
        key="answer"
        v-if="mode == 'answer'"
        @click="changeMode('table')"
        class="game-text"
      >
        Ответ: {{ answer }}</span
      >
    </div>

    <div class="commands">
      <div
        class="command"
        v-for="command in commands"
        :key="command.id"
        @click="getAnswer(command.id)"
      >
        <V-command
          :command="command"
          :disabled="disabled"
          :ref="'command' + command.id"
        />
        <div
          class="command-popup"
          v-if="activeCommand == command.id"
          @click.stop="resetActive()"
        >
          <span class="popup-title">Ответ был верным?</span>
          <div class="popup-btns">
            <span
              class="popup-btn correct"
              @click.stop="answerCorrect(true, command.id)"
              >Да</span
            >
            <span
              class="popup-btn incorrect"
              @click.stop="answerCorrect(false, command.id)"
              >Нет</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "V-game",
  props: ["commands", "select"],
  data() {
    return {
      activeCommand: null,
      questionIndex: [0, 0],
      currentIndex: [0, 0],
      mode: "table",
      disabled: true,
      scenario: [],
    };
  },
  methods: {
    showQuestion(event) {
      this.currentIndex = event;
      if (this.score != 0) {
        this.changeMode("question");
      }
    },
    changeMode(mode) {
      if (mode == "table") {
        this.scenario.table[this.currentIndex[0]].cols[
          this.currentIndex[1]
        ].score = 0;
      }
      this.mode = mode;
    },
    getAnswer(id) {
      if (this.mode == "question") {
        this.activeCommand = id;
      }
    },
    answerCorrect(isCorrect, id) {
      if (isCorrect) {
        this.activeCommand = null;
        this.changeMode("answer");
        this.$refs["command" + id.toString()][0].addScore(this.score);
      } else {
        this.activeCommand = null;
        this.$refs["command" + id.toString()][0].addScore(-this.score / 2);
      }
    },
    resetActive() {
      console.log("resetActive");
      this.activeCommand = null;
    },
    setScenario(id){
      this.scenario = structuredClone(
        this.$store.state.scenarios.find((item) => item.id == id)
      );
    }
  },
  computed: {
    answer() {
      return this.scenario.table[this.currentIndex[0]].cols[
        this.currentIndex[1]
      ].answer;
    },
    question() {
      return this.scenario.table[this.currentIndex[0]].cols[
        this.currentIndex[1]
      ].question;
    },
    score() {
      return this.scenario.table[this.currentIndex[0]].cols[
        this.currentIndex[1]
      ].score;
    },
  },
  watch: {
    select(newVal) {
      this.setScenario(newVal)
    },
  },
  mounted() {
    if(this.select) {
      this.setScenario(this.select)
    }
  },
};
</script>

<style scoped>
.game {
  height: 95vh;
}

.scenes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.text {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
  font-size: 50px;
}
.commands {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  box-sizing: border-box;
  width: 100%;
  height: 19vh;
}
.command {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}
.game-text {
  font-size: 90px;
  padding: 200px 300px;
  background-color: rgba(240, 248, 255, 0.049);
  cursor: pointer;
}
.command-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
}
.popup-title {
  font-size: 30px;
  color: white;
}
.popup-btns {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
}
.popup-btn {
  padding: 10px 40px;
  background-color: rgba(240, 248, 255, 0.105);
  border-radius: 10px;
  transition: all 0.3s;
}
.popup-btn:hover {
  background-color: rgba(240, 248, 255, 0.136);
  color: white;
}

.component-fade-enter-active {
  transition: 0.2s ease;
}
.component-fade-leave-active {
  transition: 0.2s;
}
.component-fade-enter {
  opacity: 0;
}
.component-fade-leave-to {
  opacity: 0;
}
</style>
