import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import GuildDB from './mongoDB/schema/Guild';
import mongoose from 'mongoose';

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
config();

async function init() {
	console.info('Checking environment variables...\n');
	[
		'TOKEN',
		'MONGO_URI',
		'MONGO_DATABASE_NAME',
	].forEach((env) => {
		if (!process.env[env]) {
			console.error(`CRITICAL ERROR: Missing environment variable: ${env}`);
			process.exit(1);
		}
	});
	console.info('No missing environmental variables.\n');

	console.log('Logging into Discord...\n');
	await client.login(process.env.TOKEN)
		.then(() => {
			console.info('Discord Bot logged in.\nConnecting to Databse now.\n');
		})
		.catch(err => {
			console.error('CRITICAL ERROR: Could not connect to Discord.\n' + err);
			client.destroy();
			process.exit();
		});
	await connect(`${process.env.MONGO_URI}/${process.env.MONGO_DATABASE_NAME}`)
		.then(async () => {
			console.info('Connected to Database.\n');
			const foundGuild = await GuildDB.findOne({ guildId: '551693351804731412' });
			if (!foundGuild) return null;
            foundGuild.reactionRolesConfiguration
			foundGuild.options[option] = value;
			foundGuild.save();
		})
		.catch(err => {
			console.error('CRITICAL ERROR: Could not connect to Database.\n' + err);
			client.destroy();
			process.exit();
		});
}

init().then(process.exit());