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
        console.log(line);
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
    const processInfoServer = await getProcessInfo('PalServer-Win64-Shipping-');
    await interaction.reply(`Palworld server is running with memory usage: ${processInfoServer.memUsage}KB`);

    //cleanup after 1Minutes
    await wait(60000);
    await interaction.deleteReply();
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check')
		.setDescription('check process'),
	async execute(interaction) {
		await search(interaction);
	},
};