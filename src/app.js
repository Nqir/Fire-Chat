import { setElementVisibility } from "./utils/utils";
import { getAuth } from "firebase/auth";
import { checkUserAuth, deleteUser, showGoogleSignIn, signOutUser } from "./signin";
import { sendMessage } from "./firechat";
import { auth } from "./firebase";
import { switchTheme } from "./theme";

const navbar = document.getElementById('navbar');

const signInContainer = document.getElementById('sign-in-container');
const signInGoogle = document.getElementById('sign-in-google');

const signOutButton = document.getElementById('sign-out');

const messageInput = document.getElementById("msg-input");
const sendMsgBtn = document.getElementById('send-msg-btn');
sendMsgBtn.disabled = true;

const deleteAccountButton = document.getElementById('delete-account');

const fireChat = document.getElementById('fire-chat');

const themeSwitcher = document.getElementById('theme-switcher');

checkUserAuth(onSignedIn, onSignedOut);

// Event Listeners
window.addEventListener("load", () => {
    const spinner = document.getElementById('spinner');
    setElementVisibility(signInContainer, false);
});

signInGoogle.addEventListener("click", showGoogleSignIn);
signOutButton.addEventListener("click", signOutUser);
deleteAccountButton.addEventListener("click", deleteUser);
messageInput.addEventListener("input", updateSendMsgBtn);
sendMsgBtn.addEventListener("click", sendMessage);
themeSwitcher.addEventListener("click", switchTheme);

// Functions
function onSignedIn() {
    setElementVisibility(signInContainer, true);

    setElementVisibility(navbar, false);
    setElementVisibility(fireChat, false);
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