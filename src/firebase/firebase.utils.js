import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBRRA9gVVv3kev5oIzoqKarignJdAoDCno",
  authDomain: "crown-db-ee383.firebaseapp.com",
  databaseURL: "https://crown-db-ee383.firebaseio.com",
  projectId: "crown-db-ee383",
  storageBucket: "crown-db-ee383.appspot.com",
  messagingSenderId: "545446851590",
  appId: "1:545446851590:web:bbf7ba8c3ee3510af57f87",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
