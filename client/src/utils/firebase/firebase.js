// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxwdgyPl9zwMQ8EAlJvWlYq5jZCxRYFNw",
  authDomain: "campverse-ecd95.firebaseapp.com",
  projectId: "campverse-ecd95",
  storageBucket: "campverse-ecd95.appspot.com",
  messagingSenderId: "277682355209",
  appId: "1:277682355209:web:2e5afaf3127901570e4cd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)