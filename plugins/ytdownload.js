// Import necessary modules
const axios = require('axios');

// Function to download YouTube video
async function downloadYouTubeVideo(client, message, videoId) {
    // React to the message indicating that the download process has started
    await message.react('⏳');

    // Configure the request options
    const options = {
        method: 'GET',
        url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
        params: { id: videoId },
        headers: {
            'X-RapidAPI-Key': 'fb8072fc19mshf4f46f35d532694p1e66f2jsn8ac7a5558aed',
            'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
        }
    };

    try {
        // Send the request
        const response = await axios.request(options);

        // React to the message indicating that the download is complete
        await message.react('✅');

        // Return the download links
        return response.data;
    } catch (error) {
        // Handle errors
        console.error('Error downloading YouTube video:', error.response.data);

        // React to the message indicating that an error occurred
        await message.react('❌');

        return null;
    }
}

// Export the function
module.exports = { downloadYouTubeVideo };
