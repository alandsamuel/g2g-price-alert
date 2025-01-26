const { SlashCommandBuilder } = require('discord.js');
const { checkServer } = require('../utils/connection');

const pong = async (interaction) => {
	const { user } = interaction;
	const host = '127.0.0.1';
	const port = 7777;
	
	const isRunning = await checkServer(host, port);
	if (isRunning) {
		await interaction.reply(`Hi ${user.tag}, The Palworld Server Running on ${host}:${port}`);
	} else {
		await interaction.reply(`The Palworld Server not reachable!`);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await pong(interaction);
	},
};