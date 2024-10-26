// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHPUbrMpGiMHG87pW6-glzaX-urqPZgdo",
  authDomain: "commodle.firebaseapp.com",
  projectId: "commodle",
  storageBucket: "commodle.appspot.com",
  messagingSenderId: "724594936719",
  appId: "1:724594936719:web:aef5204dc0d589025c99fa",
  measurementId: "G-J09RV9PB1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };