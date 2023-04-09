import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhb2uc3pkOOcb8MskJqDIa8Oqt7tHkwQE",
  authDomain: "todo-list-56f48.firebaseapp.com",
  projectId: "todo-list-56f48",
  storageBucket: "todo-list-56f48.appspot.com",
  messagingSenderId: "1002989835419",
  appId: "1:1002989835419:web:3f07d31c526d71500f623e",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
