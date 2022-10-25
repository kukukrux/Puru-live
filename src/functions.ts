import { GuildMember, PermissionFlagsBits, PermissionResolvable, TextChannel } from 'discord.js';
import { readFileSync } from 'fs';
import client from './index';

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

export const logStuff = (input: any) => {
	const botLogChannelID: string = process.env.BOT_LOG as string;
	const botLogChannel: TextChannel = client.channels.cache.get(botLogChannelID) as TextChannel;
	botLogChannel.send(input);
};