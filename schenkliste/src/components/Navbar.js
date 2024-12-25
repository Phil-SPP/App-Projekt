import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase/config';

const Navbar = () => {
    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <header>
            <h1>Schenkliste</h1>
            <nav>
                {auth.currentUser ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <button>Login</button>
                        <button>Registrieren</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
