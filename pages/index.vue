<template>
  <div class="geopardy">
    <div class="header" :class="{hide:mode=='game'}">
      <div class="select-scenario block">
        <select name="" id="" v-model="select">
          <option
            :value="scenario.id"
            v-for="scenario in scenarios"
            :key="scenario.id"
          >
            {{ scenario.name }}
          </option>
        </select>
        <img
          src="../static/icons/remove-trash.png"
          alt=""
          class="icon remove"
          v-if="mode == 'edit'"
          @click="deleteScenario"
        />
      </div>
      <div class="create-scenario block" v-if="mode == 'edit'">
        <input type="range" v-model="rows" max="7" min="3" />
        <span>Р: {{ rows }}</span>
        <input type="range" v-model="cols" max="7" min="3" />
        <span>К: {{ cols }}</span>
        <div class="btn" @click="createScenario">Создать</div>
      </div>
      <div class="commands" v-if="mode == 'menu'">
        <span>Количество команд: </span>
        <input type="range" @input="addCommands($event)" min="2" max="5" />
      </div>
      <div class="control block" v-if="mode == 'menu'">
        <img
          src="../static/icons/edit.svg"
          alt=""
          class="icon"
          @click="mode = 'edit'"
        />
        <div class="btn" @click="mode = 'game'">Начать</div>
      </div>
      <div class="control block" v-if="mode == 'edit'">
        <div class="btn" @click="mode = 'menu'">Меню</div>
      </div>
      <div class="control block" v-if="mode == 'game'">
        <div class="btn" @click="mode = 'menu'">Меню</div>
      </div>
    </div>
    <div class="content">
      <ViewsV-menu v-if="mode == 'menu'" :commands="commands" @setRandomName="setRandomName($event)" />
      <ViewsV-game v-if="mode == 'game'" :commands = "commands" :select="select" />
      <ViewsV-editor v-if="mode == 'edit'" :selectId="select" ref="editor" />
    </div>
  </div>
</template>
<script>
import getScenarios from "../backend/getScenarios.js";
import randomName from "../func/getRandomName.js";

export default {
  data() {
    return {
      cols: 3,
      rows: 3,
      select: "",
      mode: "menu",
      commands: [
        { id: 0, name: "", score: 0 },
        { id: 1, name: "", score: 0 },
      ],
    };
  },
  async asyncData({ $fire, store }) {
    store.commit("SET_SCENARIOS", await getScenarios($fire));
  },
  computed: {
    scenarios() {
      return this.$store.state.scenarios;
    },
  },
  methods: {
    addCommands(event) {
      var count = event.target.value;
      this.commands = [];
      for (let i = 0; i < count; i++) {
        this.commands.push({
          id: i,
          name: "",
          score: 0,
        });
      }
    },
    createScenario() {
      this.$store.commit("CREATE_SCENARIO", {
        rows: this.rows,
        cols: this.cols,
      });
      this.select = this.$store.state.scenarios[
        this.$store.state.scenarios.length - 1
      ].id;
    },
    deleteScenario(){
      this.$store.commit("DELETE_SCENARIO", this.select);
      this.$refs.editor.deleteScenario()
    },
    setRandomName(event) {
      this.commands[event].name = randomName();
    },
  },
};
</script>
<style scoped>
* {
  font-size: 22px;
  color: rgba(238, 238, 238, 0.782);
}
select {
  background-color: initial;
  cursor: pointer;
}
option {
  background-color: #0000009d;
  border: none;
}
input {
  cursor: pointer;
}
.header {
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 40px;
  background-color: rgba(0, 0, 0, 0.431);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hide{
  opacity: 0;
  transition: opacity 0.3s ease-in;
  position: fixed;
}
.hide:hover{
  opacity: 1;
}
.icon {
  width: 25px;
  height: 25px;
  filter: invert(80%);
  cursor: pointer;
}
.icon:hover {
  filter: invert(100%);
}
.remove {
  margin-left: 30px;
}
.block {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.18431);
  padding: 5px 20px;
  border-radius: 5px;
}
.btn {
  padding: 1px 30px;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}
.btn:hover {
  color: green;
}
.table {
  margin-top: 90px;
}
</style>
