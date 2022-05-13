export default async function deleteDocument(firebase, collection, document) {
  return new Promise((resolve) => {
    firebase.firestore
      .collection(collection)
      .doc(document.id.toString())
      .delete()
      .then(() => {
        resolve();
      });
  });
}
