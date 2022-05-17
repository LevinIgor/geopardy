<template>
  <div class="container">
    <transition :name="this.$store.state.animDirection">
      <keep-alive>
        <component :is="this.$store.state.view" />
      </keep-alive>
    </transition>

  <div class="imgs">
    <img v-for="src in this.$store.state.randomImgs" :key="src" :src="src" alt="">
  </div>

  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("get_scenarios", this.$fire);
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgs{
  visibility: hidden;
  position: absolute;
}

.right-enter-active,
.left-enter-active {
  transition: 0.5s;
}
.right-leave-active,
.left-leave-active {
  transition: 0.6s;
}
.right-enter,
.left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.right-leave-to,
.left-enter {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
