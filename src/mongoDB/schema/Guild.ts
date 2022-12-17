import { model, Schema } from 'mongoose';

const GuildSchema: Schema = new Schema({
	guildId: { required:true, type: String },
	guildName: { required:true, type: String },
	options: {
		prefix: { type: String, default: process.env.PREFIX },
		log: { type: Boolean, default: false },
		logChannelId: String,
		welcomeUser: { type: Boolean, default: false },
		welcomeChannelId: String,
	},
	reactionRolesConfiguration: [{
		messageId: { type: String },
		reaction: { type: String },
		roleId: { type: String },
	}],
});

const GuildModel = model('guilds', GuildSchema);

export default GuildModel;