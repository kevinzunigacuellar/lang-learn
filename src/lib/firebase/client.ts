import { initializeApp } from "firebase/app";

// This data is for connecting to the Firebase project for authentication
// and database access. It is not sensitive data! Firebase says this can be plain text
const firebaseConfig = {
  apiKey: "AIzaSyATszqPiuQcEluvSaELG2wqowZHViZWfug",
  authDomain: "language-learner-6f7e2.firebaseapp.com",
  databaseURL: "https://language-learner-6f7e2-default-rtdb.firebaseio.com",
  projectId: "language-learner-6f7e2",
  storageBucket: "language-learner-6f7e2.appspot.com",
  messagingSenderId: "949559927954",
  appId: "1:949559927954:web:b7646c3aa90555e561f24b",
};

export const app = initializeApp(firebaseConfig);
