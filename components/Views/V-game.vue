<template>
  <div class="game">
    <span
      class="back"
      @click="
        $store.commit('OPEN_VIEW', {
          view: 'ViewsV-menu',
          animDirection: 'left',
        })
      "
      ><img src="../../static/icons/main.svg" alt=""
    /></span>

    <div class="scenes">
      <transition name="component-fade" mode="out-in">
        <component
          :is="view"
          :property="property"
          @event="actionsController($event)"
        />
      </transition>
    </div>

    <div class="commands">
      <V-command
        v-for="command in commands"
        :key="command.id"
        :command="command"
        @imgClick="getAnswer($event)"
        class="command"
      >
        <div
          class="popup"
          :class="{ active: activeCommand == command.id }"
          @click.self="
            isGetAnswer = false;
            activeCommand = null;
          "
        >
          <div class="popup-content">
            <div class="popup-header">Ответ верный?</div>
            <div class="popup-control">
              <button class="yes" @click="answerControl(true, command.id)">
                Да
              </button>
              <button class="no" @click="answerControl(false, command.id)">
                Нет
              </button>
            </div>
          </div>
        </div></V-command
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "V-game",
  data() {
    return {
      isGetAnswer: false,
      view: "GameViewsTable",
      activeCommand: null,
      questionIndex: [0, 0],
      property: "",
      commands: {},
      scenario: {},
    };
  },
  methods: {
    actionsController(action) {
      switch (action.type) {
        case "showTable":
          this.view = "GameViewsTable";
          this.scenario.table[this.questionIndex[0]].cols[
            this.questionIndex[1]
          ].score = 0;
          break;
        case "showQuestion":
          this.property = { index: action.index, table: this.scenario.table };
          this.questionIndex = action.index;
          this.view = "GameViewsQuestions";
          break;
        case "showAnswer":
          this.isGetAnswer ? "" : (this.view = "GameViewsAnswer");
          break;
        default:
          this.view = "GameViewsTable";
      }
    },
    getAnswer(event) {
      if (this.view == "GameViewsQuestions") {
        this.isGetAnswer = true;
        this.activeCommand = event;
      }
    },
    answerControl(answer, id) {
      this.isGetAnswer = false;
      this.activeCommand = null;
      if (answer) {
        var score =
          this.selectQuestion.type == "special"
            ? 2000
            : this.selectQuestion.score;
        this.commands[id].score += score;
        this.actionsController({ type: "showAnswer" });
      } else {
        this.commands[id].score -= this.selectQuestion.score;
      }
    },
  },
  computed: {
    selectQuestion() {
      return this.scenario.table[this.questionIndex[0]].cols[
        this.questionIndex[1]
      ];
    },
  },
  activated() {
    this.scenario = structuredClone(this.$store.state.selectScenario);
    this.commands = structuredClone(this.$store.state.commands);
    this.property = this.scenario;
  },
};
</script>

<style scoped>
span {
  text-align: center;
  font-size: 24px;
}

.back {
  position: fixed;
  cursor: pointer;
  top: 10px;
  left: 10px;
}
.back:hover {
  color: rgb(184, 251, 182);
}

.game {
  position: absolute;
  width: 95%;
  height: 95vh;
}

.scenes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65%;
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
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
  padding-bottom: 20px;
  width: 100%;
  height: 35%;
}
.command {
  cursor: pointer;
}
.popup {
  position: absolute;
  display: flex;
  backdrop-filter: blur(3px);
  background-color: #ffffff48;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  z-index: -1;
  transition: 0.2s;
  background-color: rgba(0, 0, 0, 0.488);
  opacity: 0;
  top: 0;
  left: 0;
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
.active {
  opacity: 1;
  z-index: 10;
}
.popup-header {
  font-size: 34px;
}
.popup-control {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  width: 100%;
}
.popup-control button {
  cursor: pointer;
  border: none;
  color: white;
  transition: 0.2s;
  border-radius: 10px;
  width: 90px;
  height: 50px;
  font-size: 22px;
}

.popup-control button:hover {
  background-color: rgb(56, 67, 138);
  transform: scale(1.02);
}
.yes {
  background-color: rgb(37, 130, 99);
}
.no {
  background-color: rgb(138, 32, 32);
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
