<template>
  <div class="container">
    <div class="scenes">
      <Table v-if="$store.state.activeWindows.table" />
      <Question v-else />
    </div>
    <div class="commands">
      <div class="command">
        <h2>command</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            scene: 'table',
        }
    },
    methods:{
        selectScene(scene){
            this.scene = scene;
        }
    }
};
</script>

<style scoped>
.container{
    position: absolute;
    background-color: var(--color-form-main);
    width: 90%;
    height: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.scenes{
  height: 70%;
}
.commands{
  height: 30%;
}
</style>
