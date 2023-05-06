import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAu3Rl0h1Ff_peO-fETxMbuurnCIwxetIg",
    authDomain: "facebook-clone-4472d.firebaseapp.com",
    projectId: "facebook-clone-4472d",
    storageBucket: "facebook-clone-4472d.appspot.com",
    messagingSenderId: "836300471085",
    appId: "1:836300471085:web:16fcfb3295b3a2f8c2b1a4"
};

const app = initializeApp(firebaseConfig) 


const storage = getStorage(app);
const db = getFirestore(app)
const database = getDatabase(app)

export { db, storage, database }


