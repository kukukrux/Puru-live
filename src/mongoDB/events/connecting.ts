import { MongoEvent } from '../../types';
import { Client } from 'discord.js';

const mongoEvent : MongoEvent = {
	name: 'connecting',
	execute: (client : Client) => {
		console.info('\x1b[33m' + '[Database Status]: Database is connecting... ' + '\x1b[0m');
	},
};

export default mongoEvent;