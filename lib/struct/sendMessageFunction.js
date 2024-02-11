// Import necessary modules
const { MessageMedia } = require('whatsapp-web.js');

// Function to send a message with buttons
async function sendButtonsMsg(client, recipient, buttons, options = {}) {
    const { text, image, tagMsg, showURL } = options;

    // Construct message body with buttons
    const message = {
        content: text || '',
        buttons: buttons,
        footer: showURL ? recipient : undefined,
    };

    // Send the message
    await client.sendMessage(recipient, message, {
        footerTag: tagMsg || false,
        image: image ? new MessageMedia(image.mimetype, image.data, image.filename) : undefined,
    });
}

// Function to send a message as a list
async function sendListMsg(client, recipient, listItems, options = {}) {
    const { title, subtitle, button, footer, tagMsg } = options;

    // Construct list message
    const list = {
        title: title || '',
        description: subtitle || '',
        button: button ? {
            buttonText: button.text,
            buttonId: button.id,
        } : undefined,
        footer: footer,
    };

    // Add list items
    list.items = listItems.map(item => ({
        title: item.title,
        description: item.description,
        image: item.image ? new MessageMedia(item.image.mimetype, item.image.data, item.image.filename) : undefined,
    }));

    // Send the list message
    await client.sendMessage(recipient, list, {
        footerTag: tagMsg || false,
    });
}

module.exports = {
    sendButtonsMsg,
    sendListMsg,
};
