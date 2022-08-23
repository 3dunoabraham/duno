import chatid from './telegramKey.js'
import TelegramBot from 'node-telegram-bot-api'

module.exports = class TELEGRAM_WRAPPER {
	constructor(_options = null)
	{
		let self = this;

		this.options = _options
		this.init()
	}

	init()
	{
		this.token = chatid

		// Create a bot that uses 'polling' to fetch new updates
		this.bot = new TelegramBot(this.token, {polling: true});

		this.setCommands()
	}

	setCommands()
	{
		// // Matches "/echo <whatever>"
		this.bot.onText(/\/echo (.+)/, (msg, match) => {
		  // 'msg' is the received Message from Telegram
		  // 'match' is the result of executing the regexp above on the text content
		  // of the message

		  const chatId = msg.chat.id;
		  const resp = match[1].toUpperCase(); // the captured "whatever"

		  // send back the matched "whatever" to the chat
		  this.bot.sendMessage(chatId, resp);
		});

	}
}