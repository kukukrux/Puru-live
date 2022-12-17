import { GuildMember, PermissionFlagsBits, PermissionResolvable, TextChannel } from 'discord.js';
import { readFileSync } from 'fs';
import { Client, Guild } from 'discord.js';
import { GuildOption } from './types';
import GuildDB from './mongoDB/schema/Guild';
import mongoose from 'mongoose';

export const checkPermissions = (member: GuildMember, permissions: Array<PermissionResolvable>) => {
	const neededPermissions: PermissionResolvable[] = [];
	permissions.forEach(permission => {
		if (!member.permissions.has(permission)) neededPermissions.push(permission);
	});
	if (neededPermissions.length === 0) return null;
	return neededPermissions.map(p => {
		if (typeof p === 'string') return p.split(/(?=[A-Z])/).join(' ');
		else return Object.keys(PermissionFlagsBits).find(k => Object(PermissionFlagsBits)[k] === p)?.split(/(?=[A-Z])/).join(' ');
	});
};

export const getGuildOption = async (guild: Guild, option: GuildOption) => {
	if (mongoose.connection.readyState === 0) throw new Error('Cannot get Database entry. Database not connected.');
	const foundGuild = await GuildDB.findOne({ guildId: guild.id });
	if (!foundGuild) return null;
	return foundGuild.options[option];
};

export const setGuildOption = async (guild: Guild, option: GuildOption, value: any) => {
	if (mongoose.connection.readyState === 0) throw new Error('Cannot set Database entry. Database not connected.');
	const foundGuild = await GuildDB.findOne({ guildId: guild.id });
	if (!foundGuild) return null;
	foundGuild.options[option] = value;
	foundGuild.save();
};

export const sendTimedMessage = (message: string, channel: TextChannel, duration: number) => {
	channel.send(message)
		.then(m => setTimeout(async () => (await channel.messages.fetch(m)).delete(), duration));
	return;
};

export const getRandomLine = (filename: string) => {
	const data = readFileSync(filename, 'utf8');
	const lines = data.split('\n');
	return lines[Math.floor(Math.random() * lines.length)];
};

export const logStuff = (input: any, client: Client, severity: string) => {
	const botLogChannelID: string = process.env.BOT_LOG as string;
	const botLogChannel: TextChannel = client.channels.cache.get(botLogChannelID) as TextChannel;
	switch (severity) {
	case 'log': {
		if (botLogChannel) {
			console.log(input);
			botLogChannel.send(input);
		}
		else {
			console.log(input);
		}
		break;
	}
	case 'info': {
		if (botLogChannel) {
			console.info('\x1b[33m' + input + '\x1b[0m');
			botLogChannel.send('Info: \n\n' + input);
		}
		else {
			console.info('\x1b[33m' + input + '\x1b[0m');
		}
		break;
	}
	case 'warn': {
		if (botLogChannel) {
			console.warn('\x1b[43m' + input + '\x1b[0m');
			botLogChannel.send('WARNING <@&1047948897810645032>: \n\n' + input);
		}
		else {
			console.log('\x1b[43m' + input + '\x1b[0m');
		}
		break;
	}
	case 'error': {
		if (botLogChannel) {
			console.error('\x1b[31m' + input + '\x1b[0m');
			botLogChannel.send('ERROR <@&1047948897810645032>: \n\n' + input);
		}
		else {
			console.error('\x1b[31m' + input + '\x1b[0m');
		}
		break;
	}
	}
};

export const endHost = (discordClient: Client) => {
	console.warn('\x1b[43mProcess terminating...\x1b[0m', '\x1b[43mDestroying client...\x1b[0m');
	discordClient.destroy();
	console.warn('\x1b[43mClosing Host!\x1b[0m');
	process.exit();
};