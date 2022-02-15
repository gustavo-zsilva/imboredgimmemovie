import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAANU9Ru0RdFU356c1wWQim758GXUZu0dg",
    authDomain: "imboredgimmemovie-prod.firebaseapp.com",
    projectId: "imboredgimmemovie-prod",
    storageBucket: "imboredgimmemovie-prod.appspot.com",
    appId: "1:537392804235:web:2daaaba00e5e03828dff8e",
    measurementId: "G-NHBRQ1Y0QS"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)