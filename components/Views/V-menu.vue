<template>
  <div class="V-menu">
    <div class="header">
      <select v-model="select" @change="changeSelect()">
        <option
          v-for="scenario in scenarios"
          :key="scenario.id"
          :value="scenario"
        >
          {{ scenario.name }}
        </option>
      </select>

      <div class="panel">
        <span>Игроков:{{ countCommands }}</span>
        <input
          type="range"
          min="2"
          max="6"
          v-model="countCommands"
          @change="addCommand"
        />
      </div>
      <div
        class="panel"
        @click="
          $store.commit('OPEN_VIEW', {
            view: 'ViewsV-editor',
            animDirection: 'left',
          })
        "
      >
        <img class="icon" src="../../static/icons/editor.png" alt="" />
        <span class="editor"> Редактор сценариев</span>
      </div>

      <span
        class="panel run"
        @click="
          $store.commit('OPEN_VIEW', {
            view: 'ViewsV-game',
            animDirection: 'right',
          })
        "
      >
        Начать</span
      >
    </div>
    <div class="commands">
      <V-command
        v-for="command in commands"
        :key="command.id"
        :command="command"
        :readonly="false"
        @imgClick="$store.commit('SET_RANDOM_COMMAND_IMG', $event)"
        @randomName="$store.commit('SET_RANDOM_COMMAND_NAME', $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "V-menu",
  data() {
    return {
      select: null,
      countCommands: 2,
    };
  },
  methods: {
    addCommand() {
      this.$store.commit("ADD_COMMANDS", this.countCommands);
    },
    changeSelect() {
      this.$store.commit("SET_SELECT", this.select);
    },
  },
  computed: {
    scenarios() {
      var s = this.$store.state.scenarios;
      this.select == null ? (this.select = s[0]) : "";
      this.changeSelect();
      return s;
    },
    commands() {
      return this.$store.state.commands;
    },
  },
  mounted() {
    this.$store.commit("ADD_COMMANDS", this.countCommands);
  },
};
</script>
<style scoped>
select {
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
input[type="range"] {
  margin-left: 10px;
}
.V-menu {
  position: absolute;
  background-color: #ffffff48;
  overflow: hidden;
  border-radius: 10px;
  width: 80%;
  height: 80%;
}
.panel {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s;
  padding: 10px;
}
.panel img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.panel:hover {
  background-color: #f5f5f53f;
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

.header {
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
  min-height: 400px;
  padding: 20px;
}

input {
  text-align: center;
  cursor: text;
  background-color: initial;
  color: white;
  font-size: var(--font-size-average);
  width: 100%;
}
</style>
