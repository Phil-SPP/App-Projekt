import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCMFU-KvVoVKVioe4Fqm8mCZemeNwwkZkQ",
    authDomain: "app-projekt-wishlist.firebaseapp.com",
    projectId: "app-projekt-wishlist",
    storageBucket: "app-projekt-wishlist.firebasestorage.app",
    messagingSenderId: "523457789115",
    appId: "1:523457789115:web:b39e9feaaa6f570520fd9e",
    measurementId: "G-9P5EFBE5R5"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
