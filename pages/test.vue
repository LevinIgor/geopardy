<template>
  <div class="test">
    <button @click="click()">click</button>
  </div>
</template>

<script>

export default {

  methods: {
     click() {
      console.log('click')
    },
  },
};
</script>

<style scoped></style>
