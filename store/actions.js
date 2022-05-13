

export default {
  async get_scenarios(state, firebase) {

    let scenarios = [];

    await firebase.firestore
      .collection("scenarios")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          scenarios.push(doc.data());
        });
      });

    state.commit("SET_SCENARIOS", scenarios);
    
  },
};
