<template>
  <div class="container">
    <div class="start">
      <div class="variant-selector">
        <select class="select-css" v-model="select" @change="changeSelect()">
          <option
            v-for="scenario in scenarios"
            :key="scenario.id"
            :value="scenario"
          >
            {{ scenario.name }}
          </option>
        </select>
        <div class="buttons">
          <div class="btn">
            <span>Кол-во игроков : {{ countCommands }}</span>
            <input
              type="range"
              min="0"
              max="6"
              v-model="countCommands"
              @change="addCommand"
            />
          </div>
          <div class="btn" @click="$store.commit('OPEN_VIEW','V-editor')">
            <img class="icon" src="../static/icons/editor.png" alt="" />
            <span class="editor">
              Редактор сценариев</span
            >
          </div>

          <span class="btn run" @click="$store.commit('OPEN_VIEW','V-game')">Начать</span>
        </div>
      </div>
      <div class="commands">
        <V-command
          v-for="(command, key) in commands"
          :key="key"
          :command="command"
          :index="key"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "V-menu",
  data() {
    return {
      select: null,
      countCommands: 0,
    };
  },
  methods: {
    // добавление команды
    addCommand() {
      this.$store.commit("ADD_COMMANDS", this.countCommands);
    },
    changeSelect(){
      this.$store.commit("CHANGE_SELECT", this.select);}
  },
  computed: {
    scenarios() {
      return this.$store.state.scenarios;
    },
    commands() {
      return this.$store.state.commands;
    },
  },
};
</script>
<style scoped>

.icon {
  cursor: pointer;
  width: 25px;
  height: 25px;
  transition: 0.3s;
}
.btn {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s;
  padding: 10px;
  margin-left: 10px;
}
.btn:hover {
  background-color: #f5f5f53f;
}
.container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
}
.buttons img {
  margin-right: 10px;
}
.run {
  background-color: #0c992365;
}
.remove-command {
  position: absolute;
  top: -10px;
  right: -10px;
}
.start {
  background-color: #ffffff48;
  overflow: hidden;
  min-width: 70%;
  min-height: 70%;
  max-width: 80%;
  border-radius: 10px;
}
.select-css {
  outline: none;
  background-color: initial;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 24px;
  min-width: 25%;
}
option {
  background-color: #6f6e8386;
}
.variant-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.431);
  padding: 10px;
}

.commands {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}
</style>
