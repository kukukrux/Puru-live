import { Client, TextChannel } from "discord.js";
import { BotEvent} from "src/types";

const event : BotEvent = {
    name: "ready",
    once: true,
    execute: (client : Client) => {
        const currentDate = new Date();
		const ready = new Date();
		const diff = ready.getTime() - currentDate.getTime();
        const puruBotLogChannel: TextChannel = client.channels.cache.get('932647931159384104') as TextChannel;
		puruBotLogChannel.send(`IM ONLINE YAAYYY >W< <@930517933573165056> <@930512531569655808>\nAPI Latency is ${Math.round(client.ws.ping)}ms\nStartup at: ${currentDate.toLocaleString()} `);
        console.log(`Ready! Logged in as ${client.user?.tag}. Startup took ${diff}ms. Startup at ${currentDate.toLocaleString()}`);
    }  
}

export default event;

/*
export default (client: Client): void => {
    client.on("ready", async (client) => {
        const currentDate = new Date();
		const ready = new Date();
		const diff = ready.getTime() - currentDate.getTime();
        const puruBotLogChannel: TextChannel = client.channels.cache.get('932647931159384104') as TextChannel;
		await puruBotLogChannel.send(`IM ONLINE YAAYYY >W< <@930517933573165056> <@930512531569655808>\nAPI Latency is ${Math.round(client.ws.ping)}ms\nStartup at: ${currentDate.toLocaleString()} `);
        console.log(`Ready! Logged in as ${client.user.tag}. Startup took ${diff}ms. Startup at ${currentDate.toLocaleString()}`);
    })
} */