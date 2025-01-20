const axios = require('axios');
const { 
    SlashCommandBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder,
    EmbedBuilder 
} = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function getProcessInfo(processName) {
  try {
    const { stdout } = await execAsync('tasklist');
    const lines = stdout.split('\n');
    
    for (const line of lines) {
        console.log('line : ', line);
      if (line.toLowerCase().includes(processName.toLowerCase())) {
        const parts = line.trim().split(/\s+/);
        const memUsage = parts[parts.length - 2]; // Memory usage is in the last columns
        return { isRunning: true, memUsage };
      }
    }
    return { isRunning: false };
  } catch (error) {
    console.error('Error checking process:', error);
    return { isRunning: false };
  }
}

const search = async (interaction) => {
    const input = interaction.options.getString('input') ?? 'No input provided';
    const processInfo = await getProcessInfo(input);
    await interaction.reply(`${input} is running with memory usage: ${processInfo.memUsage}KB`);

    const processInfoServer = await getProcessInfo('PalServer-Win64-Shipping-Cmd.exe');
    await interaction.reply(`${input} is running with memory usage: ${processInfoServer.memUsage}KB`);

    //cleanup after 1Minutes
    await wait(60000);
    await interaction.deleteReply();
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check')
		.setDescription('check process')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Search term')
                .setRequired(true)),
	async execute(interaction) {
		await search(interaction);
	},
};