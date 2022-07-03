export default async function deleteScenario(firebase, documentId) {
  return new Promise(() => {
    firebase.firestore
      .collection('scenarios')
      .doc(documentId.toString())
      .delete()
  });
}
