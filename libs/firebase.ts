// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJek3bCbn5JnlhQSmaJZw87D_QwFnxrN4",
  authDomain: "e-shop-vid-f75f6.firebaseapp.com",
  projectId: "e-shop-vid-f75f6",
  storageBucket: "e-shop-vid-f75f6.firebasestorage.app",
  messagingSenderId: "912708529247",
  appId: "1:912708529247:web:99ae2cbc9be71f65803fea"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;