<template>
  <div class="test">
    <!-- <button @click="click()">click</button> -->
    <!-- <V-testTable  @tableClick="click($event)" @enterPress="click($event)" :readonly="false" ref="table" /> -->
    <!-- <V-command @imgClick="click($event)" /> -->
    <audio
      controls
      src="https://firebasestorage.googleapis.com/v0/b/jeopardy-8fe27.appspot.com/o/piano.mp3?alt=media&token=464fde4e-1a9b-49ec-a1d4-74040564121d"
    >
      play
    </audio>
    <input type="file" name="" id="" @change="onFileChange($event)" />
  </div>
</template>

<script>
import uploadAudio from '../backend/uploadAudio'
export default {
  methods: {
    click(obj) {
      console.log("click", obj);
    },
    async onFileChange(e) {
     const ww = await uploadAudio(this.$fire, e.target.files[0])
    },
  },
};
</script>

<style scoped>
.test {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
