import { Interaction } from 'discord.js';
import { BotEvent } from '../types';
import { logStuff } from '../functions';

const event : BotEvent = {
	name: 'interactionCreate',
	execute: (interaction: Interaction) => {
		try {
			if (!interaction.isChatInputCommand()) return;
			const command = interaction.client.slashCommands.get(interaction.commandName);
			if (!command) return;
			command.execute(interaction);
		}
		catch (error) {
			console.log('there was an Error executing the ' + event.name + ' Event\n' + error);
			logStuff(error);
		}

	},
};

export default event;