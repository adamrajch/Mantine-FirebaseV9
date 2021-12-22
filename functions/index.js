const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const db = admin.firestore();
// exports.editHeartCount = functions.firestore
//   .document('/programs/{documentId}')
//   .onCreate((snap, context) => {
//     // Grab the current value of what was written to Firestore.
//     const original = snap.data().original;

//     // Access the parameter `{documentId}` with `context.params`
//     functions.logger.log('Uppercasing', context.params.documentId, original);
//     //change the  b
//     const uppercase = original.toUpperCase();

//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to Firestore.
//     // Setting an 'uppercase' field in Firestore document returns a Promise.
//     return snap.ref.set({ uppercase }, { merge: true });
//   });

exports.addComment = functions.firestore
  .document('comments/{commentId}')
  .onCreate(async (change, context) => {
    const programID = change.data().programID;
    const program = await db.doc(`programs/${programID}`).get();

    console.log('program', program);
    return db.doc(`programs/${programID}`).set(
      {
        commentCount: program.data().commentCount + 1,
      },
      { merge: true }
    );
  });
exports.deleteComment = functions.firestore
  .document('comments/{commentId}')
  .onDelete(async (change, context) => {
    const programID = change.data().programID;
    const program = await db.doc(`programs/${programID}`).get();
    console.log('program', program);
    return db.doc(`programs/${programID}`).set(
      {
        commentCount: program.data().commentCount - 1,
      },
      { merge: true }
    );
  });
