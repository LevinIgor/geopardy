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
             
              
              min="2"
              max="6"
              v-model="countCommands"
              @change="addCommand"
            />
          </div>
          <div class="btn">
            <img class="icon" src="../static/icons/editor.png" alt="" />
            <span class="editor" @click="$router.push('/editor')"
              >Редактор сценариев</span
            >
          </div>

          <span class="btn run" @click="gotoGamePage()">Начать</span>
        </div>
      </div>
      <div class="commands">
        <div class="command" v-for="(command, key) in commands" :key="key">
          <div class="img">
            <img :src="command.img" alt="" />
          </div>
          <div class="command-name">
            <input type="text" placeholder="Название" v-model="command.name" />
            <img
              src="../static/icons/random.png"
              alt=""
              class="random-name icon"
              @click="randomName(key)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
export default {
  data() {
    return {
      commands: [
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmChM1Ra6xJMtkYLBMPgllFPyCg63L2yanjw&usqp=CAU",
          name: this.getRandomName(),
          score: 0,
        },
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmChM1Ra6xJMtkYLBMPgllFPyCg63L2yanjw&usqp=CAU",
          name: this.getRandomName(),
          score: 0,
        },
      ],
      select: null,
      countCommands: 2,
    };
  },
  methods: {
    // переход на страницу игры
    gotoGamePage() {
      this.$store.commit("SET_COMMANDS", this.commands);
      this.$router.push("/game");
    },
    // переход на страницу редактирования
    gotoEditPage() {
      this.$router.push("/edit");
    },
    // добавление команды
    addCommand() {
      this.commands = [];
      for (let i = 0; i < this.countCommands; i++) {
        this.commands.push({
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmChM1Ra6xJMtkYLBMPgllFPyCg63L2yanjw&usqp=CAU",
          name: this.getRandomName(),
          score: 0,
        });
      }
    },
    // задание случайного имени команде
    randomName(key) {
      this.commands[key].name = this.getRandomName();
    },
    // получение случайного имени
    getRandomName() {
      var max = this.$store.state.commandNames.length;
      var rand = Math.floor(Math.random() * max);
      return this.$store.state.commandNames[rand];
    },
    async deleteScenario() {
      this.$store.commit("DELETE_SCENARIO");
      await deleteDoc(
        doc(this.$fire.firestore, "scenarios", this.select.id.toString())
      );
      this.select = null;
    },
    changeSelect() {
      this.$store.commit("SET_SCENARIO", this.select);
    },
  },
  async mounted() {
    var scenarios = [];
    const querySnapshot = await getDocs(
      collection(this.$fire.firestore, "scenarios")
    );
    querySnapshot.forEach((doc) => {
      scenarios.push(doc.data());
    });
    this.$store.commit("SET_SCENARIOS", scenarios);
    scenarios.length > 0 ? (this.select = scenarios[0]) : (this.select = null);
  },
  computed: {
    scenarios() {
      return this.$store.state.scenarios;
    },
  },
};
</script>
<style scoped>
input {
  border: none;
  outline: none;
  text-align: center;
  padding: 5px;
}
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
  background: linear-gradient(-45deg, #f72585, #7209b7, #3f37c9, #4cc9f0);
  background-size: 400% 400%;
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
  min-width: 70%;
  min-height: 70%;
  max-width: 80%;
  border-radius: 10px;
  overflow: hidden;
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
option{
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
}
.command {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 25%;
  background-color: rgba(255, 255, 255, 0.589);
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
}


.img {
  position: relative;
  object-fit: cover;
  margin-bottom: 20px;
}
.img img {
  width: 100%;
}
.command-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 5px;
}
.command-name input {
  font-size: 22px;
  width: 100%;
}
.random-name {
  opacity: 1;
}
</style>
