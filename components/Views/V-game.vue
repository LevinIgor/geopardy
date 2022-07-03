<template>
  <div class="game">
    <div class="scenes">
      <!-- Компоненты взяты из components/GameViews/ -->
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
        :disabled="true"
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
  props: ["commands", "select"],
  data() {
    return {
      isGetAnswer: false,
      view: "GameViewsTable",
      activeCommand: null,
      questionIndex: [0, 0],
      property: "",
      scenario: {},
    };
  },
  methods: {
    actionsController(action) {
      switch (action.type) {
        case "showTable":
          this.scenario.table[this.questionIndex[0]].cols[
            this.questionIndex[1]
          ].score = 0;
          this.view = "GameViewsTable";
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
        // Если тип вопроса "Специальный" то цена вопроса становиться 2000, иначе она не меняеться
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
  mounted() {
    this.scenario = this.$store.state.scenarios.find(
      (scenario) => scenario.id == this.select
    );
    this.property = this.scenario;
  },
  watch: {
    select() {
      this.scenario = this.$store.state.scenarios.find(
        (scenario) => scenario.id == this.select
      );
    },
  },
};
</script>

<style scoped>
span {
  text-align: center;
  font-size: 24px;
}
.game {
  height: 95vh;
}

.scenes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 80%;
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
  height: 15%;
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
