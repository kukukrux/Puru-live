import { Message, TextChannel, ChannelType } from 'discord.js';
import { BotEvent } from '../types';
import { logStuff, checkPermissions, sendTimedMessage, getGuildOption } from '../functions';

const event : BotEvent = {
	name: 'messageCreate',
	execute: async (message : Message) => {
		//  check if message is from a server member or not from bot, else return
		if (message.author.bot) return;

		//  check if message is send inside a server, else return
		if (!message.guild) return;

		const prefix = process.env.PREFIX;
		const client = message.client;

		try {
			const toLog: boolean = await getGuildOption(message.guild, 'log');
			const testChannelID: string = process.env.TEST_CHANNEL_ID as string;

			if (toLog || message.channel.id == testChannelID) {
				const logChannel: TextChannel = client.channels.cache.get(process.env.LOG_CHANNEL as string) as TextChannel;

				const msgLog = `
				[MESSAGE] ${message.guild.name}
				> Channel: <#${message.channel.id}> - ${message.channel}
				> User: ${message.author.username}#${message.author.discriminator} - ID:${message.author.id}
				> Content:
				${message.content}`;
				logChannel.send(msgLog);
			}

			if (message.content.startsWith(prefix)) {
				if (message.channel.type !== ChannelType.GuildText) return;

				const args = message.content.substring(prefix.length).split(' ');
				const command = message.client.commands.get(args[0]);

				if (!command) return;
				if (!message.member) return;

				const neededPermissions = checkPermissions(message.member, command.permissions);
				if (neededPermissions !== null) {
					return sendTimedMessage(
						`
					You don't have enough permissions to use this command. 
					\n Needed permissions: ${neededPermissions.join(', ')}
					`,
						message.channel,
						5000,
					);
				}

				command.execute(message, args);

			}
			else {

				message.client.reactions.forEach(reaction => {
					const triggerWords: string[] = reaction.trigger;
					triggerWords.forEach(word => {
						if (message.content.includes(word)) {
							reaction.execute(message);
						}
					});
				});

			}
		}
		catch (error) {
			logStuff('there was an Error executing the ' + event.name + ' Event\n' + error, client, 'error');
		}
	},
};

export default event;