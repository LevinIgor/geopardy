export default async function setScenario(firebase, document) {
  return new Promise(() => {
    firebase.firestore.collection('scenarios').doc(document.id.toString()).set(document);
  });
}
