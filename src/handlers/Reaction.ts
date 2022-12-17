import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Reaction } from '../types';
import { logStuff } from '../functions';

module.exports = (client : Client) => {
	const reactions: Reaction[] = [];

	const reactionDir = join(__dirname, '../reactions');

	logStuff('Loading reactions folder...', client, 'info');
	readdirSync(reactionDir).forEach(file => {
		if (!file.endsWith('.ts')) return;
		const reaction: Reaction = require(`${reactionDir}/${file}`).default;
		reactions.push(reaction);
		client.reactions.set(reaction.name, reaction);
		logStuff(`Successfully loaded reaction "${reaction.name}".`, client, 'info');
	});
	logStuff('Reaction folder loaded', client, 'info');
	logStuff(`Successfully loaded ${reactions.length} reaction(s)\n`, client, 'info');
};