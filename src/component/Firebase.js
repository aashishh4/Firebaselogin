import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBFqHarCoZ0KwC7Gi33uIIReybm-oZAv64",
  authDomain: "ashish11-cf411.firebaseapp.com",
  projectId: "ashish11-cf411",
  storageBucket: "ashish11-cf411.appspot.com",
  messagingSenderId: "870326402944",
  appId: "1:870326402944:web:dfc01cd1321dd883b4cb65",
  measurementId: "G-H6QJ35M0Q6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app,auth};