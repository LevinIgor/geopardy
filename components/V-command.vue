<template>
  <div class="command">
    <slot></slot>
    <div class="img" @click="$emit('imgClick',command.id)">
      <img :src="command.img" alt="" />
    </div>
    <div class="name">
      <input
        type="text"
        placeholder="Название"
        ref="name"
        :value="command.name"
        :readonly="readonly"
        @keyup.enter="$refs['name'].blur()"
        @input="
          $store.commit('SET_COMMAND_NAME', {
            key: command.id,
            name: $event.target.value,
          })
        "
      />
      <div class="img-icon" @click="$emit('randomName',command.id)">
        <img src="../static/icons/random.png" alt="" class="icon" v-if="!readonly"/>
      </div>
    </div>
    <span class="score" v-if="readonly">{{ command.score }}</span>
  </div>
</template>

<script>
export default {
  props: {
    command: {
      type: Object,
      require: true,
      default: () => ({
        id: 0,
        img: "",
        name: "testName",
        score: 100,
      }),
    },
    readonly:{
      type: Boolean,
      default: true,
    },

  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
span,
input {
  text-align: center;
  color: white;
  background-color: initial;
  width: 100%;
}
.icon {
  cursor: pointer;
  width: 25px;
  height: 25px;
}
.command {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: rgba(207, 241, 250, 0.589);
  border-radius: 10px;
  padding: 20px;
  height: 300px;
  width: 250px;
}
.img{
  height: 200px;
}

.name {
  display: flex;
  align-items: center;

  margin-top: 10px;
}
.name input {
  font-size: 32px;
}
.score {
  font-size: 28px;
}
</style>
