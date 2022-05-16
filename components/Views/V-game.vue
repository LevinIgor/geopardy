<template>
  <div class="game">
    <span class="back " @click="$store.commit('OPEN_VIEW', 'ViewsV-menu'); $store.commit('SET_ANIM_DIRECTION', 'left')">Назад</span>
    <div class="scenes">
      <transition name="component-fade" mode="out-in">
        <component
          :is="view"
          :currentProp="currentProp"
          @event="event($event)"
        />
      </transition>
    </div>
    <div class="commands">
      <div
        class="command"
        v-for="(command, key) in commands"
        :key="key"
        :class="{ active: activeKey == key }"
        @click="getAnswer(key)"
      >
        <div class="img">
          <img :src="command.img" alt="" />
          <div class="answer-control" v-if="isGetAnswer">
            <button class="yes" @click.stop="controlAnswer(true, key)">
              Правильно
            </button>
            <button class="no" @click.stop="controlAnswer(false, key)">
              Не правильно
            </button>
          </div>
        </div>
        <span>{{ command.name }}</span>
        <span>{{ command.score }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'V-game',
  data() {
    return {
      activeKey: "",
      isGetAnswer: false,
      view: "V-table",
      currentProp: {},
      commands: {},
      scenario: {},
    };
  },
  methods: {
    getAnswer(key) {
      if (this.view == "V-Q-text") {
        this.activeKey = key;
        this.isGetAnswer = true;
      }
    },
    controlAnswer(isCorrect, index) {
      this.isGetAnswer = false;
      isCorrect
        ? ((this.commands[index].score += this.currentProp.cell.score),
          this.event({ type: "showAnswer" }))
        : (this.commands[index].score -= this.currentProp.cell.score);
    },
    event(event) {
      if (event.type == "showQuestion") {
        this.currentProp = event;
        this.view = "V-Q-text";
      }
      if (event.type == "showAnswer") {
        this.view = "V-A-text";
      }
      if (event.type == "showTable") {
        this.currentProp.cell.score = 0;
        this.currentProp = this.scenario.table;
        this.view = "V-table";
      }
    },
  },
  activated() {
    this.scenario = structuredClone(this.$store.state.selectScenario);
    this.commands = structuredClone(this.$store.state.commands);
    this.currentProp = this.scenario.table;
  },
  
};
</script>

<style scoped>
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
span {
  text-align: center;
  font-size: 24px;
}
button {
  cursor: pointer;
  width: 100px;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 10px;
  font-size: 16px;
  padding: 10px;
  height: 60px;
}
.back{
  position: fixed;
  cursor: pointer;
  top: 10px;
  right: 10px;
}
.back:hover{
  color: rgb(184, 251, 182);
}
.game {
  position: absolute;
  width: 95%;
  height: 95vh;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #ffffff5d;
  cursor: pointer;
 
  border-radius: 10px;
  padding: 10px;
}
.command span{
  font-size: 40px;
}
.command img {
  width: 250px;
  height: 200px;
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
  z-index: 11;
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
</style>
