// Import necessary modules
const { Client } = require('whatsapp-web.js');

// Export the function to handle messages
module.exports = (client) => {
    client.on('message', async (message) => {
        // Split the message into command and argument(s)
        const parts = message.body.split(' ');
        const command = parts[0];
        const args = parts.slice(1);

        // Handle different commands
        switch (command) {
            case '.alive':
                // Check if the message has a quoted message
                const quotedMessage = message.quotedMsg ? message.quotedMsg.body : '';

                // Respond with a professional styled alive message
                await client.sendMessage(message.from, `
🌟 *HACXK BOT Status Report* 🌟

✨ _HACXK BOT_ is fully operational and ready to assist you! ✨

For more options, please select from the following:
🔵 *Menu* - Access the main menu.
🔍 *About* - Learn more about HACXK.

To continue, please select an option.

📢 Follow us on Twitter: [Twitter](https://twitter.com/hacxk)
📸 Follow us on Instagram: [Instagram](https://instagram.com/hacxk)
📘 Like us on Facebook: [Facebook](https://facebook.com/hacxk)

${quotedMessage ? `Replying to: ${quotedMessage}\n\n` : ''} // Include reference to the original message if available
`, {
                    buttons: [
                        { type: 'reply', buttonText: 'Menu', message: '.menu' },
                        { type: 'reply', buttonText: 'About', message: '.about' }
                    ]
                });
                // React with a meaningful emoji for the .alive command
                await message.react('👍');
                break;
            default:
        }
    });
};
