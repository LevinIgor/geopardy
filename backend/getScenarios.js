export default async function getScenarios(base) {
  return new Promise((resolve, reject) => {
    let scenarios = [];
    base.firestore
      .collection("scenarios")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          scenarios.push(doc.data());
        });
        scenarios.length > 0 ? resolve(scenarios) : reject([{name:'empty'}]);
        
      });
  });
}
