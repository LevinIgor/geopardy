export default async function deleteDocument(firebase, collection, documentId) {
  return new Promise(() => {
    firebase.firestore
      .collection(collection)
      .doc(documentId.toString())
      .delete()
  });
}
