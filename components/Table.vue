<template>
  <div class="table">
    <div class="line" v-for="item in table" :key="item.head">
      <span class="heading">{{ item.head }}</span>
      <span
        class="cell"
        @click="showQuestion(cell)"
        v-for="cell in item.body"
        :key="cell.scope"
        >{{ cell.scope }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    table: {
      type: Array,
      default() {
        return [
          {
            head: "Head 1",
            body: [
              {
                scope: 100,
                text: "text for 1 head",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 200,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 300,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 400,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 500,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 600,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 700,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 800,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
            ],
          },
          {
            head: "Head 2",
            body: [
              {
                scope: 100,
                text: "text for 1 head",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 200,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 300,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 400,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 500,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 600,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 700,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 800,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
            ],
          },
          {
            head: "Head 3",
            body: [
              {
                scope: 100,
                text: "text for 1 head",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 200,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 300,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 400,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 500,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 600,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 700,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 800,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
            ],
          },
          {
            head: "Head 4",
            body: [
              {
                scope: 100,
                text: "text for 1 head",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 200,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 300,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 400,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 500,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 600,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 700,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 800,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
            ],
          },
          {
            head: "Head 5",
            body: [
              {
                scope: 100,
                text: "text for 1 head",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 200,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 300,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 400,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 500,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 600,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 700,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 800,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
            ],
          },
          {
            head: "Head 6",
            body: [
              {
                scope: 100,
                text: "text for 1 head",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 200,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 300,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 400,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 500,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 600,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 700,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
              {
                scope: 800,
                text: "lkldsfj dslk jdsklfjdskl jfkljds",
                isActive: true,
                answer: "answer text",
              },
            ],
          },
        ];
      },
    },
  },

  methods: {
    showQuestion(cell) {
      if (cell.isActive) {
        this.$store.commit("SET_QUESTION", cell);
        this.$store.commit("SHOW_QUESTION");
      }
    },
  },
};
</script>

<style scoped>
span {
  font-size: 24px;
  cursor: pointer;
}
.table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-table);
  width: 100%;
  height: 100%;
}
.line {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-top: 10px;
}
</style>
