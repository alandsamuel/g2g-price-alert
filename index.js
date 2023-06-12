const CronJob = require('cron').CronJob;
const moment = require('moment');
const axios = require('axios');

const utils = require('./utils');
const constant = require('./constant');

const { generateDiscordMessage } = utils;
const { g2gPrice, laFamiliaWebhook, cronSetting } = constant;

const getG2gPrices = async () => {
  const { data : { payload }} = await axios.get(g2gPrice);
  const { results } = payload; 
  const g2gData = results.filter(({title}) => {
    return !title.includes('West')
  })
  return g2gData;
};

const sendToDiscord = async (content) => {
  const url = laFamiliaWebhook;
  const result = await axios.post(url, content);
  return result;
}

const sendPriceToDiscord = async () => {
  console.log('Get prices Timestamp : ', moment())
  try {
    const g2gPrices = await getG2gPrices();
    const content = await generateDiscordMessage(g2gPrices);
    sendToDiscord(content);
  } catch (error) {
    console.log(error);
  }
}

const job = new CronJob(
	'*/5 * * * *',
	sendPriceToDiscord,
	null,
	true,
	'Asia/Jakarta'
);

console.log('Starting Cron....')
job.start();