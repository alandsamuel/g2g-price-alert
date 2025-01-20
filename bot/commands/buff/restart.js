const axios = require('axios');
const { 
    SlashCommandBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder,
    EmbedBuilder 
} = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const { exec, spawn } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function killProcess(processName, interaction) {
  try {
    // Use taskkill to terminate the process by name
    await execAsync(`taskkill /IM ${processName} /F`);
    await interaction.reply(`${processName} has been terminated.`);
  } catch (error) {
    await interaction.reply(`Failed to terminate ${processName}:`, error.message);
  }
}

async function runBatFile(batFilePath, interaction) {
    try {
      const bat = spawn('cmd.exe', ['/c', batFilePath]);
  
      bat.stdout.on('data', async (data) => {
        await interaction.reply(`Output: ${data}`);
      });
  
      bat.stderr.on('data', async (data) => {
        await interaction.reply(`Error: ${data}`);
      });
  
      bat.on('close', async (code) => {
        await interaction.reply(`Batch file exited with code ${code}`);
      }); 
    } catch (error) {
        await interaction.reply('Failed to execute batch file:', error.message);
    }
  }

const restart = async (interaction) => {
    const processName = 'palworld.exe';
    const batFilePath = 'E:\\steamcmd\\bimbing.bat';

    // Kill the process
    await killProcess(processName, interaction);

    // Run the batch file
    await runBatFile(batFilePath, interaction);

    //cleanup after 10Minutes
    await wait(60000);
    await interaction.deleteReply();
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('restart palworld server'),
    async execute(interaction) {
        const result = await restart(interaction);
        await interaction.reply('Restart Success!');
    },
};