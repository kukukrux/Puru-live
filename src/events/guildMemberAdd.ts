/* eslint-disable @typescript-eslint/no-unused-vars */
import { BotEvent } from '../types';
import { loadImage, registerFont, createCanvas } from 'canvas';
import { TextChannel, GuildMember, AttachmentBuilder, Channel } from 'discord.js';
import { logStuff } from '../functions';
import client from '../index';

registerFont('res/font/SF-Pro-Display-Regular.otf', { family: 'SF Pro Regular' });

const event : BotEvent = {
	name: 'guildMemberAdd',
	once: true,
	execute: async (member : GuildMember) => {
		try {
			const welcomeChannelID: string = process.env.WELCOME_CHANNEL_ID as string;
			const welcomeChannel: Channel = client.channels.cache.get(welcomeChannelID) as TextChannel;
			const canvas = createCanvas(650, 240);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = '#ffffff';

			const background = await loadImage('res/img/welcomeBanner.png').then((img) => {
				ctx.drawImage(img, 0, 0);
				ctx.font = '30px "SF Pro Regular"';
				ctx.textAlign = 'center';
				ctx.fillText('Welcome', 325, 173);
				ctx.beginPath();
				ctx.arc(325, 80, 60, 0, Math.PI * 2, true);
				ctx.stroke();
				ctx.fill();
			});

			ctx.font = '30px "SF Pro Regular"';
			ctx.textAlign = 'center';
			ctx.fillText(member.user.tag, 325, 200);
			ctx.font = '18px "SF Pro Regular"';
			ctx.fillText(`Member #${member.guild?.memberCount}`, 325, 220);
			ctx.beginPath();
			ctx.arc(325, 80, 58, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.clip();

			const memberAvatar = await loadImage(member.user.displayAvatarURL({ extension: 'png', size: 1024 })).then((img) => {
				ctx.drawImage(img, 267, 22, 120, 120);
			});


			const welcomeMessage = new AttachmentBuilder(canvas.toBuffer(), { name: `welcome-${member.id}.png` });
			welcomeChannel.send({ files: [welcomeMessage] });
		}
		catch (error) {
			console.log('there was an Error executing the ' + event.name + ' Event\n' + error);
			logStuff(error);
		}
	},
};

export default event;