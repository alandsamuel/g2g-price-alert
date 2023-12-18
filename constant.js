require('dotenv').config()

const devWebhook = process.env.DEV_WEBHOOK
const laFamiliaWebhook = process.env.FAMILIA_WEBHOOK
const g2gPrice = process.env.G2G_PRICE
const BOT_TOKEN = process.env.BOT_TOKEN
const BOT_CLIENT_ID= process.env.BOT_CLIENT_ID
const SERVER_ID= process.env.SERVER_ID

module.exports = {
devWebhook,
laFamiliaWebhook,
g2gPrice,
BOT_TOKEN,
SERVER_ID,
BOT_CLIENT_ID
}