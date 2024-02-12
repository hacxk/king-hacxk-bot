module.exports = async (client, message) => {
    try {
        const latency = Date.now() - message.timestamp;
        let reactionEmoji = '👌';

        if (latency > 1000) {
            reactionEmoji = '⚠️';
        } else if (latency > 500) {
            reactionEmoji = '⏱️';
        } else {
            reactionEmoji = '🚀';
        }

        let replyMessage = `
${reactionEmoji} *Pong!* ${reactionEmoji}

🚀 *Current latency:* ${latency}*ms*

🌟 For quick assistance, tap on one of the options below:\n
🔹 *Help*: Get help from our support team.
🔹 *About*: Learn more about our services.
`;

        if (message.quotedMsg) {
            replyMessage = `📌 *Replying to:* ${message.quotedMsg.body}\n\n` + replyMessage;
        }

        await client.sendMessage(message.from, replyMessage, {
            buttons: [
                { type: 'reply', buttonText: 'Help', message: '.help' },
                { type: 'reply', buttonText: 'About', message: '.about' }
            ]
        });

        await message.react(reactionEmoji);
    } catch (error) {
        console.error('Error handling ping command:', error);
        await client.sendMessage(message.from, 'An error occurred while processing your request.');
    }
};
