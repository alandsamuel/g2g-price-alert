const CronJob = require('cron').CronJob;
const moment = require('moment');
const axios = require('axios');

const utils = require('./utils');
const constant = require('./constant');

const bot = require('./bot')

const { generateDiscordMessage } = utils;
const { G2G_URL, FAMILIA_WEBHOOK, cronSetting } = constant;

const getG2gPricesLA = async () => {
  const { data : { payload }} = await axios.get(G2G_URL['LA']);
  const { results } = payload; 
  const g2gData = results.filter(({title}) => {
    return !title.includes('West')
  })
  return g2gData;
};

const getG2gPrices = async (url) => {
  const { data : { payload }} = await axios.get(url);
  const { results } = payload; 
  return results;
};

const sendToDiscord = async (content, url) => {
  const result = await axios.post(url, content);
  return result;
}

const sendPriceToDiscord = async () => {
  console.group();
  console.log('===============================================================');
  console.log('Get prices Timestamp : ', moment())
  try {
    console.log(G2G_URL["LE"])
    console.log(G2G_URL["LA"])
    const g2gPricesLA = await getG2gPricesLA();
    const g2gPricesLE = await getG2gPrices(G2G_URL["LE"]);
    const contentLA = await generateDiscordMessage(g2gPricesLA);
    const contentLE = await generateDiscordMessage(g2gPricesLE);
    sendToDiscord(contentLA, FAMILIA_WEBHOOK.LA);
    sendToDiscord(contentLE, FAMILIA_WEBHOOK.LE);
  } catch (error) {
    console.log('Error when fetching data, code : ', error.code);
  }
  console.log('===============================================================');
  console.groupEnd();
}

// const job = new CronJob(
// 	'*/1 * * * *',
// 	sendPriceToDiscord,
// 	null,
// 	true,
// 	'Asia/Jakarta'
// );

console.log('Starting Cron....')
// job.start();
bot.start();

// sendPriceToDiscord();