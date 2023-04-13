function toggleChatbox() {
    console.log('hide');
    var chatbox = document.querySelector('#chat-box');
    chatbox.classList.toggle('hidden');
    var chatIcon = document.getElementById('chat-icon');
    chatIcon.classList.remove('hidden');
}

function showChatbox() {
    var chatbox = document.getElementById('chat-box');
    chatbox.classList.remove('hidden');
    var chatIcon = document.getElementById('chat-icon');
    chatIcon.classList.add('hidden');
}

const messagesByFriend = {};

function sendMessage() {
    // Get the input message
    var message = document.querySelector("#chat-input textarea").value.trim();

    if (message !== "") {
        // Create a new message element
        var messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add("outgoing-message");
        messageElement.textContent = message;

        // Set the width of the message element based on the length of the message
        var messageBoxWidth = document.querySelector("#message-box").offsetWidth;
        var messageWidth = Math.min(0.7 * messageBoxWidth, message.length * 10 + 20);
        messageElement.style.width = messageWidth + "px";
        messageElement.style.alignSelf = "right";
        const selectedFriend = friendDropdown.value;
        messageElement.style.fontSize = "13px";
        messageElement.style.fontFamily = "monospace";

        if (!messagesByFriend[selectedFriend]) {
            messagesByFriend[selectedFriend] = [];
        }
        messagesByFriend[selectedFriend].push(messageElement);


        // Add the message element to the message box
        var messageBox = document.querySelector("#message-box");
        messageBox.appendChild(messageElement);


        // Clear the input
        document.querySelector("#chat-input textarea").value = "";
    }
}

const friendDropdown = document.getElementById('friend');
const messageBox = document.getElementById('message-box');

// add an event listener to the friend dropdown to update the message box
friendDropdown.addEventListener('change', function () {
    // clear any existing messages in the message box
    const selectedFriend = friendDropdown.value;
    messageBox.innerHTML = '';
    if (!messagesByFriend[selectedFriend]) {
        messagesByFriend[selectedFriend] = [];
    }

    // display the stored messages for this friend
    messagesByFriend[selectedFriend].forEach(function (message) {
        // var messageBox = document.querySelector("#message-box");
       
        // var messageElement = document.createElement("div");
        // messageElement.classList.add("message");
        // messageElement.classList.add("outgoing-message");
        // messageElement.textContent = message;

        // // Set the width of the message element based on the length of the message
        // var messageBoxWidth = document.querySelector("#message-box").offsetWidth;
        // var messageWidth = Math.min(0.7 * messageBoxWidth, message.length * 10 + 20);
        // messageElement.style.width = messageWidth + "px";
        // messageElement.style.alignSelf = "right";
        // messageElement.style.fontSize = "13px";
        // messageElement.style.fontFamily = "monospace";
        // messageBox.appendChild(messageElement);
        messageBox.appendChild(message);
        // messageBox.innerHTML += `<div class="message">${message}</div>`;
    });    
});