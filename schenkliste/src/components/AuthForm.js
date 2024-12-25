import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                // Benutzer einloggen
                await signInWithEmailAndPassword(auth, email, password);
                alert("Erfolgreich eingeloggt!");
                navigate('/dashboard'); // Sofortige Weiterleitung nach Login
            } else {
                // Registrierung
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Benutzerprofil speichern
                await setDoc(doc(db, "users", user.uid), {
                    firstName,
                    lastName,
                    email,
                    role,
                    createdAt: new Date().toISOString(),
                });

                alert("Erfolgreich registriert!");
                navigate('/dashboard'); // Sofortige Weiterleitung nach Registrierung
            }
        } catch (error) {
            console.error("Fehler:", error);
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {!isLogin && (
                <>
                    <input
                        type="text"
                        placeholder="Vorname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nachname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="" disabled>Wähle deine Rolle</option>
                        <option value="Wünscher">Wünscher</option>
                        <option value="Schenker">Schenker</option>
                    </select>
                </>
            )}
            <input
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{isLogin ? "Einloggen" : "Registrieren"}</button>
        </form>
    );
};

export default AuthForm;
