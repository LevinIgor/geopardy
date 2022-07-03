export default async function getScenarios(firebase) {
  return new Promise((resolve, reject) => {
    let scenarios = [];
    firebase.firestore
      .collection('scenarios')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          scenarios.push(doc.data());
        });
        scenarios.length > 0 ? resolve(scenarios) : reject([{ name: "empty" }]);
      });
  });
}
