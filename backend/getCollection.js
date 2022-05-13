export default async function getCollection(firebase, collection) {
  return new Promise((resolve, reject) => {
    let scenarios = [];
    firebase.firestore
      .collection(collection)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          scenarios.push(doc.data());
        });
        scenarios.length > 0 ? resolve(scenarios) : reject([{ name: "empty" }]);
      });
  });
}
