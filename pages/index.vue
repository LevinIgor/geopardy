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
          <button class="btn" @click="$router.push('/create')">Добавить</button>
          <button class="btn" @click="gotoEditPage()">Редактировать</button>
          <button class="btn" @click="deleteScenario()">Удалить</button>
        </div>
      </div>
      <div class="commands">
        <div class="command" v-for="(command, key) in commands" :key="key">
          <div class="img">
            <img :src="command.img" alt="" />
            <div class="hover">
              <svg
                style="width: 28px; height: 28px"
                viewBox="0 0 24 24"
                @click="addCommand()"
              >
                <path
                  fill="white"
                  d="M19 17V19H7V17S7 13 13 13 19 17 19 17M16 8A3 3 0 1 0 13 11A3 3 0 0 0 16 8M19.2 13.06A5.6 5.6 0 0 1 21 17V19H24V17S24 13.55 19.2 13.06M18 5A2.91 2.91 0 0 0 17.11 5.14A5 5 0 0 1 17.11 10.86A2.91 2.91 0 0 0 18 11A3 3 0 0 0 18 5M8 10H5V7H3V10H0V12H3V15H5V12H8Z"
                />
              </svg>
              <svg style="width: 28px; height: 28px" viewBox="0 0 24 24">
                <path
                  fill="white"
                  d="M22.7 14.3L21.7 15.3L19.7 13.3L20.7 12.3C20.8 12.2 20.9 12.1 21.1 12.1C21.2 12.1 21.4 12.2 21.5 12.3L22.8 13.6C22.9 13.8 22.9 14.1 22.7 14.3M13 19.9V22H15.1L21.2 15.9L19.2 13.9L13 19.9M21 5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H11V19.1L12.1 18H5L8.5 13.5L11 16.5L14.5 12L16.1 14.1L21 9.1V5Z"
                />
              </svg>
              <svg
                style="width: 28px; height: 28px"
                viewBox="0 0 24 24"
                @click="setRandomName(key)"
              >
                <path
                  fill="white"
                  d="M12.68 6H11.32L7 16H9L9.73 14H14.27L15 16H17L12.68 6M10.3 12.5L12 8L13.7 12.5H10.3M17.4 20.4L19 22H14V17L16 19C18.39 17.61 20 14.95 20 12C20 7.59 16.41 4 12 4S4 7.59 4 12C4 14.95 5.61 17.53 8 18.92V21.16C4.47 19.61 2 16.1 2 12C2 6.5 6.5 2 12 2S22 6.5 22 12C22 15.53 20.17 18.62 17.4 20.4Z"
                />
              </svg>
              <svg
                style="width: 28px; height: 28px"
                viewBox="0 0 24 24"
                @click="removeCommand(key)"
              >
                <path
                  fill="white"
                  d="M24 17V19H21V17C21 15.45 20.3 14.06 19.18 13.06C24 13.55 24 17 24 17M18 5C19.66 5 21 6.34 21 8C21 9.66 19.66 11 18 11C17.69 11 17.38 10.95 17.1 10.86C17.67 10.05 18 9.07 18 8C18 6.94 17.67 5.95 17.1 5.14C17.38 5.05 17.69 5 18 5M13 5C14.66 5 16 6.34 16 8C16 9.66 14.66 11 13 11C11.34 11 10 9.66 10 8C10 6.34 11.34 5 13 5M19 17V19H7V17C7 14.79 9.69 13 13 13C16.31 13 19 14.79 19 17M.464 13.12L2.59 11L.464 8.88L1.88 7.46L4 9.59L6.12 7.46L7.54 8.88L5.41 11L7.54 13.12L6.12 14.54L4 12.41L1.88 14.54Z"
                />
              </svg>
            </div>
          </div>

          <input type="text" placeholder="Название" v-model="command.name" />
        </div>
      </div>
      <button class="run" @click="gotoGamePage()">Начать</button>
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
          name: "",
          score: 0,
        },
      ],
      select: null,
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
      this.commands.push({
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmChM1Ra6xJMtkYLBMPgllFPyCg63L2yanjw&usqp=CAU",
        name: "",
        score: 0,
      });
    },
    // удаление команды
    removeCommand(key) {
      if (this.commands.length > 1) {
        this.commands.splice(key, 1);
      }
    },
    // задание случайного имени команде
    setRandomName(key) {
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
        doc(
          this.$fire.firestore,
          "scenarios",
          this.select.id.toString()
        )
      )
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
    scenarios.length>0 ? this.select = scenarios[0] : this.select = null;
  },
  computed: {
    scenarios() {
      return this.$store.state.scenarios;
    }
  },
};
</script>
<style scoped>
img {
  width: 200px;
}
input {
  border: none;
  outline: none;
  text-align: center;
  padding: 5px;
}
svg {
  padding-left: 5px;
  cursor: pointer;
}
.container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #f72585, #7209b7, #3f37c9, #4cc9f0);
  background-size: 400% 400%;
  /* animation: gradient 15s ease infinite; */
  width: 100%;
  height: 100vh;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.start {
  background-color: #ffffff5d;
  min-width: 50%;
  min-height: 40%;
  max-width: 80%;
  backdrop-filter: blur(12px);
  border-radius: 10px;
  overflow: hidden;
}
.select-css{
  outline: none;
  font-size: 24px;
  min-width: 25%;

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
  background-color: rgb(255, 255, 168);
  margin: 20px;
}
.hover {
  position: absolute;
  justify-content: right;
  box-sizing: border-box;
  display: flex;
  transition: 0.2s;
  opacity: 0;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.212);
  z-index: 1;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.img {
  position: relative;
}
.img:hover .hover {
  opacity: 1;
}
</style>
