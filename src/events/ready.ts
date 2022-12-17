import { Client } from 'discord.js';
import { BotEvent } from '../types';
import { logStuff } from '../functions';

const event : BotEvent = {
	name: 'ready',
	once: true,
	execute: (client : Client) => {
		const currentDate = new Date();
		try {
			logStuff(
				`
				IM ONLINE YAAYYY >W< <@&1047948897810645032>\nAPI Latency is ${Math.round(client.ws.ping)}ms\nStartup at: ${currentDate.toLocaleString()}
				Logged in as ${client.user?.tag}. Startup took ${new Date().getTime() - currentDate.getTime()}ms.
				Startup at ${currentDate.toLocaleString()}.`,
				client,
				'info',
			);
		}
		catch (error) {
			logStuff('There was an Error executing the ' + event.name + ' Event\n' + error, client, 'error');
		}
	},
};

export default event;