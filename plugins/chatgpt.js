// Import necessary modules
const axios = require('axios');
const config = require('../config'); // Assuming you have a config file for API keys

// Function to generate a response using ChatGPT API
const generateResponse = async (message) => {
    try {
        // Call the ChatGPT API to generate response
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: config.model, // Use model from config
            messages: [
                { role: 'user', content: message.body }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${config.apiKeys.openai}`, // Use API key from config
                'Content-Type': 'application/json'
            }
        });

        // Extract the generated response
        const generatedResponse = response.data.choices[0].message.content;

        // Return the generated response
        return generatedResponse;
    } catch (error) {
        console.error('Error generating response:', error.response ? error.response.data : error.message);
        throw new Error('An error occurred while generating response.');
    }
};

// Export the function to handle ChatGPT responses
module.exports = async (client, message) => {
    try {
        // Generate response using ChatGPT API
        const generatedResponse = await generateResponse(message);
        
        // Send the generated response
        await client.sendMessage(message.from, generatedResponse);
    } catch (error) {
        console.error('Error handling ChatGPT response:', error);
        await client.sendMessage(message.from, 'An error occurred while processing your request.');
    }
};
