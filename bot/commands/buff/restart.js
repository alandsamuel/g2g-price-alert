const axios = require('axios');
const { 
    SlashCommandBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder,
    EmbedBuilder 
} = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const { resolve } = require('node:path');

const execAsync = promisify(exec);

async function killProcess(processName, interaction) {
  try {
    // Use taskkill to terminate the process by name
    await execAsync(`taskkill /IM ${processName} /F`);
    await interaction.followUp({
        content: `${processName} has been terminated.`,
        fetchReply: true, // Fetch the message object
      });
  } catch (error) {
    await interaction.followUp({
      content: `Failed to terminate ${processName}: ${error.message}`,
      fetchReply: true, // Fetch the message object
    });
  }
}

async function runBatFile(batFilePath, interaction) {
  const successMessage = 'Launching server';
    try {
      const bat = spawn('cmd.exe', ['/c', batFilePath]);
  
      bat.stdout.on('data', async (data) => {
        await interaction.followUp({
          content: `Output: ${data}`,
          fetchReply: true, // Fetch the message object
        });
        if(data.toString().includes(successMessage)){
          await interaction.followUp({
            content: 'Server restarted successfully!',
            fetchReply: true, // Fetch the message object
          });
          resolve();
          bat.kill;
        }
      });
  
      bat.stderr.on('data', async (data) => {
        await interaction.followUp({
          content: `Error: ${data}`,
          fetchReply: true, // Fetch the message object
        });

      });
  
      bat.on('close', async (code) => {
        await interaction.followUp({
          content: `Batch file exited with code ${code}`,
          fetchReply: true, // Fetch the message object
        });

      }); 
    } catch (error) {
        await interaction.followUp({
          content: `Failed to execute batch file: ${error.message}`,
          fetchReply: true, // Fetch the message object
        });

    }
  }

const restart = async (interaction) => {
    const processName = 'PalServer-Win64-Shipping-Cmd.exe';
    const batFilePath = 'E:\\steamcmd\\bumbung.bat';
    await interaction.reply(`preparing restart process`);

    // Kill the process
    await killProcess(processName, interaction);

    // Run the batch file
    await runBatFile(batFilePath, interaction);

    await wait(3000);
    await interaction.deleteReply();
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('restart palworld server'),
    async execute(interaction) {
        await restart(interaction);
    },
};