import { Guild } from 'discord.js';
import GuildModel from '../mongoDB/schema/Guild';
import { BotEvent } from '../types';

const event: BotEvent = {
	name: 'guildCreate',
	execute: (guild : Guild) => {
		const newGuild = new GuildModel({
			guildId: guild.id,
			guildName: guild.name,
			options: {},
			reactionRolesConfiguration: [{}],
			joinedAt: Date.now(),
		});
		newGuild.save();
	},
};

export default event;