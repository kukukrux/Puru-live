import { MongoEvent } from '../../types';
import { Client } from 'discord.js';

const mongoEvent : MongoEvent = {
	name: 'disconnected',
	execute: (client : Client) => {
		console.warn('\x1b[43m' + '[Database Status]: Database disconnected.' + '\x1b[0m');
	},
};

export default mongoEvent;