import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { serverTimestamp, getFirestore } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

const provider = new GoogleAuthProvider();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const projectStorage = getStorage(app);
export const projectFirestore = getFirestore(app);

export const db = getDatabase(app);

export const timestamp = serverTimestamp();

export const auth = getAuth(app);

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const uid = result.user.uid;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("uid", uid);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signOutFunction = () => {
  signOut(auth)
    .then(() => {
      console.log("Successfully logged out.");
    })
    .catch((error) => {
      // An error happened.
    });
};

export const signUpWithPassword = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const email = user.email;
      // ...
      localStorage.setItem("name", email);
    })
    .catch((error) => {
      alert("Please make sure the email address is correct, and the password is greater than 6 numbers.");
    });
};

export const signInWithPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Credential");
      const user = userCredential.user;
      const email = user.email;
      // ...
      localStorage.setItem("name", email);
      console.log("Succeeded");
    })
    .catch((error) => {});
};

// connectAuthEmulator(auth, "http://localhost:9099")
