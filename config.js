module.exports = {
    // Bot Configuration
    bot: {
        name: 'HACXK BOT',
        version: '1.0.0',
        description: 'A versatile WhatsApp bot designed to assist users with various tasks.',
        avatar: '/path/to/avatar.png' // Path or URL to the bot's avatar image
    },

    // Owner Information
    owner: {
        name: 'Zaid',
        email: 'zaidseodev@gmail.com',
        phone: '+94771014973'
    },

    // API Keys and Tokens
    apiKeys: {
        youtube: 'your-youtube-api-key',
        database: 'your-database-access-token',
        openai: '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' // Add your OpenAI API key
        // Add more API keys or access tokens as needed
    },

    // Database Configuration
    database: {
        host: 'localhost',
        port: 27017,
        username: 'admin',
        password: 'password123',
        dbName: 'whatsapp_bot_db'
        // Add more database configuration options as needed
    },

    // Logging Configuration
    logging: {
        level: 'info', // Options: 'error', 'warn', 'info', 'debug'
        logFile: '/path/to/log/file.log', // Path to store log files
        logRotation: {
            frequency: 'daily', // Options: 'hourly', 'daily', 'weekly', 'monthly'
            maxSize: '10MB' // Maximum size of log files before rotation
        }
        // Add more logging configuration options as needed
    },

    // Bot Behavior Configuration
    behavior: {
        autoRespond: true, // Enable automatic response to incoming messages
        greetingMessage: 'Hello! I am HACXK BOT. How can I assist you today?', // Initial greeting message
        commandPrefix: '.', // Prefix used to identify bot commands in messages
        timeout: {
            message: 30, // Timeout for message responses in seconds
            command: 60 // Timeout for command execution in seconds
        }
        // Add more behavior configuration options as needed
    },

    // Feature Flags
    featureFlags: {
        enableFeatureX: true,
        enableFeatureY: false
        // Add more feature flags as needed
    },

    // Security Configuration
    security: {
        authentication: {
            enabled: true,
            jwtSecret: 'your-jwt-secret-key'
        },
        encryption: {
            algorithm: 'AES-256-CBC',
            key: 'your-encryption-key'
        }
        // Add more security configuration options as needed
    },

    // Localization and Internationalization
    localization: {
        defaultLanguage: 'en-US',
        defaultTimezone: 'UTC'
    },

    // Miscellaneous Settings
    misc: {
        maxConnections: 100,
        cacheExpiration: 3600 // Cache expiration time in seconds
        // Add more miscellaneous settings as needed
    }
};
