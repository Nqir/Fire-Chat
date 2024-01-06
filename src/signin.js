import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { unsubscribeFireChat } from './firechat';
import { app, auth } from './firebase';

export function checkUserAuth(onSignedIn, onSignedOut) {
    let unsubscribe;

    onAuthStateChanged(auth, user => {
        if (user) {
            onSignedIn();
            unsubscribe = unsubscribeFireChat();
            return true;
        } else {
            unsubscribe && unsubscribe();
            onSignedOut();
            return false;
        }
    });
}

export function showGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
}

export function signOutUser() {
    signOut(auth);
}