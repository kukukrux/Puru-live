import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { BotEvent } from '../types';
import { logStuff } from '../functions';

module.exports = (client: Client) => {
	const eventsDir = join(__dirname, '../events');
	logStuff('Loading events folder...', client, 'info');

	readdirSync(eventsDir).forEach(file => {
		if (!file.endsWith('.ts')) return;
		const event: BotEvent = require(`${eventsDir}/${file}`).default;
		event.once ?
			client.once(event.name, (...args) => event.execute(...args))
			:
			client.on(event.name, (...args) => event.execute(...args));
		logStuff(`Successfully loaded event "${event.name}".`, client, 'info');
	});
	logStuff('Events folder loaded\n', client, 'info');
};