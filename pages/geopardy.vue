<template>
  <div class="container">
    <transition name="component-fade">
      <keep-alive>
        <component v-bind:is="view" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { collection, getDocs} from "firebase/firestore";
export default {
  async created() {
    var scenarios = [];
    const querySnapshot = await getDocs(
      collection(this.$fire.firestore, "scenarios")
    );
    querySnapshot.forEach((doc) => {
      scenarios.push(doc.data());
    });
    this.$store.commit("SET_SCENARIOS", scenarios);
  },
  computed:{
    view(){
      return this.$store.state.view
    }
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


.component-fade-enter-active{
  transition: 1s;
}
.component-fade-leave-active{
  transition: 1s;
}
.component-fade-enter
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%);
}
.component-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
