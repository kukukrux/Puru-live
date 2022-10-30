import { Client } from 'discord.js';
import { BotEvent } from 'src/types';
import { logStuff } from '../functions';

const event : BotEvent = {
	name: 'ready',
	once: true,
	execute: (client : Client) => {
		const currentDate = new Date();
		const date = new Date();
		const diff = date.getTime() - currentDate.getTime();
		try {
			logStuff(`IM ONLINE YAAYYY >W< <@930517933573165056> <@930512531569655808>\nAPI Latency is ${Math.round(client.ws.ping)}ms\nStartup at: ${currentDate.toLocaleString()} `);
			console.log(`Ready! Logged in as ${client.user?.tag}. Startup took ${diff}ms. Startup at ${currentDate.toLocaleString()}`);
		}
		catch (error) {
			console.log('there was an Error executing the ' + event.name + ' Event\n' + error);
			logStuff(error);
		}
	},
};

export default event;