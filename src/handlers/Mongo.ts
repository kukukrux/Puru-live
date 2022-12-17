import { connection } from 'mongoose';
import { logStuff } from '../functions';
import { MongoEvent } from '../types';
import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

module.exports = async (client: Client) => {
	const mongoEventsDir = join(__dirname, '../mongoDB/events');
	logStuff('Loading MongoDB events folder...', client, 'info');

	readdirSync(mongoEventsDir).forEach(file => {
		if (!file.endsWith('.ts')) return;
		const mongoEvent: MongoEvent = require(`${mongoEventsDir}/${file}`).default;
		mongoEvent.once ?
			connection.once(mongoEvent.name, (...args) => mongoEvent.execute(...args))
			:
			connection.on(mongoEvent.name, (...args) => mongoEvent.execute(...args));
		logStuff(`Successfully loaded MongoDB event "${mongoEvent.name}".`, client, 'info');
	});
	logStuff('MongoDB events folder loaded\n', client, 'info');
};