/* eslint-disable @typescript-eslint/no-unused-vars */
import { BotEvent } from '../types';
import { loadImage, registerFont, createCanvas } from 'canvas';
import { Client, TextChannel, GuildMember, AttachmentBuilder, Channel } from 'discord.js';
import { logStuff, getGuildOption } from '../functions';

registerFont('res/font/SF-Pro-Display-Regular.otf', { family: 'SF Pro Regular' });

const event : BotEvent = {
	name: 'guildMemberAdd',
	once: true,
	execute: async (member : GuildMember, client: Client) => {
		try {
			const welcomeUser: boolean = await getGuildOption(member.guild, 'welcomeUser');

			if (welcomeUser) {
				const welcomeChannelID: string = await getGuildOption(member.guild, 'welcomeChannelId');
				if (!welcomeChannelID) return;
				const welcomeChannel: TextChannel = client.channels.cache.get(welcomeChannelID) as TextChannel;
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

				const banner = new AttachmentBuilder(canvas.toBuffer(), { name: `welcome-${member.id}.png` });
				await welcomeChannel.send('Welcome <@' + member.id + '>');
				await welcomeChannel.send({ files: [banner] });
			}
		}
		catch (error) {
			logStuff('there was an Error executing the ' + event.name + ' Event\n' + error, client, 'error');
		}
	},
};

export default event;