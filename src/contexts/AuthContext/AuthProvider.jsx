import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false)); // runs whether the operation is successful or not, ensuring loading is set to false after the operation completes
    }

    const createUserWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .finally(() => setLoading(false));
    }

    // Login
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false)); // runs whether the operation is successful or not, ensuring loading is set to false after the operation completes
    }

    // Logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
            .finally(() => setLoading(false)); // runs whether the operation is successful or not, ensuring loading is set to false after the operation completes
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setCurrentUser(currentUser);
            setLoading(false);
        })
        return unSubscribe();
    }, [])

    const authInfo = {
        createUser,
        loading,
        signIn,
        logOut,
        createUserWithGoogle,
        currentUser
    };
    return (
        // all the children components will have access to the authInfo value
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;