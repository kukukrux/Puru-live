import { MongoEvent } from '../../types';
import { Client } from 'discord.js';

const mongoEvent : MongoEvent = {
	name: 'connected',
	execute: (client : Client) => {
		console.info('\x1b[33m' + '[Database Status]: Database connected: ' + process.env.MONGO_DATABASE_NAME + '\x1b[0m');
	},
};

export default mongoEvent;