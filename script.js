function sendMessage() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");

    const message = input.value.trim();

    if (message === "") return;

    chat.innerHTML += `<p><b>You:</b> ${message}</p>`;

    chat.innerHTML += `
        <p class="bot">
            Thanks for your question! AI Campus Assistant
            is being developed.
        </p>
    `;

    input.value = "";
}
