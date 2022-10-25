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
			console.log('There was an Error executing the ' + command.name + ' Command\n' + error);
			logStuff(error);
		}
	},
	cooldown: 10,
	aliases: ['sayhello'],
	permissions: ['Administrator', PermissionFlagsBits.ManageEmojisAndStickers],
};

export default command;