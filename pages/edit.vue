<template>
  <div class="container">
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
        />
        <textarea
          cols="90"
          rows="10"
          class="inputs"
          v-model="
            scenario.table[selectedCell.key].body[selectedCell.key2].answer
          "
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
    <div class="control">
         <select class="select-css" v-model="selectScenario">
        <option
          v-for="scenario in scenarios"
          :key="scenario.id"
          :value="scenario"
        >
          {{ scenario.name }}
        </option>
      </select>
      <button @click="clearAll()">Clear all</button>
      <button @click="save()">Save</button>
    </div>
    <div class="table ">
      <input type="text" class="inputs" v-model="scenario.name" placeholder="Название">
      <div class="line" v-for="(line, key) in scenario.table" :key="key">
        <input type="text" class="inputs" v-model="line.head" />
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
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
export default {
    
  data() {
    return {
      isSetCell: false,
      selectedCell: {},
      table: { rows: 5, cols: 8, name: "" },
      selectScenario: null,
      scenarios:[]
    };
  },
  methods: {
    openQuestion(key, key2) {
      this.selectedCell = {
        key: key,
        key2: key2,
      };
      this.isSetCell = true;
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
    clearAll() {
      this.scenario.table.forEach((line) => {
        line.body.forEach((cell) => {
          cell.question = "";
          cell.answer = "";
          cell.score = 100;
        });
      });
      this.scenario.name=""
     this.$forceUpdate()
    },
  },

  computed: {
    scenario() {
      return JSON.parse(JSON.stringify(this.$store.state.selectScenario));
    },
  },
  async mounted() {
    this.scenarios = [];
    const querySnapshot = await getDocs(
      collection(this.$fire.firestore, "scenarios")
    );
    querySnapshot.forEach((doc) => {
      this.scenarios.push(doc.data());
    });
    if(this.scenarios.length>0){
      this.selectScenario=this.scenarios[0];
    }
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
  display: flex;
  align-items: center;
  justify-content: right;
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
