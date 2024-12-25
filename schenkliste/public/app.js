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
const firstNameField = document.getElementById('first-name');
const lastNameField = document.getElementById('last-name');
const roleField = document.getElementById('role');

// Authentifizierungsmodus
let isLogin = true;

// Login-Button Event
loginBtn.addEventListener('click', () => {
    isLogin = true;
    authSection.style.display = 'block';
    submitAuth.textContent = "Einloggen";

    // Zusätzliche Felder für Login ausblenden
    firstNameField.style.display = 'none';
    lastNameField.style.display = 'none';
    roleField.style.display = 'none';

    // Reset optionaler Felder
    firstNameField.value = '';
    lastNameField.value = '';
    roleField.value = '';
});

// Registrieren-Button Event
registerBtn.addEventListener('click', () => {
    isLogin = false;
    authSection.style.display = 'block';
    submitAuth.textContent = "Registrieren";

    // Zusätzliche Felder für Registrierung anzeigen
    firstNameField.style.display = 'block';
    lastNameField.style.display = 'block';
    roleField.style.display = 'block';
});

// Formular-Submit Event
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLogin) {
        // Benutzer einloggen
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Erfolgreich eingeloggt:", user);
            alert("Erfolgreich eingeloggt!");
        } catch (error) {
            console.error("Fehler beim Login:", error);
            alert(error.message);
        }
    } else {
        const firstName = firstNameField.value;
        const lastName = lastNameField.value;
        const role = roleField.value;

        if (!firstName || !lastName || !role) {
            alert("Bitte alle Felder ausfüllen.");
            return;
        }

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

            console.log("Benutzer registriert und in Firestore gespeichert:", user);
            alert("Erfolgreich registriert und Profil erstellt!");
        } catch (error) {
            console.error("Fehler bei der Registrierung:", error);
            alert(error.message);
        }
    }
});
