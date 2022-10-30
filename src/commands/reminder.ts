import { PermissionFlagsBits } from 'discord.js';
import { Command } from '../types';
import { logStuff } from '../functions';

/**
 * Command Interface: {prefix}reminder t f m
 * t: amount (number)
 * f: format (s - seconds, m - minutes, h - hours, d - days)
 * m: reminder message ("text") | optional
 */

const command : Command = {
	name: 'reminder',
	execute: async (message) => {
		try {
			const args: string[] = message.content.toLowerCase().slice(process.env.PREFIX.length).trim().split(/ +/g);
			if (args[0] !== 'reminder') {
				console.log(`${message.author} had no "reminder" inside reminder command`);
				message.reply('No "reminder" inside reminder command');
				return;
			}
			const authorID: string = message.author.id;
			const t: number = parseInt(args[1]);
			const f: string = args[2];
			let m: string = `<@${authorID}> REMINDER`;
			if (args[3] !== undefined) {
				if (args[3].charAt(0) !== '"' && args[3].slice(-1) !== '"') {
					console.log('Reminder Message must be in parentheses');
					message.reply('Reminder Message must be in parentheses');
					return;
				}
				m = `<@${authorID}> REMINDER: "${message.content.match(/"([^)]+)"/)![1]}"`;
				//	/\[([^)]+)\]/
				//	/\"([^)]+)\"/
			}
			console.log('Array0:' + args[0] + ' Array1:' + args[1] + ' Array2: ' + args[2] + ' Array3: ' + args[3] + '\nt: ' + t + ' f: ' + f + 'm: ' + m + 'authorID' + authorID);
			const reminderReply = () => {
				message.reply(m);
			};
			if (f == undefined || t == undefined) {
				console.log(`${message.author} input no time or format parameters for reminder`);
				message.reply(
					'missing parameters\nCommand Interface: {prefix}reminder f t m\nt: amount\nf: format (s - seconds, m - minutes, h - hours, d - days)\nm: reminder message (text) | optional',
				);
				return;
			}
			switch (f) {
			case 's' : {
				const msDelay: number = t * 1000;
				message.reply(`Reminder has been set. You will be reminded in ${msDelay / 1000} second/s!`);
				setTimeout(reminderReply, msDelay);
				break;
			}
			case 'seconds': {
				const msDelay: number = t * 1000;
				message.reply(`Reminder has been set. You will be reminded in ${msDelay / 1000} second/s!`);
				setTimeout(reminderReply, msDelay);
				break;
			}
			case 'm' : {
				const msDelay: number = t * 60000;
				message.reply(`Reminder has been set. You will be reminded in ${msDelay / 60000} minute/s!`);
				setTimeout(reminderReply, msDelay);
				break;
			}
			case 'minutes' : {
				const msDelay: number = t * 60000;
				message.reply(`Reminder has been set. You will be reminded in ${msDelay / 60000} minute/s!`);
				setTimeout(reminderReply, msDelay);
				break;
			}
			case 'h' : {
				const msDelay: number = t * 3600000;
				message.reply(`Reminder has been set. You will be reminded in ${msDelay / 3600000} hour/s!`);
				setTimeout(reminderReply, msDelay);
				break;
			}
			case 'hours' : {
				const msDelay: number = t * 3600000;
				message.reply(`Reminder has been set. You will be reminded in ${msDelay / 3600000} hour/s!`);
				setTimeout(reminderReply, msDelay);
				break;
			}
			case 'd' : {
				const msDelay: number = t * 86400000;
				message.reply(`Reminder has been set. You will be reminded in ${msDelay / 86400000} day/s!`);
				setTimeout(reminderReply, msDelay);
				break;
			}
			case 'days' : {
				const msDelay: number = t * 86400000;
				message.reply(`Reminder has been set. You will be reminded in ${msDelay / 86400000} day/s!`);
				setTimeout(reminderReply, msDelay);
				break;
			}
			}
		}
		catch (error) {
			console.log('There was an Error executing the ' + command.name + ' Command\n' + error);
			logStuff(error);
		}
	},
	cooldown: 10,
	aliases: ['remindMe'],
	permissions: ['Administrator', PermissionFlagsBits.ManageEmojisAndStickers],
};

export default command;