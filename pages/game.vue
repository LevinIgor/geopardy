<template>
<div class="game">
   <div class="popup" v-if="isPopup" @click="isPopup=false"></div>
   <div class="container">
    <div class="scenes">

      <Table v-if="$store.state.activeScene == 'table'" />

      <div class="question text" v-if="$store.state.activeScene == 'question'" @click="$store.commit('SHOW_ANSWER')">
        {{ question.question }}
      </div>

      <div class="answer text" v-if="$store.state.activeScene == 'answer'" @click="$store.commit('SHOW_TABLE')">
        {{ question.answer }}
      </div>
    </div>
    <div class="commands">
      <div
        class="command"
        v-for="(command, key) in $store.state.commands"
        :key="key"
        :class="{'active': activeKey == key }"
      >
      <div class="img">
        <img :src="command.img" alt="" @click="getAnswer(key)" />
        <div class="answer-control" v-if="isPopup"  >
          <button class="yes" @click="correct(key)" >yes</button>
          <button class="no" @click="incorrect(key)">no</button>
        </div>
      </div>
        <span>{{ command.name }}</span>
        <span>{{ command.score }}</span>
      </div>
    </div>
  </div>
</div>
 
</template>

<script>
export default {
  data() {
    return {
      activeKey:'',
      isPopup: false,
    };
  },
  methods: {
    getAnswer(key) {
      if (this.$store.state.activeScene == 'question') {
        this.activeKey = key;
        this.isPopup = true
      }
    },
    correct(key) {
      this.$store.commit('CORRECT', {key:key,value:this.question.score});
      this.isPopup = false;
      this.$store.commit('SHOW_ANSWER');
     
    },
    incorrect(key) {
      this.$store.commit('INCORRECT', {key:key,value:this.question.score});
      this.isPopup = false;
    }
  },
  computed: {
    question() {
      return this.$store.state.question;
    },
  },
};
</script>

<style scoped>
span {
  text-align: center;
  font-size: 24px;
}
button{
  width: 100px;
  height: 30px;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
}
.game{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.popup{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 10;
}
.container {
  background-color: var(--color-form-main);
  box-sizing: border-box;
  width: 90%;
  height: 90%;

}
.scenes {
  background-color: aliceblue;
  box-sizing: border-box;
  height: 70%;
  padding-bottom: 50px;
}
.text{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 44px;
}
.commands {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
  margin-bottom: 20px;
  height: 30%;
}
.command {
  display: flex;
  flex-direction: column;
  background-color: antiquewhite;
  cursor: pointer;
  padding: 10px;
}
.active{
  z-index: 11;
}
.active .answer-control{
  opacity: 1;
}
.img{
  position: relative;
}
.answer-control{
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--color-form-secondary);
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
