const fs = require('fs');
const cfonts = require('cfonts');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { handleMessages } = require('./plugin');
const qrcode = require('qrcode-terminal');
const Spinner = require('cli-spinners');
const readline = require('readline');

const adminNumbers = ['94773255188']; // Add more admin numbers if needed

let spinnerInterval; // Variable to store the interval of the spinner animation
let messagesInterval; // Variable to store the interval for displaying "Looking for new messages"

// Function to display a spinner animation in the CLI
function showSpinner() {
    const spinnerFrames = Spinner.dots12.frames; // Use the dots12 spinner animation
    let frameIndex = 0;

    // Start the interval to update the spinner animation
    spinnerInterval = setInterval(() => {
        readline.cursorTo(process.stdout, 0); // Move cursor to the beginning of the line
        process.stdout.write(spinnerFrames[frameIndex++ % spinnerFrames.length]); // Write the spinner frame
    }, Spinner.dots12.interval);
}

// Function to display "Looking for new messages" every second
function showLookingForMessages() {
    setInterval(() => {
        readline.cursorTo(process.stdout, 0); // Move cursor to the beginning of the line
        process.stdout.write('Looking for new messages'); // Write the message
        readline.clearLine(process.stdout, 1); // Clear the line
        readline.moveCursor(process.stdout, 0, -1); // Move cursor up one line
    }, 5000); // Display the message every second
}


// Function to clear the spinner animation and "Looking for new messages" message
function clearDisplay() {
    clearInterval(spinnerInterval); // Clear the spinner interval
    clearInterval(messagesInterval); // Clear the messages interval
    readline.cursorTo(process.stdout, 0); // Move cursor to the beginning of the line
    process.stdout.clearLine(); // Clear the line
}

// Display "HACXK BOT" with larger font size and eye-catching, relaxing color
cfonts.say('HACXK BOT', {
    font: 'block',
    align: 'center',
    colors: ['cyan'], // Eye-catching and relaxing color
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 0,
});

// Display "Free Palestine" with red, black, green, and white colors
cfonts.say('Free Palestine 🙋‍♂️', {
    font: 'chrome',
    align: 'center',
    colors: ['red', 'white', 'green', 'white'],
    background: '#fff', // Change background color as desired
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 0,
});


cfonts.say('Powered by Zaid', {
    font: 'block',
    align: 'center',
    colors: ['red', 'yellow', 'green'],
    background: 'blue', // Change background color as desired
    letterSpacing: 1,
    lineHeight: 1, // Increase line height for better visibility
    gradient: true, // Apply gradient effect for better appearance
    independentGradient: true, // Independent gradient for each character
    transitionGradient: true, // Smooth transition between gradient colors
});



// Initialize WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth()
});

// Function to reload the script when changes are detected
function reloadScript() {
    const file = require.resolve(__filename);
    fs.watchFile(file, () => {
        fs.unwatchFile(file);
        console.log(cfonts.render('Updating \n' + __filename, {
            font: 'chrome',
            align: 'center',
            colors: ['red', 'white'],
            background: 'transparent',
            letterSpacing: 1,
            lineHeight: 0,
        }));
        delete require.cache[file];
        require(file);
    });
}

// Read the content of plugin.js
fs.readFile('plugin.js', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading plugin.js:', err);
        return;
    }
    
    // Execute the content of plugin.js
    eval(data);
    // Call the function to handle messages
    handleMessages(client);
});

// QR code event
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Client ready event
client.on('ready', () => {
    console.log('');
    clearDisplay(); // Clear the display when the client is ready

    cfonts.say('Connect Success 🙋‍♂️', {
        font: 'chrome',
        align: 'center',
        colors: ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 0,
    });

    // Call showLookingForMessages after the "Connect Success" message

});

// Listen for incoming messages
client.on('message', message => {
    // Extract sender's WhatsApp number and message content
    const sender = message.from;
    const messageContent = message.body;

    // Define ANSI escape codes for color formatting
    const senderColor = '\x1b[36m'; // Cyan color for sender's WhatsApp number
    const messageColor = '\x1b[35m'; // Magenta color for message content
    const resetColor = '\x1b[0m'; // Reset color to default

    // Display the sender's WhatsApp number and message content in the CLI with color formatting
    console.log(`[MESSAGE] From: ${senderColor}${sender}${resetColor} - Message: ${messageColor}${messageContent}${resetColor}`);
});



// Connecting event
client.on('connecting', () => {
    showSpinner();
});




// Initialize the client
client.initialize();

// Start watching for file changes to enable automatic reloading
reloadScript();
