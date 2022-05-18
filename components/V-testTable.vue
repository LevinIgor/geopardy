<template>
  <div class="table">
    <div class="row" v-for="row in table" :key="row.id">
      <input
        type="text"
        v-model="row.header"
        class="row-header"
        :readonly="readonly"
        :ref="'tableCategory' + row.id"
        @keypress.enter="$emit('enterPress', row.id)"
      />
      <span
        class="column"
        v-for="(column, index) in row.cols"
        :key="index"
        @click="$emit('tableClick', { rowIndex: row.id, colIndex: index })"
        >{{ column }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    table: {
      type: Array,
      require: true,
      default: () => [
        {
          id: 0,
          header: "test row head;lk;lk;lk;lk;lk;lker",
          cols: [100, 200, 300, 400, 500, 600],
        },
        {
          id: 1,
          header: "test row header",
          cols: [100, 200, 300, 400, 500, 600],
        },
        {
          id: 2,
          header: "test row header",
          cols: [100, 200, 300, 400, 500, 600],
        },
        {
          id: 3,
          header: "test row header",
          cols: [100, 200, 300, 400, 500, 600],
        },
        {
          id: 4,
          header: "test row header",
          cols: [100, 200, 300, 400, 500, 600],
        },
        {
          id: 5,
          header: "test row header",
          cols: [100, 200, 300, 400, 500, 600],
        },
        {
          id: 6,
          header: "test row header",
          cols: [100, 200, 300, 400, 500, 600],
        },
      ],
    },
    readonly: {
      type: Boolean,
      default: true,
    },
  },
  methods:{
    setFocus(element){      
      this.$refs[element][0].focus()
    }
  }
};
</script>

<style scoped>
input,
span {
  resize: none;
  text-align: center;
  color: white;
  background-color: initial;
}
.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.header {
  font-size: 44px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}
.row-header {
  min-width: max-content;
  text-align: center;
  font-size: 44px;
}

.column {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
  font-size: 25px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
}

.column:hover {
  background-color: rgba(0, 0, 0, 0.404);
}
</style>
