export function setElementVisibility(element, isHidden) {
    if (isHidden) {
        element.classList.add("d-none");
        return true;
    } else {
        element.classList.remove("d-none");
        return false;
    }
}

export function formatTimestamp(timestamp) {
    const date = timestamp.toDate();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = days[date.getDay()];
    const hours = (date.getHours() % 12) || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours < 12 ? "AM" : "PM";
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const formattedTime = `${month} ${day} ${hours}:${minutes}:${seconds}${ampm} ${year}`;

    return formattedTime;
}

export function newNotification(title, message, id) {
    const body = document.querySelector("body");
    const notification = document.createElement("div");
    const toast = `
        <div id="${id}-toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
        <strong class="me-auto font-monospace">🔥FireChat - ${title}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${message}</div>
        </div>
    `;

    notification.id = id;
    notification.classList.add("toast-container", "position-fixed", "top-0", "end-0", "p-3");
    notification.innerHTML = toast;

    body.appendChild(notification);

    const toastEl = document.getElementById(`${id}-toast`);
    const toastInstance = bootstrap.Toast.getOrCreateInstance(toastEl);
    
    return toastInstance;
}