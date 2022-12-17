import { PermissionFlagsBits } from 'discord.js';
import { Command } from '../types';
import { logStuff } from '../functions';

const command : Command = {
	name: 'greet',
	execute: (message) => {
		try {
			const toGreet = message.mentions.members?.first();
			message.channel.send(`Hello there ${toGreet ? toGreet.user.username : message.member?.user.username}!`);
		}
		catch (error) {
			console.log();
			logStuff('There was an Error executing the ' + command.name + ' Command\n' + error, message.client, 'error');
		}
	},
	permissions: ['Administrator', PermissionFlagsBits.ManageEmojisAndStickers],
};

export default command;