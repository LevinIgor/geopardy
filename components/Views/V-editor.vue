<template>
  <div class="editor">
    <!-- Попап для заполнения данных сценария -->
    <transition name="popup">
      <div class="popup" v-if="isSetCell" @click.self="isSetCell = false">
        <div class="form">
          <span class="head">
            {{ Scenario.table[selectedCell.key].header }}||
            {{ selectedCell.key2 + 1 }} из {{ tableColsLength }}</span
          >
          <div class="question-type">
            <span>Тип: </span>
            <span
              class="type-button"
              :class="{
                'type-active':
                  Scenario.table[selectedCell.key].cols[selectedCell.key2]
                    .type === 'text',
              }"
              @click="
                (type = 'text'),
                  (Scenario.table[selectedCell.key].cols[
                    selectedCell.key2
                  ].type = 'text')
              "
            >
              Текст
            </span>
            <span
              class="type-button"
              :class="{
                'type-active':
                  Scenario.table[selectedCell.key].cols[selectedCell.key2]
                    .type == 'audio',
              }"
              @click="
                (type = 'audio'),
                  (Scenario.table[selectedCell.key].cols[
                    selectedCell.key2
                  ].type = 'audio')
              "
            >
              Аудио
            </span>
            <span
              class="type-button"
              :class="{
                'type-active':
                  Scenario.table[selectedCell.key].cols[selectedCell.key2]
                    .type === 'special',
              }"
              @click="
                (type = 'special'),
                  (Scenario.table[selectedCell.key].cols[
                    selectedCell.key2
                  ].type = 'special')
              "
            >
              Особый
            </span>
          </div>
          <div
            class="input-type"
            :class="{
              show:
                Scenario.table[selectedCell.key].cols[selectedCell.key2]
                  .type === 'audio',
            }"
          >
            <input
              type="file"
              name=""
              id=""
              @change="uploadFile($event)"
              accept=".mp3"
            />
            <audio
              controls
              :src="
                Scenario.table[selectedCell.key].cols[selectedCell.key2].src
              "
            />
          </div>
          <div
            class="input-type"
            :class="{
              show:
                Scenario.table[selectedCell.key].cols[selectedCell.key2]
                  .type === 'special',
            }"
          >
            <input
              type="file"
              name=""
              id=""
              @change="uploadFile($event)"
              accept=".png"
            />
            <img
              :src="
                Scenario.table[selectedCell.key].cols[selectedCell.key2].src
              "
            />
          </div>
          <textarea
            cols="90"
            rows="10"
            class="inputs"
            ref="tArea1"
            placeholder="Вопрос:"
            v-model="
              Scenario.table[selectedCell.key].cols[selectedCell.key2].question
            "
            @keydown.esc="$refs.tArea1.blur()"
            @keypress.enter="$refs.tArea2.focus()"
            @keypress.enter.prevent=""
          />
          <textarea
            cols="90"
            rows="10"
            ref="tArea2"
            placeholder="Ответ:"
            class="inputs"
            v-model="
              Scenario.table[selectedCell.key].cols[selectedCell.key2].answer
            "
            @keydown.esc="$refs.tArea2.blur()"
            @keypress.enter="nextQuestion()"
            @keypress.enter.prevent=""
          />
          <input
            type="number"
            class="score inputs"
            placeholder="Очки:"
            v-model.number="
              Scenario.table[selectedCell.key].cols[selectedCell.key2].score
            "
          />
          <div class="control-cell">
            <button @click="prevQuestion()">Предыдущий</button>
            <button @click="clear()">Очистить</button>
            <button @click="nextQuestion()">Следующий</button>
          </div>
        </div>
      </div>
    </transition>
    <div class="table">
      <input
        type="text"
        class="table-heading input"
        v-model="Scenario.name"
        placeholder="Название"
        maxlength="30"
        ref="iName"
        @keypress.enter="$refs.table.setFocus('tableCategory0')"
      />

      <V-table
        :table="Scenario.table"
        :readonly="false"
        @tableClick="openQuestion($event)"
        @enterPress="nextCategory($event)"
        ref="table"
      />
    </div>
  </div>
</template>

<script>
import uploadFile from "../../backend/uploadFile.js";
import setScenarios from "../../backend/setScenarios.js";

