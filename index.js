const telegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

// token fetched using @botfather to create a new bot
const TOKEN = process.env.BOT_TOKEN;

// create a bot that uses 'polling' to fetch new messages
const bot = new telegramBot(TOKEN, { polling: true });
bot.on('message', (msg) => {

    const text = msg.text.toString().toLowerCase();
    console.log('Message Recieved',text);

    bot.sendMessage(msg.chat.id, `You said ${text}`);
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Welcome to the bot,How can i help you?`);
});

bot.onText(/\/joke/,async (msg) => {
    const joke = await axios.get('https://official-joke-api.appspot.com/random_joke');
    const setup = joke.data.setup;
    const punchline = joke.data.punchline;
    bot.sendMessage(msg.chat.id, setup + ' ' + punchline);
});

