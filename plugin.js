// Import necessary modules
const { Client } = require('whatsapp-web.js');
const { downloadVideo } = require('./plugins/ytdownload');
const config = require('./config');

// Export the function to handle messages
exports.handleMessages = (client) => {
    client.on('message', async (message) => {
        // Split the message into command and argument(s)
        const parts = message.body.split(' ');
        const command = parts[0];
        const args = parts.slice(1);

        // Handle different commands
        switch (command) {
            case '.yt':
                // Check if arguments are provided
                if (args.length === 0) {
                    await client.sendMessage(message.from, 'Please provide a YouTube URL.');
                    return;
                }

                // Call downloadVideo function
                await downloadVideo(client, message, args);
                break;
            default:
                // Reply with "pong" to every message received (default behavior)
                await client.sendMessage(message.from, 'pong');
                break;
        }
    });
};
