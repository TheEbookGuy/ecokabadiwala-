import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBGo0C9sj9sdVXMUvqadCA6J_ty3Wr4wA0",
    authDomain: "ecokabadiwala.firebaseapp.com",
    projectId: "ecokabadiwala",
    storageBucket: "ecokabadiwala.firebasestorage.app",
    messagingSenderId: "124390291356",
    appId: "1:124390291356:web:ec737ecce93498c36efa59",
    measurementId: "G-B9KKVPL2JZ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
