<template>
  <div class="container">

    <!-- Компоненты взяты из пути: components/Views -->
    <transition :name="this.$store.state.animDirection">
      <keep-alive>
        <component :is="this.$store.state.view" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {

  // Получаем сценарии из базы данных
   async asyncData({store,$fire}) {
    await store.dispatch("get_scenarios", $fire);
    }
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
  transition: .5s;
}
.right-leave-active,
.left-leave-active {
  transition: .5s;
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
