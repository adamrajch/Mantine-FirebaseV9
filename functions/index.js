const functions = require('firebase-functions');
const admin = require('firebase-admin');
const liftsList = require('./LiftsData.ts');
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

//update proram Heart if user likes/ decrement if not
// exports.incrementProgramHeart = functions.firestore
//   .document('users/{userId}')
//   .onUpdate(async (change, context) => {
//     const newArr = change.after.data().likedPrograms;
//     const prevArr = change.before.data().likedPrograms;

//     const programID = change.data().programID;
//     const program = await db.doc(`programs/${programID}`).get();
//     if (newArr.length > prevArr.length) {
//       return db.doc(`programs/${programID}`).set(
//         {
//           heartCount: program.data().heartCount + 1,
//         },
//         { merge: true }
//       );
//     } else if (newArr.length < prevArr.length) {
//       return db.doc(`programs/${programID}`).set(
//         {
//           heartCount: program.data().heartCount - 1,
//         },
//         { merge: true }
//       );
//     } else {
//       return;
//     }
//   });

//add subscribed program to user document
exports.addSubscribedProgram = functions.firestore
  .document('subscribed/{subId}')
  .onCreate(async (snap, context) => {
    const subbedProgram = snap.data();
    const subbedProgramId = context.params.subId;
    const userId = subbedProgram.userId;
    const programId = subbedProgram.programId;

    const user = await db.doc(`users/${userId}`).get();
    const program = await db.doc(`programs/${programId}`).get();
    const userSubbedPrograms = user.data().subscribedPrograms;
    console.log(userSubbedPrograms);
    return db
      .doc(`programs/${programId}`)
      .set({ activeCount: program.data().activeCount + 1 }, { merge: true });
  });

//unsubscribe from a subscription
exports.unsubscribedPrograms = functions.firestore
  .document('subscribed/{subId}')
  .onDelete(async (snap, context) => {
    const subbedProgram = snap.data();

    const programId = subbedProgram.programId;

    const program = await db.doc(`programs/${programId}`).get();

    return db
      .doc(`programs/${programId}`)
      .set({ activeCount: program.data().activeCount - 1 }, { merge: true });
  });

// exports.addLifts = functions.firestore
//   .document('users/{userId}/records/{recordId}')
//   .onCreate(async (snap, context) => {
//     const userId = context.params.userId;
//     const recordId = context.params.recordId

//     return db.doc(`users/${userId}/lifts/${userId}`).set({ lifts: liftsList });
//   });

exports.addLifts = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    const userId = context.params.userId;

    return db.doc(`users/${userId}/lifts/${userId}`).set({ lifts: liftsList });
  });
