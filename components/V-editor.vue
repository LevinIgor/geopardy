<template>
  <div class="editor">
    <div class="popup" v-if="isSetCell" @click.self="isSetCell = false">
      <div class="form">
        <span class="head"
          >{{ selectScenario.table[selectedCell.key].head }}||
          {{ selectedCell.key2 + 1 }} из
          {{ selectScenario.table[selectedCell.key].body.length }}</span
        >
        <textarea
          cols="90"
          rows="10"
          class="inputs"
          ref="tArea1"
          placeholder="Вопрос:"
          v-model="
            selectScenario.table[selectedCell.key].body[selectedCell.key2]
              .question
          "
          @keydown.esc="$refs.tArea1.blur()"
          @keypress.enter="nextArea()"
          @keypress.enter.prevent=""
        />
        <textarea
          cols="90"
          rows="10"
          ref="tArea2"
          placeholder="Ответ:"
          class="inputs"
          v-model="
            selectScenario.table[selectedCell.key].body[selectedCell.key2]
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
            selectScenario.table[selectedCell.key].body[selectedCell.key2].score
          "
        />
        <div class="control-cell">
          <button @click="prevQuestion()">Предидущий</button>
          <button @click="clear()">Очистить</button>
          <button @click="nextQuestion()">Следующий</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="header">
        <div class="ctrl-panel">
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
          <span class="btn clear" @click="clearAll()">Очистить</span>
          <span class="btn delete" @click="deleteScenarios()"> Удалить</span>
        </div>

        <div class="ctrl-panel">
          <input type="range" v-model="tableRows" max="10" min="2" />
          <span>Рядков:{{ tableRows }} </span>
          <input type="range" v-model="tableCols" max="10" min="4" />
          <span>Столбцов:{{ tableCols }}</span>

          <span class="btn add" @click="addScenarios()">Создать</span>
        </div>

        <span class="btn done" @click="$store.commit('OPEN_VIEW', 'V-menu')"
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
          @keypress.enter="$refs.iCategory0[0].focus()"
        />
        <div
          class="line"
          v-for="(line, key) in selectScenario.table"
          :key="key"
        >
          <input
            type="text"
            class="table-head input"
            v-model="line.head"
            placeholder="Категория"
            maxlength="25"
            :ref="'iCategory' + key"
            @keypress.enter="nextCategory(key)"
          />
          <div
            class="body"
            v-for="(cell, key2) in line.body"
            :key="key2"
            @click="openQuestion(key, key2)"
          >
            {{ cell.score }}
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
      selectScenario: "",
      isSetCell: false,
      selectedCell: {},
      tableRows: 5,
      tableCols: 6,
      updateList: [],
      scenarios: [],
    };
  },
  methods: {
    openQuestion(key, key2) {
      this.selectedCell = {
        key: key,
        key2: key2,
      };
      this.isSetCell = true;
      this.$nextTick().then(() => {
        this.$refs.tArea1.focus();
      });
    },
    nextCategory(key) {
      key + 1 < this.selectScenario.table.length
        ? this.$refs["iCategory" + (key + 1).toString()][0].focus()
        : this.openQuestion(0,0)
    },
    nextQuestion() {
      var key = this.selectedCell.key;
      var key2 = this.selectedCell.key2;

      if (key2 < this.selectScenario.table[key].body.length - 1) {
        this.selectedCell.key2++;
        this.selectScenario.table[this.selectedCell.key].body[
          this.selectedCell.key2
        ].score = this.selectScenario.table[key].body[key2].score + 200;
      } else {
        this.selectedCell.key2 = 0;
        if (key < this.selectScenario.table.length - 1) {
          this.selectedCell.key++;
        }
      }
      this.$refs.tArea1.focus();
    },
    prevQuestion() {
      var key = this.selectedCell.key;
      var key2 = this.selectedCell.key2;

      if (key2 > 0) {
        this.selectedCell.key2--;
      } else {
        this.selectedCell.key2 = this.selectScenario.table[key].body.length - 1;
        if (key > 0) {
          this.selectedCell.key--;
        }
      }
    },
    clear() {
      this.selectScenario.table[this.selectedCell.key].body[
        this.selectedCell.key2
      ].question = "";
      this.selectScenario.table[this.selectedCell.key].body[
        this.selectedCell.key2
      ].answer = "";
      this.selectScenario.table[this.selectedCell.key].body[
        this.selectedCell.key2
      ].score = 100;
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
      this.$fire.firestore
        .collection("scenarios")
        .doc(this.selectScenario.id.toString())
        .delete();

      this.scenarios = this.scenarios.filter((scenarios) => {
        return scenarios.id != this.selectScenario.id;
      });

      this.updateList = this.updateList.filter((id) => {
        return id != this.selectScenario.id;
      });

      this.scenarios.length > 0
        ? (this.selectScenario = this.scenarios[0])
        : (this.selectScenario = { name: "", table: [] });
    },
    addScenarios() {
      var _scenarios = { id: Date.now(), name: "", table: [] };
      for (var i = 0; i < this.tableRows; i++) {
        var line = { name: "", body: [] };
        for (var j = 0; j < this.tableCols; j++) {
          line.body.push({ question: "", answer: "", score: 100 });
        }
        _scenarios.table.push(line);
      }
      this.selectScenario = _scenarios;
      this.scenarios.push(_scenarios);
      this.$nextTick(() => {
        this.$refs.iName.focus();
      });
    },
    nextArea() {
      this.$refs.tArea2.focus();
    },
  },
  watch: {
    selectScenario() {
      this.updateList.push(this.selectScenario.id);
    },
  },
  activated() {
    this.scenarios = JSON.parse(JSON.stringify(this.$store.state.scenarios));
  },
  deactivated() {
    var _update = [...new Set(this.updateList)];

    this.scenarios.forEach((scenario) => {
      if (_update.indexOf(scenario.id) != -1) {
        this.$fire.firestore
          .collection("scenarios")
          .doc(scenario.id.toString())
          .set(scenario);
      }
    });

    this.$store.commit("SET_SCENARIOS", this.scenarios);
  },
};
</script>

<style scoped>
/* Main prop */
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
.icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.input {
  background-color: initial;
  outline: none;
  border: none;
  color: inherit;
  text-align: center;
  font-size: 28px;
}
/* end Main prop */

/* Containers */
.editor {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
/* end Containers */

/* Main form */
.container {
  overflow: hidden;
  background-color: #ffffff48;
  width: 90%;
  height: 90%;
  border-radius: 10px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5%;
  font-size: var(--font-size-average);
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.431);
}
.ctrl-panel {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff2f;
  margin-right: 20px;
  border-radius: 10px;
}
.btn {
  cursor: pointer;
  margin-left: 20px;
}
.clear:hover {
  color: #5650cf;
}
.delete:hover {
  color: #f72585;
}
.add:hover {
  color: #f3f62e;
}
.done:hover {
  color: #3bdb0a;
}

/* end Main form */

/* TABLE */
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
  outline: none;
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
  outline: none;
  background-color: initial;
  border: none;
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
