<template>
  <div class="command">
    <div class="img">
      <img :src="command.img" alt="" />
    </div>
    <div class="command-name">
      <input
        type="text"
        placeholder="Название"
        value="command.name"
        v-model="name"
      />
      <img
        src="../static/icons/random.png"
        alt=""
        class="icon"
        @click="randomName()"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "V-command",

  props: ["command", "index"],

  data() {
    return {
      name: this.command.name,
    };
  },

  methods: {
    randomName() {
      var names = this.$store.state.commandNames;
      var max = names.length;
      var rand = Math.floor(Math.random() * max);
      this.name = names[rand];
      this.$store.commit("UPDATE_COMMAND", {key: this.index, name:this.name});
    },
  },

  watch: {
    name() {
      this.$store.commit("UPDATE_COMMAND", { key: this.index, name: this.name });
    },
  },

};
</script>

<style scoped>
.command {
  background-color: rgba(207, 241, 250, 0.589);
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  max-width: 25%;
}
img {
  width: 100%;
  object-fit: cover;
}
input {
  text-align: center;
  font-size: var(--font-size-average);
  width: 100%;
}
.img {
  max-width: 300px;
}
.command-name {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px;
}
.icon {
  cursor: pointer;

  width: 25px;
  height: 25px;
}
</style>
