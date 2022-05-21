export default async function uploadFile(firebase, file) {
    return new Promise((resolve) => {
        var ref = file.name + Date.now()
        firebase.storage
          .ref(ref)
          .put(file)
          .then(() => {
            firebase.storage
              .ref(ref)
              .getDownloadURL()
              .then((url) => {
                resolve(url) 
              });
          });
    })
   
  }