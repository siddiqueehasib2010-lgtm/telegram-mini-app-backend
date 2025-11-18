// --- Telegram Bot Core Logic (Node.js) ---
// This bot uses 'node-telegram-bot-api' to listen for messages and web app data.

// **SECURITY WARNING**: Using the token directly in the code is ONLY for quick demos.
// For production, use environment variables (e.g., process.env.BOT_TOKEN).
const botToken = '8413754199:AAHcH6osbBlWzEpUkaLA3F5wS75TRBFCXY4'; 

const TelegramBot = require('node-telegram-bot-api');

// The 'polling' option tells the bot to check Telegram for updates periodically.
// This is the simplest method for hosting on free tiers.
const bot = new TelegramBot(botToken, { polling: true });

console.log('Bot is running and checking for updates...');

// 1. Handles the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name || 'User';

    // The message that the bot sends when the user starts it.
    const message = `Hello, ${userName}! 👋\n\nI am running your Mini App backend.\n\nTo open the app, click the 'Open App' button below the chat box.`;
    
    // You can optionally send the custom keyboard again here if needed, 
    // but the Menu Button should handle this.
    
    bot.sendMessage(chatId, message);
});

// 2. Handles data sent from the Mini App (via WebApp.sendData())
bot.on('web_app_data', async (msg) => {
    const chatId = msg.chat.id;
    const webAppData = msg.web_app_data.data;
    
    console.log(`Received data from Web App for user ${chatId}: ${webAppData}`);

    let responseMessage;

    // The data sent from your HTML app was JSON: '{"color": selectedColor}'
    try {
        const data = JSON.parse(webAppData);
        const color = data.color || 'a color';
        
        responseMessage = `✅ Data Received!\n\nUser selected the color: *${color}*.`;
        
    } catch (e) {
        // If the data wasn't JSON (like if it was a plain string)
        responseMessage = `✅ Data Received!\n\nRaw data: *${webAppData}*`;
    }

    // Send a confirmation message back to the user in the main chat
    bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
});

// Basic error logging
bot.on('error', (err) => {
    console.error('Bot Error:', err);
});
