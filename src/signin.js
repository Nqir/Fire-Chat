import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { unsubscribeFireChat } from './firechat';
import { app, auth } from './firebase';
import { newNotification } from './utils/utils';

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

    signInWithPopup(auth, provider)
    .then(result => {
        newNotification("Successful Sign-In", `Signed in as <strong>${result.user.displayName}</strong>✅`, "signed-in-notif").show();
        setTimeout(() => {
                location.reload();
            }, 1000);
        })
        .catch(error => {
            newNotification("Unsuccessful Sign-In", error.message, "unsuccessful-signed-in-notif").show();
        });
}

export function signOutUser() {
    signOut(auth)
    .then(() => {
            newNotification("Successful Sign-Out", "Signed out✅", "signed-out-notif").show();                    
            setTimeout(() => {
                location.reload();
            }, 1000);
        })
        .catch(error => {
            newNotification("Unsuccessful Sign-Out", error.message, "unsuccessful-signed-out-notif").show();
        });
}

export function deleteUser() {
    const user = auth.currentUser;
    user.delete()
        .then(() => {
            newNotification("Successful Account Deletion", "Account deleted✅", "account-deletion-notif").show();
            setTimeout(() => {
                location.reload();
            }, 1000);
        })
        .catch(error => {
            newNotification("Unsuccessful Account Deletion", error.message, "unsuccessful-account-deletion-notif").show();
        });
}