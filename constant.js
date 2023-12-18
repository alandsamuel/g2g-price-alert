require('dotenv').config()

const DEV_WEBHOOK = process.env.DEV_WEBHOOK
const FAMILIA_WEBHOOK = process.env.FAMILIA_WEBHOOK
const G2G_URL = process.env.G2G_PRICE
const BOT_TOKEN = process.env.BOT_TOKEN
const BOT_CLIENT_ID= process.env.BOT_CLIENT_ID
const SERVER_ID= process.env.SERVER_ID

module.exports = {
DEV_WEBHOOK,
FAMILIA_WEBHOOK,
G2G_URL,
BOT_TOKEN,
SERVER_ID,
BOT_CLIENT_ID
}