const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.addFollowing = functions.firestore
  .document("following/{userUid}/userFollowing/{profileId}")
  .onCreate(async (snapshot, context) => {
    const following = snapshot.data();
    console.log({following});
    try {
      const userDoc = await db
        .collection("users")
        .doc(context.params.userUid)
        .get();
      const batch = db.batch();
      batch.set(
        db
          .collection("following")
          .doc(context.params.profileId)
          .collection("userFollowers")
          .doc(context.params.userUid),
        {
          displayName: userDoc.data().displayName,
          photoURL: userDoc.data().photoURL,
          uid: userDoc.id,
        }
      );
      batch.update(db.collection("users").doc(context.params.profileId), {
        followerCount: admin.firestore.FieldValue.increment(1),
      });
      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

exports.removeFollowing = functions.firestore
  .document("following/{userUid}/userFollowing/{profileId}")
  .onDelete(async (snapshot, context) => {
    const batch = db.batch();
    batch.delete(
      db
        .collection("following")
        .doc(context.params.profileId)
        .collection("userFollowers")
        .doc(context.params.userUid)
    );
    batch.update(db.collection("users").doc(context.params.profileId), {
      followerCount: admin.firestore.FieldValue.increment(-1),
    });
    try {
      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

// Only interested in attendees changing
  exports.eventUpdated = functions.firestore
    .document('events/{eventId}')
    .onUpdate(async (snapshot, context) => {
      const before = snapshot.before.data();
      const after = snapshot.after.data();
      if (before.attendees.length < after.attendees.length) {
          let attendeeJoined = after.attendees.filter(item1 => !before.attendees.some(item2 => 
            item2.id === item1.id))[0];
            console.log({attendeeJoined});
// Find Who Is Following The New Attendee TO update their feed
            try {
              const followerDocs = await db.collection('following').doc(attendeeJoined.id).collection('userFollowers').get()
// Create new post to feed for each followers feed
              followerDocs.forEach(doc => {
                admin.database().ref(`/posts/${doc.id}`).push(newPost)
              })
            }
      }
    }) 

    function newPost(user, code, eventId) {
      return {
        photoUrl: user.photo
      }
    }