import { MongoEvent } from '../../types';
import { Client } from 'discord.js';

const mongoEvent : MongoEvent = {
	name: 'err',
	execute: (client : Client) => {
		console.error('\x1b[31m' + '[Database Status]: An Error occured within the database connection' + '\x1b[0m');
	},
};

export default mongoEvent;