const axios = require('axios');

async function fetchGoogleImages(query, message) {
    // Add reaction indicating the search is in progress
    await message.react('🔍');

    const options = {
      method: 'POST',
      url: 'https://google-api31.p.rapidapi.com/imagesearch',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'fb8072fc19mshf4f46f35d532694p1e66f2jsn8ac7a5558aed',
        'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
      },
      data: {
        text: query,
        safesearch: 'off',
        region: 'wt-wt',
        color: '',
        size: '',
        type_image: '',
        layout: '',
        max_results: 10 // Adjust the number of results as per your requirement
      }
    };
  
    try {
      const response = await axios.request(options);
      
      // Add reaction indicating the search was successful
      await message.react('✅');

      return response.data; // Return the fetched data
    } catch (error) {
      console.error('Error fetching images:', error);
      
      // Add reaction indicating an error occurred during the search
      await message.react('❌');

      return null;
    }
  }
  
  module.exports = { fetchGoogleImages };
