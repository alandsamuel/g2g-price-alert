require('dotenv').config()

const DEV_WEBHOOK = process.env.DEV_WEBHOOK
const BOT_TOKEN = process.env.BOT_TOKEN
const BOT_CLIENT_ID= process.env.BOT_CLIENT_ID
const SERVER_ID= process.env.SERVER_ID

const G2G_URL = {
    "LA" : "https://sls.g2g.com/offer/search?service_id=lgc_service_1&brand_id=lgc_game_23027&region_id=ac3f85c1-7562-437e-b125-e89576b9a38e&sort=lowest_price&page_size=48&currency=IDR&country=ID",
    "LE" : "https://sls.g2g.com/offer/search?service_id=lgc_service_1&brand_id=lgc_game_31939&region_id=ac3f85c1-7562-437e-b125-e89576b9a38e&sort=lowest_price&page_size=48&currency=IDR&country=ID",
}

const FAMILIA_WEBHOOK = {
    "LA" : process.env.FAMILIA_WEBHOOK_LA,
    "LE" : process.env.FAMILIA_WEBHOOK_LE
}


module.exports = {
DEV_WEBHOOK,
FAMILIA_WEBHOOK,
G2G_URL,
BOT_TOKEN,
SERVER_ID,
BOT_CLIENT_ID
}