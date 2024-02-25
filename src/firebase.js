import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCn0xeG-gQEgxbBc3_333GLkJnKDvwVQWI",
  authDomain: "chat-ease-21b82.firebaseapp.com",
  projectId: "chat-ease-21b82",
  storageBucket: "chat-ease-21b82.appspot.com",
  messagingSenderId: "827072625683",
  appId: "1:827072625683:web:5ed14987f8b57beb2593e6"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();