/* eslint-disable no-inline-comments */
import { Client } from 'discord.js';
import { ReactionRoleConfiguration, ReactionRole } from './module';


const configuration: ReactionRoleConfiguration[] = [
	{
		messageId: '1027272157635543040',
		reaction: '1027269929835188416', // :a:red_flame:
		roleId: '1027263363694211154', // RED
	},
	{
		messageId: '1027272157635543040',
		reaction: '1027270197280776243', // :a:purple_gameboy:
		roleId: '1027263610482864158',
	},
	{
		messageId: '1027272157635543040',
		reaction: '1027270428768616548', // :a:pink_flame:
		roleId: '1027263581043048518',
	},
	{
		messageId: '1027272157635543040',
		reaction: '1027270563372204082', // :a:teal_gameboy:
		roleId: '1027263423353987083',
	},
	{
		messageId: '1027272157635543040',
		reaction: '1027270990293647430', // :a:blue_flame:
		roleId: '1027263545253056563',
	},
	{
		messageId: '1027272157635543040',
		reaction: '1027271193960652990', // :a:green_gameboy:
		roleId: '1027265041470345216',
	},
	{
		messageId: '1027272157635543040',
		reaction: '1027271318166585384', // :a:bl	ack_flame:
		roleId: '1027263639448723538',
	},
];

/*
const configuration: ReactionRoleConfiguration[] = [
	{
		messageId: '1047958690088624168',
		reaction: '1044909465134182451', // :creature:
		roleId: '774368542324817920', // vegan
	},
];
*/

module.exports = (client: Client) => {
	return new ReactionRole(client, configuration);
};
