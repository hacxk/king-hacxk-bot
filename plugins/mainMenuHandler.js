const axios = require('axios');

module.exports = async (client, message) => {
    try {
        const menuOptions = [
            { text: '🏠 Home', command: '.home' },
            { text: '📁 Services', command: '.services' },
            { text: '📞 Contact Us', command: '.contact' },
            { text: '❓ Help', command: '.help' },
            { text: 'ℹ️ About', command: '.about' }
        ];

        const menuMessage = '🌟 *Main Menu* 🌟\n\n' + menuOptions.map(option => option.text).join('\n');

        const imageURL = 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/711/615/datas/original.png';
        const imageResponse = await axios.get(imageURL, { responseType: 'arraybuffer' });
        const imageBase64 = Buffer.from(imageResponse.data, 'binary').toString('base64');

        await message.reply({
            image: imageBase64,
            caption: menuMessage,
            sendMediaAsSticker: false,
            quotedMessageId: message.id,
            buttons: menuOptions.map(option => ({
                type: 'reply',
                buttonText: option.text,
                message: option.command
            }))
        });

        await message.react('✅');
    } catch (error) {
        console.error('Error handling main menu:', error);
        await client.sendMessage(message.from, 'An error occurred while processing your request.');
    }
};
