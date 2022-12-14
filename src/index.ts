import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { Command, SlashCommand, Reaction } from './types';
import { config } from 'dotenv';
import { readdirSync } from 'fs';
import { join } from 'path';
import { connect } from 'mongoose';
import { endHost, logStuff } from './functions';
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildScheduledEvents,
	],
	partials: [
		Partials.User,
		Partials.Channel,
		Partials.GuildMember,
		Partials.Message,
		Partials.Reaction,
		Partials.GuildScheduledEvent,
		Partials.ThreadMember,
	],
});

client.slashCommands = new Collection<string, SlashCommand>();
client.commands = new Collection<string, Command>();
client.reactions = new Collection<string, Reaction>();
config();

async function main() {
	console.info('Checking environment variables...\n');
	[
		'TOKEN',
		'PREFIX',
		'GUILD_ID_TO_LOG',
		'TEST_CHANNEL_ID',
		'LOG_CHANNEL',
		'BOT_LOG',
		'MONGO_URI',
		'MONGO_DATABASE_NAME',
	].forEach((env) => {
		if (!process.env[env]) {
			console.error(`CRITICAL ERROR: Missing environment variable: ${env}`);
			process.exit(1);
		}
	});
	console.info('No missing environmental variables.\n');

	console.info('Loading handlers... \n');
	const handlersDir = join(__dirname, './handlers');
	readdirSync(handlersDir).forEach(handler => {
		require(`${handlersDir}/${handler}`)(client);
	});
	console.info('All Handler loaded.\n');

	console.log('Logging into Discord...\n');
	await client.login(process.env.TOKEN)
		.then(() => {
			logStuff('Discord Bot logged in.\n', client, 'info');
		})
		.catch(err => {
			console.error('CRITICAL ERROR: Could not connect to Discord.\n' + err);
			endHost(client);
		});
	await connect(`${process.env.MONGO_URI}/${process.env.MONGO_DATABASE_NAME}`)
		.catch(err => {
			logStuff('CRITICAL ERROR: Could not connect to Database.\n' + err, client, 'error');
			endHost(client);
		});
}

console.info('Bot is starting... \n');
main()
	.then(() => {
		logStuff('Process is up and running!\n', client, 'info');
	});

// process.on('SIGINT', endHost(client));
// process.on('SIGTERM', endHost(client));

// export default client;