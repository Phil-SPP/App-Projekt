import React, { useState, useEffect } from 'react';
import WishlistForm from './WishlistForm';
import WishlistList from './WishlistList';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (auth.currentUser) {
                const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
                if (userDoc.exists()) {
                    setUserInfo(userDoc.data());
                }
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div style={dashboardStyle}>
            {userInfo ? (
                <h2>Willkommen, {userInfo.firstName}!</h2>
            ) : (
                <h2>Willkommen!</h2>
            )}
            <p>Hier kannst du deine Wunschlisten erstellen und verwalten:</p>
            <WishlistForm />
            <WishlistList />
        </div>
    );
};

const dashboardStyle = {
    padding: '2rem',
    textAlign: 'center'
};

export default Dashboard;
