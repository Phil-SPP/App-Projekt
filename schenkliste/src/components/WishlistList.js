import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../firebase/config";

const WishlistList = () => {
    const [wishlists, setWishlists] = useState([]);

    const fetchWishlists = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const q = query(collection(db, "wishlists"), where("owner", "==", user.uid));
            const querySnapshot = await getDocs(q);

            const lists = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setWishlists(lists);
        } catch (error) {
            console.error("Fehler beim Abrufen der Wunschlisten:", error);
        }
    };

    useEffect(() => {
        fetchWishlists();
    }, []);

    return (
        <div>
            <h2>Deine Wunschlisten</h2>
            <ul>
                {wishlists.map(wishlist => (
                    <li key={wishlist.id}>
                        <strong>{wishlist.title}</strong>
                        <p>Erstellt am: {new Date(wishlist.createdAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WishlistList;
