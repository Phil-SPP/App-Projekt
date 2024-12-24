// Firebase SDKs importieren
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase-Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyCMFU-KvVoVKVioe4Fqm8mCZemeNwwkZkQ",
    authDomain: "app-projekt-wishlist.firebaseapp.com",
    projectId: "app-projekt-wishlist",
    storageBucket: "app-projekt-wishlist.firebasestorage.app",
    messagingSenderId: "523457789115",
    appId: "1:523457789115:web:b39e9feaaa6f570520fd9e",
    measurementId: "G-9P5EFBE5R5"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// HTML-Elemente
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const authSection = document.getElementById('auth-section');
const authForm = document.getElementById('auth-form');
const submitAuth = document.getElementById('submit-auth');

// Authentifizierungsmodus
let isLogin = true;

loginBtn.addEventListener('click', () => {
    isLogin = true;
    authSection.style.display = 'block';
    submitAuth.textContent = "Einloggen";
});

registerBtn.addEventListener('click', () => {
    isLogin = false;
    authSection.style.display = 'block';
    submitAuth.textContent = "Registrieren";
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Felder aus dem Formular abrufen
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!role) {
        alert("Bitte wähle eine Rolle aus.");
        return;
    }

    if (isLogin) {
        // Benutzer einloggen
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                alert("Erfolgreich eingeloggt!");
            })
            .catch(error => {
                alert(error.message);
            });
    } else {
        try {
            // Benutzer registrieren
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Benutzerprofil in Firestore speichern
            await setDoc(doc(db, "users", user.uid), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role,
                createdAt: new Date().toISOString(),
            });

            alert("Erfolgreich registriert und Profil erstellt!");
        } catch (error) {
            alert(error.message);
        }
    }
});