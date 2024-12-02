import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa119gPvUm6oG_ENzsbKr0Xttf-pelNWg",
  authDomain: "aviatorapp-8134c.firebaseapp.com",
  projectId: "aviatorapp-8134c",
  storageBucket: "aviatorapp-8134c.appspot.com",
  messagingSenderId: "566893193160",
  appId: "1:566893193160:web:ed68719c68e4f1849582fd",
  measurementId: "G-K6F71TJKNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imageDb = getStorage(app)
const analytics = getAnalytics(app)
const auth = getAuth(app)

export { auth, imageDb };