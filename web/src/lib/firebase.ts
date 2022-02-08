import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAY5bCUzzsaWI0F_ts8r_FTshAcigYLtD0",
    authDomain: "imboredgimmemovie.firebaseapp.com",
    projectId: "imboredgimmemovie",
    storageBucket: "imboredgimmemovie.appspot.com",
    messagingSenderId: "84165990493",
    appId: "1:84165990493:web:001693f7f69ab718eb95b4",
    measurementId: "G-KB8H1VJNZ6",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)