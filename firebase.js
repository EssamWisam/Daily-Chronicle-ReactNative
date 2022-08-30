// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signOut,
    sendPasswordResetEmail 
  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFk3n0VMQDmc81oxSjSfYRqd8QW8ylcmU",
  authDomain: "poll-auth-80937.firebaseapp.com",
  projectId: "poll-auth-80937",
  storageBucket: "poll-auth-80937.appspot.com",
  messagingSenderId: "921104257789",
  appId: "1:921104257789:web:778a241da2b28050eee494"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage)});


export { 
  auth, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  updateProfile, 
  sendEmailVerification, 
  signOut, 
  sendPasswordResetEmail 
};