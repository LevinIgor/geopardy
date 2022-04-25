<template>
  <div class="container">
    <div class="control">
      <label>Size</label>
      <input
        class="i-control"
        max="10"
        min="2"
        type="number"
        v-model="table.rows"
      />
      X
      <input
        class="i-control"
        max="15"
        min="2"
        type="number"
        v-model="table.cols"
      />

      <label> Name</label>
      <input type="text" v-model="table.name" />
      <button @click="createTable()">OK</button>
      <button @click="save">Save</button>
    </div>
    <div class="table">
      <span class="head-table">{{ scenario.name }}</span>
      <div class="line" v-for="(line, key) in scenario.table" :key="key">
        <input
          type="text"
          class="inputs"
          v-model="line.head"
          @keypress.enter="nextHead(key)"
          :ref="'head' + key.toString()"
        />
        <div
          class="body"
          v-for="(cell, key2) in line.body"
          :key="key2"
          @click="selectCell(key, key2)"
        >
          {{ cell.score }}
        </div>
      </div>
    </div>
    <div class="popup" v-if="isSetCell" @click.self="isSetCell = false">
      <div class="form">
        <span class="head"
          >{{ scenario.table[selectedCell.key].head }}||
          {{ selectedCell.key2 + 1 }} из
          {{ scenario.table[selectedCell.key].body.length }}</span
        >
        <textarea
          cols="90"
          rows="10"
          class="inputs"
          v-model="
            scenario.table[selectedCell.key].body[selectedCell.key2].question
          "
          @keypress.enter="
            scenario.table[selectedCell.key].body[selectedCell.key2].question
              .length > 0
              ? $refs['tArea2'].focus()
              : ''
          "
          @keypress.enter.prevent=""
          ref="tArea1"
        />
        <textarea
          cols="90"
          rows="10"
          class="inputs"
          v-model="
            scenario.table[selectedCell.key].body[selectedCell.key2].answer
          "
          @keypress.enter="nextQuestion()"
          @keypress.enter.prevent=""
          ref="tArea2"
        />
        <input
          type="number"
          class="score inputs"
          placeholder="score"
          @blur="blur($event)"
          v-model="
            scenario.table[selectedCell.key].body[selectedCell.key2].score
          "
        />
        <div class="control-cell">
          <button @click="prevQuestion()">Prev</button>
          <button @click="clear()">Clear</button>
          <button @click="nextQuestion()">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scenario: {},
      isSetCell: false,
      selectedCell: {},
      table: { rows: 5, cols: 8, name: "" },
    };
  },
  methods: {
    async selectCell(key, key2) {
      this.selectedCell = {
        key: key,
        key2: key2,
      };
      this.isSetCell = true;
      setTimeout(() => {
        this.$refs["tArea1"].focus();
      }, 100);
    },
    blur(event) {
      if (!event.target.value > 0) {
        event.target.value = 1;
      }
    },
    nextQuestion() {
      var key = this.selectedCell.key;
      var key2 = this.selectedCell.key2;

      if (key2 < this.scenario.table[key].body.length - 1) {
        this.selectedCell.key2++;
        this.scenario.table[this.selectedCell.key].body[
          this.selectedCell.key2
        ].score = this.scenario.table[key].body[key2].score + 200;
      } else {
        this.selectedCell.key2 = 0;
        if (key < this.scenario.table.length - 1) {
          this.selectedCell.key++;
        }
      }
      this.$refs["tArea1"].focus();
    },
    prevQuestion() {
      var key = this.selectedCell.key;
      var key2 = this.selectedCell.key2;

      if (key2 > 0) {
        this.selectedCell.key2--;
      } else {
        this.selectedCell.key2 = this.scenario.table[key].body.length - 1;
        if (key > 0) {
          this.selectedCell.key--;
        }
      }
    },
    clear() {
      this.scenario.table[this.selectedCell.key].body[
        this.selectedCell.key2
      ].question = "";
      this.scenario.table[this.selectedCell.key].body[
        this.selectedCell.key2
      ].answer = "";
      this.scenario.table[this.selectedCell.key].body[
        this.selectedCell.key2
      ].score = 100;
    },

    nextHead(key) {
      if (key < this.scenario.table.length - 1) {
        this.$refs["head" + (key + 1).toString()][0].focus();
      } else {
        this.$refs["head" + key.toString()][0].blur();
      }
    },
    createTable() {
      if (this.table.name.length > 0) {
        this.scenario = { name: this.table.name, table: [] };

        for (let I = 0; I < this.table.rows; I++) {
          var body = [];
          for (let i = 0; i < this.table.cols; i++) {
            body.push({ question: "", answer: "", score: 100 });
          }
          this.scenario.table.push({ head: "", body: body });
        }
      }
    },
    save() {
      var id = Date.now();
      this.scenario.id = id;
      this.$fire.firestore
        .collection("scenarios")
        .doc(id.toString())
        .set(this.scenario);
    },
  },
};
</script>

<style scoped>
.inputs {
  font-size: 24px;
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
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
.control {
  background-color: aliceblue;
  display: flex;
  align-items: center;
  width: 90%;
  padding: 20px 0;
}
.i-control {
  width: 2em;
  font-size: 20px;
}
.head-table {
  font-size: 44px;
  text-align: center;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: antiquewhite;
  padding: 30px;
}
.table {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: var(--color-background-table);
  font-size: 30px;
  width: 90%;
  height: 90%;
}
.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}
.head {
  min-width: 300px;
}
.body {
  width: 100%;
  text-align: center;
}
</style>
