import {getApp,getApps,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDSE6fwPIAAvuO6kcHiNFsqKW6b1-GhvW8",
    authDomain: "food-c85d4.firebaseapp.com",
    databaseURL: "https://food-c85d4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "food-c85d4",
    storageBucket: "food-c85d4.appspot.com",
    messagingSenderId: "785846052348",
    appId: "1:785846052348:web:89b2e9d1dc7eeb56ffbe79"
}

//Change getApps.length to getApps().length if errors
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage  = getStorage(app)

export {app,firestore,storage}