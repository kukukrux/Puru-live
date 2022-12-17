import { model, Schema } from 'mongoose';

const GuildSchema: Schema = new Schema({
	userId: { required:true, type: String },
	userName: { required:true, type: String },
	testChannelId: { type: String, default: process.env.TEST_CHANNEL_ID },
	botLogChannelId: { type: String, default: process.env.BOT_LOG },
	logConfig: {
		guildId: String,
		logChannelId: String,
	},
});

const GuildModel = model('config', GuildSchema);

export default GuildModel;