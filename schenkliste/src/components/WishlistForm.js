import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase/config";

const WishlistForm = () => {
    const [title, setTitle] = useState('');
    const [items, setItems] = useState([]);

    const addWishlist = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                alert("Du musst eingeloggt sein, um eine Wunschliste zu erstellen.");
                return;
            }

            await addDoc(collection(db, "wishlists"), {
                title,
                owner: user.uid,
                createdAt: new Date().toISOString(),
                items: items // Noch leer, wird später erweitert
            });

            alert("Wunschliste erfolgreich erstellt!");
            setTitle('');
            setItems([]);
        } catch (error) {
            console.error("Fehler beim Erstellen der Wunschliste:", error);
        }
    };

    return (
        <div style={formStyle}>
            <h2>Neue Wunschliste erstellen</h2>
            <input
                type="text"
                placeholder="Titel der Wunschliste"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
            />
            <button onClick={addWishlist} style={buttonStyle}>Wunschliste erstellen</button>
        </div>
    );
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: 'auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

const inputStyle = {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '5px'
};

const buttonStyle = {
    padding: '0.75rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};

export default WishlistForm;
