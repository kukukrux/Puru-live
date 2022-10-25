import { Message, TextChannel } from 'discord.js';
import { BotEvent } from 'src/types';
import client from '../index';
import { getRandomLine, logStuff } from '../functions';

const event : BotEvent = {
	name: 'messageCreate',
	execute: (message : Message) => {
		//  check if message is from a server member or not from bot, else return
		if (message.author.bot) return;

		//  check if message is send inside a server, else return
		if (!message.guild) return;

		const prefix = process.env.PREFIX;

		try {
			const guildIDToLog: string = process.env.GUILD_ID_TO_LOG as string;
			const logTestChannelID: string = process.env.LOG_TEST_CHANNEL_ID as string;
			const logChannelID: string = process.env.LOG_CHANNEL as string;
			const logChannel: TextChannel = client.channels.cache.get(logChannelID) as TextChannel;

			if (message.guild.id == guildIDToLog || message.channel.id == logTestChannelID) {
				console.log(`message registered in ${message.guild.name}`);
				const messageChannel: TextChannel = client.channels.cache.get(message.guild.id) as TextChannel;
				const msgLog = `[MESSAGE] ${message.guild.name}\n> Channel: <#${message.channel.id}> - ${messageChannel}\n> User: ${message.author.username}#${message.author.discriminator} - ${message.author.id}\n\n${message.content}`;
				logChannel.send(msgLog);
				console.log(msgLog);
			}

			if (message.content.startsWith(prefix)) {
				const args = message.content.substring(prefix.length).split(' ');
				let command = message.client.commands.get(args[0]);

				if (!command) {
					const commandFromAlias = message.client.commands.find((command) => command.aliases.includes(args[0]));
					if (commandFromAlias) command = commandFromAlias;
					else return;
				}

				command.execute(message, args);

			}
			else {

				if (message.content.toLowerCase().includes('saul')) {
					message.reply({ files: [{ attachment: 'res/img/saul.gif' }] });
				}

				if (message.content.toLowerCase().includes('puru')) {
					message.react('<:blush:955914251447468032> ');
				}

				if (message.content.toLowerCase().includes('andre') || message.content.toLowerCase().includes('andré')) {
					message.react('<:smoothbrain:1031934692406083624> ');
				}

				const quranTrigger: string[] = ['quran', 'mashallah', 'allah', 'wallah', 'bismillah'];
				if (quranTrigger.some(element => message.content.includes(element))) {
					message.reply(getRandomLine('res/text/quran.txt'));
				}
			}
		}
		catch (error) {
			console.log('there was an Error executing the ' + event.name + ' Event\n' + error);
			logStuff(error);
		}
	},
};

export default event;