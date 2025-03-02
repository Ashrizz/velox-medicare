```js
document.addEventListener("DOMContentLoaded", loadChatHistory);
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});

function sendMessage() {
    let inputField = document.getElementById("user-input");
    let message = inputField.value.trim();
    if (message === "") return;

    let chatBox = document.getElementById("chat-box");
    addMessage("You", message);
    inputField.value = "";
    
    setTimeout(() => {
        addMessage("Velox AI", "Typing...");
        setTimeout(() => {
            let response = getResponse(message);
            chatBox.lastElementChild.innerHTML = `<strong>Velox AI:</strong> ${response}`;
        }, 1000);
    }, 500);
}

function addMessage(sender, text) {
    let chatBox = document.getElementById("chat-box");
    let messageElement = document.createElement("p");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    saveChatHistory();
}

function getResponse(message) {
    message = message.toLowerCase();
    const keywords = {
        "heart rate": "Your current heart rate is 75 BPM.",
        "blood sugar": "Your latest blood sugar level is 110 mg/dL.",
        "blood pressure": "Your blood pressure is 131/82 mmHg.",
        "oxygen level": "Your oxygen saturation level is at 98%.",
        "stress": "Your stress level is moderate. Try deep breathing exercises.",
        "medication": "Don't forget to take your prescribed medication on time!",
        "exercise": "Try a 30-minute brisk walk or light stretching.",
        "hydration": "Drink at least 8 glasses of water daily.",
        "sleep": "Due to your student life, please get more sleep, you average 5 hours.",
        "diabetes": "For diabetes management, monitor your blood sugar regularly.",
        "sugar levels": "Your blood sugar is stable at 110 mg/dL.",
        "bp": "Your blood pressure is at a healthy level of 131/82 mmHg.",
        "pulse": "Your heart rate is currently at 75 BPM.",
        "hi" : "Hello Aarush, how may I assist you today?",
        "eye" : "Your eyesight may be weaker at this time due to a lack of sleep.",
        "acl" : "The ACL is a ligament in the foot, do you feel any pain?",
        "911" : "Calling your physician and EMTS at this time."
    };
    
    let responses = [];
    for (let key in keywords) {
        if (message.includes(key)) {
            responses.push(keywords[key]);
        }
    }
    
    return responses.length > 0 ? responses.join("<br>") : "I'm still learning! Please consult a healthcare professional for more details.";
}

function saveChatHistory() {
    localStorage.setItem("chatHistory", document.getElementById("chat-box").innerHTML);
}
```
