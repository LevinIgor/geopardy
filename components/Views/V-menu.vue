<template>
  <div class="V-menu">
    <div class="commands">
      <V-command v-for="command in commands" :key="command.id" :command="command"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "V-menu",
  props:['commands'],
  data() {
    return {
      select: "",
      countCommands: 2,
    };
  },
};
</script>
<style scoped>
.V-menu {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.commands {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  min-height: 400px;
}

input {
  text-align: center;
  cursor: text;
  background-color: initial;
  color: white;
  font-size: var(--font-size-average);
  width: 100%;
}
</style>
