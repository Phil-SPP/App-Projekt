import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/config';
import Navbar from './components/Navbar';
import WishlistForm from './components/WishlistForm';
import WishlistList from './components/WishlistList';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Überwachung des Authentifizierungsstatus
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Listener beim Unmount entfernen
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
    {/* Nicht authentifizierte Benutzer */}
    <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />

    {/* Authentifizierte Benutzer */}
    <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
</Routes>

        </Router>
    );
}

const Login = () => (
    <div>
        <h2>Bitte melde dich an oder registriere dich.</h2>
        {/* Dein Login-/Registrierungsformular */}
    </div>
);

const Dashboard = () => (
    <div>
        <h2>Willkommen im Dashboard!</h2>
        <WishlistForm />
        <WishlistList />
    </div>
);

export default App;
