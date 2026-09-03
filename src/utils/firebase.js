// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCbhqjtUfvWa2ClRnbCBGK8CzSijTSCAOQ',
  authDomain: 'foodify-adb3d.firebaseapp.com',
  projectId: 'foodify-adb3d',
  storageBucket: 'foodify-adb3d.firebasestorage.app',
  messagingSenderId: '1046067833279',
  appId: '1:1046067833279:web:17b66d827c9e842c4e190a',
  measurementId: 'G-4M6HZNF9EL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
