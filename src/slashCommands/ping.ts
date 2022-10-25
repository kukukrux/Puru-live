import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';

const command : SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('bot pinging'),
	execute: interaction => {
		interaction.reply('Pong! uwu');
	},
};

export default command;