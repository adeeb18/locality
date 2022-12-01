// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFgdZB_0W7Z7Ixmw5smmLE85LaGP_Oc24",
  authDomain: "locality-97909.firebaseapp.com",
  databaseURL: "https://locality-97909-default-rtdb.firebaseio.com",
  projectId: "locality-97909",
  storageBucket: "locality-97909.appspot.com",
  messagingSenderId: "402056439693",
  appId: "1:402056439693:web:4a144e512fd2dac0813fc4",
  measurementId: "G-LRRHF2Q663"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);