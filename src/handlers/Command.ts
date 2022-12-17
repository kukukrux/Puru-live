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

	logStuff('Loading slash commands folder...', client, 'info');
	readdirSync(slashCommandsDir).forEach(file => {
		if (!file.endsWith('.ts')) return;
		const command : SlashCommand = require(`${slashCommandsDir}/${file}`).default;
		slashCommands.push(command.command);
		client.slashCommands.set(command.command.name, command);
		logStuff(`Successfully loaded slash command "${command.command.name}".`, client, 'info');
	});
	logStuff('Slash commands folder loaded\n', client, 'info');

	logStuff('Loading commands folder...', client, 'info');
	readdirSync(commandsDir).forEach(file => {
		if (!file.endsWith('.ts')) return;
		const command : Command = require(`${commandsDir}/${file}`).default;
		commands.push(command);
		client.commands.set(command.name, command);
		logStuff(`Successfully loaded command "${command.name}".`, client, 'info');
	});
	logStuff('Commands folder loaded\n', client, 'info');

	logStuff('Updating Slash Commands...', client, 'info');
	const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

	rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
		body: slashCommands.map(command => command.toJSON()),
	})
		.then((data : any) => {
			logStuff(`Successfully loaded ${data.length} slash command(s)`, client, 'info');
			logStuff(`Successfully loaded ${commands.length} command(s)\n`, client, 'info');
		}).catch(error => {
			logStuff('There was an Error uploading the slash command(s)\n' + error, client, 'info');
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