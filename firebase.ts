import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDUXWXlVm8uHklKlTz7-sWxTXbFYuMOT5U',
  authDomain: 'aston-photo-gallery.firebaseapp.com',
  projectId: 'aston-photo-gallery',
  storageBucket: 'aston-photo-gallery.appspot.com',
  messagingSenderId: '547446131876',
  appId: '1:547446131876:web:a136a2475d8f92bacaaa31',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
