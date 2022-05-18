<template>
  <div class="test" >
    <!-- <button @click="click()">click</button> -->
    <!-- <V-testTable  @tableClick="click($event)" @enterPress="click($event)" :readonly="false" ref="table" /> -->
    <V-command @imgClick="click($event)" />
  </div>
</template>

<script>

export default {

  methods: {
     click(obj) {
      console.log('click', obj)
    },
  },
};
</script>

<style scoped>
.test{
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
}
</style>
