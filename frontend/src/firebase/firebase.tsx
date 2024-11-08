// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHj2pbUL9-lmb3U-LavANpPwUXi35dgZI',
  authDomain: 'nyhetsfeed-b758c.firebaseapp.com',
  projectId: 'nyhetsfeed-b758c',
  storageBucket: 'nyhetsfeed-b758c.firebasestorage.app',
  messagingSenderId: '101186226165',
  appId: '1:101186226165:web:a3dfe1ce2a62098c30c2bc',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db, onAuthStateChanged }
