export default async function setDocument(firebase, collection, document) {
  return new Promise(() => {
    firebase.firestore.collection(collection).doc(document.id).set(document);
  });
}
