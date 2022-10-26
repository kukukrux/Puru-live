import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { Command, SlashCommand } from './types';
import { config } from 'dotenv';
import { readdirSync } from 'fs';
import { join } from 'path';
import { ReactionRole } from 'discordjs-reaction-role';
import configurationRR from './modules/reactionRoles/index';
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

console.log('Bot is starting... \n');
client.slashCommands = new Collection<string, SlashCommand>();
client.commands = new Collection<string, Command>();
config();

console.log('Checking environment variables...');
[
	'TOKEN',
	'PREFIX',
	'GUILD_ID_TO_LOG',
	'LOG_TEST_CHANNEL_ID',
	'LOG_CHANNEL',
	'CLIENT_ID',
	'WELCOME_CHANNEL_ID',
	'BOT_LOG'].forEach((env) => {
	if (!process.env[env]) {
		console.error(`Missing environment variable: ${env}`);
		process.exit(1);
	}
});
console.log('No missing environmental variables.\n');


console.log('Loading handler... \n');
try {
	const handlersDir = join(__dirname, './handlers');
	readdirSync(handlersDir).forEach(handler => {
		require(`${handlersDir}/${handler}`)(client);
	});
	console.log('All Handler loaded.\n');
}
catch (error) {
	console.log(error);
}

console.log('Loading modules... \n');
console.log('Loading module reactionRoles...');
const manager = new ReactionRole(client, configurationRR);
console.log('Loading module reactionRoles finished.\n');
console.log('All modules loaded.\n');


//	process.exit(1);
client.login(process.env.TOKEN);
console.log('Token logged in.\n');


const destroy = () => {
	console.log('Server terminating...');
	console.log('Tearing manager down...');
	manager.teardown();
	console.log('Destroying client...');
	client.destroy();
	console.log('Done!');
};
process.on('SIGINT', destroy);
process.on('SIGTERM', destroy);

export default client;