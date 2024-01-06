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