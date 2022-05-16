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
          $store.commit('OPEN_VIEW', 'ViewsV-editor');
          $store.commit('SET_ANIM_DIRECTION', 'left');
        "
      >
        <img class="icon" src="../../static/icons/editor.png" alt="" />
        <span class="editor"> Редактор сценариев</span>
      </div>

      <span
        class="panel run"
        @click="
          $store.commit('OPEN_VIEW', 'ViewsV-game');
          $store.commit('SET_ANIM_DIRECTION', 'right');
        "
      >
        Начать</span
      >
    </div>
    <div class="commands">
      <div class="command" v-for="(command, key) in commands" :key="key">
        <div class="img" @click="$store.commit('SET_RANDOM_COMMAND_IMG', key)">
          <img :src="command.img" alt="" />
        </div>
        <div class="command-name">
          <input
            type="text"
            placeholder="Название"
            :value="command.name"
            @input="
              $store.commit('SET_COMMAND_NAME', {
                key,
                name: $event.target.value,
              })
            "
          />
          <img
            src="../../static/icons/random.png"
            alt=""
            class="icon"
            @click="$store.commit('SET_RANDOM_COMMAND_NAME', key)"
          />
        </div>
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

.command {
  background-color: rgba(207, 241, 250, 0.589);
  padding: 20px 20px 10px 20px;
  border-radius: 10px;
  max-width: 25%;
}
.remove-command {
  position: absolute;
  top: -10px;
  right: -10px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
input {
  text-align: center;
  cursor: text;
  background-color: initial;
  color: white;
  font-size: var(--font-size-average);
  width: 100%;
}

.img {
  cursor: pointer;
  width: 250px;
  height: 250px;
}

.command-name {
  display: flex;
  align-items: center;
  padding: 10px;

}

.icon {
  cursor: pointer;
  width: 25px;
  height: 25px;
}
</style>
