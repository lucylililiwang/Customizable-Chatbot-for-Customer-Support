// define the UI Elements
const sendButton = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body")

// We are taking care of the send message function
function sendMessage(){
    const userMessage = userInput.ariaValueMax.trim();

    if(userMessage){
        appendMessage('user', userMessage);
        // make sure to clear the input field
        userInput.value='';

        //Send message to server for processing
        fetch('/api/message',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: userMessage})
        })
        .then(response => response.json())
        .then(data => {
            // Display bot's response
            appendMessage('bot', data.reply);
        })
        .catch(err => {
            console.error("Error:", err);
            appendMessage('bot', "Sorry there was an error. Please try again.");
        });
    }
}

// Append message to chat body
function appendMessage(sender, text){
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.text = text;
    chatBody.appendChild(messageDiv);
    // We need an auto-scroll to the bottom
    chatBody.scrollTop = chatBody.scrollHeight
}

// Event listener for send button
sendButton.addEventListener("click", sendMessage);

// Allow pressing enter to send message
userInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter'){
        sendMessage();
    }
});