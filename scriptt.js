function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {

    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if (message === "") return;

    const chatBox = document.getElementById("chatBox");

    // Papar mesej pengguna
    chatBox.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    input.value = "";

    // Scroll ke bawah
    chatBox.scrollTop = chatBox.scrollHeight;

    // Animasi menaip
    chatBox.innerHTML += `
        <div class="bot-message" id="typing">
            🤖 NOVA AI sedang berfikir...
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    // Jawapan NOVA AI
    setTimeout(() => {

        document.getElementById("typing").remove();

        const reply = getAIResponse(message);

        chatBox.innerHTML += `
            <div class="bot-message">
                ${reply}
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 1000);
}

function getAIResponse(message) {

    message = message.toLowerCase();

    if (message.includes("hai") ||
        message.includes("hello") ||
        message.includes("hi")) {

        return "👋 Hai! Saya NOVA AI. Gembira berjumpa dengan anda.";
    }

    if (message.includes("siapa awak")) {

        return "🤖 Saya NOVA AI, pembantu AI campus yang direka untuk membantu anda.";
    }

    if (message.includes("nama")) {

        return "Nama saya NOVA AI.";
    }

    if (message.includes("tarikh")) {

        return "📅 Tarikh hari ini ialah " +
        new Date().toLocaleDateString("ms-MY");
    }

    if (message.includes("masa")) {

        return "⏰ Masa sekarang ialah " +
        new Date().toLocaleTimeString("ms-MY");
    }

    if (message.includes("terima kasih")) {

        return "😊 Sama-sama. Sentiasa sedia membantu.";
    }

    if (message.includes("apa khabar")) {

        return "🚀 Saya dalam keadaan baik dan bersedia membantu anda.";
    }

 
