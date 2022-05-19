<template>
  <div class="editor">
    <div class="popup" v-if="isSetCell" @click.self="isSetCell = false">
      <div class="form">
        <span class="head"
          >{{ selectScenario.table[selectedCell.key].header }}||
          {{ selectedCell.key2 + 1 }} из
          {{ tableColsLength }}</span
        >
        <textarea
          cols="90"
          rows="10"
          class="inputs"
          ref="tArea1"
          placeholder="Вопрос:"
          v-model="
            selectScenario.table[selectedCell.key].cols[selectedCell.key2]
              .question
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
            selectScenario.table[selectedCell.key].cols[selectedCell.key2]
              .answer
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
            selectScenario.table[selectedCell.key].cols[selectedCell.key2].score
          "
        />
        <div class="control-cell">
          <button @click="prevQuestion()">Предыдущий</button>
          <button @click="clear()">Очистить</button>
          <button @click="nextQuestion()">Следующий</button>
        </div>
      </div>
    </div>

    <div class="header">
      <div class="panel">
        <span> Сценарий:</span>
        <select class="select-css" v-model="selectScenario">
          <option
            v-for="scenario in scenarios"
            :key="scenario.id"
            :value="scenario"
          >
            {{ scenario.name }}
          </option>
        </select>
        <span class="btn" @click="clearAll()">Очистить</span>
        <span class="btn" @click="deleteScenarios()">Удалить</span>
      </div>

      <div class="panel">
        <input type="range" v-model="tableRows" max="10" min="2" />
        <span>Рядков:{{ tableRows }} </span>
        <input type="range" v-model="tableCols" max="10" min="4" />
        <span>Столбцов:{{ tableCols }}</span>

        <span class="btn" @click="addScenarios()">Создать</span>
      </div>

      <span
        class="btn"
        @click="
          $store.commit('OPEN_VIEW', {
            view: 'ViewsV-menu',
            animDirection: 'right',
          })
        "
        >Назад</span
      >
    </div>
    <div class="table">
      <input
        type="text"
        class="table-heading input"
        v-model="selectScenario.name"
        placeholder="Название"
        maxlength="30"
        ref="iName"
        @keypress.enter="$refs.table.setFocus('tableCategory0')"
      />

      <V-table
        :table="selectScenario.table"
        :readonly="false"
        @tableClick="openQuestion($event)"
        @enterPress="nextCategory($event)"
        ref="table"
      />
    </div>
  </div>
</template>

<script>
import deleteDocument from "../../backend/deleteDocument.js";
import setDocument from "../../backend/setDocument.js";

export default {
  name: "V-editor",
  data() {
    return {
      selectScenario: "",
      isSetCell: false,
      selectedCell: { key: 0, key2: 0 },
      tableRows: 5,
      tableCols: 6,
      updateList: [],
      scenarios: [],
    };
  },
  methods: {
    openQuestion(index) {
      this.selectedCell = { key: index[0], key2: index[1] };
      this.isSetCell = true;
      this.$nextTick(() => {
        this.$refs.tArea1.focus();
      });
    },
    nextCategory(key) {
      key + 1 < this.selectScenario.table.length
        ? this.$refs.table.setFocus("tableCategory" + (key + 1).toString())
        : this.openQuestion([0, 0]);
    },
    nextQuestion() {
      var row = this.selectedCell.key;
      var col = this.selectedCell.key2;

      if (col < this.tableColsLength - 1) {
        this.selectScenario.table[row].cols[col + 1].score =
          this.selectScenario.table[row].cols[col].score + 200;
        this.selectedCell.key2++;
      } else {
        this.selectedCell.key2 = 0;
        this.tableRowsLength - 1 > row ? this.selectedCell.key++ : "";
      }
      this.$refs.tArea1.focus();
    },
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
    clear() {
      let cell =
        this.selectScenario.table[this.selectedCell.key].cols[
          this.selectedCell.key2
        ];

      cell.question = "";
      cell.answer = "";
      cell.score = 100;
    },
    clearAll() {
      this.selectScenario.table.forEach((line) => {
        line.head = "";
        line.body.forEach((cell) => {
          cell.question = "";
          cell.answer = "";
          cell.score = 100;
        });
      });
      this.selectScenario.name = "";
      this.$forceUpdate();
    },
    deleteScenarios() {
      deleteDocument(this.$fire, "scenarios", this.selectScenario.id);

      this.scenarios = this.scenarios.filter((scenarios) => {
        return scenarios.id != this.selectScenario.id;
      });

      this.updateList = this.updateList.filter((id) => {
        return id != this.selectScenario.id;
      });

      this.scenarios.length > 0
        ? (this.selectScenario = this.scenarios[0])
        : (this.selectScenario = { name: "not found", table: [] });
    },
    addScenarios() {
      var _scenarios = { id: Date.now(), name: "", table: [] };
      for (var i = 0; i < this.tableRows; i++) {
        var line = { id: i, header: "", cols: [] };
        for (var j = 0; j < this.tableCols; j++) {
          line.cols.push({ question: "", answer: "", score: 100 });
        }
        _scenarios.table.push(line);
      }
      this.selectScenario = _scenarios;
      this.scenarios.push(_scenarios);
      this.$nextTick(() => {
        this.$refs.iName.focus();
      });
    },
  },
  watch: {
    selectScenario() {
      this.updateList.push(this.selectScenario.id);
    },
  },
  activated() {
    this.scenarios = structuredClone(this.$store.state.scenarios);
  },
  deactivated() {
    var _update = [...new Set(this.updateList)];

    this.scenarios.forEach((scenario) => {
      if (_update.indexOf(scenario.id) != -1) {
        setDocument(this.$fire, "scenarios", scenario);
      }
    });

    this.$store.commit("SET_SCENARIOS", this.scenarios);
  },
  computed: {
    tableRowsLength() {
      return this.selectScenario.table.length;
    },
    tableColsLength() {
      return this.selectScenario.table[this.selectedCell.key].cols.length;
    },
  },
};
</script>

<style scoped>
select {
  background-color: initial;
  color: inherit;
  text-align: center;
  font-size: 24px;
  min-width: 200px;
}
option {
  background-color: #6f6e8386;
}

input {
  background-color: initial;
  color: inherit;
  text-align: center;
  font-size: 28px;
}

.editor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff48;
  overflow: hidden;
  border-radius: 10px;
  width: 95%;
  height: 95%;
  max-width: 2400px;
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
  width: 100%;
  height: 100%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: 7%;
  font-size: var(--font-size-average);
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.431);
}
.panel {
  display: flex;
  align-items: center;
  padding: 10px;
  height: 30px;
  background-color: #ffffff2f;
  border-radius: 10px;
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
  background-color: initial;
  font-size: var(--font-size-average);
  margin: 0 30px;
}
.table {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 95%;
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
.form input {
  background-color: initial;
  font-size: var(--font-size-big);
  text-align: center;
  margin: 20px 0;
}
.control-cell button:hover {
  background-color: #2807e044;
  color: rgb(24, 21, 19);
}
/* end Table */
</style>
