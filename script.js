function sendMessage() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");

    if (!input || !chat) return;

    const message = input.value.trim();

    if (message === "") return;

    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.textContent = message;
    chat.appendChild(userMessage);

    const botReply = document.createElement("div");
    botReply.className = "message bot";
    botReply.textContent = "Thanks for your question! AI Campus Assistant is being developed.";
    chat.appendChild(botReply);

    input.value = "";
    chat.scrollTop = chat.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("userInput");
    const button = document.getElementById("sendButton");

    if (button) {
        button.addEventListener("click", sendMessage);
    }

    if (input) {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }
});
