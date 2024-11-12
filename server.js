// We are ready to take care of the back-end for our chatbot
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// For parsing application/json
app.arguments(bodyParser.json());
// Serve static files like HTML, CSS, JS
app.arguments(express.static('public'));

//Basic intent recognition and bot response
function getBotResponse(userMessage){
    if (userMessage.includes('order')){
        return "Please provide your order number.";
    } else if (userMessage.includes('account')){
        return "Can you describe the issue you're facing with your account?";
    } else {
        return "I'm sorry, I didn't understand that. Can you please rephrase?";
    }
}

// API endpoint to handle chat messages
app.post('/api/message', (req, res) => {
    const userMessage = req.body.message;
    const botReply = getBotResponse(userMessage);
    res.json({reply:botReply});
});

// Start the server
app.listen(port, () => {
    console.log('Server running at http://localhost:${port}')
});

