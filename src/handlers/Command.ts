import { Client, Routes, SlashCommandBuilder } from 'discord.js';
import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';
import { join } from 'path';
import { Command, SlashCommand } from '../types';
import { logStuff } from '../functions';

module.exports = (client : Client) => {
	const slashCommands : SlashCommandBuilder[] = [];
	const commands : Command[] = [];

	const slashCommandsDir = join(__dirname, '../slashCommands');
	const commandsDir = join(__dirname, '../commands');

	console.log('Loading slash commands folder...');
	readdirSync(slashCommandsDir).forEach(file => {
		if (!file.endsWith('.ts')) return;
		const command : SlashCommand = require(`${slashCommandsDir}/${file}`).default;
		slashCommands.push(command.command);
		client.slashCommands.set(command.command.name, command);
		console.log(`Successfully loaded slash command "${command.command.name}".`);
	});
	console.log('Slash commands folder loaded\n');

	console.log('Loading commands folder...');
	readdirSync(commandsDir).forEach(file => {
		if (!file.endsWith('.ts')) return;
		const command : Command = require(`${commandsDir}/${file}`).default;
		client.commands.set(command.name, command);
		console.log(`Successfully loaded command "${command.name}".`);
	});
	console.log('Commands folder loaded\n');

	console.log('Updating Slash Commands...');
	const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

	rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
		body: slashCommands.map(command => command.toJSON()),
	})
		.then((data : any) => {
			console.log(`Successfully loaded ${data.length} slash command(s)`);
			console.log(`Successfully loaded ${commands.length} command(s)\n`);
		}).catch(error => {
			console.log('There was an Error uploading the slash command(s)\n' + error);
			logStuff(error);
		});
};

//  To delete all commands in the respective scope (one guild, all global commands) you can pass an empty array when setting commands.
// for guild-based commands
/*
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
.then(() => console.log('Successfully deleted all guild commands.'))
.catch(console.error);
/

// for global commands
/
rest.put(Routes.applicationCommands(clientId), { body: [] })
.then(() => console.log('Successfully deleted all application commands.'))
.catch(console.error);
*/