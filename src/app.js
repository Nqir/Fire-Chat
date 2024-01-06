import { setElementVisibility } from "./utils/utils";
import { getAuth } from "firebase/auth";
import { checkUserAuth, showGoogleSignIn, signOutUser } from "./signin";
import { sendMessage } from "./firechat";
import { auth } from "./firebase";

const navbar = document.getElementById('navbar');

const signInContainer = document.getElementById('sign-in-container');
const signInGoogle = document.getElementById('sign-in-google');
const signedInNotif = document.getElementById('signed-in-notif');
const signedInNotifMessage = signedInNotif.querySelector('.toast-body');

const signOutButton = document.getElementById('sign-out');
const signOutAlert = document.getElementById('sign-out-alert');

const messageInput = document.getElementById("msg-input");
const sendMsgBtn = document.getElementById('send-msg-btn');
sendMsgBtn.disabled = true;

const fireChat = document.getElementById('fire-chat');


// Event Listeners
window.addEventListener("load", () => {
    console.log("Page loaded");
    
    const spinner = document.getElementById('spinner');
    spinner.classList.remove("d-none");
    
    setTimeout(() => {
        spinner.classList.add("d-none");
    }, 2000);
});

checkUserAuth(onSignedIn, onSignedOut);

signInGoogle.addEventListener("click", showGoogleSignIn);
signOutButton.addEventListener("click", signOutUser);

messageInput.addEventListener("input", updateSendMsgBtn);
sendMsgBtn.addEventListener("click", sendMessage);

// Functions
function onSignedIn() {
    setElementVisibility(signInContainer, true);

    setElementVisibility(navbar, false);
    setElementVisibility(fireChat, false);

    if (auth.currentUser) {
        const notif = bootstrap.Toast.getOrCreateInstance(signedInNotif);
        notif.show();
        signedInNotifMessage.innerHTML = `Signed in as <strong>${auth.currentUser.displayName}</strong>✅`;
    }
}

function onSignedOut() {
    setElementVisibility(navbar, true);
    setElementVisibility(fireChat, true);

    setElementVisibility(signInContainer, false);
}

function updateSendMsgBtn() {
    const message = messageInput.value;
    
    if (message.trim() !== "") {
        sendMsgBtn.disabled = false;
        return true;
    } else {
        sendMsgBtn.disabled = true;
        return false;
    }
}