export default {
  name: "V-editor",
  props: ["selectId"],
  data() {
    return {
      isSetCell: false,
      selectedCell: { key: 0, key2: 0 },
      Scenario: {},
      scenarios: [],
    };
  },
  methods: {
    // Загрузка фото или аудио в базу данных
    async uploadFile(event) {
      this.Scenario.table[this.selectedCell.key].cols[
        this.selectedCell.key2
      ].src = await uploadFile(this.$fire, event.target.files[0]);
      this.$forceUpdate();
    },

    // Открытие попапа, и установка фокуса на поле ввода
    openQuestion(index) {
      this.selectedCell = { key: index[0], key2: index[1] };
      this.isSetCell = true;
    },
    // Переход к следующей категории
    nextCategory(key) {
      key + 1 < this.Scenario.table.length
        ? this.$refs.table.setFocus("tableCategory" + (key + 1).toString())
        : this.openQuestion([0, 0]);
    },

    // Переход к следующему вопросу
    nextQuestion() {
      var row = this.selectedCell.key;
      var col = this.selectedCell.key2;

      if (col < this.tableColsLength - 1) {
        this.Scenario.table[row].cols[col + 1].score =
          this.Scenario.table[row].cols[col].score + 200;
        this.selectedCell.key2++;
      } else {
        this.selectedCell.key2 = 0;
        this.tableRowsLength - 1 > row ? this.selectedCell.key++ : "";
      }
      this.$refs.tArea1.focus();
    },

    // Переход к предыдущему вопросу
    prevQuestion() {
      var row = this.selectedCell.key;
      var col = this.selectedCell.key2;

      if (col > 0) {
        this.selectedCell.key2--;
      } else {
        this.selectedCell.key2 = this.tableColsLength - 1;
        row > 0 ? this.selectedCell.key-- : "";
      }
    },
    setScenario(id) {
      this.scenarios = JSON.parse(JSON.stringify(this.$store.state.scenarios));
      this.Scenario = this.scenarios.find((scenario) => scenario.id == id);
    },
    deleteScenario() {
      this.scenarios = this.scenarios.filter(
        (scenario) => scenario.id != this.Scenario.id
      );
    },
  },
  computed: {
    tableRowsLength() {
      return this.Scenario.table.length;
    },
    tableColsLength() {
      return this.Scenario.table[this.selectedCell.key].cols.length;
    },
  },
  watch: {
    selectId: {
      handler(newVal) {
        this.setScenario(newVal);
      },
      deep: true,
    },
  },
  mounted() {
    this.setScenario(this.selectId);
  },

  beforeDestroy() {
    this.$store.commit("SET_SCENARIOS", this.scenarios);
    setScenarios(this.$fire, this.scenarios);
  },
};
</script>

<style scoped>
input[type="number"],
input[type="text"] {
  background-color: initial;
  color: inherit;
  text-align: center;
  font-size: 28px;
  margin: 10px;
}
input[type="file"] {
  margin: 10px;
}
.input-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  z-index: -1;
  transition: 0.2s;
  opacity: 0;
  width: 100%;
}
.input-type img {
  width: 50px;
}
.show {
  opacity: 1;
  z-index: 1;
}

.editor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
}
.popup {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  width: 100%;
  height: 100%;
}

.question-type {
  display: flex;
  align-items: center;
  width: 100%;
}
.type-button {
  cursor: pointer;
  font-size: var(--font-size-average);
  margin-left: 10px;
  border-radius: 10px;
  padding: 5px 15px;
  background-color: rgba(99, 96, 116, 0.26667);
  color: rgb(56, 50, 44);
}
.type-active {
  background-color: rgba(59, 71, 63, 0.494);
  color: rgb(255, 255, 255);
}

.btn {
  cursor: pointer;
  margin-left: 20px;
  transition: 0.2s;
}
.btn:hover {
  color: rgba(255, 255, 255, 0.788);
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffffffa;
  color: black;
  border-radius: 10px;
  padding: 30px;
}
.form textarea {
  background-color: rgba(216, 251, 213, 0.33);
  font-size: var(--font-size-average);
  margin-bottom: 20px;
}
.table {
  box-sizing: border-box;
  width: 100%;
  height: 90vh;
}
.table input {
  margin: 0 auto;
  width: 100%;
}
.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}
.body {
  cursor: pointer;
  text-align: center;
  width: 100%;
  font-size: var(--font-size-big);
}
.body:hover {
  color: rgba(19, 157, 192, 0.65);
}
.control-cell button {
  cursor: pointer;
  border: none;
  font-size: var(--font-size-average);
  background-color: #63607444;
  color: rgb(56, 50, 44);
  padding: 10px 20px;
  border-radius: 10px;
  transition: 0.3s;
}
.control-cell button:hover {
  background-color: #2807e044;
  color: rgb(24, 21, 19);
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.2s;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
</style>
