// Import necessary modules
const { Client } = require('whatsapp-web.js');
const config = require('./config');
const aliveHandler = require('./plugins/alive'); // Import the alive.js file
const { downloadYouTubeVideo } = require('./plugins/ytdownload'); // Import the downloadYouTubeVideo function
const pingHandler = require('./plugins/ping'); // Import the ping.js file
const mainMenuHandler = require('./plugins/mainMenuHandler'); // Import the mainMenuHandler.js file
const chatGPTHandler = require('./plugins/chatgpt'); // Import the chatgpt.js file
const { fetchGoogleImages } = require('./plugins/googleImage'); // Import the fetchGoogleImages function

// Export the function to handle messages
exports.handleMessages = (client) => {
    // Use alive plugin
    aliveHandler(client); // Call the function exported from alive.js
    
    client.on('message', async (message) => {
        // Function to reply to a message by its ID
        const replyToMessageById = async (messageId, text) => {
            const options = {
                quotedMessageId: messageId
            };
            await client.sendMessage(message.from, text, options);
        };

        // Split the message into command and argument(s)
        const parts = message.body.split(' ');
        const command = parts[0];
        const args = parts.slice(1);

        // Handle different commands
        switch (command) {
            case '.yt':
            case '.youtube':
                if (args.length === 0) {
                    await replyToMessageById(message.id, 'Please provide a YouTube URL or video ID.');
                    return;
                }
                const videoId = args[0];
                const downloadLinks = await downloadYouTubeVideo(client, message, videoId);
                if (downloadLinks) {
                    await message.reply(`Download links:\n${downloadLinks.join('\n')}`);
                } else {
                    await message.reply('Failed to download the video. Please try again later.');
                }
                break;
            case '.ping':
            case '.p':
                await pingHandler(client, message);
                break;
            case '.alive':
            case '.a':
                await aliveHandler(client, message);
                break;
            case '.menu':
            case '.m':
                await mainMenuHandler(client, message);
                break;
            case '.gpt':
            case '.ai':
                await chatGPTHandler(client, message);
                break;
            case '.gimg':
            case '.googleimage':
                // Check if there are arguments
                if (args.length === 0) {
                    await replyToMessageById(message.id, 'Please provide a search query.');
                    return;
                }
                // Fetch images based on the query and reply with the first image URL
                const query = args.join(' ');
                const imageData = await fetchGoogleImages(query);
                if (imageData && imageData.results.length > 0) {
                    const imageUrl = imageData.results[0].url;
                    await message.reply(imageUrl);
                } else {
                    await message.reply('No images found for the given query.');
                }
                break;
            default:
                // Reply to any other message with a default response
                await message.reply('Unknown command. Type "*_.help_*" for a list of available commands.');
                break;
        }
    });
};
