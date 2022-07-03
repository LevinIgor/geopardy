export default async function setScenario(firebase, scenarios) {
  return new Promise(async () => {
    for (let i = 0; i < scenarios.length; i++) {
      await firebase.firestore
        .collection("scenarios")
        .doc(scenarios[i].id.toString())
        .set(scenarios[i]);
    }
  });
}
