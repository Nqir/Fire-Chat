import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { formatTimestamp, getCurrentTime } from './utils/utils';
import { app, auth } from './firebase';

const db = getFirestore();
const messagesRef = collection(db, "messages");

export function unsubscribeFireChat() {
    const q = query(messagesRef, orderBy("timeSent"));

    return onSnapshot(q, querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
            const data = change.doc.data();
            if (data.timeSent !== null) {
                displayMessage(data, change.doc.id);
            }
        });
    });
}

export async function sendMessage() {
    const messageInput = document.getElementById("msg-input");
    
    const data = {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        message: messageInput.value,
        timeSent: serverTimestamp(),
        msgFrom: auth.currentUser.displayName
    }
    const docRef = await addDoc(messagesRef, data);

    messageInput.value = "";
}

function displayMessage(data, id) {
    const chatbox = document.getElementById("chat-box");
    const messageContainer = document.createElement("div");
    const time = formatTimestamp(data.timeSent);
    messageContainer.id = id;
    
    messageContainer.innerHTML = `
        <div id="container-${id}" class="bg-primary d-inline-block p-1 m-2 rounded-2 text-light">
            <div class="message-header">
                <span class="message-username fw-medium">${data.msgFrom}</span>
                <span class="message-time fw-medium text-secondary">${time}</span>
            </div>
            <div id="message-${id}" class="message-body">
                ${data.message}
            </div>
        </div>
    `;

    chatbox.appendChild(messageContainer);
}
