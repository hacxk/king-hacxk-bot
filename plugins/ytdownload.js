const { MessageMedia } = require('whatsapp-web.js');
const ytdl = require('ytdl-core');

// Function to handle YouTube video download
exports.downloadVideo = async (client, message, args) => {
    try {
        const url = args[0]; // Assuming the URL is the first argument
        if (!url) {
            await client.sendMessage(message.from, 'Please provide a YouTube URL.');
            return;
        }

        // React to indicate the process has started
        await message.react('⏳');

        // Fetch video info
        const info = await ytdl.getInfo(url);

        // Choose video format (e.g., highest quality)
        const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

        // Download the video
        const videoStream = ytdl(url, { format: format });

        // Convert stream to buffer
        const videoBuffer = await streamToBuffer(videoStream);

        // Send video as a message
        const media = new MessageMedia('video/mp4', videoBuffer, 'video.mp4');
        await client.sendMessage(message.from, media, { caption: 'Here is your video!' });

        // React to indicate the process has finished
        await message.react('✅');
    } catch (error) {
        console.error('Error downloading video:', error);
        await client.sendMessage(message.from, 'An error occurred while processing your request.');
    }
};

// Helper function to convert stream to buffer
const streamToBuffer = async (stream) => {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
};
