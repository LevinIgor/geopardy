<template>
  <div class="container">
    <transition :name="this.$store.state.animDirection">
      <keep-alive>
        <component :is="this.$store.state.view" />
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
    ).catch((error)=>{console.log(error);});
    querySnapshot.forEach((doc) => {
      scenarios.push(doc.data());
    });
    this.$store.commit("SET_SCENARIOS", scenarios);
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


.right-enter-active, .left-enter-active{
  transition: .5s;
}
.right-leave-active, .left-leave-active{
  transition: .6s;
}
.right-enter {
  opacity: 0;
  transform: translateX(100%);
}
.right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.left-enter{
  opacity: 0;
  transform: translateX(-100%);
}
.left-leave-to{
  opacity: 0;
  transform: translateX(100%);
}
</style>
