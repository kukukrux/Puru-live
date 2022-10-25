import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';

const command : SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test canvas'),
	execute: async interaction => {
		try {
			console.log('tested');
		}
		catch (error) {
			console.log(error);
		}
	},
};

export default command;